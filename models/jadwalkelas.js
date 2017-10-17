'use strict';
module.exports = function(sequelize, DataTypes) {
  var JadwalKelas = sequelize.define('JadwalKelas', {
    idJadwalKelas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tanggal: DataTypes.DATE,
  });
  JadwalKelas.associate = function(models) {
    JadwalKelas.hasOne(models.TesHarian);
    JadwalKelas.belongsTo(models.Kelas);
    JadwalKelas.belongsToMany(models.Siswa, {through: 'Presensi'});
  };
  return JadwalKelas;
};