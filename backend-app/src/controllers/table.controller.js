const dotenv = require("dotenv");
const { Seller, Table } = require("../models");
dotenv.config();




const newTable = async (req, res) => {

    try {
        // Validamos que el input no esté vacío
        if (!req.body.table_size) {
            return res.status(400).json({
                error: "Tamaño de mesa vacío"
            });
        }

        // Validamos que el usuario vendedor exista en la base de datos
        const seller = await Seller.findOne({
            where: { id: req.body.seller_id },
        });

        if (!seller) {
            return res.status(400).json({
                error: "El usuario vendedor no existe"
            });
        }

        // Si todo está bien, creamos la mesa
        else {
            const table = await Table.create({
                seller_id: req.body.seller_id,
                table_size: req.body.table_size
            }).then(table => {
                res.status(201).json({table: table});
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear la mesa"
        });
    }
};

const dropTable = async (req, res) => {

    try {
        // Validamos que exista la mesa en la base de datos
        const table = await Table.findOne({
            where: { id: req.params.table_id },
        });

        if (!table) {
            return res.status(400).json({
                error: "La mesa no existe"
            });
        }

        // Si todo está bien, eliminamos la mesa
        else {
            await Table.destroy({
                where: { id: req.params.table_id },
            }).then(table => {
                res.status(200).json({table: table});
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al eliminar la mesa"
        });
    }
};

const getTables = async (req, res) => {

    try {
        // Validamos que el usuario vendedor exista en la base de datos
        const seller = await Seller.findOne({
            where: { id: req.params.seller_id },
        });
        
        if (!seller) {
            return res.status(400).json({
                error: "El usuario vendedor no existe"
            });
        }

        // Si todo está bien, obtenemos las mesas
        else {
            const tables = await Table.findAll({
                where: { seller_id: req.params.seller_id }
            }).then(tables => {
                res.status(200).json({tables: tables});
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al obtener las mesas"
        });
    }
};

const getTablesSizes = async (req, res) => {
    
    try {
        // Validamos que el usuario vendedor exista en la base de datos
        const seller = await Seller.findOne({
            where: { id: req.params.seller_id },
        });
        
        if (!seller) {
            return res.status(400).json({
                error: "El usuario vendedor no existe"
            });
        }

        // Si todo está bien, obtenemos las mesas
        else {
            const tables = await Table.findAll({
                where: { seller_id: req.params.seller_id }
            }).then(tables => {
                const table_sizes = [...new Set(tables.map(item => item.table_size))].sort();

                res.status(200).json({table_sizes: table_sizes});
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al obtener las mesas"
        });
    }
};




module.exports = {
    newTable,
    dropTable,
    getTables,
    getTablesSizes
};