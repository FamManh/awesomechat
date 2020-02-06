export const getUserInfo = () => {
    let data = window.localStorage.getItem("asauth");
    return JSON.parse(data).user;
};
