'use strict';

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User', {
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
    isSuperUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  User.associate = function(models) {
    User.hasMany(models.Kelas, {as: 'kelas'});
    User.hasMany(models.Pengeluaran);
  };

  return User;
};