const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {
        type: Number
    },
    username: {
        type: String,
        required: [true]
    },
    password: {
        type: String,
        required: [true]
    }
});

module.exports = mongoose.model('User', UserSchema);