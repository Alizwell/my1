import axios from 'axios';

export let appConfig = {};

export const appConfiguration = axios.get(process.env.PUBLIC_URL + '/config/api.config.json')
    .then(res => {
        appConfig = res.data;
        return appConfig;
    });

