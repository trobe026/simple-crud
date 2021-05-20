const app = require('../../src/app');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('body parser middleware', () => {

    it('returns 422 if invalid request body', async() => {
        await request(app)
            .post('/tasks/1')
            .set('Accept', 'application/json')
            .expect(422);

        //expect(res.status).to.equal(422);
    });

});