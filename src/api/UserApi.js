import axiosClient from "./axiosClient"

export const UserApi = {
    get_All: () => {
        const endpoint = `/user/users`;
        return axiosClient.get(endpoint);
    },
    get: () => {
        const endpoint = `/user`;
        return axiosClient.get(endpoint);
    },
    // post: (data) => {
    //     const endpoint = `/user`;
    //     return axiosClient.post(endpoint, data);
    // },
    update: (params, data) => {
        const endpoint = `/user/${params}`;
        return axiosClient.patch(endpoint, data);
    },
    delete: (params) => {
        const endpoint = `/user/${params}`;
        return axiosClient.delete(endpoint);
    },
    post_login: (data) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const endpoint = `/user/login`;
                    const response = await axiosClient.post(endpoint, data);
                    resolve(response);
                } catch (error) {
                    reject(error);
                }
            }, 2000)
        })

    }
}