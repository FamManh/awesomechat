import io from "socket.io-client";
import { isAuthenticated } from "./shared/routes/permissionChecker";
import { onAddContact, onAcceptRequestContact } from "./ContactPage/socket";
import {
    onSentMessage,
    onCreateGroup,
    onTypingOn,
    onTypingOff,
} from "./ChatPage/socket";
import {
    onListenerOffline,
    onRequestPeerId,
    onResponeListenerPeerId,
    onRequestCall,
    onCancelRequestCall,
    onRejectCall,
    onCallerAnwserCall,
    onListenerAnwserCall,
    onCallEnded
} from "./CallPage/socket";


const endpoint = process.env.REACT_APP_SOCKET_ENDPOINT;
let socket = null;

const onConnected = () => {
    console.log("socket: connected");
};

const onDisconnect = () => {
    console.log("socket: disconnect");
};

export const configSocket = () => {
    if (socket && socket.disconnected) {
        socket.connect();
    }
    if (socket) return;
    socket = io.connect(endpoint, {
        
        path: '/chat/socket.io',
        query: `token=${isAuthenticated()}`,
        
    });
    
    socket.on("connect", onConnected);
    socket.on("disconnect", onDisconnect);
    socket.on("res-add-new-contact", onAddContact);
    socket.on("res-accept-request-contact", onAcceptRequestContact);
    socket.on("res-sent-message", onSentMessage);
    socket.on("res-create-group", onCreateGroup);
    socket.on("res-typing-on", onTypingOn);
    socket.on("res-typing-off", onTypingOff);

    // Trả về trạng thái on/off của listener
    socket.on("server-caller-listener-status", onListenerOffline);
    // lắng nghe yêu cầu peerid
    socket.on("server-listener-request-peer-id", onRequestPeerId);
    // lắng nghe peerid mà server trả về
    socket.on("server-caller-listener-peer-id", onResponeListenerPeerId);
    // lắng nghe sự kiện yêu cầu call
    socket.on("server-listener-request-call", onRequestCall);
    // lắng nghe sự kiện hủy cuộc gọi từ caller
    socket.on("server-listener-cancel-request-call", onCancelRequestCall);
    //  lắng nghe sự kiện hủy cuộc gọi từ listener
    socket.on("server-caller-reject-call", onRejectCall);
    //  lắng nghe sự kiện caller chấp nhận  cuộc gọi
    socket.on("server-caller-answer-call", onCallerAnwserCall);
    //  lắng nghe sự kiện listener chấp nhận cuộc gọi
    socket.on("server-listener-answer-call", onListenerAnwserCall);
    //  lắng nghe sự kiện listener chấp nhận cuộc gọi
    socket.on("server--call-ended", onCallEnded);
    
    return socket;
};

export const socketDisconnect = () => {
    socket.disconnect();
};

export default function getSocket() {
    return socket;
}
