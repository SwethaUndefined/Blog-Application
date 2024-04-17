const express = require('express');
const router = express.Router();
const user = require("../controller/user")

router.post('/login', user.login);
router.post('/register', user.register);
router.get('/verifyEmailCheck/:token', user.verifyEmailToken);
router.post("/forgotPassword",user.requestPasswordReset);
router.post('/update-password',user.updatePassword)

module.exports = router;
