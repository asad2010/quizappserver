const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/authCtrl")

router.post('/register', authCtrl.signup);
router.post('/login', authCtrl.login);

module.exports = router