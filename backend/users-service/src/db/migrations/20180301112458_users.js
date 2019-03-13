exports.up = (knex, Promise) => {
	return knex.schema
		.createTable('users', table => {
			table
				.increments('userId')
				.unique()
				.primary();
			table
				.string('username')
				.notNullable()
				.unique();
			table.string('firstname').notNullable();
			table.string('surname').notNullable();
			table.string('password').notNullable();
			table
				.string('email')
				.notNullable()
				.unique();
			table.date('registrationDate').notNullable();
		})
		.createTable('batches', table => {
			table
				.increments('batchId')
				.unique()
				.primary();
			table
				.integer('batchUserId')
				.references('userId')
				.inTable('users');
			table.string('batchNumber').notNullable();
			table.string('batchName').notNullable();
			table.date('bottledOn');
			table.float('quantityLitres');
			table.integer('quantityBottles');
			table.float('quantityCrates');
		});
};

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('batches').dropTable('users');
};
