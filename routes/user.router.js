const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/params");
const { getAllUsers, createNewUser, loginUser } = require("../controllers/user.controller");

router.param("userId", getUserById);

router.get("/", getAllUsers);
router.post("/register", createNewUser);
router.post("/login", loginUser);

module.exports = router;