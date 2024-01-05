const router = require('express').Router();

const { createOrder } = require('../controllers/orders');
const clientValidate = require('../middlewares/clientTokenVerify');

router.post('/create-order', clientValidate, createOrder);

module.exports = router;
