import React, { useState, useRef, useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import "./picturewallStyle.css";
import {
    Avatar,
    Button,
    Input,
    Layout,
    Row,
    Tooltip,
    Result,
    Icon,
    Popover,
    Upload,
} from "antd";
import ChatStyled from "./styles/chat";
import format from "date-fns/format";
import {
    Anchor,
    Image,
    Send,
    Mic,
    Phone,
    Video,
    Info,
    Smile,
    Paperclip,
} from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import selectors from "./selectors";
import actions from "./actions";
import userSelectors from "../UserPage/selectors";
import PicturesWall from "./PicturesWall";
import ImageUploadList from "./ImageUploadList";
import constants from "./constants";
import Carousel from "react-images";
const { Header } = Layout;
const { TextArea } = Input;

const getAvatar = (record, size = 40) => {
    if (!record) return <Avatar size={size} icon="user" />;

    if (record.picture) {
        return (
            <Avatar
                shape="circle"
                size={size}
                src={process.env.REACT_APP_STATIC_URI + "/" + record.picture}
            />
        );
    }

    if (record.firstname && record.lastname) {
        return (
            <Avatar
                size={size}
                style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                }}
            >
                {record.firstname[0].toUpperCase() +
                    record.lastname[0].toUpperCase()}
            </Avatar>
        );
    }

    return <Avatar size={size} icon="team" />;
};

function ChatContent() {
    const scrollRef = useRef();
    const inputMessageRef = useRef();
    const dispatch = useDispatch();
    const record = useSelector(selectors.selectRecord);
    const currentUser = useSelector(userSelectors.selectCurrentUser);
    const inputMessage = useSelector(selectors.selectInputMessage);
    const [emojiVisible, setEmojiVisible] = useState(false);
    const [toggleImagesUpload, setToggleImagesUpload] = useState(false);

    const scrollToBottom = () =>{
        if(scrollRef.current) 
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
        ;
    useEffect(() => {
        scrollToBottom();
        return () => {
            // scrollToBottom();
        };
    }, [record]);

    const onInputMessageChange = (message) => {
        dispatch({
            type: constants.INPUT_MESSAGE_CHANGE,
            payload: message,
        });
    };

    const onInputImageListChange = ({ fileList }) => {
        dispatch({
            type: constants.INPUT_IMAGE_LIST_CHANGE,
            payload: [...fileList],
        });
    };

    const addEmoji = (e) => {
        onInputMessageChange(inputMessage.text + e.native);
        inputMessageRef.current.focus();
    };

    const handleSendClick = () => {
        if (
            inputMessage.text.trim() !== "" &&
            inputMessage.images.length === 0
        ) {
            dispatch(
                actions.doCreate({
                    message: inputMessage.text,
                    receiver: record.receiver.id,
                    conversationType: record.conversationType,
                })
            );
            onInputMessageChange("");
        }
        if (inputMessage.images.length > 0) {
            let images = [];
            inputMessage.images.forEach((item) => {
                images.push(item.response.path);
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


    const renderMessage = (messages) => {
        let lastReceiverId = "";
        return messages.map((chat, index) => {
            if (index > 0) {
                lastReceiverId = messages[index - 1];
            }
            return (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                    }}
                >
                    {lastReceiverId !== chat.receiver._id ? (
                        <div style={{ margin: "10px 0 0 0" }}></div>
                    ) : null}
                    <div style={{ width: 30 }}>
                        {chat.sender._id !== currentUser.id &&
                            getAvatar(
                                record.conversationType === "ChatGroup"
                                    ? chat.sender
                                    : record.receiver,
                                30
                            )}
                    </div>
                    <div
                        key={index}
                        className={`conversation
                       						 ${
                                                 chat.sender._id ===
                                                 currentUser.id
                                                     ? "conversation-sent"
                                                     : "conversation-received"
                                             }`}
                    >
                        {chat.sender._id === currentUser.id ? (
                            // Nếu người gửi là user hiện tại
                            <>
                                {chat.type === "text" ? (
                                    <div className={`body body-sent`}>
                                        <p color="inherit">{chat.message}</p>
                                    </div>
                                ) : chat.type === "image" &&
                                  chat.images.length > 0 ? (
                                    <div
                                        className={`body-sent-no-backdround`}
                                        style={{ maxWidth: "80%" }}
                                    >
                                        {chat.images.map((image, key) => (
                                            <div
                                                key={key}
                                                style={{
                                                    backgroundImage: `url(${image})`,
                                                }}
                                                className="photo"
                                            ></div>
                                        ))}
                                    </div>
                                ) : null}
                            </>
                        ) : (
                            // Nếu người gửi không phải là user hiện tại
                            <>
                                {chat.type === "text" ? (
                                    <div
                                        className={`body body-received text-body`}
                                    >
                                        <p
                                            style={{
                                                color: "#868686",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {chat.sender.firstname + " " + chat.sender.lastname}
                                        </p>
                                        <p color="inherit">{chat.message}</p>
                                    </div>
                                ) : chat.type === "image" &&
                                  chat.images.length > 0 ? (
                                    <div style={{ maxWidth: "80%" }}>
                                        {chat.images.map((image, key) => (
                                            <div
                                                key={key}
                                                style={{
                                                    backgroundImage: `url(${image})`,
                                                }}
                                                className="photo"
                                            ></div>
                                        ))}
                                    </div>
                                ) : null}
                            </>
                        )}
                    </div>
                </div>
            );
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
                    {getAvatar(record ? record.receiver : null)}

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
                <>{record && renderMessage(record.messages)}</>
            </ChatStyled>
            <div className="px-3 py-2" style={{ background: "#f9f9f9" }}>
                <ImageUploadList
                    fileList={inputMessage.images}
                    onDelete={(fileList) =>
                        onInputImageListChange({ fileList })
                    }
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Upload
                        accept=".jpg , .png , .jpeg"
                        name="photos"
                        multiple={true}
                        fileList={inputMessage.images}
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
                            // onClick={() =>
                            //     setToggleImagesUpload(!toggleImagesUpload)
                            // }
                        >
                            <Image size={20} strokeWidth={1} />
                        </Button>
                    </Upload>
                    
                    <Button
                        shape="circle"
                        className="bg-transparent"
                        style={{ border: "0" }}
                        onClick={() =>
                            setToggleImagesUpload(!toggleImagesUpload)
                        }
                    >
                        <Paperclip size={20} strokeWidth={1} />
                    </Button>
                    <Input
                        ref={inputMessageRef}
                        placeholder="Type a message"
                        value={inputMessage.text}
                        onChange={(e) => {
                            onInputMessageChange(e.target.value);
                        }}
                        style={{ borderRadius: "1rem" }}
                        onPressEnter={handleSendClick}
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

                    <Button
                        shape="circle"
                        type="link"
                        onClick={handleSendClick}
                    >
                        <Send size={20} strokeWidth={1} />
                    </Button>
                </div>
                {toggleImagesUpload && (
                    <div style={{ marginTop: "5px" }}>
                        <PicturesWall />
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default ChatContent;
