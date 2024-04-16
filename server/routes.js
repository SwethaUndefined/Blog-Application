const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/users/confirm/:token', controller.verifyEmailToken);
router.post("/forgotPassword",controller.requestPasswordReset);
router.post('/update-password',controller.updatePassword)
router.post('/createBlog',controller.createBlog);
router.get('/getBlogs',controller.getBlogs)
router.put('/updateBlog',controller.updateBlog)
router.delete('/deleteBlog/:blogId', controller.deleteBlog);
module.exports = router;

