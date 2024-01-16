const { courses, exams } = require('../models');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  UnauthorizedError,
  CustomAPIError,
} = require('../errors');
const { redis } = require('../utils/redis');
const mailer = require('../utils/sendMail');
const cloudinary = require('cloudinary');
const { deleteMultipleFiles } = require('../utils/fileOps');

const setExamInfo = async (req, res) => {
  const data = req.body;
  if (!data.examStartTime || !data.examEndTime || !data.examCreationTime) {
    throw new BadRequestError(
      'examStartTime or examEndTime or examCreationTime data must not be empty!'
    );
  }
  const course = await courses.findByPk(data.courseId);
  if (!course) {
    throw new NotFoundError('Course could not found!');
  }
  data.quesAns = JSON.stringify({ questions: [], answers: [] });

  //exam time management
  const nowToEndTimeDiff =
    Number(data.examEndTime) - Number(data.examCreationTime);
  const serverExmEndTime = Date.now() + nowToEndTimeDiff + 60 * 60 * 1000;
  data.serverExamEndTime = serverExmEndTime.toString();

  const exam = await exams.create(data);

  await redis.set(`question@${exam.id}`, exam.quesAns);

  exam.quesAns = JSON.parse(exam.quesAns);
  res.status(201).json({
    succeed: true,
    msg: 'Successfully created',
    exam,
  });
};

const addSingleQuesAns = async (req, res) => {
  const { category, quesOptions, answers, examId, mark, ansType, title } =
    req.body;

  const exam = await exams.findByPk(examId);
  if (!exam) {
    if (req.files?.length > 0) deleteMultipleFiles(req.files);
    throw new NotFoundError('This particular exam could not be found!');
  }
  console.log(ansType);
  if (ansType !== 'file' && ansType !== 'options') {
    if (req.files?.length > 0) deleteMultipleFiles(req.files);

    throw new BadRequestError(
      'Wrong ansType value entered! Please use the correct one.'
    );
  }

  const quesAnsId = `${examId}@${Date.now().toString().slice(-7)}`;

  const quesData = {
    id: quesAnsId,
    title: title,
    ansType,
    category,
    quesOptions: quesOptions ? JSON.parse(quesOptions) : [],
    mark: Number(mark),
  };

  if (req.files?.length > 0) {
    try {
      const uploadedFiles = req.files;
      const uploadPromises = uploadedFiles.map(async (file) => {
        const mimeType = file.mimeType;

        // const base64Image = file.buffer?.toString('base64');
        // const result = await cloudinary.v2.uploader.upload(
        //   `data:${mimeType};base64,${base64Image}`,
        //   {
        //     maxWidth: 650,
        //     maxHeight: 400,
        //     folder: examId,
        //     public_id: quesAnsId,
        //   }
        // );
        return {
          // public_id: result.public_id,
          // secure_url: result.secure_url,
          url: file.path,
          originalName: file.originalname,
        };
      });

      quesData.images = await Promise.all(uploadPromises);
    } catch (error) {
      deleteMultipleFiles(req.files);
      throw new CustomAPIError(error.message);
    }
  }

  const resQuesAns = await redis.get(`question@${examId}`);
  if (!resQuesAns) {
    throw new Error(
      'Question data format cache is missing! Please ensure the cache is maintained properly!'
    );
  }
  const quesAns = JSON.parse(resQuesAns);

  quesAns.questions.push(quesData);
  quesAns.answers.push({
    id: quesAnsId,
    quesAns: answers ? JSON.parse(answers) : [],
  });
  redis.set(`question@${examId}`, JSON.stringify(quesAns));

  exam.quesAns = JSON.stringify(quesAns);
  await exam.save();
  exam.quesAns = quesAns;

  res.status(201).json({
    succeed: true,
    msg: 'Successfully added the question',
    exam,
  });
};

const getAllQues = async (req, res) => {
  const { examId, mode } = req.body;
  let allQuesAns = await redis.get(`question@${examId}`);

  if (!allQuesAns) {
    const exam = await exams.findByPk(examId);
    allQuesAns = exam.quesAns;
    if (!allQuesAns) {
      throw new BadRequestError('Could not found any question!');
    }
  }
  const parsedRes = JSON.parse(allQuesAns);
  let result;
  if (mode === 'question') {
    result = parsedRes.questions;
  } else if (mode === 'answer') {
    result = parsedRes;
  } else {
    throw new UnauthorizedError('Wrong mode value provided!');
  }

  res.json({
    succeed: true,
    msg: 'Successful',
    result,
  });
};

const addStuAns = async (req, res) => {
  const { fullAns, examId } = req.body;
  let newLength;
  try {
    newLength = await redis.rpush(
      `stuAnswers@${examId}`,
      JSON.stringify(fullAns)
    );
  } catch (error) {
    throw new CustomAPIError(
      `${error.message || 'Something wrong happened. Please try again!'}`
    );
  }
  res.json({
    succeed: true,
    msg: 'Thank you. We have got your answer',
    submittedNo: newLength,
  });
};

module.exports = { setExamInfo, addSingleQuesAns, getAllQues, addStuAns };
