const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messagesController");

router.get('/', messageController.getChat);

module.exports = router;

