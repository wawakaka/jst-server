'use strict';

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User', {
    idUser: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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