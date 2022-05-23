
const { saveOrderData , getOrderData, deleteOrderData} = require('../Controllers/order.controller');

const VerifyToken = require('../VerifyToken/VerifyToken');
const router = require('express').Router();
router.post('/', VerifyToken, saveOrderData);
router.get('/', VerifyToken, getOrderData);
router.delete('/', VerifyToken, deleteOrderData);

module.exports = router;