import asapi from "../../api/asapi";

const services = {
    listFn: async ({ term }) => {
        let url = "/user";
        url = term ? url + `?term=${term}` : url;
        const response = await asapi.get(url);
        return response;
    },
    getListFn: async () => {
        const response = await asapi.get(`/message`);
        return response;
    },

    findFn: async id => {
        const response = await asapi.get(`/message/${id}`);
        return response;
    },

    createFn: async info => {
        const response = await asapi.post(`/message`, info);
        return response;
    },

    updateFn: async (id, message) => {
        const response = await asapi.patch(`/message?user=${id}`, message);
        return response;
    },

    destroyFn: async id => {
        const response = await asapi.delete(`/message?user=${id}`);
        return response;
    }
};

export default services;
