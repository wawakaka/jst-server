'use strict';

module.exports = function(sequelize, DataTypes) {

  var LaporanAkhir = sequelize.define(
      'laporan_akhir',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        rekomendasi: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
        tableName: 'laporan_akhir',
        underscored: true,
      }
  );

  LaporanAkhir.associate = function(models) {
    LaporanAkhir.belongsTo(models.siswa);
  };

  return LaporanAkhir;
};