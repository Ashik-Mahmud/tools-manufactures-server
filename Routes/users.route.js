const { updateProfile, getProfileDetails, getAllUsers, patchUserRole, deleteUser } = require('../Controllers/users.controller');
const VerifyAdmin = require('../VerifyAdmin/VerifyAdmin.js');
const VerifyToken = require('./../VerifyToken/VerifyToken.js')
const router = require('express').Router();
router.patch("/",VerifyToken, updateProfile);
router.get("/",VerifyToken, getProfileDetails);
router.get("/all",VerifyToken, getAllUsers);
router.patch("/admin", VerifyToken, VerifyAdmin, patchUserRole);
router.delete("/", VerifyToken, VerifyAdmin, deleteUser);
module.exports = router;