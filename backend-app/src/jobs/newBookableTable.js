const dotenv = require("dotenv");
const moment = require('moment');
const { BookedTable, BookedTime, Table } = require("../models");
dotenv.config();
const schedule = require('node-schedule');
const Sequelize = require('sequelize');

const newBookableTable = () => {
    schedule.scheduleJob(`30 30 2 * * * `, function(){
        console.log('Creating new bookable table');
        CreateBookData();
    });
}



const CreateBookData = async (data) => {
    const currentDate = new Date();

    await BookedTable.findAll({
        attributes: [[ Sequelize.fn('MAX', Sequelize.col('booked_date')), 'max_booked_date' ]],
    }).then(async (table) => {
        let max_booked_date = table[0].dataValues.max_booked_date;
        let new_day = moment(max_booked_date).add(1, 'days').format('YYYY-MM-DD');
        
        const nextWeek = new Date(new_day);
        
        const bookTime = await BookedTime.findAll();
        const tables = await Table.findAll();

        console.log(max_booked_date);
        console.log(nextWeek);
        
        for (let i = 0; i < bookTime.length; i++) {
            for (let j = 0; j < tables.length; j++) {
                let table_id = tables[j].id;
                let booked_time_id = bookTime[i].id;
                let booked_date = nextWeek;
        
                try {
                    const bookedTable = await BookedTable.create({
                        table_id: table_id,
                        booked_time_id: booked_time_id,
                        booked_date: booked_date
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    });
};



module.exports = newBookableTable;