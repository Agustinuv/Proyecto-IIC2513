'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('BookedTimes', [{
      start_time: '10',
      end_time: '11',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      start_time: '11',
      end_time: '12',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      start_time: '12',
      end_time: '13',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      start_time: '13',
      end_time: '14',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      start_time: '14',
      end_time: '15',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      start_time: '15',
      end_time: '16',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      start_time: '16',
      end_time: '17',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      start_time: '17',
      end_time: '18',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      start_time: '18',
      end_time: '19',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      start_time: '19',
      end_time: '20',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BookedTimes', null, {});
  }
};
