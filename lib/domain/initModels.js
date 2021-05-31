const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('transaction-namespace');

Sequelize.useCLS(namespace);

let db = {};

async function initializeModels(dbConfig) {
  const sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,
        dialectOptions: {
          decimalNumbers: true,
        },
        pool: {
          max: dbConfig.max,
          min: dbConfig.min,
          acquire: dbConfig.acquire,
          idle: dbConfig.idle,
        },
      },
  );

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  const models = {};
  const folder = `${__dirname}/models`;

  const readFolders = (folder) => {
    fs
        .readdirSync(folder)
        .filter((file) => file !== 'BaseModel.js')
        .forEach((file) => {
          if (file.slice(-3) === '.js') {
            const model = require(path.join(folder, file));
            models[model.name] = model;
          } else {
            readFolders(path.join(folder, file));
          }
        });
  };
  readFolders(folder);

  Object.values(models).forEach((model) => model.init(sequelize));
  Object.values(models).forEach((model) => model.initRelationsAndHooks(sequelize));

  db.sequelize = sequelize;
  db.models = models;

  // db.sequelize.sync({
  //   alter: true,
  //   force: true,
  // }).then(async () => {
  //   await require('./seeders/admins/admins')(db);
  // });
}

module.exports = {
  initializeModels,
  db,
};
