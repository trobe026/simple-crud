const chai = require('chai');
const mongo = require('../../src/clients/mongo');

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

    describe('/GET tasks', () => {

        it('should get a task', async() => {

        });

        it('should get all tasks', async() => {

        });
    });

    describe('/POST tasks', () => {

        it('should create a task', async() => {

        });
    });

    describe('/PUT tasks', () => {

        it('should update a task', async() => {

        });
    });

    describe('/DEL tasks', () => {

        it('should delete a task', async() => {

        });
    });



});