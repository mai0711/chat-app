const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getAllUsers,
    setAvatar
} = require("../controllers/authenticationController");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/setAvatar/:id", setAvatar);
router.get("/allUsers/:id", getAllUsers);

module.exports = router;

