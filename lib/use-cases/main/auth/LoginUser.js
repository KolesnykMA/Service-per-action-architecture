const UseCase = require('../../UseCase');
const User = require('../../../domain/db/models/User');
const JwtTokenHelper = require('../../helpers/jwtTokenHelper');

class LoginUser extends UseCase {
  static validationRules = {
    email: 'required',
    password: 'required',
  }

  async execute(data) {
    const {email, password} = data;

    const user = await User.getUserByEmail$(email);
    user.checkPassword(password);

    const token = JwtTokenHelper.createApiToken({
      id: user.userId,
      userType: user.userType,
    });

    return {
      data: token,
    };
  }
}

module.exports = LoginUser;
