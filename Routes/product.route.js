
const { saveProductData, getProductData } = require('../Controllers/product.controller');
const VerifyAdmin = require('../VerifyAdmin/VerifyAdmin');
const VerifyToken = require('../VerifyToken/VerifyToken');

const router = require('express').Router();
router.post('/', VerifyToken, VerifyAdmin, saveProductData);
router.get('/', VerifyToken, VerifyAdmin, getProductData);
module.exports = router;