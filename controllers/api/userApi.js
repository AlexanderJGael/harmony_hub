const express = require("express");
const router = express.Router();
const { userController, messagesController } = require("../../controllers");

// User api routes
router.get("/users", userController.userList);
router.post("/users/:id", userController.userPost);
router.put("/users/:id", userController.userUpdate);
router.get("/users/:id", userController.getUserById);
router.delete("/users/:id", userController.userDelete);

// Messages api routes
router.get("/messages", messagesController.returnMessages);
router.post("/messages", messagesController.postMessages);
router.get("/messages/:id", messagesController.getMessagesById);
router.put("/messages/:id", messagesController.updateMessage);
router.delete("/messages/:id", messagesController.deleteMessage);

module.exports = router;