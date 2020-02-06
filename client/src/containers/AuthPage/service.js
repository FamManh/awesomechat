import asapi from "../../api/asapi";

export const fetchSignin = async ({ email, password }) => {
    const response = await asapi.post("/auth/login", {
        email,
        password
    });
    return response;
};

export const fetchSignup = async ({ firstname, lastname, email, password }) => {
    const response = await asapi.post("/auth/register", {
        firstname,
        lastname,
        email,
        password
    });
    return response;
};
