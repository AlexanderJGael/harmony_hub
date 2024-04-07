const express = require('express');
const router = express.Router();

const messagesController = require('./messagesController');
const userController = require('./userController');
const profileController = require('./profileController');

module.exports = router