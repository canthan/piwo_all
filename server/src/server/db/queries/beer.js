const knex = require('../connection');

function getAllBeers() {
  return knex('beer')
    .select('*');
}

function getBeersOfUser(user_id) {
  return knex('beer')
    .select('*')
    .where({ beer_user_id: parseInt(user_id) });
}

module.exports = {
  getAllBeers,
  getBeersOfUser,
};
