const mongoose = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect('mongodb://mongo:27017');

const TaskSchema = new Schema({
    title: {
        type: String
    },
    text: {
        type: String,
        required: [true, 'A task is required']
    }
});

const Task = mongoose.model('Task', TaskSchema);

const UserSchema = new Schema({
    user: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'A password is required']
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
});

const User = mongoose.model('User', UserSchema);

const app = express();
app.use(express.json());
const PORT = 9000;
app.listen(PORT, function() {
    console.log('App now listening at localhost:' + PORT);
});

// health check
app.get('/health', function (req, res) {
    res.send('hello world!');
});

// get tasks or task
app.get('/tasks', async function(req, res) {
    let tasks = await Task.find({});
    res.json(tasks);
});

app.get('/tasks/:id', async function(req, res) {
    let task = await Task.findById({ _id: req.params.id });
    res.json(task);
});

// create a task and link to the user
app.post('/tasks/:id', async function(req, res) {
    let { body } = req;
    let task = await Task.create(body).then(() => User.findOneAndUpdate({ _id: req.params.id }));
    res.json(task);
});

// update a task
app.put('/tasks/:id', async function(req, res) {
    let { body } = req;
    let task = await Task.findByIdAndUpdate( { _id: req.params.id, body });
    res.json(task);
});

// delete a task
app.delete('/tasks/:id', async function(req, res) {
    let task = await Task.deleteOne({ _id: req.params.id });
    res.json(task);
});
