const app = require('./app');

const Task = require('./models/Task');
const User = require('./models/User');

const mongoose = require('mongoose');
const passport = require('passport');

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect('mongodb://mongo:27017');

// start app
const PORT = 9000;
app.listen(PORT, function() {
    console.log('App now listening at localhost:' + PORT);
});


// TASK ROUTES

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
    let task = await Task.create(body);
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

// USER ROUTES

// create a user
app.get('/signup', async function (req, res) {
    let { body } = req;
    let user = await User.create( { _id: req.params.id }, body);
    res.json(user);
});

// update user
app.put('/users', async function(req, res) {
    let { body } = req;
    let user = await User.findByIdAndUpdate( { _id: req.params.id }, body);
    res.json(user);
});

// get user
app.get('/users', async function(req, res) {
    let user = await User.findById( { _id: req.params.id });
    res.json(user);
});

// get users
app.get('/users', async function(req, res) {
    let user = await User.find({});
    res.json(user);
});

// delete user
app.delete('/users', async function(req, res) {
    let user = await User.deleteOne( { _id: req.params.id });
    res.json(user);
});

