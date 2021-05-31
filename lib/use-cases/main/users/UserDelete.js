const UseCase = require('../../UseCase');

const User = require('../../../domain/db/models/User');

class UserDelete extends UseCase {
  static validationRules = {

  }

  async execute(data) {
    const {userId} = this.user;

    await User.deleteByPk(userId);

    return {
      data: {},
    }
  }
}

module.exports = UserDelete;
