const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const roomSchema = new mongoose.Schema({
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

roomSchema.plugin(AutoIncrement, {inc_field: 'id'});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

