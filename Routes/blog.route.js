const { createBlog, getBlogs, getAllBlogs, updateBlog, deleteBlog, getSearchBlog, increaseViews, createComment, getComments, increaseComment, deleteComment } = require('../Controllers/blog.controller');
const VerifyToken = require('../VerifyToken/VerifyToken');

const router = require('express').Router();
router.post('/', VerifyToken, createBlog);
router.post('/comment', VerifyToken, createComment);
router.get('/comments',  getComments);
router.delete('/comment',VerifyToken,  deleteComment);
router.get('/', VerifyToken, getBlogs);
router.get('/all',  getAllBlogs);
router.get('/search',  getSearchBlog);
router.patch('/views',  increaseViews);
router.patch('/commentCount',  increaseComment);
router.put('/', VerifyToken,  updateBlog);
router.delete('/', VerifyToken,  deleteBlog);


module.exports = router;