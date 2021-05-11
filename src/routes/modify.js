const db = require('../models');

module.exports = function(app) {
    app.post('/add', function(req, res) {

        db.Task.create(req.body)
            .then(function(task) {
                // link a user to a task by id
                return db.Task.findOneAndUpdate({ _id: req.params.id }, {});
            });
    });

    // app.put('/delete', function(req, res) {

    //     db.Task.(req.body)
    //         .then(function(task) {
    //             return db.Task({ _id: req.params.id }, {});
    //         });
    // });

    // app.put('/mod', function(req, res) {

    //     db.Task.create(req.body)
    //         .then(function(task) {
    //             return db.Task.findOneAndUpdate({ _id: req.params.id }, {});
    //         });
    // });
};