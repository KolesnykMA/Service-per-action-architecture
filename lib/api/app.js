const express = require('express');

const middlewares = require('./middlewares');
const marketRouter = require('./controllers/marketRouter');
// const swaggerRouter = require('./swagger');

const app = express();

app.use(middlewares.json);
app.use(middlewares.urlencoded);
app.use(middlewares.cors);
app.use(middlewares.auth);

app.use('/api/v1/market', marketRouter);

app.use(middlewares.error);

// app.use('/api-docs', swaggerRouter);

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
