const express = require('express');
const authRouter = express.Router();
const { signup, login, getUserById } = require('../controller/authController');

authRouter.post('/register', signup);
authRouter.post('/login', login);
authRouter.get('/:id', getUserById);

module.exports = authRouter;
