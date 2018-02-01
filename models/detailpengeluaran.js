'use strict';

module.exports = function(sequelize, DataTypes) {

  var DetailPengeluaran = sequelize.define(
      'detail_pengeluaran',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        barang: DataTypes.STRING,
        biaya: DataTypes.INTEGER,
        keterangan: DataTypes.TEXT,
        gambar: DataTypes.STRING,
      },
      {
        freezeTableName: true,
        tableName: 'detail_pengeluaran',
        underscored: true,
      }
  );

  DetailPengeluaran.associate = function(models) {
    DetailPengeluaran.belongsTo(models.pengeluaran);
  };

  return DetailPengeluaran;
};