const express = require('express');
const router = express.Router();

// health check
router.get('/', function (req, res) {
    res.send('hello world!');
});

module.exports = router;