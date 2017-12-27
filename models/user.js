'use strict';

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define(
      'user',
      {
        email: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        nama: {
          type: DataTypes.STRING,
        },
        token: {
          type: DataTypes.STRING,
        },
        is_super_user: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
        tableName: 'user',
        underscored: true,
      }
  );

  User.findByToken = function(token, cb) {
    process.nextTick(function() {
      User.findAll({
        where: {
          token: token,
        },
      }).then(function(s) {
        return cb(null, s);
      }).catch(function(err) {
        console.log(err);
      });
    });
  };

  User.associate = function(models) {
    User.hasMany(models.kelas, {as: 'list_kelas'});
    User.hasMany(models.pengeluaran);
  };

  return User;
};