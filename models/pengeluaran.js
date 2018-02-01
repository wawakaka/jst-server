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
        status: DataTypes.BOOLEAN,
        tanggal: {
          type: DataTypes.DATE, defaultValue: DataTypes.NOW,
        },
      },
      {
        freezeTableName: true,
        tableName: 'pengeluaran',
        underscored: true,
      }
  );

  Pengeluaran.associate = function(models) {
    Pengeluaran.hasMany(models.detail_pengeluaran, {as: 'detail_pengeluaran'});
    Pengeluaran.belongsTo(models.user);
  };

  return Pengeluaran;
};