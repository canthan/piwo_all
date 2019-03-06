const MongoClient = require('mongodb').MongoClient;
const commander = require('commander');

commander
    .version('0.0.1')
    .description('Initial population script for users, batches and stashes.')
    .option('-s, --server [value]', 'Server to be populated. default: localhost')
    .parse(process.argv);

if (!commander.server) {
    commander.server = 'localhost';
}

console.log(`Populating users, batches and stashes to ${commander.server.toLocaleUpperCase()}...`);

const databases = [
    {
        port: 27017,
        name: 'users',
        collection: 'users',
        mock: require('./mocks/_users.json'),
    },
    {
        port: 27018,
        name: 'batches',
        collection: 'batches',
        mock: require('./mocks/_batches.json'),
    },
    {
        port: 27019,
        name: 'stashes',
        collection: 'stashes',
        mock: require('./mocks/_stashes.json'),
    },
];

databases.forEach(database => {
    const url = `mongodb://${commander.server}:${database.port}`;

    // Use connect method to connect to the server
    MongoClient.connect(url, (err, client) => {
        if (err) {
            throw Error(`Connection failed to ${url.toLocaleUpperCase()}`);
            return false;
        }

        console.log(`Connected successfully to ${url.toLocaleUpperCase()}`);

        const db = client.db(database.name);
        const collection = db.collection(database.collection);

        // Remove the current data to not duplicate, after that will add the mock data.
        collection.deleteMany({}, () => {
            collection.insertMany(database.mock, () => {
                console.log(`Populated successfully to ${url.toLocaleUpperCase()}`);
                client.close();
            });
        });
    });
});
