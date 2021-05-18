const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const Task = require('../src/models/Task');

chai.use(chaiHttp);

mongoose.Promise = Promise;
mongoose.connect('mongodb://mongo:27017');

describe('Tasks', () => {

    before(async() => {
        mongoose.connect('mongodb://mongo:27017');
    });

    describe('/GET tasks', () => {
        it('Should get all tasks', async() => {
            chai.request('localhost:9000')
                .get('/tasks')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                });
        });
    });

});