const dotenv = require("dotenv");
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

        // Buscamos que haya una mesa disponible en la fecha y hora seleccionada
        const usefullTables = await Table.findAll({
            where: {
                seller_id: req.body.seller_id,
                table_size: req.body.table_size
            }
        });


        let findedTable = false;
        for (let i = 0; i < usefullTables.length; i++) {

            if (findedTable) {
                break;
            }

            let bookedTable = await BookedTable.findOne({
                where: {
                    table_id: usefullTables[i].id,
                    booked_date: new Date(req.body.date),
                    booked_time_id: req.body.hour_id
                }
            }).then(bookedTable => {

                console.log(bookedTable);

                if (!bookedTable) {
                    findedTable = true;
                    let date = new Date(req.body.date);
                    date.setDate(date.getDate() + 1);

                    console.log(date);
                }
            })
            if (findedTable) {

                // Date format
                

                // Si todo está bien, creamos la reserva
                await BookedTable.create({
                    user_id: req.body.user_id,
                    table_id: usefullTables[i].id,
                    booked_date: date,
                    booked_time_id: req.body.hour_id
                }).then(bookedTable => {
                    res.status(201).json({bookedTable: bookedTable});
                }).catch(error => {
                    console.log(error);
                    res.status(500).json({
                        error: "Error al crear la reserva"
                    });
                })
                }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear la reserva"
        });
    }
}
  

// Obtenemos todos los horarios y tamaños de mesas DISPONIBLES para la fecha seleccionada
const getAvailableTables = async (req, res) => {
    // Input: date (format: dd/mm/yyyy), tableSize (1, 2, 3...), restaurantId
    // Output: json of hour, hour_id, and boolean (true if available)

    try {
        // Check if the restaurant exists
        const restaurant = await Seller.findOne({
            where: { id: req.params.seller_id }
        });
        if (!restaurant) {
            return res.status(404).send({
                message: "Restaurant not found"
            });
        } 
        
        const usefullTables = await Table.findAll({
            where: {
                seller_id: req.params.seller_id,
                table_size: req.params.tableSize
            }
            });
        if (!usefullTables) {
            return res.status(404).send({
                message: "No tables with this size"
            });
        } 
        
        else {
            let output = {};

            const hours = await BookedTime.findAll()


            for (let i = 0; i < Object.keys(hours).length; i++) {
                
                let available = [];
                for (let j = 0; j < Object.keys(usefullTables).length; j++) {

                    let bookedTable = await BookedTable.findOne({
                        where: {
                            table_id: usefullTables[j].id,
                            booked_time_id: hours[i].id,
                            booked_date: req.params.date
                        }
                    }).then(bookedTable => {
                        if (!bookedTable) {
                            console.log('##############');
                            console.log(bookedTable);
                            console.log(usefullTables[j].id)
                            console.log('##############');
                            available.push(usefullTables[j].id) 
                        }
                    }).catch(err => {
                        console.log(err);
                    }
                    );
                }

                output[hours[i].id] = {
                    hour: `${hours[i].start_time}-${hours[i].end_time}`,                
                    available: available.length > 0,
                    tables: available
                }
            }

            res.status(200).json({tables: output});
            
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al obtener las mesas disponibles"
        });
    };
};


// Cancelar reserva
const cancelBooking = async (req, res) => {
    // dont do nothing yet
    next();
}


module.exports = {
    getAvailableTables,
    newBooking,
}
