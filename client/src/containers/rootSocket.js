import io from "socket.io-client";
import { isAuthenticated } from "./shared/routes/permissionChecker";
import {onAddContact} from './ContactPage/socket'
import {onSentMessage} from './ChatPage/socket'

const endpoint = process.env.REACT_APP_SOCKET_ENDPOINT;
let socket = null;

const onConnected = () => {
    console.log("socket: connected.");
};

const onDisconnect = () => {
    console.log("socket: disconnect");
};

export const configSocket = () => {
    if(socket) return;
    socket = io.connect(endpoint, {
        query: `token=${isAuthenticated()}`
    });
    socket.on("connect", onConnected);
    socket.on("disconnect", onDisconnect);
    socket.on("res-add-new-contact", onAddContact);
    socket.on("res-sent-message", onSentMessage)
    
    return socket;
}

export const socketDisconnect = () => {
    socket = null;
}

export default function getSocket(){
    return socket;
}
