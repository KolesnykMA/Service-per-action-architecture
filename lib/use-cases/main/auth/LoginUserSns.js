const UseCase = require('../../UseCase');

const User = require('../../../domain/models/users/User');

const jwtTokenHelper = require('../../helpers/jwtTokenHelper');

class LoginUserSns extends UseCase {
  static validationRules = {
    snsToken: 'required',
    snsType: 'required',
  }

  async execute(data) {
    const {snsToken, snsType} = data;

    const user = await User.getByTokenAndType$(snsToken, snsType);

    const token = jwtTokenHelper.createApiToken({
      id: user.userId,
      userType: user.userType,
    });

    return {
      data: {token},
    };
  }
}

module.exports = LoginUserSns;
