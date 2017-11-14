'use strict';

module.exports = function(sequelize, DataTypes) {

  var Sekolah = sequelize.define(
      'sekolah',
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
        },
        nama: {
          type: DataTypes.STRING,
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
    Sekolah.hasMany(models.siswa);
    Sekolah.belongsToMany(models.kelas, {through: 'kelas_sekolah'});
  };

  return Sekolah;
};