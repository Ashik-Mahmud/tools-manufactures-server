
const { saveProductData, getProductData, deleteProductData } = require('../Controllers/product.controller');
const VerifyAdmin = require('../VerifyAdmin/VerifyAdmin');
const VerifyToken = require('../VerifyToken/VerifyToken');

const router = require('express').Router();
router.post('/', VerifyToken, VerifyAdmin, saveProductData);
router.get('/', VerifyToken, VerifyAdmin, getProductData);
router.delete('/', VerifyToken, VerifyAdmin, deleteProductData);
module.exports = router;