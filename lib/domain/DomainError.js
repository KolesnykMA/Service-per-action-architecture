class DomainError extends Error {
  constructor(data) {
    super();
    this.code = data.code;
    this.fields = data.fields;
    this.message = data.message;
  }
}

class Fatal extends DomainError { }
class InactiveObject extends DomainError { }
class NotUnique extends DomainError { }
class NotFound extends DomainError { }
class ForeignKeyError extends DomainError { }
class WrongId extends DomainError { }
class WrongParameterValue extends DomainError { }
class VerificationFailed extends DomainError { }
class TimeExpired extends DomainError { }

module.exports = {
  DomainError,
  NotUnique,
  NotFound,
  ForeignKeyError,
  WrongId,
  InactiveObject,
  Fatal,
  WrongParameterValue,
  VerificationFailed,
  TimeExpired,
};

