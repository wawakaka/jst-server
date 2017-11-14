'use strict';

module.exports = function(sequelize, DataTypes) {

  var Bidang = sequelize.define(
      'bidang',
      {
        nama: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
        tableName: 'bidang',
        underscored: true,
      }
  );

  Bidang.associate = function(models) {
    Bidang.hasMany(models.kelas);
  };

  return Bidang;
};