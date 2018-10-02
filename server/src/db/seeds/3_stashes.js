const stashesData = require('./3_stashes.json');

exports.seed = (knex, Promise) => {
  return knex('stashes').del()
    .then(() => {
      return knex('stashes').insert(stashesData);
    });
};
