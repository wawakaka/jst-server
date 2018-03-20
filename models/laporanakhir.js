module.exports = (sequelize, DataTypes) => {

  const LaporanAkhir = sequelize.define(
      'laporan_akhir',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        rekomendasi: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
        tableName: 'laporan_akhir',
        underscored: true,
      },
  );

  LaporanAkhir.associate = models => {
    LaporanAkhir.belongsTo(models.siswa);
  };

  return LaporanAkhir;
};