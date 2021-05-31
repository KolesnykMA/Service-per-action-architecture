const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

module.exports = {
  json: bodyParser.json({
    limit: '5mb',
    verify: (req, res, buffer) => {
      try {
        JSON.parse(buffer);
      } catch (error) {
        throw new Error('BROKEN_JSON');
      }
    },
  }),

  urlencoded: bodyParser.urlencoded({
    extended: true,
  }),

  cors: cors({
    origin: '*',
  }),

  passportMiddleware: passport.initialize(),

  error: (error, req, res, next) => {
    if (res.headersSent) {
      next(error);
    } else {
      res.status(500).send({
        status: 500,
        error: {
          code: error.message,
        },
      });
    }
  },
};
