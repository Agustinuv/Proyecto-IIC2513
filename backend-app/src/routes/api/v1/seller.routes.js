const express = require("express");
const router = express.Router();
const { authorization } = require('../../../middlewares/authorization');

const sellerController = require("../../../controllers/seller.controller");

  // Sign in seller
router.post("/sign-in", sellerController.signIn);

  // Login seller
router.post("/login", sellerController.logIn);

  //Delete seller
router.delete("/delete/:sellerid", authorization, sellerController.deleteSeller);

  //Update seller
router.patch("/update/:sellerid", authorization, sellerController.updateSeller);

  // Logout seller
router.get("/logout", authorization, sellerController.logOut);

  // Get seller
router.get("/profile/:sellerid", sellerController.getSeller);

// Get sellers
router.get("/sellers", sellerController.getSellers);


module.exports = router;