process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : movies', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /api/v1.0/users', () => {
    it('should return all users', (done) => {
      chai.request(server)
        .get('/api/v1.0/users')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          // res.body.data.length.should.eql(3);
          res.body.data[0].should.include.keys(
            'email', 'firstname', 'password', 'registration_date', 'surname', 'user_id', 'username'
          );
          done();
        });
    });
  });

  describe('GET /api/v1.0/users/:id', () => {
    it('should respond with a single movie', (done) => {
      chai.request(server)
      .get('/api/v1.0/users/1')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data[0].should.include.keys(
          'email', 'firstname', 'password', 'registration_date', 'surname', 'user_id', 'username'
        );
        done();
      });
    });
  });

});
