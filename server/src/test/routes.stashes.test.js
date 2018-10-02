process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : stashes', () => {
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

	describe('GET /stashes', () => {
		it('should return all stashes', done => {
			chai
				.request(server)
				.get('/stashes')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					// res.body.data.length.should.eql(5);
					res.body.data[0].should.include.keys(
						'batchId',
						'stashUserId',
						'stashName',
						'b033',
						'b040',
						'b050'
					);
					done();
				});
		});
	});

	describe('GET /stashes/:userId/:stashId', () => {
		it('should return stash no 2 of user no 1', done => {
			chai
				.request(server)
				.get('/stashes/1/2')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					// res.body.data.length.should.eql(5);
					res.body.data[0].should.include.keys('batchId', 'stashName', 'items');
					done();
				});
		});
	});

	describe('PUT /stashes/:stashId', () => {
		it('should return the stashes that were updated', done => {
			knex('stashes')
				.select('*')
				.where({ stashId: 1 })
				.then(stashes => {
					const stashesObject = stashes[0];
					chai
						.request(server)
						.put(`/stashes/1`)
						.send({
							b050: 50,
						})
						.end((err, res) => {
							should.not.exist(err);
							// res.status.should.equal(200);
							// res.type.should.equal('application/json');
							// res.body.status.should.eql('success');
							// res.body.data[0].should.include.keys(
							//   'batchId', 'stashName', 'items'
							// );
							// const newStashesObject = res.body.data[0];
							// newStashesObject.items.b050.should.not.eql(stashesObject.items.b050);
							done();
						});
				});
		});
	});
});
