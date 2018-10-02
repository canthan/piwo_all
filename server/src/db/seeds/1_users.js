const usersData = require('./1_users.json');

exports.seed = (knex, Promise) => {
  return knex('users').del()
    .then(() => {
      return knex('users').insert(usersData);
    });
};
