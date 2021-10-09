import axios from "axios";

import queryString from 'query-string'
import { getToken } from "utils/common";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "content-type": "application/json"
    },
    paramsSerializer: params => queryString.stringify(params)
});


axiosClient.interceptors.request.use(async config => {
    //handle token
    const token = getToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
})

axiosClient.interceptors.response.use(response => {

    if (response && response.data) return response.data;
}, (err) => {
    throw err;
})


export default axiosClient;
