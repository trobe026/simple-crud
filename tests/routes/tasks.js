const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const mongo = require('../../src/clients/mongo');
const app = require('../../src/app');
const { createTask } = require('../utils');

describe('Tasks API', () => {

    before(async() => {
        await mongo.connect('mongodb://mongo:27017');
    });

    beforeEach(async() => {
        await mongo.flushCollections();
    });

    after(async() => {
        await mongo.disconnect();
    });

    describe('/GET tasks', async() => {

        it('should get a task', async() => {
            await createTask(1, 'something', 'some task');

            let resp = await request(app).get('/tasks/1');

            expect(resp.status).to.equal(200);
            expect(resp.body.text).to.equal('some task');
        });

        it('should get all tasks', async() => {
            await createTask(2, 'another task', 'task 2');

            let resp = await request(app).get('/tasks');

            expect(resp.status).to.equal(200);
            expect(resp.body).to.be.a('array');
        });
    });

    describe('/POST tasks', async() => {

        it('should create a task', async() => {

            let task = {
                title: 'task name',
                text: 'a task'
            };
            let resp = await request(app).post('/tasks/1').send(task);

            expect(resp.status).to.equal(200);
            expect(resp.body.text).to.equal('a task');
        });
    });

    describe('/PUT tasks', () => {

        it('should update a task', async() => {
            await createTask(1, 'something', 'some task');

            let newTask = {
                title: 'a new task',
                text: 'do a thing'
            };
            let resp = await request(app).put('/tasks/1').send(newTask);

            expect(resp.status).to.equal(200);
            expect(resp.body.text).to.equal('do a thing');
        });
    });

    describe('/DEL tasks', () => {

        it('should delete a task', async() => {
            await createTask(1, 'something', 'some task');

            let resp = await request(app).del('/tasks/1');

            expect(resp.status).to.equal(200);
            expect(resp.body.ok).to.equal(1);
            expect(resp.body.deletedCount).to.equal(1);
        });
    });


});