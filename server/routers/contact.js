const router = require('express').Router()
const {
  sendMessage,
  getAllMessage,
  sendEmailToClient,
  smsToClient,
} = require('../controllers/contact')
const adminValidate = require('../middlewares/adminTokenVerify')

router.get('/messages', adminValidate, getAllMessage)
router.post('/sendMessage', sendMessage)
router.post('/emailToClient/:mode', adminValidate, sendEmailToClient)
router.post('/smsToClient/:mode', adminValidate, smsToClient)

module.exports = router
