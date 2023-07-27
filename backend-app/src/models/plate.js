'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Seller, {
        as: 'seller',
        foreignKey: 'sellerid'
      });
    }
  }
  Plate.init({
    details: DataTypes.STRING,
    price: DataTypes.INTEGER,
    name: DataTypes.STRING,
    has_img: DataTypes.BOOLEAN,
    img_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Plate',
  });
  return Plate;
};