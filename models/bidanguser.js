module.exports = (sequelize, DataTypes) => {

  const BidangUser = sequelize.define(
      'bidang_user',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        freezeTableName: true,
        tableName: 'bidang_user',
        underscored: true,
      },
  );

  BidangUser.associate = models => {
    BidangUser.hasMany(models.kelas, {as: 'list_kelas'});
  };

  return BidangUser;
};