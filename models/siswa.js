module.exports = (sequelize, DataTypes) => {

  const Siswa = sequelize.define(
      'siswa',
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
        kelas: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
        tableName: 'siswa',
        underscored: true,
      },
  );

  Siswa.associate = models => {
    Siswa.hasOne(models.laporan_akhir);
    Siswa.hasMany(models.hasil_tes_harian, {as: 'hasil_tes_harian'});
    Siswa.belongsTo(models.sekolah);
    Siswa.belongsToMany(models.jadwal_kelas, {through: 'presensi'});
  };

  return Siswa;
};