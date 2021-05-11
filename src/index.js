const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;

// try handlebars for dynamic html
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// serve static files
app.use(express.static('public'));

require('./routes/home.js')(app);
require('./routes/modify.js')(app);

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect('mongo:27017');

app.listen(PORT, function() {
    console.log('App now listening at localhost:' + PORT);
});

app.get('/', function (req, res) {
    res.send('hello world!');
});