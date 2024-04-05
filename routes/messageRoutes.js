const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");

router.post("/chat", messageController.createMessage);
router.get('/chat', messageController.getMessages);
router.get('/chat/:id', messageController.getMessagesByUser);
router.get('/chat/:id', messageController.getMessagesAfterId);

module.exports = router;

