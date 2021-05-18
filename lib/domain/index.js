const Database = require('./Database');

let db = {};

const initializeDomain = async (dbConfig) => {
  const database = new Database(dbConfig);
  await database.initializeModels();
  db.db = database.db;
}

module.exports = {initializeDomain, db};
