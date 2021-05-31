const express = require('express');

const apiFirstRouter = express();

apiFirstRouter
  .use(
      '/auth',
      require('./auth/authRouter'),
  )
  .use(
      '/auth',
      require('./users/usersRouter'),
  )
;

module.exports = apiFirstRouter;
