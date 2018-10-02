const knex = require('../connection');

function getAllUsers() {
  return knex('users')
  .select('*');
}

function getSingleUser(id) {
  return knex('users')
  .select('*')
  .where({user_id: parseInt(id)});
}

module.exports = {
  getAllUsers,
  getSingleUser,
};
