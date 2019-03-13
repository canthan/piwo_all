// tslint:disable no-any
import * as nconf from 'nconf';
import * as path from 'path';

export enum AppConfig {
    LISTENING_PORT = 'LISTENING_PORT',
    MONGODB_USERS_URI = 'MONGODB_USERS_URI',
    MONGODB_BATCHES_URI = 'MONGODB_BATCHES_URI',
    MONGODB_STASHES_URI = 'MONGODB_STASHES_URI',
    MONGODB_RECONNECT_ATTEMPTS = 'MONGODB_RECONNECT_ATTEMPTS',
    MONGODB_RECONNECT_INTERVAL = 'MONGODB_RECONNECT_INTERVAL',
    ENV_MODE = 'ENV_MODE',
    SERVICE_NAME = 'SERVICE_NAME',
}

class Config {
    public load = () => {
        nconf.env().argv();
        const environment = nconf.get('NODE_ENV') || 'development';

        nconf.file(path.join(__dirname, `config/config.${environment.toLowerCase()}.json`));
    };

    public get = (key: string) => nconf.get(key);
}

export default new Config();
