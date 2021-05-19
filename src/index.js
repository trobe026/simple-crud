const mongoose = require('mongoose');
const app = require('./app');

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect('mongodb://mongo:27017', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  });

// start app
const PORT = 9000;
app.listen(PORT, function() {
    console.log('App now listening at localhost:' + PORT);
});

