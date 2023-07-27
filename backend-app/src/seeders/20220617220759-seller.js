'use strict';
const bcrypt = require('bcrypt');
const authConfig = require('../config/token');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Sellers', [{
      name: 'Panino fritto wurstel patatine',
      mail: 'panino@uc.cl',
      password: await bcrypt.hash(
        '123456',
        Number.parseInt(authConfig.rounds)
      ),
      location: 'Casino agronomía',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'LaBurga',
      mail: 'laburga@uc.cl',
      password: await bcrypt.hash(
        '123456',
        Number.parseInt(authConfig.rounds)
      ),
      location: 'Las K',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
