import asapi from "../../api/asapi";
import asmediaapi from "../../api/asmediaapi";

const services = {
    listFn: async ({ term }) => {
        let url = "/user";
        url = term ? url + `?term=${term}` : url;
        const response = await asapi.get(url);
        return response;
    },

    findFn: async (id) => {
        const response = await asapi.get(`/user/${id}`);
        return response;
    },

    getCurrent: async () => {
        const response = await asapi.get(`/user/current`);
        return response;
    },

    createFn: async (id) => {
        const response = await asapi.post(`/user/${id}`);
        return response;
    },

    updateFn: async (user) => {
        const response = await asapi.patch(`/user`, user);
        return response;
    },

    updatePasswordFn: async (user) => {
        const response = await asapi.patch(`/user/change-password`, user);
        return response;
    },

    updateMediaFn: async (data) => {
        const response = await asmediaapi.post(`/user/avatar`, data);
        return response;
    },

    destroyFn: async (id) => {
        const response = await asapi.delete(`/user/${id}`);
        return response;
    },
};

export default services;
