import { spawn } from 'child_process';
import { platform } from 'process';
import { resolve } from 'path';

const baseURL = `https://nitrotype.com/api`;
const pyBin = platform === `win32` ? `py` : `python`;

class APIClient {
    get = (uri: string): unknown => {
        return spawn(pyBin, [
            resolve(__dirname, `./api.py`),
            `--method GET`,
            `--url ${baseURL + uri}`
        ]);
    }

    post = (uri: string, data: unknown): unknown => {
        return spawn(pyBin, [
            resolve(__dirname, `./api.py`),
            `--method POST`,
            `--url ${baseURL + uri}`,
            `--data ${data ? JSON.stringify(data) : JSON.stringify({})}`
        ]);
    }
}

export default APIClient;
