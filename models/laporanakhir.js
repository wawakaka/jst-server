'use strict';

module.exports = function(sequelize, DataTypes) {

  var LaporanAkhir = sequelize.define('LaporanAkhir', {
    idLaporanAkhir: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rekomendasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  LaporanAkhir.associate = function(models) {
    LaporanAkhir.belongsTo(models.Siswa);
  };

  return LaporanAkhir;
};