const express = require("express");
const router = express.Router();
const { userController, messagesController, loginController } = require("../");

// User api routes
router.get("/users", userController.userList);
router.post("/users", userController.userPost);
router.put("/users/:id", userController.userUpdate);
router.get("/users/:id", userController.getUserById);
router.delete("/users/:id", userController.userDelete);

// Messages api routes
router.get("/messages", messagesController.returnMessages);
router.post("/messages", messagesController.postMessages);
router.get("/messages/:id", messagesController.getMessagesById);
router.put("/messages/:id", messagesController.updateMessage);
router.delete("/messages/:id", messagesController.deleteMessage);

// Login api routes
router.post('/register', loginController.registerPost);
router.post('/login', loginController.loginPost);
router.get('/logout', loginController.logoutPost);

module.exports = router;