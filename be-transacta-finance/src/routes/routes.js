const express = require("express");
const router = express.Router();
const trController = require("../controllers/controllers");

router.post("/userlogin", trController.userLogin);

router.post("/userregister", trController.userRegister);

router.get("/getuser", trController.getUser);

router.delete("/deleteuser", trController.deleteUser);

router.post("/addwallet", trController.addWallet);

router.get("/showwallet", trController.showWallet);

router.post("/addtransactions", trController.addTransactions);

router.get("/showtransactions", trController.showTransactions);

router.put("/updatewallet", trController.updateWallet);

router.put("/updatetransactions", trController.updateTransactions);

router.post("/addpayment", trController.addPayment);

module.exports = router;
