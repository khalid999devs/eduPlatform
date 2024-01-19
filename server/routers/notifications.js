const router = require('express').Router();

const {
  createOrder,
  getAllOrdersAdmin,
  clientInvoices,
} = require('../controllers/orders');
const clientValidate = require('../middlewares/clientTokenVerify');
const adminValidate = require('../middlewares/adminTokenVerify');
const {
  getAllNotifications,
  updateNotifications,
} = require('../controllers/notifications');

router.get('/get-all-notifications', adminValidate, getAllNotifications);
router.put('/update-notification/:id', adminValidate, updateNotifications);

module.exports = router;
