const express = require('express');
const authController = require('./authController');

const authRouter = express();

authRouter
  .post(
    '/login/manual',
    authController.loginManual,
  )
  .post(
    '/login/sns',
    authController.loginSns,
  )
;

module.exports = authRouter;
