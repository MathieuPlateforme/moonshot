const mongoose = require('mongoose');

const roomMemberSchema = new mongoose.Schema({
    room_id: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        maxlength: 50
    },
    type: {
        type: String,
        maxlength: 50
    }
});

const RoomMember = mongoose.model('RoomMember', roomMemberSchema);

module.exports = RoomMember;
