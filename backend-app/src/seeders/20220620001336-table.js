'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tables', [{
      seller_id: 1,
      table_size: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      seller_id: 1,
      table_size: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      seller_id: 1,
      table_size: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      seller_id: 1,
      table_size: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      seller_id: 2,
      table_size: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tables', null, {});
  }
};
