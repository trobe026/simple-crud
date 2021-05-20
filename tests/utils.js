const mongo = require('../src/clients/mongo');
const sinon = require('sinon');

let fake = sinon.fake();

async function createTask(id, title, text) {
    const task = await mongo.Task.create({
        _id: id,
        title: title,
        text: text
    });

    return task;
}

module.exports = {
    createTask
};