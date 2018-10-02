const jsonfile = require('jsonfile');
const queries_users = require('./queries/users');
const queries_batches = require('./queries/batches');
const queries_stashes = require('./queries/stashes');
const path = require('path');

const BASE_PATH = path.join(__dirname);

const users_file = `${BASE_PATH}/seeds/1_users.json`;
const batches_file = `${BASE_PATH}/seeds/2_batches.json`;
const stashes_file = `${BASE_PATH}/seeds/3_stashes.json`;

writeUsersSeed();
writeBatchesSeed();
writeStashesSeed();

async function writeUsersSeed() {
  const users_data = await queries_users.getAllUsers();
  jsonfile.writeFile(users_file, users_data, (error) => { console.error(error) });
}
async function writeBatchesSeed() {
  const batches_data = await queries_batches.getAllBatches();
  jsonfile.writeFile(batches_file, batches_data, (error) => { console.error(error) });
}
async function writeStashesSeed() {
  const stashes_data = await queries_stashes.getAllStashes();
  stashes_data.forEach((stash) => {
    delete stash.stash_id;
  });
  jsonfile.writeFile(stashes_file, stashes_data, (error) => { console.error(error) });
}
