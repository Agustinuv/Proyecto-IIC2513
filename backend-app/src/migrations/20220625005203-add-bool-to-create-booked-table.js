'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.addColumn('BookedTables', 
      'is_booked', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      await queryInterface.changeColumn('BookedTables',
      'user_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
      })
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
