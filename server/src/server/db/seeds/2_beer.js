
exports.seed = (knex, Promise) => {
  return knex('beer').del()
    .then(() => {
      return knex('beer').insert([{
        batch_number: 2,
        beer_user_id: 1,
        beer_name: 'Beer_2',
        bottled_on: '2017-12-22',
        quantity_litres: 10,
        quantity_bottles: 20,
        quantity_crates: 1,
      }]).into('beer');
    })
    .then(() => {
      return knex('beer').insert([{
        batch_number: 4,
        beer_user_id: 1,
        beer_name: 'Beer_4',
        bottled_on: '2018-01-02',
        quantity_litres: 15,
        quantity_bottles: 30,
        quantity_crates: 1.5,
      }]).into('beer');
    })
    .then(() => {
      return knex('beer').insert([{
        batch_number: 5,
        beer_user_id: 1,
        beer_name: 'Beer_5',
        bottled_on: '2018-01-16',
        quantity_litres: 16,
        quantity_bottles: 32,
        quantity_crates: 1.6,
      }]);
    })
    .then(() => {
      return knex('beer').insert([{
        batch_number: 6,
        beer_user_id: 1,
        beer_name: 'Beer_6',
        bottled_on: '2018-02-02',
        quantity_litres: 10,
        quantity_bottles: 20,
        quantity_crates: 1,
      }]);
    })
    .then(() => {
      return knex('beer').insert([{
        batch_number: 50,
        beer_user_id: 2,
        beer_name: 'Beer_50',
        bottled_on: '2018-01-16',
        quantity_litres: 16,
        quantity_bottles: 32,
        quantity_crates: 1.6,
      }]);
    })
    .then(() => {
      return knex('beer').insert([{
        batch_number: 60,
        beer_user_id: 1,
        beer_name: 'Beer_60',
        bottled_on: '2018-02-02',
        quantity_litres: 10,
        quantity_bottles: 20,
        quantity_crates: 1,
      }]);
    });
  };
