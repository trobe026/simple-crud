const db = require('../models');

module.exports = function(app) {
    app.get('/', function(req, res) {

        db.Task.find({}).sort('-id')
            .then(function(taskList) {

                let hbjObject = {
                    tasks: taskList
                };

                res.render('home', hbjObject);
            })
            .catch(function(err) {
                res.json(err);
            });
    });
};