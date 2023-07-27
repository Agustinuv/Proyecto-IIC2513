'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookedTable extends Model {

    static associate(models) {
      // define association here
      BookedTable.belongsTo(models.Table, {
        as: 'table',
        foreignKey: 'table_id',
        });
      BookedTable.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id',
       });
      BookedTable.belongsTo(models.BookedTime, {
        as: 'booked_time',
        foreignKey: 'booked_time_id',
      });
    }
  }
  BookedTable.init({
    table_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    booked_time_id: DataTypes.INTEGER,
    booked_date: DataTypes.DATE,
    is_booked: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'BookedTable',
  });
  return BookedTable;
};