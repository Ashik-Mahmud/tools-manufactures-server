const { createBlog, getBlogs } = require('../Controllers/blog.controller');
const VerifyToken = require('../VerifyToken/VerifyToken');

const router = require('express').Router();
router.post('/', VerifyToken, createBlog);
router.get('/', VerifyToken, getBlogs);


module.exports = router;