const dotenv = require("dotenv");
const moment = require('moment');
const { User, Seller, BookedTable, BookedTime, Table } = require("../models");

dotenv.config();


// Nueva reserva de mesa
const newBooking = async (req, res) => {
    console.log(req.body);

    try {
        // Vemos que el usuario exista en la base de datos
        const user = await User.findOne({
            where: { id: req.body.user_id },
        });

        if (!user) {
            return res.status(400).json({
                error: "El usuario no existe"
            });
        } else {
            console.log('ok user');
        }

        // Vemos que el vendedor exista en la base de datos
        const seller = await Seller.findOne({
            where: { id: req.body.seller_id },
        });

        if (!seller) {
            return res.status(400).json({
                error: "El vendedor no existe"
            });
        } else {
            console.log('ok sellers');
        }

        // Vemos que la fecha de la reserva sea mayor a la fecha actual
        const date = new Date(req.body.date);
        const today = new Date();
        if (date < today) {
            return res.status(400).json({
                error: "La fecha de la reserva no puede ser anterior a la fecha actual"
            });
        } else {
            console.log('ok date');
        }

        // Vemos que el id de la hora de la reserva exista en la base de datos
        const time = await BookedTime.findOne({
            where: { id: req.body.hour_id }
        });

        if (!time) {
            return res.status(400).json({
                error: "La hora de la reserva no existe"
            });
        } else {
            console.log('ok time');
        }  

        // Buscamos una mesa disponible con aquellas características
        const availableTable = await BookedTable.findOne({
            where: {
                booked_time_id: time.id,
                booked_date: moment(req.body.date).format('YYYY-MM-DD'),
                is_booked: false
            },
            include: [{
                model: Table,
                as: 'table',
                attributes: ['id', 'table_size'],
                where: {
                    table_size: req.body.table_size,
                    seller_id: req.body.seller_id
                }
            }]
        });

        if (!availableTable) {
            return res.status(400).json({
                message: "No hay mesas disponibles"
            });
        }

        const newBook = await BookedTable.update({
            is_booked: 'true',
            user_id: req.body.user_id},
            {where: {id: availableTable.id}
        }).then(() => {
            return res.status(200).json({
                message: "La reserva se ha realizado correctamente"
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: "Error al realizar la reserva"
        });
    }
}
        

const  getAvailableTables = async (req, res) => {
    console.log(req.params);

    try {
        // Check if the seller exists
        const seller = await Seller.findOne({
            where: { id: req.params.seller_id },
        });
        if (!seller) {
            return res.status(400).json({
                error: "El vendedor no existe"
            });
        } else {
            console.log('ok seller');
        }

        // Check if the table size exists
        const tableSize = await Table.findOne({
            where: { 
                table_size: req.params.tableSize,
                seller_id: req.params.seller_id
            }
        });
        if (!tableSize) {
            return res.status(400).json({
                error: `El tamaño ${req.params.tableSize} no existe para el vendedor`
            });
        } else {
            console.log('ok table size');
        }

        const date = new Date(req.params.date);

        console.log(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1));
        const tables_available = await BookedTable.findAll({
            where: {
                booked_date: moment(req.params.date).format('YYYY-MM-DD'),
                is_booked: false,   
            },
            include: [{
                model: Table,
                as: 'table',
                attributes: ['id', 'table_size'],
                where: {
                    table_size: req.params.tableSize,
                    seller_id: req.params.seller_id
                }
            }, {
                model: BookedTime,
                as: 'booked_time',
                attributes: ['id', 'start_time', 'end_time']
            }]
        }).then(tables => {

            let output = {}
            tables.forEach(row => {
                try {
                    output[row.booked_time_id]['availables'] += 1;
                } catch (error) {
                    output[row.booked_time_id] = {
                        'availables': 1,
                        'time': row.booked_time.start_time + '-' + row.booked_time.end_time
                    }
                }
            });
            return res.status(200).json(output);
        });      
    } catch (error) {
        console.log(error);
    }
}

const getMyBookings = async (req, res) => {

    try {
        const user = await User.findOne({
            where: { id: req.params.user_id },
        });
        if (!user) {
            return res.status(400).json({
                error: "El usuario no existe"
            });
        } else {
            console.log('ok user');
        }

        const bookings = await BookedTable.findAll({
            where: {
                user_id: req.params.user_id,
            },
            include: [{
                model: BookedTime,
                as: 'booked_time',
                attributes: ['id', 'start_time', 'end_time']
            }, {
                model: Table,
                as: 'table',
                attributes: ['id', 'table_size'],
                include: [{
                    model: Seller,
                    as: 'seller',
                    attributes: ['id', 'name']
                }]
            }]
        }).then(tables => {
            return res.status(200).json(tables);
        }
        );
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    newBooking,
    getAvailableTables,
    getMyBookings
}
