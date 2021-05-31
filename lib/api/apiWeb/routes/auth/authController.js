const makeServiceRunner = require('../../../helpers/makeServiceRunner');

const LoginManual = require('../../../../use-cases/main/auth/LoginUserManual');
const LoginSns = require('../../../../use-cases/main/auth/LoginUserSns');

const loginManual = makeServiceRunner(
    LoginManual,
    (req) => ({...req.body}),
    (_) => ({}),
);

const loginSns = makeServiceRunner(
    LoginSns,
    (req) => ({...req.body}),
    (_) => ({}),
);

module.exports = {
  loginManual,
  loginSns,
};
