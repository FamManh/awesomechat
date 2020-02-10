import axios from "axios";
import { isAuthenticated } from "../containers/shared/routes/permissionChecker";

const asmediaapi = axios.create({
    baseURL: `${process.env.REACT_APP_API_URI}`
});

asmediaapi.interceptors.request.use(
    config => {
        if (isAuthenticated()) {
            config.headers["Authorization"] = "Bearer " + isAuthenticated();
        }
        config.headers["Content-Type"] =
            "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s";
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

export default asmediaapi;
