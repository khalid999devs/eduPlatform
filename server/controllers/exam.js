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

const setExamInfo = async (req, res) => {
  const data = req.body;
  const course = await courses.findByPk(data.courseId);
  if (!course) {
    throw new NotFoundError('Course could not found!');
  }

  data.quesAns = JSON.stringify({ questions: [], answers: [] });

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
  const { category, question, answers, examId, mode, image, mark } = req.body;
  const exam = await exams.findByPk(examId);
  if (!exam) {
    throw new NotFoundError('This particular exam could not be found!');
  }

  const quesAnsId = `${examId}@${Date.now().toString().slice(-7)}`;

  let cloudImg;
  if (image) {
    cloudImg = await cloudinary.v2.uploader.upload(image, {
      maxWidth: 650,
      maxHeight: 400,
      folder: examId,
      public_id: quesAnsId,
    });
  }

  const resQuesAns = await redis.get(`question@${examId}`);
  const quesAns = JSON.parse(resQuesAns);

  const quesData = {
    id: quesAnsId,
    category,
    question,
    mark: Number(mark),
  };
  if (image) {
    quesData.image = {
      public_id: cloudImg.public_id,
      secure_url: cloudImg.secure_url,
    };
  }
  quesAns.questions.push(quesData);
  quesAns.answers.push({ id: quesAnsId, answers });
  redis.set(`question@${examId}`, JSON.stringify(quesAns));

  if (mode === 'final') {
    exam.quesAns = JSON.stringify(quesAns);
    await exam.save();
  }

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
