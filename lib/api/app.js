const express = require('express');

const middlewares = require('./middlewares');
const marketRouter = require('./apiWeb/routes/marketRouter');
const swaggerRouter = require('./apiWeb/swagger');

const app = express();

app.use(middlewares.json);
app.use(middlewares.urlencoded);
app.use(middlewares.cors);
app.use(middlewares.passportMiddleware);

app.use('/api/v1/web', marketRouter);
app.use('/api-docs', swaggerRouter);

app.use(middlewares.error);

function start({appPort}) {
  const server = app.listen(appPort, () => {
    const {port, address} = server.address();
    console.info(`[DadaMobileApi] STARTING AT PORT [${port}] ADDRESS [${address}]`);
  });
}

module.exports = {
  app,
  start,
};
