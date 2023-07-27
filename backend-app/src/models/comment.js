'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id',
       });
      Comment.belongsTo(models.Seller, {
        as: 'seller',
        foreignKey: 'seller_id',
      });

    }
  }
  Comment.init({
    user_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    commentary: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};