const knex = require('../connection');

function getUserData(user_id) {
  return knex('users')
    .select('*')
    .where({ user_id: parseInt(user_id) });
}

function getUserBatches(user_id) {
  return knex('beer')
    .select('batch_number', 'beer_name', 'bottled_on', 'quantity_litres', 'quantity_bottles', 'quantity_crates')
    .where({ beer_user_id: parseInt(user_id) });
}

function getUserStorages(user_id) {
  return knex('storage')
    .select('batch_number', 'storage_name', 'b050', 'b040', 'b033')
    .where({ batch_user_id: parseInt(user_id) });
}

function getUserBatchesStorages(user_id, batch_number) {
  return knex('storage')
    .select('storage_name', 'b050', 'b040', 'b033')
    .where({ batch_number: parseInt(beer_id), batch_user_id: parseInt(user_id) });
}

module.exports = {
  getUserBatches,
  getUserBatchesStorages,
  getUserStorages,
  getUserData,
};
