const { updateProfile, getProfileDetails } = require('../Controllers/users.controller');
const VerifyToken = require('./../VerifyToken/VerifyToken.js')
const router = require('express').Router();
router.patch("/",VerifyToken, updateProfile);
router.get("/",VerifyToken, getProfileDetails);
module.exports = router;