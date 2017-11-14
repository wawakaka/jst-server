'use strict';

module.exports = function(sequelize, DataTypes) {

  var Pengeluaran = sequelize.define(
      'pengeluaran',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        freezeTableName: true,
        tableName: 'pengeluaran',
        underscored: true,
      }
  );

  Pengeluaran.associate = function(models) {
    Pengeluaran.hasMany(models.detail_pengeluaran);
    Pengeluaran.belongsTo(models.user);
  };

  return Pengeluaran;
};