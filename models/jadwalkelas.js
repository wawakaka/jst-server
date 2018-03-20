module.exports = (sequelize, DataTypes) => {

  const JadwalKelas = sequelize.define(
      'jadwal_kelas',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        tanggal: DataTypes.DATE,
      },
      {
        freezeTableName: true,
        tableName: 'jadwal_kelas',
        underscored: true,
      },
  );

  JadwalKelas.associate = models => {
    JadwalKelas.hasMany(models.kegiatan);
    JadwalKelas.hasOne(models.tes_harian);
    JadwalKelas.belongsTo(models.kelas);
    JadwalKelas.belongsToMany(models.siswa, {through: 'presensi'});
  };

  return JadwalKelas;
};