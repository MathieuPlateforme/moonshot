const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        autoIncrement: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        maxlength: 255
    },
    description: {
        type: String,
        maxlength: 500
    }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
