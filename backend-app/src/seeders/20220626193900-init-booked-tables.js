'use strict';
const { BookedTable, BookedTime, Table } = require("../models");
const create_n_days = 8;

module.exports = {
  
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('BookedTables', null, {});
    const currentDate = new Date();

    for (let k = 0; k <= create_n_days; k++) {

      let date = new Date( currentDate.getTime() + (k * 24 * 60 * 60 * 1000) );

      let date_format = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    
      const bookTime = await BookedTime.findAll();
      const tables   = await Table.findAll();
    
      for (let i = 0; i < bookTime.length; i++) {
        for (let j = 0; j < tables.length; j++) {
          let table_id = tables[j].id;
          let booked_time_id = bookTime[i].id;
  
          try {
            const bookedTable = await BookedTable.create({
              table_id: table_id,
              booked_time_id: booked_time_id,
              booked_date: date_format,
              is_booked: false
            })
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BookedTables', null, {});
  }
};
