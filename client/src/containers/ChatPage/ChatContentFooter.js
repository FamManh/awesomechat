import React, { useState, useRef } from "react";
import { Upload, Button, Input, Popover } from "antd";
import { Image, Send, Smile, Paperclip } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import selectors from "./selectors";
import actions from "./actions";
import constants from "./constants";
import userSelectors from "../UserPage/selectors";
import layoutSelectors from '../Layout/selectors'
import { Picker } from "emoji-mart";
import { emitTypingOn, emitTypingOff } from "./socket";
import { isAuthenticated } from "../shared/routes/permissionChecker";

let typingTimer = null;

function delay(callback, ms) {
    window.clearTimeout(typingTimer);
    typingTimer = setTimeout(function () {
        callback();
    }, 1500);
}

function ChatContentFooter() {
    const inputMessageRef = useRef();
    const dispatch = useDispatch();
    const [emojiVisible, setEmojiVisible] = useState(false);
    const [typing, setTyping] = useState(false);
    const record = useSelector(selectors.selectRecord);
    const currentUser = useSelector(userSelectors.selectCurrentUser);
    const inputMessage = useSelector(selectors.selectInputMessage);
    const isMobileDevice = useSelector(layoutSelectors.selectIsMobileDevice);

    const handleTypingOff = () => {
        emitTypingOff({
            info: currentUser,
            receiver: record.receiver,
            conversationType: record.conversationType,
        });
    };

    const onInputMessageChange = (message) => {
        dispatch({
            type: constants.INPUT_MESSAGE_CHANGE,
            payload: message,
        });
        if (message.trim() === "") {
            handleTypingOff();
        }
    };

    const onInputImageListChange = ({ fileList }) => {
        dispatch({
            type: constants.INPUT_IMAGE_LIST_CHANGE,
            payload: [...fileList],
        });
    };

    const onInputFileListChange = ({ fileList }) => {
        dispatch({
            type: constants.INPUT_FILE_LIST_CHANGE,
            payload: [...fileList],
        });
    };

    const addEmoji = (e) => {
        onInputMessageChange(inputMessage.text + e.native);
        if (!isMobileDevice) inputMessageRef.current.focus();
    };

    const sendText = () => {
        if (
            inputMessage.text.trim() !== ""
        ) {
            // Gửi text và emoji
            dispatch(
                actions.doCreate({
                    message: inputMessage.text,
                    receiver: record.receiver.id,
                    conversationType: record.conversationType,
                })
            );
            onInputMessageChange("");
        }
    };

    const sendImage = () => {
        // Nếu đang uploading thì không gửi
        let uploading = false;
        inputMessage.images.forEach((item) => {
            if (item.status === "uploading") uploading = true;
        });
        if (uploading) return;
        if (inputMessage.images.length > 0) {
            // gửi hình ảnh
            let images = [];
            inputMessage.images.forEach((item) => {
                if (item.response.name) {
                    images.push(item.response.name);
                }
            });

            dispatch(
                actions.doCreate({
                    images,
                    type: "image",
                    receiver: record.receiver.id,
                    conversationType: record.conversationType,
                })
            );
            onInputImageListChange({ fileList: [] });
        }
    };

    const sendFile = () => {
        // Nếu đang uploading thì không gửi
        let uploading = false
        inputMessage.files.forEach((item) => {
            if (item.status === "uploading") uploading = true;
        });
        if(uploading) return;
        if (inputMessage.files.length > 0) {
            // gửi file
            let files = [];
            inputMessage.files.forEach((item) => {
                if (item.response.name) {
                    files.push({
                        name: item.name,
                        path: item.response.name,
                    });
                }
            });

            dispatch(
                actions.doCreate({
                    files,
                    type: "file",
                    receiver: record.receiver.id,
                    conversationType: record.conversationType,
                })
            );
            onInputFileListChange({ fileList: [] });
        }
    };

    const handleSendClick = () => {
        sendText();
        sendImage();
        sendFile();
        //   dispatch(actions.doToggleScrollToBottom());

        handleTypingOff();
        inputMessageRef.current.focus();
    };
    return (
        <>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Upload
                    accept="image/*"
                    name="photos"
                    multiple={true}
                    fileList={inputMessage.images}
                    headers={{
                        Authorization: `Bearer ${isAuthenticated()}`
                    }}
                    action={`${process.env.REACT_APP_API_URI}/message/photos`}
                    showUploadList={false}
                    onChange={(files) => {
                        onInputImageListChange(files);
                    }}
                >
                    <Button
                        shape="circle"
                        className="bg-transparent"
                        style={{ border: "0" }}
                    >
                        <Image size={20} strokeWidth={1} />
                    </Button>
                </Upload>
                <Upload
                    accept="text/plain, application/pdf, .csv, .docx, .xlsx"
                    name="files"
                    multiple={true}
                    fileList={inputMessage.files}
                    headers={{
                        Authorization: `Bearer ${isAuthenticated()}`,
                        
                    }}
                    action={`${process.env.REACT_APP_API_URI}/message/files`}
                    showUploadList={false}
                    onChange={(files) => {
                        onInputFileListChange(files);
                    }}
                >
                    <Button
                        shape="circle"
                        className="bg-transparent"
                        style={{ border: "0" }}
                    >
                        <Paperclip size={20} strokeWidth={1} />
                    </Button>
                </Upload>
                <Input
                    ref={inputMessageRef}
                    placeholder="Type a message"
                    value={inputMessage.text}
                    onChange={(e) => {
                        onInputMessageChange(e.target.value);
                    }}
                    style={{ borderRadius: "1rem", color: 'black' }}
                    onPressEnter={handleSendClick}
                    onKeyUp={() => {
                        if (!typing) {
                            setTyping(true);
                            if (inputMessage.text.trim() !== "") {
                                emitTypingOn({
                                    info: currentUser,
                                    receiver: record.receiver,
                                    conversationType: record.conversationType,
                                });
                            }
                        }
                        delay(() => {
                            handleTypingOff();
                            setTyping(false);
                        }, 1000);
                    }}
                    suffix={
                        <Popover
                            content={
                                <Picker
                                    set="facebook"
                                    sheetSize={32}
                                    onSelect={addEmoji}
                                />
                            }
                            title="Title"
                            trigger="click"
                            visible={emojiVisible}
                            onVisibleChange={() =>
                                setEmojiVisible(!emojiVisible)
                            }
                        >
                            <Smile
                                style={{ cursor: "pointer" }}
                                size={20}
                                strokeWidth={1}
                            />
                        </Popover>
                    }
                />

                <Button shape="circle" type="link" onClick={handleSendClick}>
                    <Send size={20} strokeWidth={1} />
                </Button>
            </div>
        </>
    );
}

export default ChatContentFooter;
