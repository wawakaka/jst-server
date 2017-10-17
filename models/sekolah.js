'use strict';

module.exports = function(sequelize, DataTypes) {

  var Sekolah = sequelize.define('Sekolah', {
    idSekolah: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    namaSekolah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Sekolah.associate = function(models) {
    Sekolah.hasMany(models.Siswa, {as: 'siswa'});
    Sekolah.belongsToMany(models.Kelas, {through: 'KelasSekolah'});
  };

  return Sekolah;
};