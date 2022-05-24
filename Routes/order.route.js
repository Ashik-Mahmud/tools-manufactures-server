
const { saveOrderData , getOrderData, deleteOrderData, patchOrderData,getAllOrderData, patchOrderShipped} = require('../Controllers/order.controller');
const VerifyAdmin = require('../VerifyAdmin/VerifyAdmin')
const VerifyToken = require('../VerifyToken/VerifyToken');
const router = require('express').Router();
router.post('/', VerifyToken, saveOrderData);
router.get('/', VerifyToken, getOrderData);
router.get('/all', VerifyToken, VerifyAdmin, getAllOrderData);
router.delete('/', VerifyToken, deleteOrderData);
router.patch('/', VerifyToken, patchOrderData);
router.patch('/shipped', VerifyToken,VerifyAdmin, patchOrderShipped);

module.exports = router;