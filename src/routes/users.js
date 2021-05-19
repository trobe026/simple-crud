const express = require('express');
const router = express.Router();

const User = require('../models/User');

// create a user
router.get('/signup', async function (req, res) {
    let { body } = req;
    let user = await User.create( { _id: req.params.id }, body);
    res.json(user);
});

// update user
router.put('/:id', async function(req, res) {
    let { body } = req;
    let user = await User.findByIdAndUpdate( { _id: req.params.id }, body, { new: true });
    res.json(user);
});

// get user
router.get('/:id', async function(req, res) {
    let user = await User.findById( { _id: req.params.id });
    res.json(user);
});

// get users
router.get('/', async function(req, res) {
    let user = await User.find({});
    res.json(user);
});

// delete user
router.delete('/:id', async function(req, res) {
    let user = await User.deleteOne( { _id: req.params.id });
    res.json(user);
});

module.exports = router;