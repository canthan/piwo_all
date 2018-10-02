
exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('user_id').unique().primary();
      table.string('username').notNullable().unique();
      table.string('firstname').notNullable();
      table.string('surname').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable().unique();
      table.date('registration_date').notNullable();
    })
    .createTable('beer', (table) => {
      table.integer('batch_number').notNullable().unique().primary();
      table.integer('beer_user_id').references('user_id').inTable('users');
      table.string('beer_name').notNullable();
      table.date('bottled_on');
      table.float('quantity_litres');
      table.integer('quantity_bottles');
      table.float('quantity_crates');
    });
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable('beer')
    .dropTable('users');
};
