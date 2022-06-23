const express = require('express');
const router = express.Router();
const verifySignUp = require('../middlewares/verifySignUp');
const controller = require('../controllers/auth.controller');

router.post('/register',
    verifySignUp.checkUserExists,
    verifySignUp.checkEmailExists,
    controller.register);

router.post('/login', controller.login);

module.exports = router;