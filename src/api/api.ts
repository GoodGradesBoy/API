import { spawn } from 'child_process';

const baseURL = `https://nitrotype.com/api`;

class APIClient {
    get = (uri: string): unknown => {
        return spawn(`python`, [
            `./api.py`,
            `--method GET`,
            `--url ${baseURL + uri}`
        ]);
    }

    post = (uri: string, data: unknown): unknown => {
        return spawn(`python`, [
            `./api.py`,
            `--method POST`,
            `--url ${baseURL + uri}`,
            `--data ${data ? JSON.stringify(data) : JSON.stringify({})}`
        ]);
    }
}

export default APIClient;
