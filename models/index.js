'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const db = {};
const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASS, {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      define: {
        'timestamps': false,
      },
      ssl: true,
      dialectOptions: {
        'ssl': true,
      },
    });

fs.readdirSync(__dirname).
    filter(file => (file.indexOf('.') !== 0) && (file !== basename) &&
        (file.slice(-3) === '.js')).
    forEach(file => {
      const model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;