const jwt = require('jsonwebtoken');

const userJwtConfig = require('../../config/userJwtConfig');

const createToken = (data, config) => {
  return jwt.sign(
    data,
    config.secret,
    {expiresIn: config.expiresIn},
  );
};

const createApiToken = (data) => {
  return createToken(data, userJwtConfig);
};

module.exports = {
  createApiToken,
};

