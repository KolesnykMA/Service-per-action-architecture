require('dotenv').config();

const mobileApi = require('./lib/api/app');
const domain = require('./lib/domain');

const appConfig = require('./lib/config/appConfig');
const dbConfig = require('./lib/config/dbConfig');

async function server() {
  mobileApi.start({appPort: appConfig.port});
  await domain.initializeModels(dbConfig);
}

server().catch((error) => {
  console.error(error);
  process.exit(1);
});
