const { loginController } = require('../Controllers/login.controller');
const router = require('express').Router();
router.post("/", loginController)
module.exports = router;