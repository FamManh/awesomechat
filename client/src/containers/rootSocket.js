import io from "socket.io-client";
import { isAuthenticated } from "./shared/routes/permissionChecker";
import { onAddContact } from "./ContactPage/socket";
import { onSentMessage, onCreateGroup, onTypingOn, onTypingOff } from "./ChatPage/socket";

const endpoint = process.env.REACT_APP_SOCKET_ENDPOINT;
let socket = null;
let socketConnected = false;

const onConnected = () => {
    console.log("socket: connected");
    socketConnected = true;
    socket.on("disconnect", onDisconnect);
    socket.on("res-add-new-contact", onAddContact);
    socket.on("res-sent-message", onSentMessage);
    socket.on("res-create-group", onCreateGroup);
    socket.on("res-typing-on", onTypingOn);
    socket.on("res-typing-off", onTypingOff);
};
;

const onDisconnect = () => {
    console.log("socket: disconnect");
    socketConnected = false;
    socket = null;
};

export const configSocket = async () => {
    if (!!socket || socketConnected) return;
    
    socket = await io.connect(endpoint, {
        query: `token=${isAuthenticated()}`
    });

    socket.on("connect", onConnected);
    return socket;
};

export const socketDisconnect = () => {
    socket.disconnect();
    socketConnected = false;

    socket = null;
};

export default function getSocket() {
    return socket;
}
