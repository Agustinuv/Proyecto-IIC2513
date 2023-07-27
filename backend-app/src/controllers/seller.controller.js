const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { Seller } = require("../models");
dotenv.config();

const jwt = require("jsonwebtoken");
const authConfig = require('../config/token');


const { validateAddSellerNames, validateEmail, validatePasswordLength, generateAccessToken }= require("../utils/users");

//Sign in seller
const signIn = async (req, res) => {
    try {
        // Validamos los inputs ingresados
        if (!validateAddSellerNames(req.body)) {
            return res.status(400).json({
                error: "Nombre inválido"
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
            const existingSeller = await Seller.findOne({
            where: { mail: req.body.mail },
        });

        // Ver si seller ya existe
        if (existingSeller) {
          res.status(400).json({ error: "Ya existe una tienda con ese mail" });
        } else {
            // Si no, lo creamos
            const hashedPassword = await bcrypt.hash(
            req.body.password,
            Number.parseInt(authConfig.rounds)
          );
            const seller = await Seller.create({
            name: req.body.name,
            mail: req.body.mail,
            password: hashedPassword,
            location: req.body.location
          }).then(seller => {
              let token = generateAccessToken(seller.name);
              // Devolvemos status creado y el seller
              res.status(201)
              .json({ 
                sellerid: seller.id,
                name: seller.name,
                mail: seller.mail,
                token: token
              });
            });
            
        }
      } else {
        res.status(400).json({ error: "Contraseñas no coinciden" });
      }
    // Devolvemos si hay un error
    } catch (e) {
      res.status(400).json({ error: e });
    }
}

//Login seller
const logIn = async (req, res) => {
    try {
      const seller = await Seller.findOne({
        where: { mail: req.body.mail },
      });
      if (!seller) {
        res.status(400).json({ error: "La tienda no existe" });
      } else {
        const result = bcrypt.compareSync(req.body.password, seller.password);
        if (result) {
          const token = generateAccessToken(seller.name);
          // Devolvemos status 200 y el token en cookie
          res.status(200)
          .json({ 
            sellerid: seller.id,
            name: seller.name, 
            mail: seller.mail,
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

  //Logout seller
  const logOut = (req, res) => {
    return res.clearCookie("seller").status(200).json({ 
      message: "Cierre de sesión exitoso" 
    });
  }

  //Delete seller
  const deleteSeller = async (req, res) => {
    try {
      const seller = await Seller.findOne({
        where: { id: req.params.sellerid },
      });
      if (!seller) {
        res.status(400).json({ error: "El usuario no existe" });
      } else {
        await seller.destroy().then(seller => {
          res.clearCookie("seller").status(200).json({ message: "Tienda eliminado" });
        });
      }
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }

  //Update seller
  const updateSeller = async (req, res) => {
    try {
      const seller = await Seller.findOne({
        where: { id: req.params.sellerid },
      });
      if (!seller) {
        res.status(400).json({ error: "La tienda no existe" });
      } else if (!validateAddSellerNames(req.body) || !validateEmail(req.body.mail)) {
        res.status(400).json({ error: "Datos inválidos" });
      } else if (req.body.password !== req.body.passwordConfirmation) {
        res.status(400).json({ error: "Contraseñas no coinciden" });
      } else {
        const update_info = {
          name: req.body.name,
          mail: req.body.mail,
          location: req.body.location,
        }
        // Vemos si hay contraseña
        if (req.body.password) {
          // Confirmamos contraseña
          if (req.body.password !== req.body.passwordConfirmation) {
            return res.status(400).json({ error: "Contraseñas no coinciden" });
          } else {
            // Vemos si la contraseña es válida
            const result = bcrypt.compareSync(req.body.oldPassword, seller.password);
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
        await Seller.update(update_info, {where: {id: req.params.sellerid}}).then(seller => {
          res.status(200).json(update_info);
        });
      }
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }


const getSeller = async (req, res) => {
  try {
    const seller = await Seller.findOne({
      where: { id: req.params.sellerid },
    });
    if (!seller) {
      res.status(400).json({ error: "La tienda no existe" });
    } else {
      res.status(200).json({
        name: seller.name,
        mail: seller.mail,
        location: seller.location
      });
    }
  } catch (e) {
    res.status(404).json({ error: e });
  }
}


// Retorna todos los vendedores de la pagina
const getSellers = async (req, res) => {
  try {
      const sellers = await Seller.findAll(
          {attributes: ['id', 'name', 'location']}
      ).then(sellers => {
          res.status(200).json({sellers: sellers});
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({
          error: "Error al obtener las tiendas"
      });
  }
};



module.exports = { 
    signIn,
    logIn,
    logOut,
    deleteSeller,
    updateSeller,
    getSeller,
    getSellers
};