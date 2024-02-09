const router = require('express').Router();

const {
  createOrder,
  getAllOrdersAdmin,
  clientInvoices,
  paymentInit,
  validatePayment,
} = require('../controllers/orders');
const clientValidate = require('../middlewares/clientTokenVerify');
const adminValidate = require('../middlewares/adminTokenVerify');

router.post('/create-order', clientValidate, createOrder);
router.get('/allOrders-admin', adminValidate, getAllOrdersAdmin);
router.get('/orders-client', clientValidate, clientInvoices);

router.post('/pay-init', clientValidate, paymentInit);
// router.post('/validate-payment/:tranId', validatePayment);

module.exports = router;
