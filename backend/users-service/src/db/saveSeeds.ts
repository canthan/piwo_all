// import * as jsonfile from 'jsonfile';
// import * as path from 'path';
// import { getLogger } from 'log4js';

// import { BatchQueries } from './queries/batches';
// import { StashQueries } from './queries/stashes';
// import { UserQueries } from './queries/users';
// import { Batch, Stash } from '../types/types';

// // const jsonfile = require('jsonfile');
// // const queries_users = require('./queries/users');
// // const queries_batches = require('./queries/batches');
// // const queries_stashes = require('./queries/stashes');
// // const path = require('path');

// const BASE_PATH = path.join(__dirname);

// const usersFile = `${BASE_PATH}/seeds/1_users.json`;
// const batchesFile = `${BASE_PATH}/seeds/2_batches.json`;
// const stashesFile = `${BASE_PATH}/seeds/3_stashes.json`;

// console.log(usersFile);

// test();
// writeTest();
// writeUsersSeed();
// writeBatchesSeed();
// writeStashesSeed();

// process.exit();

// function test() {
// 	console.log('test fnc');
// }
// function writeTest() {
// 	jsonfile.writeFile('./aaa.json', { aaa: 111 });
// }

// function writeTestSync() {
// 	jsonfile.writeFileSync('./sync.json', { sync: 111 });
// }

// async function writeUsersSeed() {
// 	const usersData = await UserQueries.getAllUsers();

// 	jsonfile.writeFile(usersFile, usersData, error => {
// 		console.error(error);
// 	});
// 	console.log(`Users saved to ${usersFile}`);
// }
// async function writeBatchesSeed() {
// 	const batchesData: Batch[] = await BatchQueries.getAllBatches();
// 	jsonfile.writeFile(batchesFile, batchesData, error => {
// 		console.error(error);
// 	});
// 	console.log(`Batches saved to ${batchesFile}`);
// }
// async function writeStashesSeed() {
// 	const stashesData: Stash[] = await StashQueries.getAllStashes();
// 	stashesData.forEach(stash => {
// 		delete stash.stashId;
// 	});
// 	jsonfile.writeFile(stashesFile, stashesData, error => {
// 		console.error(error);
// 	});
// 	console.log(`Stashes saved to ${stashesFile}`);
// }
