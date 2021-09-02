import axios, { AxiosResponse } from 'axios';

const baseURL = `https://nitrotype.com/api`;

class APIClient {
    credentials: {
        username: string
        password: string
    }

    states: {
        login: boolean
    }

    constructor () {
        this.states = {
            login: false
        };
    }

    /**
     * Send a GET request to the NitroType API.
     * @param url The URL parameter. Should begin with a forward slash.
     */
    private get = async (url: string): Promise<AxiosResponse> => {
        return await axios.get(baseURL + url);
    }

    /**
     * Send a POST request to the NitroType API.
     * @param url The URL parameter. Should begin with a forward slash.
     * @param data An optional payload to send with the request. Should be an object.
     */
    private post = async (url: string, data?: unknown): Promise<AxiosResponse> => {
        return data !== undefined
            ? await axios.post(baseURL + url)
            : await axios.post(baseURL + url, data);
    }

    /**
     * Log into the account.
     * @param loginOpts The login parameters. Should be an object containing username and password keys.
     */
    login = async (loginOpts: { username: string, password: string }): Promise<void> => {
        if (this.states.login) throw Error(`The client has already logged in to the API.`);

        this.credentials = loginOpts;

        const loginRes = await this.post(`/login`, loginOpts);

        if (loginRes.status === 200) this.states.login = true;
        else throw Error(`The client could not log into the API.`);
    }

    /**
     * Log out of the account.
     */
    destroy = async (): Promise<void> => {
        if (!this.states.login) throw Error(`The client is not currently logged in to the API.`);

        const loginRes = await this.post(`/logout`);

        if (loginRes.status === 200) this.states.login = false;
        else throw Error(`The client could not log out of the API.`);
    }
}

export default APIClient;
