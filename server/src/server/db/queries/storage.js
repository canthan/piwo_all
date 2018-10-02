const knex = require('../connection');

function getAllStorages() {
  return knex('storage')
  .select('*');
}

function getStoragesOfUser(user_id) {
  return knex('storage')
  .select('*')
  .where({batch_user_id: parseInt(user_id)});
}

function getStoragesOfBeer(user_id, beer_id) {
  return knex('storage')
  .select('*')
  .where({batch_number: parseInt(beer_id), batch_user_id: parseInt(user_id)});
}

module.exports = {
  getAllStorages,
  getStoragesOfBeer,
  getStoragesOfUser,
};
