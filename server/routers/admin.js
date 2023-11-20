const router = require('express').Router();
const {
  getAllAdmins,
  adminReg,
  adminLogin,
  isAdminValidated,
  setEventSetting,
  deleteEventSetting,
  adminLogout,
  getEventSetting,
  updateBannnerImg,
  editEventSetting,
} = require('../controllers/admin');
const adminValidate = require('../middlewares/adminTokenVerify');
const upload = require('../middlewares/uploadFile');

router.get('/', adminValidate, getAllAdmins);
router.post('/reg', adminReg);
router.post('/login', adminLogin);
router.get('/logout', adminLogout);
router.get('/auth', adminValidate, isAdminValidated);

module.exports = router;
