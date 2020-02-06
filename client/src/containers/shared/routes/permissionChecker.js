export const isAuthenticated = () => {
    if (typeof window === "undefined") return true;
    let data = window.localStorage.getItem("asauth");

    if (data) {
        let token = JSON.parse(data).token.accessToken;
        if (token) return token;
    }
    return false;
};
