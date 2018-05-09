module.exports = (sequelize, DataTypes) => {

  const Bidang = sequelize.define(
      'bidang',
      {
        nama: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
        tableName: 'bidang',
        underscored: true,
      },
  );

  Bidang.associate = models => {
    Bidang.belongsToMany(models.user, {through: 'bidang_user'});
  };

  return Bidang;
};