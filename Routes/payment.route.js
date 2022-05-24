

const { createPaymentIntent } = require('../Controllers/payment.controller');
const VerifyToken = require('../VerifyToken/VerifyToken');

const router = require('express').Router();
router.post('/create-payment-intent', VerifyToken, createPaymentIntent);

module.exports = router;