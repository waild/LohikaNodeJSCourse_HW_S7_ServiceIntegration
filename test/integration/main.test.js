process.env.NODE_ENV = 'test';

const chai = require('chai');

const should = chai.should();
const request = require('supertest');


const app = require('../../app/main');
const knex = require('../../db');

describe('routes : orders', () => {
  beforeEach((done) => {
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => {
            knex.seed.run()
              .then(() => {
                done();
              });
          });
      });
  });

  afterEach((done) => {
    knex.migrate.rollback()
      .then(() => {
        done();
      });
  });

  describe('GET /api/orders/:id', () => {
    it('should respond with details', (done) => {
      request(app)
        .get('/api/orders/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) => {
          if (err) return done(err);
          response.body.should.eql({
            meals: ['soup', 'french fries'],
          });
          done();
        });
    });
    it('should respond 400 status if order doesn\'t exist', (done) => {
      request(app)
        .get('/api/orders/999')
        .expect(404)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
  describe('POST /api/orders', () => {
    it('should create order', (done) => {
      request(app)
        .post('/api/orders')
        .send({
          meals: ['soup', 'french fries'],
        })
        .expect('Location', '/api/orders/2')
        .expect(201)
        .end((err, resp) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should respond 400 status on empty meals', (done) => {
      request(app)
        .post('/api/orders')
        .send({
          meals: [],
        })
        .set('Accept', 'application/json')
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
    it('should respond 400 status on wrong meals format', (done) => {
      request(app)
        .post('/api/orders')
        .send({
          meals: [1, 2, 3],
        })
        .set('Accept', 'application/json')
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
    it('should respond 400 status on empty body duration', (done) => {
      request(app)
        .post('/api/orders')
        .send({})
        .set('Accept', 'application/json')
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
