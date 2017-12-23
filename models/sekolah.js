'use strict';

module.exports = function(sequelize, DataTypes) {

  var Sekolah = sequelize.define(
      'sekolah',
      {
        nama: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
        tableName: 'sekolah',
        underscored: true,
      }
  );

  Sekolah.associate = function(models) {
    Sekolah.hasMany(models.siswa, {as: 'list_siswa'});
    Sekolah.hasMany(models.kelas, {as: 'list_kelas'});
  };

  return Sekolah;
};