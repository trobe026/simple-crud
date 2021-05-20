const express = require('express');
const router = express.Router();

const Task = require('../models/Task');

// get tasks or task
router.get('/', async function(req, res) {
    let tasks = await Task.find({});
    res.json(tasks);
});

router.get('/:id', async function(req, res) {
    let task = await Task.findById({ _id: req.params.id });
    if (!task) {
        res.json({ error: 'no task exists for id: ' + req.params.id });
    }
    res.json(task);
});

// create a task
router.post('/:id', async function(req, res) {
    console.log('ran');
    let { body } = req;
    console.log(body);
    let task = await Task.create( { _id: req.params.id, title: body.title, text: body.text });
    res.json(task);
});

// update a task
router.put('/:id', async function(req, res) {
    let { body } = req;
    let task = await Task.findByIdAndUpdate( { _id: req.params.id }, body, { useFindAndModify: false, new: true });
    res.json(task);
});

// delete a task
router.delete('/:id', async function(req, res) {
    let task = await Task.deleteOne({ _id: req.params.id });
    res.json(task);
});

// delete all tasks
router.delete('/', async function(req, res) {
    let task = await Task.deleteMany({});
    res.json(task);
});

module.exports = router;