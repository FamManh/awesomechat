import React, { useRef, useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import "./picturewallStyle.css";
import {
    Button,
    Layout,
    Row,
    Result,
    Icon,
    Spin,
} from "antd";
import ChatStyled from "./styles/chat";
import { useSelector, useDispatch } from "react-redux";
import selectors from "./selectors";
import actions from "./actions";
import userSelectors from "../UserPage/selectors";
import ImageUploadList from "./ImageUploadList";
import constants from "./constants";
import FileUploadList from "./FileUploadList";
import Conversation from "./Conversation";
import AvatarCus from "../../components/AvatarCus";
import ChatContentFooter from "./ChatContentFooter";
import ChatContentHeader from "./ChatContentHeader";



function ChatContent() {
    const scrollRef = useRef();
    const dispatch = useDispatch();
    const record = useSelector(selectors.selectRecord);
    const inputMessage = useSelector(selectors.selectInputMessage);
    

    const scrollToBottom = () => {
        if (scrollRef.current)
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    };
    useEffect(() => {
        scrollToBottom();
    }, [record]);

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

    if (!record) {
        return (
            <Row
                type="flex"
                align="middle"
                justify="center"
                className="px-3 bg-white mh-page"
                style={{ minHeight: "100vh", width: "100%" }}
            >
                <Result
                    icon={<img width="300" src="/logo-chat.png" />}
                    title="Welcome to Awesome Chat"
                    subTitle="On Being Awesome"
                />
            </Row>
        );
    }

    return (
        <Layout style={{ position: "relative" }}>
            <ChatContentHeader />
            <ChatStyled ref={scrollRef}>
                {record && <Conversation messages={record.messages} />}
            </ChatStyled>
            <div className="px-3 py-2" style={{ background: "#f9f9f9" }}>
                {inputMessage && inputMessage.images.length > 0 && (
                    <ImageUploadList
                        fileList={inputMessage.images}
                        onDelete={(fileList) =>
                            onInputImageListChange({ fileList })
                        }
                    />
                )}
                {inputMessage && inputMessage.files.length > 0 && (
                    <FileUploadList
                        onDelete={(fileList) =>
                            onInputFileListChange({ fileList })
                        }
                        fileList={inputMessage.files}
                    />
                )}
                <ChatContentFooter />
            </div>
        </Layout>
    );
}

export default ChatContent;
