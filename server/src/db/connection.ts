import config from '../knexfile';
import * as Knex from 'knex';

// const environment = process.env.NODE_ENV || 'development';
const knex: Knex = Knex(config.development);

export default knex;
