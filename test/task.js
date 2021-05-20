const chai = require('chai');
const { before } = require('mocha');
const mongo = require('../src/clients/mongo');
const expect = chai.expect;
const should = chai.should(); // eslint-disable-line no-unused-vars

describe('Task Model', () => {

    before(async() => {
        await mongo.connect('mongodb://mongo:27017');
    });

    beforeEach(async() => {
        await mongo.flushCollections();
    });

    after(async() => {
        await mongo.disconnect();
    });


    it('should create a task', async() => {
        let task = await mongo.Task.create({ _id: 1, title: 'something', text: 'some task' });

        expect(task.title).to.equal('something');
        expect(task.text).to.equal('some task');
    });

    it('should get a task', async() => {
        await mongo.Task.create({ _id: 1, title: 'something', text: 'some task' });

        let task = await mongo.Task.findById({ _id: 1 });

        expect(task.title).to.equal('something');
        expect(task.text).to.equal('some task');
    });

    it('should get all tasks', async() => {
        await mongo.Task.create({ _id: 1, title: 'something', text: 'some task' });
        await mongo.Task.create({ _id: 2, title: 'groceries', text: 'get groceries?' });

        let task = await mongo.Task.find({});

        task.should.be.a('array');
        task.length.should.be.eql(2);

        expect(task[0].title).to.equal('something');
        expect(task[1].text).to.equal('get groceries?');
    });

    it('should update a task', async() => {
        await mongo.Task.create({ _id: 1, title: 'something', text: 'some task' });

        let newTask = {
            title: 'a new task',
            text: 'do a thing'
        };

        let task = await mongo.Task.findByIdAndUpdate( { _id: 1 }, newTask, { useFindAndModify: false, new: true });

        expect(task.title).to.equal('a new task');
        expect(task.text).to.equal('do a thing');
    });

    it('should delete a task', async() => {
        await mongo.Task.create({ _id: 1, title: 'something', text: 'some task' });

        let task = await mongo.Task.deleteOne({ _id: 1 });
        task.should.be.a('object');

        expect(task.ok).to.equal(1);
        expect(task.deletedCount).to.equal(1);
    });

});


