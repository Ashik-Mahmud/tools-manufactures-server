const { createBlog } = require('../Controllers/blog.controller');
const VerifyToken = require('../VerifyToken/VerifyToken');

const router = require('express').Router();
router.post('/', VerifyToken, createBlog);


module.exports = router;