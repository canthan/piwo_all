process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : beer', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /api/v1.0/beer', () => {
    it('should return all beer', (done) => {
      chai.request(server)
        .get('/api/v1.0/beer')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          // res.body.data.length.should.eql(4);
          res.body.data[0].should.include.keys(
            'batch_number', 'beer_name', 'beer_user_id', 'bottled_on', 'quantity_bottles', 'quantity_crates', 'quantity_litres'
          );
          done();
        });
    });
  });

  describe('GET /api/v1.0/beer/user_id', () => {
    it('should return all beer', (done) => {
      chai.request(server)
        .get('/api/v1.0/beer/1')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          // res.body.data.length.should.eql(4);
          res.body.data[0].should.include.keys(
            'batch_number', 'beer_name', 'beer_user_id', 'bottled_on', 'quantity_bottles', 'quantity_crates', 'quantity_litres'
          );
          done();
        });
    });
  });

});
