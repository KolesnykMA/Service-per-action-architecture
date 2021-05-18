class UseCaseError extends Error {
  constructor(data) {
    super();
    this.code = data.code;
    this.fields = data.fields;
    this.message = data.message;
  }
}

class VerificationFailed extends UseCaseError { }
class TimeExpired extends UseCaseError { }

module.exports = {
  UseCaseError,
  VerificationFailed,
  TimeExpired,
};
