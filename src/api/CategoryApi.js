import axiosClient from "./axiosClient"

export const CategoryApi = {
    get_All: () => {
        const endpoint = `/categories`;
        return axiosClient.get(endpoint);
    },
    post: (data) => {

        return new Promise((resolve, reject) => {

            setTimeout(async () => {
                try {
                    const endpoint = `/categories`;
                    const response = await axiosClient.post(endpoint, data);
                    resolve(response);
                } catch (error) {
                    reject(error)
                }
            }, 2000)

        })

    },
    update: (params, data) => {
        return new Promise((resolve, reject) => {

            setTimeout(async () => {
                try {
                    const endpoint = `/categories/${params}`;
                    const response = await axiosClient.patch(endpoint, data);
                    resolve(response);
                } catch (error) {
                    reject(error)
                }
            }, 2000)

        })
    },
    delete: (params) => {
        const endpoint = `/categories/${params}`;
        return axiosClient.delete(endpoint);
    },
}