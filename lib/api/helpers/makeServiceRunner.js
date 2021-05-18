const {DomainError} = require('../../domain/DomainError');

function makeServiceRunner(ServiceClass, paramsBuilder, contextBuilder) {
  return async function serviceRunner(req, res) {
    try {
      const params = paramsBuilder(req, res);
      const context = contextBuilder(req, res);

      const Service = new ServiceClass(context);
      const data = await Service.run(params);

      return res.send(data);
    } catch (error) {
      if ((error instanceof DomainError)) {
        res.status(500).send({
          error: {
            code: error.code,
            fields: error.fields,
            message: error.message,
          },
        });
      } else {
        res.status(500).send({
          error: {
            code: 'UNEXPECTED_SERVER_ERROR',
            fields: {...error},
            message: error.message,
          },
        });
      }
    }
  };
}


module.exports = makeServiceRunner;
