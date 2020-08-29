const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");

const router = express.Router();

const messageSchema = new mongoose.Schema({
  messageText: String,
  subject: String,
  username: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Message = mongoose.model('Message', messageSchema);

router.post("/", async (req, res) => {
  // check parameters
  const message = new Message({
        messageText: req.body.messageText,
        subject: req.body.subject,
        username: req.body.username
      });
  try {
    await message.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    let messages = await Message.find().sort({
      created: -1
    });
    return res.send(messages);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Message,
  routes: router,
}
