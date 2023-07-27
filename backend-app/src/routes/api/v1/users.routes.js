const express = require("express");
const router = express.Router();
const { authorization } = require('../../../middlewares/authorization');

const userController = require("../../../controllers/user.controller");

router.post("/sign-in", userController.signIn);

  // Login 
router.post("/login", userController.logIn);
  
  //Delete user
router.delete("/delete/:userid", authorization, userController.deleteUser);

  //Update user
router.patch("/update/:userid", authorization, userController.updateUser);
  
  // Logout del usuario
router.get("/logout", authorization, userController.logOut);

  // Obtener usuario
router.get("/profile/:userid", authorization, userController.getUser);


module.exports = router;
