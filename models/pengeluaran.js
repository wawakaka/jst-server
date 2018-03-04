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
        barang: DataTypes.STRING,
        biaya: DataTypes.INTEGER,
        keterangan: DataTypes.TEXT,
        gambar: DataTypes.STRING,
      },
      {
        freezeTableName: true,
        tableName: 'pengeluaran',
        underscored: true,
      }
  );

  Pengeluaran.associate = function(models) {
    Pengeluaran.belongsTo(models.user);
  };

  return Pengeluaran;
};