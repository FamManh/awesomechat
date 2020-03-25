import io from "socket.io-client";
import { isAuthenticated } from "./shared/routes/permissionChecker";
import {onAddContact} from './ContactPage/socket'

const endpoint = process.env.REACT_APP_SOCKET_ENDPOINT;
let socket = null;

const onConnected = () => {
    console.log("socket: connected.");
};

const onDisconnect = () => {
    console.log("socket: disconnect");
};

export const configSocket = () => {
    socket = io.connect(endpoint, {
        query: `token=${isAuthenticated()}`
    });
    socket.on("connect", onConnected);
    socket.on("disconnect", onDisconnect);

    socket.on("add-new-contact", onAddContact);
    return socket;
}

export default function getSocket(){
    return socket;
}
