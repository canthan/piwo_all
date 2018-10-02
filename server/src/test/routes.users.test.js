process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : users', () => {
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

	describe('GET /users', () => {
		it('should return all users', done => {
			chai
				.request(server)
				.get('/users')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					// res.body.data.length.should.eql(3);
					res.body.data[0].should.include.keys(
						'email',
						'firstname',
						'password',
						'registrationDate',
						'surname',
						'userId',
						'username'
					);
					done();
				});
		});
	});

	describe('GET /users/:id', () => {
		it('should respond with a single user data', done => {
			chai
				.request(server)
				.get('/users/1')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					res.body.data[0].should.include.keys(
						'email',
						'firstname',
						'password',
						'registrationDate',
						'surname',
						'userId',
						'username'
					);
					done();
				});
		});
	});
});
