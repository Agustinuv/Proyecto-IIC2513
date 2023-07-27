'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Comments', [{
      user_id: 1,
      seller_id: 1,
      commentary: 'Buen vendedor',
      score: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 2,
      seller_id: 1,
      commentary: 'Mal vendedor',
      score: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};