

const { createPaymentIntent, getPaymentHistory } = require('../Controllers/payment.controller');
const VerifyToken = require('../VerifyToken/VerifyToken');

const router = require('express').Router();
router.post('/create-payment-intent', VerifyToken, createPaymentIntent);
router.get('/history', VerifyToken, getPaymentHistory);

module.exports = router;