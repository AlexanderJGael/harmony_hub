const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messagesController");

router.get('/chat', messageController.getChat);
router.post("/chat", messageController.postChat);
router.get('api/messages', messageController.getMessages);
router.post('api/messages', messageController.postMessages);

module.exports = router;

