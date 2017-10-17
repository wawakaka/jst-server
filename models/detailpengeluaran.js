'use strict';
module.exports = function(sequelize, DataTypes) {
  var DetailPengeluaran = sequelize.define('DetailPengeluaran', {
    idDetailPengeluaran: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    namaBarang: DataTypes.STRING,
    biaya: DataTypes.INTEGER,
    keterangan: DataTypes.TEXT,
    gambar: DataTypes.STRING,
    tanggal: {
      type: Sequelize.DATE, defaultValue: Sequelize.NOW,
    },
  });
  DetailPengeluaran.associate = function(models) {
    DetailPengeluaran.belongsTo(models.Pengeluaran);
  };
  return DetailPengeluaran;
};