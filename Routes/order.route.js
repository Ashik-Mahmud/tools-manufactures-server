
const { saveOrderData } = require('../Controllers/order.controller');

const VerifyToken = require('../VerifyToken/VerifyToken');
const router = require('express').Router();
router.post('/', VerifyToken, saveOrderData);

module.exports = router;