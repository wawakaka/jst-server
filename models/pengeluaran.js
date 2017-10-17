'use strict';

module.exports = function(sequelize, DataTypes) {

  var Pengeluaran = sequelize.define('Pengeluaran', {
    idPengeluaran: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  Pengeluaran.associate = function(models) {
    Pengeluaran.hasMany(models.DetailPengeluaran, {as: 'detailPengeluaran'});
    Pengeluaran.belongsTo(models.User);
  };

  return Pengeluaran;
};