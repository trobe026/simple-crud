const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Tasks', () => {

    const host = 'localhost:9000';
    const task_id = 1;

    before(async() => {

        await chai.request(host)
            .delete('/tasks/');
    });

    describe('GET and POST tasks', () => {

        it('Should get all tasks', async() => {

            let resp = await chai.request(host).get('/tasks');

            resp.should.have.status(200);
            resp.body.should.be.a('array');
            resp.body.length.should.be.eql(0);
        });

        it('Should create a new task', async() => {

            const task = {
                title: 'test task',
                text: 'some to-do'
            };

            let resp = await chai.request(host).post('/tasks/' + task_id).send(task);

            expect(resp.status).to.equal(200);
            resp.body.should.be.a('object');
            expect(resp.body.title).to.equal('test task');
            expect(resp.body.text).to.equal('some to-do');
        });

        it('Should get a task', async() => {

            let resp = await chai.request(host).get('/tasks/' + task_id);

            resp.should.have.status(200);
            resp.body.should.be.a('object');
            expect(resp.body.title).to.equal('test task');
            expect(resp.body.text).to.equal('some to-do');
        });
    });

    describe('PUT and DEL tasks', () => {

        it('Should get update a task', async() => {

            const newTask = {
                title: 'test task',
                text: 'updated task'
            };

            let resp = await chai.request(host).put('/tasks/' + task_id).send(newTask);

            expect(resp.status).to.equal(200);
            resp.body.should.be.a('object');
            expect(resp.body.title).to.equal('test task');
            expect(resp.body.text).to.equal('updated task');
        });

        it('Should delete a task', async() => {

            let resp = await chai.request(host).del('/tasks/' + task_id);

            expect(resp.status).to.equal(200);
            resp.body.should.be.a('object');
            expect(resp.body.ok).to.equal(1);
            expect(resp.body.deletedCount).to.equal(1);
        });
    });

});