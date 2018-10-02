
exports.seed = (knex, Promise) => {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        username: 'Canthan',
        firstname: 'Andrzej',
        surname: 'Globisz',
        password: 'canthan12',
        email: 'andrzej.globisz@gmail.com',
        registration_date: '2018-03-01',
      }]);
    })
    .then(() => {
      return knex('users').insert([{
        username: 'Other_user1',
        firstname: 'Other',
        surname: 'User',
        password: '12345678',
        email: 'other.user@gmail.com',
        registration_date: '2018-03-01',
      }]);
    })
    .then(() => {
      return knex('users').insert([{
        username: 'Other_user2',
        firstname: 'Other',
        surname: 'Alien',
        password: '12345678',
        email: 'alient.user@gmail.com',
        registration_date: '2018-03-01',
      }]);
    });
};
