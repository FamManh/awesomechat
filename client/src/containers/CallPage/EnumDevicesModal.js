import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import selectors from "./selectors";
import { emitAnswerCall, emitRejectCall } from "./socket";
import actions from "./actions";
import { Modal, Row, Button, Select, Divider } from "antd";
import AvatarCus from "../../components/AvatarCus";

const EnumDevicesModal = ({ visible, toggle }) => {
    const dispatch = useDispatch();
    const [audioInput, setAudioInput] = useState(null)
    const [audioOutput, setAudioOutput] = useState(null)
    const [videoInput, setVideoInput] = useState(null)
    const defaultAudioInput = useSelector(selectors.selectAudioInput);
    const defaultAudioOutput = useSelector(selectors.selectAudioOutput);
    const defaultVideoInput = useSelector(selectors.selectVideoInput);
    const localStream = useSelector(selectors.selectLocalStream)
    const remoteStream = useSelector(selectors.selectRemoteStream)
    const [devices, setDevices] = useState({})

    const onSelect = (value, name) => {
        setDevices({ ...devices, [name]: value });
    }
    const gotDevices = (deviceInfos) => {
        // Handles being called several times to update labels. Preserve values.
        let audioinput = [], audioouput =[], videoinput=[]
        deviceInfos.forEach(item=>{
            if (item.kind === "audioinput") {
                audioinput.push(item)
            }else if(item.kind === "videoinput"){
                videoinput.push(item)
            }else if(item.kind === "audiooutput"){
                audioouput.push(item)
            }
        })
        setAudioInput(audioinput);
        setAudioOutput(audioouput);
        setVideoInput(videoinput);

    };

    function attachSinkId(element, sinkId) {
        if (typeof element.sinkId !== "undefined") {
            element
                .setSinkId(sinkId)
                .then(() => {
                    console.log(
                        `Success, audio output device attached: ${sinkId}`
                    );
                })
                .catch((error) => {
                    let errorMessage = error;
                    if (error.name === "SecurityError") {
                        errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
                    }
                    console.error(errorMessage);
                    // Jump back to first output device in the list as it's the default.
                });
        } else {
            console.warn("Browser does not support output device selection.");
        }
    }

    const onOk = () => {
        dispatch(actions.doSetAudioVideoSource(devices));
        toggle()
        if(devices.audioOutput){
           attachSinkId(remoteStream, devices.audioOutput);
        }
    }
    
    useEffect(() => {
        navigator.mediaDevices
            .enumerateDevices()
            .then(gotDevices)
            .catch((err) => console.log(err));
    }, [])
    return (
        <Modal visible={visible} onCancel={toggle} title="Settings" onOk={onOk}>
            <Row
                type="flex"
                align="middle"
                justify="center"
                className="px-1 bg-white mh-page"
                style={{ minHeight: "80%", minWidth: "80%" }}
            >
                {audioInput && audioInput.length > 0 && (
                    <>
                        <div style={{ width: "100%", display: "flex" }}>
                            <div style={{ width: "30%" }}>Microphone</div>
                            <Select
                                onChange={(value) =>
                                    onSelect(value, "audioInput")
                                }
                                name="audioInput"
                                defaultValue={
                                    defaultAudioInput || audioInput[0].deviceId
                                }
                                style={{ width: "70%" }}
                            >
                                {audioInput.map((item, key) => (
                                    <Select.Option
                                        key={key}
                                        value={item.deviceId}
                                    >
                                        {item.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <Divider />{" "}
                    </>
                )}
                {audioOutput && audioOutput.length > 0 && (
                    <>
                        <div style={{ width: "100%", display: "flex" }}>
                            <div style={{ width: "30%" }}>Audio Output</div>
                            <Select
                                onChange={(value) =>
                                    onSelect(value, "audioOutput")
                                }
                                defaultValue={
                                    defaultAudioOutput ||
                                    audioOutput[0].deviceId
                                }
                                style={{ width: "70%" }}
                            >
                                {audioOutput.map((item, key) => (
                                    <Select.Option
                                        key={key}
                                        value={item.deviceId}
                                    >
                                        {item.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <Divider />
                    </>
                )}
                {videoInput && videoInput.length > 0 && (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ width: "30%" }}>Video source</div>
                        <Select
                            onChange={(value) => onSelect(value, "videoInput")}
                            defaultValue={
                                defaultVideoInput || videoInput[0].deviceId
                            }
                            style={{ width: "70%" }}
                        >
                            {videoInput.map((item, key) => (
                                <Select.Option key={key} value={item.deviceId}>
                                    {item.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                )}
            </Row>
        </Modal>
    );
};
export default EnumDevicesModal;
