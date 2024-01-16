const router = require('express').Router();

const {
  setExamInfo,
  addSingleQuesAns,
  getAllQues,
  addStuAns,
} = require('../controllers/exam');
const adminValidate = require('../middlewares/adminTokenVerify');
const clientValidate = require('../middlewares/clientTokenVerify');
const upload = require('../middlewares/uploadFile');
const { uploadMemory } = require('../middlewares/uploadMemory');

router.post('/add-exam', adminValidate, setExamInfo);
router.put(
  '/add-single-ques-ans',
  adminValidate,
  upload.array('questions'),
  addSingleQuesAns
);
router.post('/get-all-question', clientValidate, getAllQues);
router.post('/get-all-ques-admin', adminValidate, getAllQues);
router.post('/add-stu-ans', adminValidate, addStuAns);

module.exports = router;
