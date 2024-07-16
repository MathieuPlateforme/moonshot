const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    ban_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
