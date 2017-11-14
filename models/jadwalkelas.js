'use strict';

module.exports = function(sequelize, DataTypes) {

  var JadwalKelas = sequelize.define(
      'jadwal_kelas',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        tanggal: DataTypes.DATE,
      },
      {
        freezeTableName: true,
        tableName: 'jadwal_kelas',
        underscored: true,
      }
  );

  JadwalKelas.associate = function(models) {
    JadwalKelas.hasOne(models.tes_harian);
    JadwalKelas.belongsTo(models.kelas);
    JadwalKelas.belongsToMany(models.siswa, {through: 'presensi'});
  };

  return JadwalKelas;
};