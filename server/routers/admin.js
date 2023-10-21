const router = require('express').Router()
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
} = require('../controllers/admin')
const { eventSettingValidate } = require('../middlewares/adInputValidate')
const adminValidate = require('../middlewares/adminTokenVerify')
const upload = require('../middlewares/uploadFile')

router.get('/', adminValidate, getAllAdmins)
router.post('/reg', adminReg)
router.post('/login', adminLogin)
router.get('/logout', adminLogout)
router.get('/auth', adminValidate, isAdminValidated)

//event creator page settings
router.get('/setting', getEventSetting)
router.post(
  '/setting',
  adminValidate,
  upload.single('banner'),
  eventSettingValidate,
  setEventSetting
)
router.post(
  '/updateBanner',
  adminValidate,
  upload.single('banner'),
  updateBannnerImg
)
router.put('/editSetting/:id', adminValidate, editEventSetting)

router.delete('/deleteSetting/:id', adminValidate, deleteEventSetting)

module.exports = router
