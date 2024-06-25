const router = require('express').Router();

const {
  createOrder,
  getAllVerifiedOrders,
  clientInvoices,
  paymentInit,
  validatePayment,
  getAllPendingOrders,
  confirmSingleOrder,
} = require('../controllers/orders');
const clientValidate = require('../middlewares/clientTokenVerify');
const adminValidate = require('../middlewares/adminTokenVerify');

router.get('/verified-orders', adminValidate, getAllVerifiedOrders);
router.get('/orders-client', clientValidate, clientInvoices);
router.get('/pending-orders', adminValidate, getAllPendingOrders);

router.post('/create-order', clientValidate, createOrder);
router.post('/pay-init', clientValidate, paymentInit);
router.post('/confirm-single-order', adminValidate, confirmSingleOrder);
// router.post('/validate-payment/:tranId', validatePayment);

module.exports = router;
