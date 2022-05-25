const { createBlog, getBlogs, getAllBlogs, updateBlog, deleteBlog } = require('../Controllers/blog.controller');
const VerifyToken = require('../VerifyToken/VerifyToken');

const router = require('express').Router();
router.post('/', VerifyToken, createBlog);
router.get('/', VerifyToken, getBlogs);
router.get('/all',  getAllBlogs);
router.put('/', VerifyToken,  updateBlog);
router.delete('/', VerifyToken,  deleteBlog);


module.exports = router;