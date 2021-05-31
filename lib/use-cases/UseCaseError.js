class UseCaseError extends Error {
  constructor(data) {
    super();
    this.code = data.code;
    this.fields = data.fields;
    this.message = data.message;
  }
}

module.exports = {
  UseCaseError,
};
