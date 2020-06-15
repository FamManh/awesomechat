import constants from "./constants";
import services from "./services";
import peerjs from "peerjs";
import { getPeerId, initPeer } from "./socket";
const iceServer = [
    {
        url: "stun:eu-turn8.xirsys.com",
    },
    {
        username:
            "V2Wy6D7e3SbpLCCYTkgLRkrxfnBzD3RwmnNV1tpjgsmTLg-5tsMTgaw7G1MnH_2lAAAAAF62fUxmYW1tYW5oMjE3",
        url: "turn:eu-turn8.xirsys.com:80?transport=udp",
        credential: "c1810492-91da-11ea-8393-faa4ea02ad5c",
    },
    {
        username:
            "V2Wy6D7e3SbpLCCYTkgLRkrxfnBzD3RwmnNV1tpjgsmTLg-5tsMTgaw7G1MnH_2lAAAAAF62fUxmYW1tYW5oMjE3",
        url: "turn:eu-turn8.xirsys.com:3478?transport=udp",
        credential: "c1810492-91da-11ea-8393-faa4ea02ad5c",
    },
    {
        username:
            "V2Wy6D7e3SbpLCCYTkgLRkrxfnBzD3RwmnNV1tpjgsmTLg-5tsMTgaw7G1MnH_2lAAAAAF62fUxmYW1tYW5oMjE3",
        url: "turn:eu-turn8.xirsys.com:80?transport=tcp",
        credential: "c1810492-91da-11ea-8393-faa4ea02ad5c",
    },
    {
        username:
            "V2Wy6D7e3SbpLCCYTkgLRkrxfnBzD3RwmnNV1tpjgsmTLg-5tsMTgaw7G1MnH_2lAAAAAF62fUxmYW1tYW5oMjE3",
        url: "turn:eu-turn8.xirsys.com:3478?transport=tcp",
        credential: "c1810492-91da-11ea-8393-faa4ea02ad5c",
    },
    {
        username:
            "V2Wy6D7e3SbpLCCYTkgLRkrxfnBzD3RwmnNV1tpjgsmTLg-5tsMTgaw7G1MnH_2lAAAAAF62fUxmYW1tYW5oMjE3",
        url: "turns:eu-turn8.xirsys.com:443?transport=tcp",
        credential: "c1810492-91da-11ea-8393-faa4ea02ad5c",
    },
    {
        username:
            "V2Wy6D7e3SbpLCCYTkgLRkrxfnBzD3RwmnNV1tpjgsmTLg-5tsMTgaw7G1MnH_2lAAAAAF62fUxmYW1tYW5oMjE3",
        url: "turns:eu-turn8.xirsys.com:5349?transport=tcp",
        credential: "c1810492-91da-11ea-8393-faa4ea02ad5c",
    },
];
export default {
    getPeerId: (peerId) => (dispatch) => {
        dispatch({ type: constants.CALL_GET_PEER_ID, payload: peerId });
    },
    doClear: () => (dispatch) => {
        dispatch({ type: constants.CALL_CLEAR });
    },
    doSetAudioVideoSource: (data) => dispatch=>{
        dispatch({
            type: constants.CALL_SET_AUDIO_VIDEO_SOURCE,
            payload: data,
        });
    },
    doCallEnded: () => (dispatch) => {
        dispatch({ type: constants.CALL_CALL_ENDED });
    },
    doGetIceServer: () => async (dispatch) => {
        try {
                // const response = await services.getIceServer();
                dispatch({
                    type: constants.CALL_GET_ICE_SERVER_SUCCESS,
                    payload: iceServer,
                });
                // getPeerId(response.data.ice);
                
                // getPeerId(iceServer);
                // chat.manhpham.xyz / peerjs - aschat;
                // const peer = new peerjs({
                //     key: "peerjs",
                //     host: "peerjs-achat.herokuapp.com",
                //     secure: "true",
                //     port: 443,
                //     debug: 3,
                //     // config: { iceServers: iceserver },
                // });
                // initPeer(peer);
                // dispatch({
                //     type: constants.CALL_CREATE_PEER,
                //     payload: peer,
                // });
                // peer.on("open", (peerId) => {
                //     dispatch({
                //         type: constants.CALL_GET_PEER_ID,
                //         payload: peerId,
                //     });
                // });
            } catch (error) {
            console.log(error);
        }
    },
};
