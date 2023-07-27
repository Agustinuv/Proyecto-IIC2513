'use strict';
const bcrypt = require('bcrypt');
const authConfig = require('../config/token');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      fullName: 'John Doe',
      userName: 'johndoe',
      mail: 'test1@uc.cl',
      password: await bcrypt.hash(
        '123456',
        Number.parseInt(authConfig.rounds)
      ),
      moderator: false,
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: 'John Doe2',
      userName: 'johndoe2',
      mail: 'admin1@uc.cl',
      password: await bcrypt.hash(
        '123456',
        Number.parseInt(authConfig.rounds)
      ),
      moderator: false,
      admin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: 'John Doe3',
      userName: 'johndoe3',
      mail: 'moderator1@uc.cl',
      password: await bcrypt.hash(
        '123456',
        Number.parseInt(authConfig.rounds)
      ),
      moderator: true,
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
