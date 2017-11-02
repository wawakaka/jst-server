'use strict';

module.exports = function(sequelize, DataTypes) {

  var Kelas = sequelize.define('Kelas', {
    idKelas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  Kelas.associate = function(models) {
    Kelas.belongsTo(models.User);
    Kelas.belongsTo(models.Bidang);
    Kelas.hasMany(models.JadwalKelas, {as: 'jadwalKelas'});
    Kelas.hasMany(models.Siswa, {as: 'siswa'});
    Kelas.belongsToMany(models.Sekolah, {through: 'KelasSekolah'});
  };

  return Kelas;
};