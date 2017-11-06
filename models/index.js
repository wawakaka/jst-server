'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
// var env = process.env.NODE_ENV || 'development';
// var config = require(__dirname + '/../config/config.json')[env];
var db = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   var sequelize = new Sequelize(config.database, config.username,
//       config.password, config);
// }

var sequelize = new Sequelize(
    'd4b3b7r1a0rbjm',
    'tkzlhwzjgrjtfi',
    'a826b9b75487e7fc1a47030ae09fad6fd78cb6a78f2ecdfd830cf1eec4e30f9a', {
      host: 'ec2-54-197-253-210.compute-1.amazonaws.com',
      dialect: 'postgres',
      ssl: true,
      dialectOptions: {
        'ssl': true,
      },
      define: {
        'timestamps': false,
      },
    });

fs.readdirSync(__dirname).filter(function(file) {
  return (file.indexOf('.') !== 0) && (file !== basename) &&
      (file.slice(-3) === '.js');
}).forEach(function(file) {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;