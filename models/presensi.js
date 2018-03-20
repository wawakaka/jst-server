module.exports = (sequelize, DataTypes) => {

  const Presensi = sequelize.define(
      'presensi',
      {},
      {
        freezeTableName: true,
        tableName: 'presensi',
        underscored: true,
      },
  );

  return Presensi;
};