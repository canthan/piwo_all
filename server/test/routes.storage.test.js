process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : storage', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /api/v1.0/storage', () => {
    it('should return all storage', (done) => {
      chai.request(server)
        .get('/api/v1.0/storage')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          // res.body.data.length.should.eql(5);
          res.body.data[0].should.include.keys(
            'batch_number', 'batch_user_id', 'storage_name', 'b033', 'b040', 'b050'
          );
          done();
        });
    });
  }); 

  describe('GET /api/v1.0/storage/:user_id/:storage_id', () => {
    it('should return storage no 2 of user no 1', (done) => {
      chai.request(server)
        .get('/api/v1.0/storage/1/2')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          // res.body.data.length.should.eql(5);
          res.body.data[0].should.include.keys(
            'batch_number','batch_user_id', 'storage_name', 'b033', 'b040', 'b050'
          );
          done();
        });
    });
  }); 
});
