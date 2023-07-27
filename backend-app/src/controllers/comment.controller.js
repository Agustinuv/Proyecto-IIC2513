const dotenv = require("dotenv");
const { Comment, User, Seller, sequelize } = require("../models");
dotenv.config();

// const jwt = require("jsonwebtoken");
// const authConfig = require('../config/token');


const { validateComment, validateScore }= require("../utils/comments");

const newComment = async (req, res) => {
    console.log(req.body);
    try {
        // Validamos que el input no esté vacío
        if (!validateComment(req.body.comment)) {
            return res.status(400).json({
                error: "Comentario vacío"
            });
        }
        // Validamos que el score sea un número
        else if (!validateScore(req.body.score)) {
            return res.status(400).json({
                error: "Score inválido"
            });
        }
        // Validamos que el usuario vendedor y comentador existan en la base de datos
        const seller = await Seller.findOne({
            where: { id: req.body.seller_id },
        });
        const user = await User.findOne({
            where: { id: req.body.user_id },
        });
        
        if (!user) {
            return res.status(400).json({
                error: "El usuario comentador no existe"
            });
        }
        else if (!seller) {
            return res.status(400).json({
                error: "El usuario vendedor no existe"
            });
        }
        // Si todo está bien, creamos el comentario
        else {
            const comment = await Comment.create({
                commentary: req.body.comment,
                score: req.body.score,
                user_id: req.body.user_id,
                seller_id: req.body.seller_id
            }).then(comment => {
                res.status(201).json({comment: comment});
            });
        }
    } catch (error) {
        console.log(error);
        // console.log(error);
        res.status(500).json({
            error: "Error al crear el comentario"
        });

    }
};

const editComment = async (req, res) => {
    try {
        // Validamos que el nuevo input no esté vacío
        if (!validateComment(req.body.comment)) {
            return res.status(400).json({
                error: "Comentario vacío"
            });
        }
        // Validamos que se nos indique el id del comentario a editar
        else if (!req.body.id) {
            return res.status(400).json({
                error: "No se ha indicado el id del comentario"
            });
        }
        // Validamos que el nuevo score sea un número
        else if (!validateScore(req.body.score)) {
            return res.status(400).json({
                error: "Score inválido"
            });
        }

        // Vemos que el comentario exista en la base de datos
        let comment = await Comment.findOne({
            where: { id: req.body.id }
        });

        console.log(comment);

        // Vemos que coincidan los id del comentario el del usuario y el del vendedor
        if (req.body.user_id !== comment.user_id || req.body.seller_id !== comment.seller_id) {
            return res.status(400).json({
                error: "El comentario no coincide al id del vendedor o al del usuario entregado"
            });
        }
        // Si todo está bien, editamos el comentario
        else {
            comment = await Comment.update({
                commentary: req.body.comment,
                score: req.body.score,
            }, {
                where: { id: req.body.id }
            }).then(comment => {
                comment
                    res.status(200).json({comment: comment});
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Error al editar el comentario"
        });
    }
};

const deleteComment = async (req, res) => {
    try {
        // Validamos que se nos indique el id del comentario a eliminar
        if (!req.params.comment_id) {
            return res.status(400).json({
                error: "No se ha indicado el id del comentario"
            });
        }
        // Vemos que el comentario exista en la base de datos
        const comment = await Comment.findOne({
            where: { id: req.params.comment_id }
        });
        if (!comment) {
            return res.status(400).json({
                error: "El comentario no existe"
            });
        }
        // Si todo está bien, eliminamos el comentario
        else {
            const comment = await Comment.destroy({
                where: { id: req.params.comment_id }
            }).then(comment => {
                res.status(200).json({comment: comment});
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el comentario"
        });
    }
};

// Retorna todos los comentarios hechos a un vendedor
const getComments = async (req, res) => {
    try {
        // Validamos que el id del vendedor exista en la base de datos
        const seller = await Seller.findOne({
            where: { id: req.params.seller_id },
        });
        if (!seller) {
            return res.status(400).json({
                error: "El vendedor no existe"
            });
        }
        // Si todo está bien, obtenemos los comentarios
        else {
            const comments = await Comment.findAll({
                where: { seller_id: req.params.seller_id },
                include: [{
                    model: User,
                    as: "user"
                }]
            }).then(comments => {
                res.status(200).json({comments: comments});
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al obtener los comentarios"
        });
    }
};

const getComment = async (req, res) => {
    console.log(req.params)
    try {
        // Validamos que el id del comentario exista en la base de datos
        const comment = await Comment.findOne({
            where: { id: req.params.comment_id }
        });
        if (!comment) {
            return res.status(400).json({
                error: "El comentario no existe"
            });
        }
        // Si todo está bien, obtenemos el comentario
        else {
            const comment = await Comment.findOne({
                where: { id: req.params.comment_id }
            }).then(comment => {
                res.status(200).json({comment: comment});
            });
        }
    } catch (error) {
        console.log('ERROR: ', error);
        res.status(500).json({
            error: "Error al obtener el comentario"
        });
    }
};


module.exports = {
    newComment,
    editComment,
    deleteComment,
    getComments,
    getComment
};