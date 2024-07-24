const mongoose = require('mongoose');

const UsertestSchema = new mongoose.Schema({

    user: {
        type: String,
        maxlength: 50
}

});

const Usertest = mongoose.model('Usertest', UsertestSchema);

module.exports = Usertest;