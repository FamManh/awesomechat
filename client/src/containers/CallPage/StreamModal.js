import React, { useRef, useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import selectors from "./selectors";
import userSelectors from "../UserPage/selectors";
import { CallWrapper } from "./style/CallWrapper";
import { Phone } from "react-feather";
import actions from "./actions";
import { emitCallEnded } from "./socket";
import EnumDevicesModal from './EnumDevicesModal'

const StreamModal = () => {
    let localVideoRef = useRef();
    let remoteVideoRef = useRef();
    const dispatch = useDispatch();
    const currentUser = useSelector(userSelectors.selectCurrentUser);
    const [settingModal, setSettingModal] = useState(false)
    const callStatus = useSelector(selectors.selectStatus);
    const caller = useSelector(selectors.selectCaller);
    const listener = useSelector(selectors.selectListener);
    const localStream = useSelector(selectors.selectLocalStream);
    const remoteStream = useSelector(selectors.selectRemoteStream);
    const peer = useSelector(selectors.selectPeer);

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

    const gotDevices = (deviceInfos) => {
        // Handles being called several times to update labels. Preserve values.
        console.log(deviceInfos)
    };
    navigator.mediaDevices
        .enumerateDevices()
        .then(gotDevices)
        .catch((err) => console.log(err));

    return (
        <>
            <EnumDevicesModal
                visible={settingModal}
                toggle={() => setSettingModal(!settingModal)}
            />
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
                            icon="setting"
                            type="primary"
                            shape="circle"
                            onClick={() => setSettingModal(!settingModal)}
                        ></Button>
                        <Button
                            // icon="phone"
                            type="danger"
                            shape="round"
                            onClick={handleCallEnded}
                        >
                            <Phone strokeWidth={2} />
                        </Button>
                    </div>
                    <video
                        playsInline
                        className="caller-video"
                        ref={localVideoRef}
                        autoPlay={true}
                        muted={true}
                        controls={false}
                    ></video>

                    <video
                        playsInline
                        className="listener-video"
                        ref={remoteVideoRef}
                        controls={false}
                        autoPlay={true}
                    ></video>
                </CallWrapper>
            </Modal>
        </>
    );
};

export default StreamModal;
