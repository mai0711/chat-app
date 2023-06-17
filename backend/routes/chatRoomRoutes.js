const express = require('express');
const router = express.Router();

const { getAllMessages, addMessage } = require("../controllers/chatRoomController");


router.post("/addmsg", addMessage);
router.post("/getmsg", getAllMessages);


module.exports = router;

