'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sellerid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Sellers',
          key: 'id'
        }
      },
      details: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      has_img: {
        type: Sequelize.BOOLEAN
      },
      img_url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plates');
  }
};