const UseCase = require('../../UseCase');

const User = require('../../../domain/db/models/User');

class UserCreate extends UseCase {
  static validationRules = {
    userName: 'required',
    email: 'required',
    phone: 'required',
    password: 'required',
  }

  async execute(data) {
    const user = await User.save(data);

    return {
      data: user,
    };
  }
}

module.exports = UserCreate;

