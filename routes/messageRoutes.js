const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messagesController");

router.get('/chat', messageController.chatGet);
router.post("/chat", messageController.chatPost);
router.get('api/messages', messageController.getMessages);
router.post('api/messages', messageController.postMessages);

module.exports = router;

