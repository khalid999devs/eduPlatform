const router = require('express').Router();

const {
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
} = require('../controllers/exam');
const adminValidate = require('../middlewares/adminTokenVerify');
const clientValidate = require('../middlewares/clientTokenVerify');
const upload = require('../middlewares/uploadFile');
const { uploadMemory } = require('../middlewares/uploadMemory');

router.get('/manual-evaluate-quiz-exams', adminValidate, manualEvaluateQuiz);
router.post('/get-exam-results-client', clientValidate, getExamResultClient);
router.post('/get-exam-results-admin', adminValidate, getExamResultAdmin);
router.post('/get-exam-admin', adminValidate, getExam);
router.post('/get-exam-info-client', clientValidate, getExamInfosClient);

router.post('/add-exam', adminValidate, setExamInfo);
router.put(
  '/add-single-ques-ans',
  adminValidate,
  upload.array('questions'),
  addSingleQuesAns
);
router.post('/get-all-question', clientValidate, getAllQues);
router.post('/get-all-ques-admin', adminValidate, getAllQues);
router.post('/add-stu-ans', clientValidate, addStuAns);
router.post(
  '/add-stu-files-ans',
  clientValidate,
  upload.array('examsAns'),
  addStuAnsFiles
);

router.put('/delete-single-ques', adminValidate, deleteSingleQuesAns);
router.put('/edit-exam-info/:id', adminValidate, editExamInfo);

router.delete('/delete-exam-info/:id', adminValidate, deleteExamInfo);

module.exports = router;
