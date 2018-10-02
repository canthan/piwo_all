import knex from '../connection';

export class UserQueries {
	public static getAllUsers() {
		return knex('users').select(
			'username',
			'firstname',
			'surname',
			'password',
			'email',
			'registrationDate'
		);
	}

	public getSingleUser(id: number) {
		return knex('users')
			.select('*')
			.where({ userId: id });
	}
}
