import { BASE_URL } from '../constants';
import fetch_isomorphic from 'isomorphic-fetch';
type ConfigType = {
    method?: string;
    data?: any;
    token?: string;
};
type ConfigFormType = {
    data: FormData;
    token: string;
    method?: string;
};
const api = {
    callJson: async (
        url: string,
        { data, method = 'GET', token }: ConfigType = {}
    ) => {
        const _url = `${BASE_URL}${url}`;
        let _config: any = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        if (token) {
            _config.headers['Authorization'] = `Bearer ${token}`;
        }
        return await fetch_isomorphic(_url, _config).then((response) =>
            response.json()
        );
    },
    callFormData: async (
        url: string,
        { data, method = 'POST', token }: ConfigFormType
    ) => {
        const _url = `${BASE_URL}${url}`;
        const _config = {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: data,
        };

        return await fetch_isomorphic(_url, _config).then((response) =>
            response.json()
        );
    },

    //     return fetch(URL, config).then((res) => res.json());
    // },
    // callWithAuth: async (url: string, data: any, method: string = 'GET') => {
    //     const _url = `${BASE_URL}${url}`;
    //     const config = {
    //         method,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authentication: 'Bearer ',
    //         },
    //         body: JSON.stringify(data),
    //     };

    //     return await fetch_isomorphic(_url, config).then((response) =>
    //         response.json()
    //     );
    // },
};

export default api;
