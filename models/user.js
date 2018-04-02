module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define(
      'user',
      {
        email: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        nama: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        token: {
          type: DataTypes.STRING,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
        },
        is_super_user: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
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
        tableName: 'user',
        underscored: true,
      },
  );

  User.findByToken = (token, cb) => {
    process.nextTick(() => {
      User.findAll({
        where: {
          token,
        },
      }).then(s => cb(null, s)).catch(err => {
        console.log(err);
      });
    });
  };

  User.associate = models => {
    User.hasMany(models.kelas, {as: 'list_kelas'});
    User.hasMany(models.pengeluaran);
  };

  return User;
};