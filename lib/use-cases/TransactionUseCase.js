const UseCase = require('./UseCase');

const {db} = require('../domain');

class TransactionUseCase extends UseCase {
  async run(params) {
    const cleanParams = await this.validate(params);

    return db.sequelize.transaction((_) => this.execute(cleanParams));
  }
}

module.exports = TransactionUseCase;
