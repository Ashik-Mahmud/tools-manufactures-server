const { addReviews, getReviews } = require('../Controllers/reviews.controller');
const VerifyToken = require('../VerifyToken/VerifyToken');


const router = require('express').Router();
router.post("/",VerifyToken, addReviews)
router.get("/", getReviews)
module.exports = router;