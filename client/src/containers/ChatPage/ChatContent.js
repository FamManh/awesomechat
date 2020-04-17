import React, { useRef, useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import "./picturewallStyle.css";
import {
    Button,
    Layout,
    Row,
    Result,
    Icon,
} from "antd";
import ChatStyled from "./styles/chat";
import {
    Phone,
    Video,
    Info
} from "react-feather";
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
const { Header } = Layout;


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
                    icon={<Icon type="smile" theme="twoTone" />}
                    title="Welcome to Awesome Chat"
                    subTitle="Slogan of Awesome Chat"
                />
            </Row>
        );
    }

    return (
        <Layout style={{ position: "relative" }}>
            <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.3rem 2rem",
                    zIndex: "1",
                    boxShadow:
                        "0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02)",
                    height: "auto",
                    lineHeight: "auto",
                    backgroundColor: "#fff",
                }}
            >
                <Row type="flex" align="middle">
                    <AvatarCus record={record ? record.receiver : null} />

                    <span className="ml-3" style={{ lineHeight: "1" }}>
                        <span style={{ display: "block" }}>
                            {record
                                ? record.conversationType === "ChatGroup"
                                    ? record.receiver.name
                                    : `${record.receiver.firstname} ${record.receiver.lastname}`
                                : ""}
                        </span>
                        <small className="text-muted">
                            <span>Online</span>
                        </small>
                    </span>
                </Row>
                <span className="mr-auto" />
                <div>
                    {record && record.conversationType === "User" && (
                        <>
                            <Button
                                shape="circle"
                                style={{ border: "0" }}
                                onClick={() => alert("Ban da nhan vao link")}
                            >
                                <Phone size={20} strokeWidth={1} />
                            </Button>
                            <Button style={{ border: "0" }} shape="circle">
                                <Video size={20} strokeWidth={1} />
                            </Button>
                        </>
                    )}
                    <Button
                        style={{ border: "0" }}
                        shape="circle"
                        onClick={() => dispatch(actions.doToggleRightSidebar())}
                    >
                        <Info size={20} strokeWidth={1} />
                    </Button>
                </div>
            </Header>
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
