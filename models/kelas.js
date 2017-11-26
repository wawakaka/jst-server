'use strict';

module.exports = function(sequelize, DataTypes) {

  var Kelas = sequelize.define(
      'kelas',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        is_private: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
        tableName: 'kelas',
        underscored: true,
      }
  );

  Kelas.associate = function(models) {
    Kelas.belongsTo(models.user);
    Kelas.belongsTo(models.bidang);
    Kelas.hasMany(models.jadwal_kelas, {as: 'jadwal_kelas'});
    Kelas.hasMany(models.siswa, {as: 'list_siswa'});
    Kelas.belongsTo(models.sekolah);
  };

  return Kelas;
};