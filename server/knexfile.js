const path = require('path');
const CONFIG = require('./src/config/config');

const BASE_PATH = path.join(__dirname, 'src', 'db');

module.exports = {
	test: {
		client: 'pg',
		connection: `postgres://${CONFIG.PG_USERNAME}:${
			CONFIG.PG_PASSWORD
		}{@localhost:5432/piwo_storage_test`,
		migrations: {
			directory: path.join(BASE_PATH, 'migrations'),
		},
		seeds: {
			directory: path.join(BASE_PATH, 'seeds'),
		},
	},
	development: {
		client: 'pg',
		connection: `postgres://${CONFIG.PG_USERNAME}:${
			CONFIG.PG_PASSWORD
		}@localhost:5432/piwo_storage`,
		migrations: {
			directory: path.join(BASE_PATH, 'migrations'),
		},
		seeds: {
			directory: path.join(BASE_PATH, 'seeds'),
		},
	},
};
