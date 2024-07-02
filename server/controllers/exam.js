const {
  courses,
  exams,
  clientexams,
  clientcourses,
  sequelize,
} = require('../models');
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
const cron = require('node-cron');
const {
  mergeArraysToObjKey,
  fromArrayToObjId,
  areArraysEqualSet,
  fromArrayToObjIdArr,
} = require('../utils/utilFunc');
const { Op } = require('sequelize');
const { writeFileSync } = require('fs');

const setExamInfo = async (req, res) => {
  let data = req.body;
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
  // console.log(data, exam);

  await redis.set(`question@${exam.id}`, exam.quesAns);

  exam.quesAns = JSON.parse(exam.quesAns);
  res.status(201).json({
    succeed: true,
    msg: 'Successfully created',
    exam,
  });
};

const editExamInfo = async (req, res) => {
  const data = req.body;
  const examId = req.params.id;
  const exam = await exams.findByPk(examId);
  if (!exam) {
    throw new NotFoundError('Exam could not be found!');
  }
  if (
    exam.examEndTime !== data.examEndTime ||
    exam.examStartTime !== data.examStartTime
  ) {
    const endTimeDiff = Number(data.examEndTime) - Number(exam.examEndTime);
    const serverExmEndTime = Number(exam.serverExamEndTime) + endTimeDiff;
    data.serverExamEndTime = serverExmEndTime.toString();
  }
  if (data.quesAns) {
    data.quesAns = exam.quesAns;
  }

  exam.set(data);
  await exam.save();

  exam.quesAns = JSON.parse(exam.quesAns);

  res.json({
    succeed: true,
    msg: 'Successfully updated exam info',
    exam,
  });
};

const deleteExamInfo = async (req, res) => {
  const examId = req.params.id;
  const exam = await exams.findByPk(examId);
  if (!exam) {
    throw new NotFoundError('Exam could not be found!');
  }
  const quesAns = JSON.parse(exam.quesAns);
  try {
    quesAns.questions.forEach((ques) => {
      if (ques.images) deleteMultipleFiles(ques.images);
    });
  } catch (error) {
    throw new CustomAPIError(error.message);
  }
  await redis.del(`question@${examId}`);
  await exam.destroy();

  res.json({
    msg: 'Successfully deleted the exam',
    succeed: true,
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

  if (ansType !== 'file' && ansType !== 'options') {
    if (req.files?.length > 0) deleteMultipleFiles(req.files);

    throw new BadRequestError(
      'Wrong ansType value entered! Please use the correct one.'
    );
  }

  const quesAnsId = `${examId}@${Date.now().toString().slice(-7)}`;

  let quesData = {
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
  let quesAns = JSON.parse(resQuesAns);

  quesAns.questions.push(quesData);
  quesAns.answers.push({
    id: quesAnsId,
    quesAns: answers ? JSON.parse(answers) : [],
  });

  await redis.set(`question@${examId}`, JSON.stringify(quesAns));

  exam.quesAns = JSON.stringify(quesAns);
  await exam.save();
  exam.quesAns = quesAns;

  res.status(201).json({
    succeed: true,
    msg: 'Successfully added the question',
    exam,
  });
};

const deleteSingleQuesAns = async (req, res) => {
  const { questionId, examId } = req.body;
  const exam = await exams.findByPk(examId);
  if (!exam) {
    throw new UnauthorizedError('Wrong exam Id provided');
  }
  const questionAns = JSON.parse(exam.quesAns);

  try {
    questionAns.questions.forEach((ques) => {
      if (ques.id === questionId && ques.images?.length > 0) {
        deleteMultipleFiles(ques.images);
      }
    });
  } catch (error) {
    throw new CustomAPIError(error.message);
  }
  questionAns.questions = questionAns.questions.filter(
    (singleQ) => singleQ.id !== questionId
  );
  questionAns.answers = questionAns.answers.filter(
    (singleA) => singleA.id !== questionId
  );

  await redis.set(`question@${examId}`, JSON.stringify(questionAns));
  exam.quesAns = JSON.stringify(questionAns);

  await exam.save();

  exam.quesAns = questionAns;

  res.json({
    msg: 'Successfully deleted the question and answer',
    succeed: true,
    exam,
  });
};

const getAllQues = async (req, res) => {
  const { examId, mode } = req.body;
  let allQuesAns = await redis.get(`question@${examId}`);

  // console.log(allQuesAns);

  if (!allQuesAns) {
    const exam = await exams.findByPk(examId);
    if (!exam) {
      throw new NotFoundError('Could not found the exam!');
    }
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
    result = mergeArraysToObjKey(parsedRes.questions, parsedRes.answers, 'id');
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
  let { fullAns, examId } = req.body;
  fullAns.clientId = req.user.id;
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
const addStuAnsFiles = async (req, res) => {
  const { ansInfo, examId } = req.body;

  let finalAns = JSON.parse(ansInfo);
  finalAns.clientId = req.user.id;
  finalAns.files = req.files;

  let newLength;
  try {
    newLength = await redis.rpush(
      `stuAnsFiles@${examId}`,
      JSON.stringify(finalAns)
    );
  } catch (error) {
    deleteMultipleFiles(req.files);
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

const mergerAnsFileArrays = (qA, fA) => {
  let merged = { ...fromArrayToObjId(qA, 'clientId') };
  const isWrittenOnly = qA.length === 0;

  fA.forEach((item) => {
    const qObj = merged[item.clientId];
    if (qObj) {
      const fAs = qObj.fileAnswers || [];
      merged[item.clientId].fileAnswers = [
        ...fAs,
        { questionId: item.questionId, files: item.files },
      ];
      if (isWrittenOnly)
        merged[item.clientId].submittedTime = item.submittedTime;
    } else {
      merged[item.clientId] = {
        clientId: item.clientId,
        courseId: item.courseId,
        examId: item.examId,
        submittedTime: item.submittedTime,
        answers: [],
        fileAnswers: [{ questionId: item.questionId, files: item.files }],
      };
    }
  });

  let mergedArray = [];
  for (let key in merged) {
    mergedArray.push(merged[key]);
  }

  return mergedArray;
};

async function processEvaluation(evaluationType, clientTime) {
  const allExams = await exams.findAll({ where: { isCronClosed: 0 } });
  const currentTime = Date.now();

  if (allExams.length < 1) {
    return { msg: 'No exam to evaluate!', mode: 'noexam', succeed: false };
  }

  if (allExams.length > 0) {
    const targetExams =
      evaluationType === 'auto'
        ? allExams.filter(
            (exam) => Number(exam.serverExamEndTime) < currentTime
          )
        : evaluationType === 'manual'
        ? allExams.filter(
            (exam) => Number(exam.examEndTime) + 10 * 60 * 1000 < currentTime
          )
        : [];

    if (targetExams.length < 1) {
      return {
        msg: 'Please wait for the Exam end-time(it is 10 minutes after the actual end time)!',
        mode: '',
        succeed: false,
      };
    }

    for (const exam of targetExams) {
      const quesAns = JSON.parse(exam.quesAns);
      let stuAnswers = await redis.lrange(`stuAnswers@${exam.id}`, 0, -1);
      let stuAnsFiles = await redis.lrange(`stuAnsFiles@${exam.id}`, 0, -1);
      // let stuAnsFilesObj = {};

      if (stuAnsFiles?.length > 0) {
        stuAnsFiles = stuAnsFiles.map((stuAnsFile) => JSON.parse(stuAnsFile));
        // stuAnsFilesObj = fromArrayToObjId(stuAnsFiles, 'questionId');
      } else {
        stuAnsFiles = [];
      }
      if (stuAnswers?.length > 0) {
        stuAnswers = stuAnswers.map((stuAnswer) => JSON.parse(stuAnswer));
      } else {
        stuAnswers = [];
      }

      stuAnswers = mergerAnsFileArrays(stuAnswers, stuAnsFiles);

      if (stuAnswers?.length > 0) {
        const oAllQuesAnsObj = mergeArraysToObjKey(
          quesAns.questions,
          quesAns.answers,
          'id'
        );
        // stuAnswers = stuAnswers.map((stuAnswer) => JSON.parse(stuAnswer));

        stuAnswers = stuAnswers.map((stuAnswerObj) => {
          const stuAnswersObjAll = fromArrayToObjId(
            stuAnswerObj.answers,
            'questionId'
          );
          const stuAnsFilesObj = fromArrayToObjId(
            stuAnswerObj.fileAnswers || [],
            'questionId'
          );

          let score = 0;
          const ansArr = [];
          let isFileChecked = null;
          let otherData = {};

          Object.values(oAllQuesAnsObj).forEach((oQuesAnsObj) => {
            const targetStuAns = stuAnswersObjAll[oQuesAnsObj.id] || {};

            let mark = oQuesAnsObj.mark;
            let fileObj = {};

            if (stuAnsFilesObj[oQuesAnsObj.id]) {
              targetStuAns.questionId =
                stuAnsFilesObj[oQuesAnsObj.id].questionId;
              targetStuAns.isCorrect = false;

              isFileChecked = 0;
              fileObj.writtenScore = 0;
              fileObj.files = stuAnsFilesObj[oQuesAnsObj.id].files?.map(
                (file) => {
                  return {
                    originalname: file.originalname,
                    path: file.path,
                    filename: file.filename,
                    destination: file.destination,
                  };
                }
              );
            }
            if (stuAnswersObjAll[oQuesAnsObj.id]) {
              if (
                areArraysEqualSet(oQuesAnsObj.quesAns, targetStuAns.optionsId)
              ) {
                score = score + mark;
                targetStuAns.isCorrect = true;
              } else {
                targetStuAns.isCorrect = false;
              }
            }

            ansArr.push({
              ...targetStuAns,
              mark,
              ...fileObj,
            });

            otherData.examName = exam.name;
            otherData.topic = exam.topic;
            otherData.category = exam.category;
          });

          return {
            courseId: stuAnswerObj.courseId,
            examId: stuAnswerObj.examId,
            clientId: stuAnswerObj.clientId,
            answers: JSON.stringify(ansArr),
            score: score,
            isFileChecked: isFileChecked,
            otherData: JSON.stringify(otherData),
            duration:
              Number(stuAnswerObj.submittedTime) - Number(exam.examStartTime),
          };
        });
        // await clientexams.destroy({ where: { examId: exam.id } });
        await clientexams.bulkCreate(stuAnswers);
        exam.isCronClosed = 1;
      } else {
        exam.isCronClosed = 1;
      }

      if (!(stuAnsFiles?.length > 0)) {
        exam.isFinalClosed = 1;
      }
      await exam.save();

      await redis.del(`stuAnsFiles@${exam.id}`);
      await redis.del(`stuAnswers@${exam.id}`);
      await redis.del(`question@${exam.id}`);
      //for loop finishes here
    }
  }
}

cron.schedule('0 0 0 * * *', async () => {
  try {
    await processEvaluation('auto');
  } catch (error) {
    const stringError = JSON.stringify(error);
    writeFileSync(
      './logs/failed/cronErrors.txt',
      `{succeed:false,fullTime:"${Date.now()}",error:${stringError}},\n`,
      {
        encoding: 'utf8',
        flag: 'a+',
        mode: 0o666,
      }
    );
  }
});

const manualEvaluateQuiz = async (req, res) => {
  const { currTime } = req.query;
  // console.log(currTime);
  try {
    const metaObj = await processEvaluation(
      'manual',
      currTime ? Number(currTime) : null
    );

    let result = await clientexams.findAll();
    result = result.map((singleClientExam) => {
      return {
        ...singleClientExam.dataValues,
        answers: JSON.parse(singleClientExam.answers),
        otherData: JSON.parse(singleClientExam.otherData),
      };
    });

    res.json({
      succeed: true,
      msg: 'Successfully done!',
      result: metaObj?.succeed === false ? [] : result,
      ...metaObj,
    });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(error.message);
  }
};

async function getSingleClientExmResult(examId, clientId, examResults) {
  if (!examId) {
    throw new BadRequestError('Please provide the exam ID! ');
  }
  examResults = await clientexams.findOne({
    where: { examId: examId, clientId: clientId },
  });
  if (!examResults) {
    throw new NotFoundError(
      'Did not found this particular exam data! You did not give the exam or evaluation is pending!'
    );
  }
  examResults.answers = JSON.parse(examResults.answers);
  examResults.otherData = JSON.parse(examResults.otherData);
  const exam = await exams.findOne({ where: { id: examId } });
  let quesAns = JSON.parse(exam.quesAns);

  const mergedQuesAns = mergeArraysToObjKey(
    quesAns.questions,
    quesAns.answers,
    'id'
  );
  examResults.dataValues.quesAns = mergedQuesAns;
  return examResults;
}

//For client profile exam results view
const getExamResultClient = async (req, res) => {
  const { mode, examId } = req.body;
  const clientId = req.user.id;
  //mode= all | single

  let examResults = [];
  let msg = 'Success';
  if (mode === 'all') {
    examResults = await clientexams.findAll({
      where: { clientId: clientId },
      attributes: { exclude: ['answers'] },
    });

    examResults = examResults.map((examResult) => {
      return {
        ...examResult.dataValues,
        otherData: JSON.parse(examResult.otherData),
      };
    });
    examResults = fromArrayToObjIdArr(examResults, 'courseId'); //complex operation
    msg = 'Successful. Object Key is courseId';
  } else if (mode === 'single') {
    examResults = await getSingleClientExmResult(examId, clientId, examResults);
  } else {
    throw new BadRequestError('Wrong mode value entered');
  }

  res.json({
    succeed: true,
    msg,
    result: examResults,
  });
};

const getExamResultAdmin = async (req, res) => {
  const { clientId, examId, mode, skip, rowNum } = req.body;

  let examResults = [];
  let msg = 'Success';

  if (mode === 'all') {
    // examResults = await clientexams.findAll({
    //   where: { examId: examId },
    //   attributes: { exclude: ['answers'] },
    // });
    [examResults] = await sequelize.query(
      `SELECT cl.id, cl.fullName, cl.image, cl.phone, cl.email, cl.userName, ce.score, ce.duration, ce.isFileChecked, ce.otherData, ce.examId FROM clients AS cl RIGHT JOIN clientexams AS ce ON cl.id = ce.clientId WHERE ce.examId=${examId} ORDER BY ce.score DESC, ce.duration ASC LIMIT ${
        skip || 0
      }, ${rowNum || 500};`
    );

    examResults = examResults.map((examResult) => {
      return {
        ...examResult,
        otherData: JSON.parse(examResult.otherData),
      };
    });

    // console.log(examResults, Date.now());
  } else if (mode === 'single') {
    examResults = await getSingleClientExmResult(examId, clientId, examResults);
  } else {
    throw new BadRequestError('Wrong mode value entered');
  }

  res.json({
    succeed: true,
    result: examResults,
    msg,
  });
};

const getExam = async (req, res) => {
  const { mode, examId } = req.body;
  //mode=all | single

  let result;
  let msg = '';
  if (mode === 'single') {
    if (!examId) {
      throw new BadRequestError('ExamId must be provided in this case!');
    }
    const exam = await exams.findOne({ where: { id: examId } });
    if (!exam) {
      throw new NotFoundError('Could not find exam!');
    }
    exam.quesAns = JSON.parse(exam.quesAns);
    result = exam;
  } else if (mode === 'all') {
    let allExams = await exams.findAll({
      attributes: { exclude: ['quesAns', 'serverExamEndTime'] },
    });

    result = fromArrayToObjIdArr(allExams, 'courseId');
    msg = 'Success! Key is courseId';
  }

  res.json({
    succeed: true,
    msg,
    result,
  });
};

const getExamInfosClient = async (req, res) => {
  const { courseId, mode, examId } = req.body;
  let isClientHasCourse = await clientcourses.findOne({
    where: { [Op.and]: [{ courseId: courseId }, { clientId: req.user.id }] },
  });
  if (!isClientHasCourse) {
    throw new UnauthorizedError(
      'You do not have permission to access this course! Please Enroll first.'
    );
  }

  let result;
  if (mode === 'all') {
    const allExams = await exams.findAll({
      where: { courseId: courseId },
      attributes: { exclude: ['quesAns', 'serverExamEndTime'] },
    });
    result = allExams;
  } else if (mode === 'single') {
    const exam = await exams.findOne({
      where: { id: examId },
      attributes: { exclude: ['serverExamEndTime', 'quesAns'] },
    });
    if (!exam) {
      throw new NotFoundError('No exam found');
    }
    result = exam;
  }

  res.json({
    succeed: true,
    msg: 'Successful',
    result,
  });
};

const getCourseBasedExams = async (req, res) => {
  const { courseId, mode } = req.body;
  let result;
  let whereClause = {
    category: {
      [Op.or]: [mode, 'quiz+written'],
    },
  };
  if (mode === 'evaluated') {
    whereClause.isFinalClosed = true;
    delete whereClause.category;
  }
  if (!(courseId === 'all')) {
    whereClause.courseId = courseId;
  }

  result = await exams.findAll({
    where: whereClause,
    attributes: {
      exclude: ['quesAns', 'serverExamEndTime', 'updatedAt'],
    },
    order: [['id', 'DESC']],
  });

  res.json({
    succeed: true,
    msg: 'Successfully fetched the exams data',
    result,
  });
};

module.exports = {
  setExamInfo,
  addSingleQuesAns,
  getAllQues,
  addStuAns,
  deleteSingleQuesAns,
  editExamInfo,
  deleteExamInfo,
  addStuAnsFiles,
  manualEvaluateQuiz,
  getExamResultClient,
  getExamResultAdmin,
  getExam,
  getExamInfosClient,
  getCourseBasedExams,
};
