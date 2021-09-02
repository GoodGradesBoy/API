import axios, { AxiosPromise, AxiosResponse } from 'axios';

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
     * @param data 
     */
    private post = async (url: string, data?: any): Promise<AxiosResponse> => {
        return typeof data !== undefined
            ? await axios.post(baseURL + url)
            : await axios.post(baseURL + url, data);
    }

    /**
     * Log into the account.
     * @param loginOpts The login parameters. Should be an object containing username and password keys.
     */
    login = (loginOpts: typeof this.credentials): void => {
        if (this.states.login) throw Error(`The client has already logged in to the API.`);  

        this.credentials = loginOpts;
        this.post(`/login`, loginOpts);

        this.states.login = true;
    }
}

export default APIClient;