const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { User } = require("../models");
dotenv.config();
const authConfig = require('../config/token');

const { validateAddUserNames, validateEmail, validatePasswordLength, generateAccessToken }= require("../utils/users");

//Sign in user
const signIn = async (req, res) => {
    try {
        // Validamos los inputs ingresados
        if (!validateAddUserNames(req.body)) {
            return res.status(400).json({
                error: "Nombre o usuario inválido"
            });
        }
        else if (!validateEmail(req.body.mail)) {
            return res.status(400).json({
                error: "Email inválido"
            });
        }
        else if (!validatePasswordLength(req.body.password)) {
            return res.status(400).json({
                error: "Contraseña demasiado corta"
            });
        }

        // Ver si ambas contraseñas son iguales
        if (req.body.password === req.body.passwordConfirmation) {
            const existingUser = await User.findOne({
            where: { mail: req.body.mail },
        });

        // Ver si usuario ya existe
        if (existingUser) {
          res.status(400).json({ error: "Ya existe un usuario con ese mail" });
        } else {
            // Si no, lo creamos
            const hashedPassword = await bcrypt.hash(
            req.body.password,
            Number.parseInt(authConfig.rounds)
          );
            const user = await User.create({
            fullName: req.body.fullName,
            userName: req.body.userName,
            password: hashedPassword,
            mail: req.body.mail,
            moderator: false,
            admin: false
          }).then(user => {
              let token = generateAccessToken(user.userName);
              res.status(201)
              .json({ 
                userid: user.id,
                username: user.userName,
                mail: user.mail,
                token: token
              });
            });
            // Devolvemos status creado y el usuario
            
        }
      } else {
        res.status(400).json({ error: "Contraseñas no coinciden" });
      }
    // Devolvemos si hay un error
    } catch (e) {
      res.status(400).json({ error: e });
    }
}

//Login user
const logIn = async (req, res) => {
    try {
      const user = await User.findOne({
        where: { mail: req.body.mail },
      });
      if (!user) {
        res.status(400).json({ error: "El usuario no existe" });
      } else {
        const result = bcrypt.compareSync(req.body.password, user.password);
        if (result) {
          const token = generateAccessToken(user.userName);
          // Devolvemos status 200 y el token en el header
          res.status(200)
          .json({ 
            userid: user.id,
            username: user.userName,
            mail: user.mail,
            token: token
          });
        } else {
          res.status(400).json({ error: "El usuario y la contraseña no coinciden" });
          }
      }
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }

  //Logout user
  const logOut = (req, res) => {
    return res.clearCookie("user").status(200).json({ 
      message: "Cierre de sesión exitoso" 
    });
  }

  //Delete user
  const deleteUser = async (req, res) => {
    try {
      const user = await User.findOne({
        where: { id: req.params.userid },
      });
      if (!user) {
        res.status(400).json({ error: "El usuario no existe" });
      } else {
        await user.destroy().then(user => {
          res.clearCookie("user").status(200).json({ message: "Usuario eliminado" });
        });
      }
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }

  //Update user information, not password
  const updateUser = async (req, res) => {
    try {
      const user = await User.findOne({
        where: { id: req.params.userid },
      });
      if (!user) {
        res.status(400).json({ error: "El usuario no existe" });
      } else if (!validateAddUserNames(req.body) || !validateEmail(req.body.mail)) {
        res.status(400).json({ error: "Datos inválidos" });
      } else if (req.body.password !== req.body.passwordConfirmation) {
        res.status(400).json({ error: "Contraseñas no coinciden" }); 
      } else {
        const update_info = {
          fullName: req.body.fullName,
          userName: req.body.userName,
          mail: req.body.mail
        };
        // Revisamos si hay contraseña
        if (req.body.password) {
          // Confirmamos contraseña
          if (req.body.password !== req.body.passwordConfirmation) {
            return res.status(400).json({ error: "Contraseñas no coinciden" });
          } else {
            // Vemos si la contraseña es válida
            const result = bcrypt.compareSync(req.body.oldPassword, user.password);
            if (result) {
              const hashedPassword = await bcrypt.hash(
                req.body.password,
                Number.parseInt(authConfig.rounds)
              );
              update_info.password = hashedPassword;
            }
            else {
              return res.status(400).json({ error: "Contraseña antigua no válida" });
            }
          }
        }
        await User.update(update_info, {where: {id: req.params.userid}}).then(user => {
          res.status(200).json(update_info);
        });
      }
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }
  
const getUser = async (req, res) => {
    try {
      const user = await User.findOne({
        where: { id: req.params.userid },
      });
      if (!user) {
        res.status(400).json({ error: "El usuario no existe" });
      } else {
        res.status(200).json({
          fullname: user.fullName,
          username: user.userName,
          mail: user.mail,
          moderator: user.moderator,
          admin: user.admin});
      }
    } catch (e) {
      res.status(404).json({ error: e });
    }
  }        

module.exports = { 
    signIn,
    logIn,
    logOut,
    deleteUser,
    updateUser,
    getUser
};