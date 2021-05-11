const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    _id: {
        type: Number
    },
    title: {
        type: String
    },
    text: {
        type: String,
        required: [true, 'A task is required']
    }
});

module.exports = mongoose.model('Task', TaskSchema);