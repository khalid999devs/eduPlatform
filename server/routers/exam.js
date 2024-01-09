const router = require('express').Router();

const { setExamInfo } = require('../controllers/exam');
const adminValidate = require('../middlewares/adminTokenVerify');
const clientValidate = require('../middlewares/clientTokenVerify');

router.post('/add-exam', adminValidate, setExamInfo);

module.exports = router;
