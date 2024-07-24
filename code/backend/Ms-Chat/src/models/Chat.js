const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    ban_id: {
        type: Number,
        required: false
    },
    user_id: {
        type: Number,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Spécifiez explicitement le nom de la collection comme 'Chat'
const Chat = mongoose.model('Chat', chatSchema, 'Chat');

module.exports = Chat;
