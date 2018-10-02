
exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('storage', (table) => {
      table.integer('batch_user_id').notNullable();
      table.foreign('batch_user_id').references('user_id').inTable('users');
      table.integer('batch_number').notNullable();
      table.foreign('batch_number').references('batch_number').inTable('beer');
      table.string('storage_name').notNullable();
      table.integer('b050');
      table.integer('b040');
      table.integer('b033');
    });
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable('storage')
};