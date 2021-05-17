const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;
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

const Task = mongoose.model('Task', TaskSchema);