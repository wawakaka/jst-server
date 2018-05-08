module.exports = (sequelize, DataTypes) => {

  const Kelas = sequelize.define(
      'kelas',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
        tableName: 'kelas',
        underscored: true,
      },
  );

  Kelas.associate = models => {
    Kelas.belongsTo(models.user);
    Kelas.belongsTo(models.event);
    Kelas.belongsTo(models.bidang);
    Kelas.hasMany(models.jadwal_kelas, {as: 'jadwal_kelas'});
    Kelas.hasMany(models.siswa, {as: 'list_siswa'});
  };

  return Kelas;
};