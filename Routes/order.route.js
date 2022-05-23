
const { saveOrderData , getOrderData} = require('../Controllers/order.controller');

const VerifyToken = require('../VerifyToken/VerifyToken');
const router = require('express').Router();
router.post('/', VerifyToken, saveOrderData);
router.get('/', VerifyToken, getOrderData);

module.exports = router;