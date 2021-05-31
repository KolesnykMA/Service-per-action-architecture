const UseCase = require('../../UseCase');

const User = require('../../../domain/db/models/User');

class UserShow extends UseCase {
  static validationRules = {
    userName: 'required',
    email: 'required',
    phone: 'required',
    password: 'required',
  }

  async execute(data) {
    const {userId} = data;

    const user = await User.findByPk(userId);

    await user.update(data);

    return {
      data: user,
    }
  }
}

module.exports = UserShow;
