
const { saveProductData } = require('../Controllers/product.controller');
const VerifyAdmin = require('../VerifyAdmin/VerifyAdmin');
const VerifyToken = require('../VerifyToken/VerifyToken');

const router = require('express').Router();
router.post('/', VerifyToken, VerifyAdmin, saveProductData);
module.exports = router;