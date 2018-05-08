module.exports = (sequelize, DataTypes) => {

  const Event = sequelize.define(
      'event',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        tanggal_mulai: {
          type: DataTypes.DATE, defaultValue: DataTypes.NOW,
        },
        tanggal_selesai: {
          type: DataTypes.DATE, defaultValue: DataTypes.NOW,
        },
      },
      {
        freezeTableName: true,
        tableName: 'event',
        underscored: true,
      },
  );

  Event.associate = models => {
    Event.hasMany(models.kelas, {as: 'list_kelas'});
    Event.hasMany(models.pengeluaran, {as: 'list_pengeluaran'});
    Event.belongsTo(models.sekolah);
  };

  return Event;
};