const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    messages: [{
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: String,
      creation: {type: Date, default: Date.now}
    }],
    request: { type: String, default: "Pending", enum: ["Pending", "Delivered", "Received"]}
  }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;