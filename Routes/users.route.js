const { updateProfile, getProfileDetails, getAllUsers, patchUserRole } = require('../Controllers/users.controller');
const VerifyToken = require('./../VerifyToken/VerifyToken.js')
const router = require('express').Router();
router.patch("/",VerifyToken, updateProfile);
router.get("/",VerifyToken, getProfileDetails);
router.get("/all",VerifyToken, getAllUsers);
router.patch("/admin", VerifyToken, patchUserRole);
module.exports = router;