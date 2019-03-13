exports.up = (knex, Promise) => {
	return knex.schema.createTable('stashes', table => {
		table
			.increments('stashId')
			.unique()
			.primary();
		table.integer('stashUserId').notNullable();
		table
			.foreign('stashUserId')
			.references('userId')
			.inTable('users');
		table.integer('batchId').notNullable();
		table.string('stashName').notNullable();
		table.integer('b050');
		table.integer('b040');
		table.integer('b033');
	});
};

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('stashes');
};
