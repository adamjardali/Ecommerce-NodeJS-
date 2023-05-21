const express = require('express');
const authRouter = express.Router();

const AuthController = require('../controllers/auth');

authRouter.post('/auth/signup/',AuthController.signup);
authRouter.post('/auth/login/',AuthController.login);
authRouter.get('/auth/',AuthController.home);

module.exports = authRouter;