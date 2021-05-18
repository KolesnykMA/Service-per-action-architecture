const express = require('express');

const mainRouter = express();

mainRouter
  .use(
    '/auth',
    require('./auth/authRouter'),
  )
;

module.exports = mainRouter;
