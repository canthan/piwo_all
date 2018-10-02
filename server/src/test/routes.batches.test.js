process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : batches', () => {
	beforeEach(() => {
		return knex.migrate
			.rollback()
			.then(() => {
				return knex.migrate.latest();
			})
			.then(() => {
				return knex.seed.run();
			});
	});

	afterEach(() => {
		return knex.migrate.rollback();
	});

	describe('GET /batches', () => {
		it('should return all batches', done => {
			chai
				.request(server)
				.get('/batches')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					// res.body.data.length.should.eql(4);
					res.body.data[0].should.include.keys(
						'batchId',
						'batchName',
						'batchUserId',
						'bottledOn',
						'quantityBottles',
						'quantityCrates',
						'quantityLitres'
					);
					done();
				});
		});
	});

	describe('GET /batches/userId', () => {
		it('should return all batches', done => {
			chai
				.request(server)
				.get('/batches/1')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					// res.body.data.length.should.eql(4);
					res.body.data[0].should.include.keys(
						'batchId',
						'batchName',
						'batchUserId',
						'bottledOn',
						'quantityBottles',
						'quantityCrates',
						'quantityLitres'
					);
					done();
				});
		});
	});
});
