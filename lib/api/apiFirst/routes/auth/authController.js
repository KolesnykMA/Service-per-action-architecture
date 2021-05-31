const makeServiceRunner = require('../../../helpers/makeServiceRunner');

const LoginManual = require('../../../../use-cases/main/auth/LoginUser');

const loginManual = makeServiceRunner(
    LoginManual,
    (req) => ({
      ...req.body,
    }),
    (_) => ({}),
);

module.exports = {
  loginManual,
};
