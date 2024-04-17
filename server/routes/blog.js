const express = require('express');
const router = express.Router();
const blog = require("../controller/blog")


router.post('/createBlog',blog.createBlog);
router.get('/getBlogs',blog.getBlogs)
router.put('/updateBlog',blog.updateBlog)
router.delete('/deleteBlog/:blogId', blog.deleteBlog);

module.exports = router;
