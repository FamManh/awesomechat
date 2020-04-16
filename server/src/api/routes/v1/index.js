const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const contactRoutes = require("./contact.route");
const messageRoutes = require("./message.route");
const chatGroupRoutes = require("./chatGroup.route");

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use("/contact", contactRoutes);
router.use("/message", messageRoutes);
router.use("/chat-group", chatGroupRoutes);

module.exports = router;
