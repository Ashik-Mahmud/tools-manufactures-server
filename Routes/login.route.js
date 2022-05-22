const { loginController } = require('../Controllers/login.controller');
const router = require('router').Router();
router.post("/", loginController)