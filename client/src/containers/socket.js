import io from 'socket.io-client';
import { isAuthenticated } from "../containers/shared/routes/permissionChecker";

const endpoint = process.env.REACT_APP_SOCKET_ENDPOINT;
console.log("Socket endpoint: " + endpoint);
const socket = io.connect(endpoint, {
    query: `token=${isAuthenticated()}`
});

export default socket;
