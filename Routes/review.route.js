const { addReviews } = require('../Controllers/reviews.controller');
const VerifyToken = require('../VerifyToken/VerifyToken');


const router = require('express').Router();
router.post("/",VerifyToken, addReviews)
module.exports = router;