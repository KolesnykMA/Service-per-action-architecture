const UseCase = require('../../UseCase');

const User = require('../../../domain/db/models/User');

class UserShow extends UseCase {
  static validationRules = {
    userId: ['required', 'string']
  }

  async execute(data) {
    const {userId} = data;

    const user = await User.getUser(userId);

    return {
      data: user,
    }
  }
}

module.exports = UserShow;
