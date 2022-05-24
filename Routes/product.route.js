
const { saveProductData, getProductData, deleteProductData, getPurchaseProductData , getAllProducts, patchProductData, patchUpdateStock, } = require('../Controllers/product.controller');
const VerifyAdmin = require('../VerifyAdmin/VerifyAdmin');
const VerifyToken = require('../VerifyToken/VerifyToken');

const router = require('express').Router();
router.post('/', VerifyToken, VerifyAdmin, saveProductData);
router.patch('/', VerifyToken,  patchProductData);
router.patch('/update-stock', VerifyToken, VerifyAdmin,  patchUpdateStock);
router.get('/', VerifyToken, VerifyAdmin, getProductData);
router.get('/one', VerifyToken, getPurchaseProductData);
router.get('/all', getAllProducts);
router.delete('/', VerifyToken, VerifyAdmin, deleteProductData);
module.exports = router;