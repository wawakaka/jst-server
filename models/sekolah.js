module.exports = (sequelize, DataTypes) => {

  const Sekolah = sequelize.define(
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
      },
  );

  Sekolah.associate = models => {
    Sekolah.hasMany(models.siswa, {as: 'list_siswa'});
    Sekolah.hasMany(models.event);
  };

  return Sekolah;
};