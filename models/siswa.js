'use strict';

module.exports = function(sequelize, DataTypes) {

  var Siswa = sequelize.define('Siswa', {
    idSiswa: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    namaSiswa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kelas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });

  Siswa.associate = function(models) {
    Siswa.hasOne(models.LaporanAkhir, {as: 'laporanAkhir'});
    Siswa.hasMany(models.HasilTesHarian, {as: 'hasilTesHarian'});
    Siswa.belongsTo(models.Sekolah);
    Siswa.belongsTo(models.Kelas);
    Siswa.belongsToMany(models.JadwalKelas, {through: 'Presensi'});
  };

  return Siswa;
};