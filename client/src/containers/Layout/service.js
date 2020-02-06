// call api
// process.env.REACT_APP_API_URI
import axios from 'axios';
import sgapi from '../../api/sgapi';

const fetchSignin = async (username, password) => {
    const response = await sgapi.post("/auth/login", {
        username,
        password
    });
    return response;
}

export { fetchSignin };
