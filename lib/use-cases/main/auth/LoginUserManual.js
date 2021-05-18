const UseCase = require('../../UseCase');
const axios = require('axios');

const User = require('../../../domain/models/users/User');

const jwtTokenHelper = require('../../utils/jwtTokenHelper');

class LoginUserManual extends UseCase {
  static validationRules = {
    email: 'required',
    password: 'required',
  }

  async execute(data) {
    const {email, password} = data;

    const tokenData = await axios.post(
      'http://3.36.150.248/api/v1/mobile/auth/login/manual', {
        email,
        password,
      });

    return {
      data: {token: tokenData.data.data.token},
    };
  }
}

module.exports = LoginUserManual;
