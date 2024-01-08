const router = require('express').Router();

const {
  createOrder,
  getAllOrdersAdmin,
  clientInvoices,
} = require('../controllers/orders');
const clientValidate = require('../middlewares/clientTokenVerify');
const adminValidate = require('../middlewares/adminTokenVerify');

router.post('/create-order', clientValidate, createOrder);
router.get('/allOrders-admin', adminValidate, getAllOrdersAdmin);
router.get('/orders-client', clientValidate, clientInvoices);

module.exports = router;
