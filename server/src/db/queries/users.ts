import knex from '../connection';

export class UserQueries {
	public static async getAllUsers() {
		return knex('users').select(
			'username',
			'firstname',
			'surname',
			'password',
			'email',
			'registrationDate'
		);
	}

	public async getSingleUser(id: number) {
		return knex('users')
			.select('*')
			.where({ userId: id });
	}
}
