const UseCase = require('../../UseCase');

const User = require('../../../domain/db/models/User');

class UsersList extends UseCase {
  static validationRules = {
    page: ['integer', {min_number: 1}],
    limit: ['integer', {one_of: [10, 20, 30]}],
  }

  async execute(data) {
    const users = await User.getUsers(data);

    return {
      data: users,
    };
  }
}

module.exports = UsersList;
