const batchesData = require('./2_batches.json');

exports.seed = (knex, Promise) => {
  return knex('batches').del()
    .then(() => {
      return knex('batches').insert(batchesData);
    });
};
