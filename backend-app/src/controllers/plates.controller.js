const dotenv = require("dotenv");
const { Plate } = require("../models");
dotenv.config();
const authConfig = require('../config/token');

const { validatePlatesBody, validateImage } = require("../utils/plates");

const getAllPlates = async (req, res) => {
    try {
        const plates = await Plate.findAll(
            {where: {sellerid: req.params.sellerid}}
        );
        res.status(200).json(plates);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}

const getPlate = async (req, res) => {
    try {
        const plate = await Plate.findOne({
            where: { id: req.params.plateid }
        });
        if (!plate) {
            res.status(400).json({ error: "El plato no existe" });
        } else {
        res.status(200).json({
            name: plate.name,
            details: plate.details,
            price: plate.price,
            image: plate.image,
            sellerid: plate.sellerid,
            img_url: plate.img_url
        });
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

const createPlate = async (req, res) => {
    try {

        if (!validatePlatesBody(req.body)) {
            res.status(400).json({ error: "El plato no es válido" });
        } else if (!validateImage(req.body)) {
            res.status(400).json({ error: "La imagen no es válida" });
        }
        const plate = await Plate.create({
            name: req.body.name,
            details: req.body.details,
            price: req.body.price,
            has_img: req.body.has_img,
            img_url: req.body.img_url,
            sellerid: req.body.sellerid
        });
        res.status(201).json(plate);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}

const updatePlate = async (req, res) => {
    try {
        const update_info = {
            name: req.body.name,
            details: req.body.details,
            price: req.body.price,
            has_img: req.body.has_img,
            image: req.body.img_url,
        };
        await Plate.update(
            update_info, {
            where: { id: req.params.plateid }
        });
        res.status(200).json(update_info);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}

const deletePlate = async (req, res) => {
    try {
        const plate = await Plate.destroy({
            where: { id: req.params.plateid }
        });
        res.status(200).json({message: "Plato eliminado"});
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}

module.exports = {
    getAllPlates,
    getPlate,
    createPlate,
    updatePlate,
    deletePlate
}