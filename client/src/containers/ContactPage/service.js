import asapi from "../../api/asapi";

const services = {
    listFn: async ({ term }) => {
        let url = "/user";
        url = term ? url + `?term=${term}` : url;
        const response = await asapi.get(url);
        return response;
    },
    getListFn: async ({ type }) => {
        const response = await asapi.get(`/contact?type=${type}`);
        return response;
    },

    findFn: async id => {
        const response = await asapi.get(`/contact/${id}`);
        return response;
    },

    createFn: async id => {
        const response = await asapi.post(`/contact?user=${id}`);
        return response;
    },

    updateFn: async (id, contact) => {
        const response = await asapi.patch(`/contact?user=${id}`, contact);
        return response;
    },

    destroyFn: async id => {
        const response = await asapi.delete(`/contact?user=${id}`);
        return response;
    }
};

export default services;
