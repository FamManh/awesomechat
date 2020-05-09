import React, { useRef, useEffect } from "react";
import { Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import selectors from "./selectors";
import userSelectors from "../UserPage/selectors";
import { CallWrapper } from "./style/CallWrapper";
import {Phone} from 'react-feather'
import actions from './actions'
import {
    emitCallEnded,
} from "./socket";

const StreamModal = () => {
    let localVideoRef = useRef();
    let remoteVideoRef = useRef();
    const dispatch = useDispatch();
    const currentUser = useSelector(userSelectors.selectCurrentUser);
    const callStatus = useSelector(selectors.selectStatus);
    const caller = useSelector(selectors.selectCaller);
    const listener = useSelector(selectors.selectListener);
    const localStream = useSelector(selectors.selectLocalStream);
    const remoteStream = useSelector(selectors.selectRemoteStream);
    const peer = useSelector(selectors.selectPeer)

    useEffect(() => {
        if (
            localVideoRef.current ||
            (localVideoRef.current &&
                localVideoRef.current.srcObject !== localStream)
        ) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);
    useEffect(() => {
        if (
            remoteVideoRef.current ||
            (remoteVideoRef.current &&
                remoteVideoRef.current.srcObject !== remoteStream)
        ) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const handleCallEnded = () => {
        const remoteId =
            listener.id === currentUser.id ? caller.id : listener.id;
        emitCallEnded({ id: remoteId });
        dispatch(actions.doCallEnded());
    };

    return (
        <Modal
            visible={callStatus === "streaming"}
            footer={null}
            closable={false}
            width={"100%"}
            height={"100%"}
            centered={true}
            bodyStyle={{
                padding: 0,
                width: "100vw",
                height: "100vh",
                overflowY: "hidden",
            }}
        >
            <CallWrapper>
                <div className="action-buttons">
                    {/* <Button
                        icon="camera"
                        type="primary"
                        shape="circle"
                    ></Button>
                    <Button
                        icon="audio"
                        type="primary"
                        shape="circle"
                    ></Button> */}
                    <Button
                        // icon="phone"
                        type="danger"
                        shape="round"
                        onClick={handleCallEnded}
                    >
                        <Phone  strokeWidth={2}/>
                    </Button>
                </div>
                <video
                    className="caller-video"
                    ref={localVideoRef}
                    autoPlay={true}
                    muted={true}
                ></video>

                <video
                    className="listener-video"
                    ref={remoteVideoRef}
                    autoPlay={true}
                ></video>
            </CallWrapper>
        </Modal>
    );
};

export default StreamModal
