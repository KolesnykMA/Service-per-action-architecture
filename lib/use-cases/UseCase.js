const LIVR = require('livr');
const {DomainError} = require('../domain/DomainError');

class UseCase {
  constructor(args) {
    if (this.constructor === UseCase) throw new Error('Abstract classes cant be instantiated.');
    if (args.userId) this.user = args;
    if (args.adminId) this.admin = args;
  }

  async execute() {
    throw new Error('You have to implement the method!');
  }

  async run(params) {
    const cleanParams = await this.validate(params);

    return this.execute(cleanParams);
  }

  validate(input) {
    const validationRules = this.constructor.validationRules;
    const validator = new LIVR.Validator(validationRules);

    const validData = validator.validate(input);

    if (validData) {
      return validData;
    }

    throw new DomainError({
      code: 'FORMAT_ERROR',
      fields: validator.getErrors(),
      message: 'Error in parameters',
    });
  }
}

module.exports = UseCase;
