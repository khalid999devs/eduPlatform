const router = require('express').Router();

const { createOrder } = require('../controllers/orders');
const adminValidate = require('../middlewares/adminTokenVerify');
const clientValidate = require('../middlewares/clientTokenVerify');
const upload = require('../middlewares/uploadFile');

router.post('/create-order', clientValidate, createOrder);

module.exports = router;
