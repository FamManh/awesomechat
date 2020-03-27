import React, { useState, useRef, useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
// import "antd/dist/antd.css";
import {
    Avatar,
    Button,
    Input,
    Layout,
    Row,
    Tooltip,
    Result,
    Icon
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
    Smile
} from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import selectors from "./selectors";
import actions from "./actions";
import userSelectors from "../UserPage/selectors";

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
    return (
        <Avatar
            size={size}
            style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf"
            }}
        >
            {record.firstname[0].toUpperCase() +
                record.lastname[0].toUpperCase()}
        </Avatar>
    );
};

function ChatContent() {
    const scrollRef = useRef(null);
    const inputMessageRef = useRef();
    const dispatch = useDispatch();
    const record = useSelector(selectors.selectRecord);
    const currentUser = useSelector(userSelectors.selectCurrentUser);
    const [message, setMessage] = useState("");
    const [emojiVisible, setEmojiVisible] = useState(false)
    const scrollToBottom = () =>
        scrollRef.current.scrollIntoView({ behavior: "smooth" });

    const renderMessage = messages => {
        let lastReceiverId = "";
        return messages.map((chat, index) => {
            if (index > 0) {
                lastReceiverId = messages[index - 1];
            }
            return (
                <div
                    key={index}
                    style={{ display: "flex", justifyContent: "flex-start" }}
                >
                    {lastReceiverId !== chat.receiver._id ? (
                        <div style={{ margin: "10px 0 0 0" }}></div>
                    ) : null}
                    <div style={{ width: 30 }}>
                        {chat.sender._id !== currentUser.id &&
                            getAvatar(record.receiver, 30)}
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
                            <div className={`body body-sent`}>
                                <p color="inherit">{chat.message}</p>
                            </div>
                        ) : (
                            <div className={`body body-received text-body`}>
                                <p color="inherit">{chat.message}</p>
                            </div>
                        )}
                    </div>
                </div>
            );
        });
    };

    const handleSendClick = () => {
        if (message.trim() === "") {
            setMessage("");
            return;
        }
        setMessage("");
        dispatch(actions.doCreate({ message, receiver: record.receiver.id }));
        setEmojiVisible(false)
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

    const addEmoji = e => {
        setMessage(message+e.native)
        inputMessageRef.current.focus();
    }

    const renderEmojiPicker = () => {
        if(emojiVisible){
            return (
                <span>
                    <Picker
                        set="facebook"
                        sheetSize={32}
                        onSelect={addEmoji}
                        style={{
                            position: "absolute",
                            bottom: "40px",
                            right: "40px"
                        }}
                    />
                </span>
            );
        }
        return null
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
                    backgroundColor: "#fff"
                }}
            >
                <Row type="flex" align="middle">
                    {getAvatar(record ? record.receiver : null)}

                    <span className="ml-3" style={{ lineHeight: "1" }}>
                        <span style={{ display: "block" }}>
                            {record
                                ? `${record.receiver.firstname} ${record.receiver.lastname}`
                                : ""}
                        </span>
                        <small className="text-muted">
                            <span>Online</span>
                        </small>
                    </span>
                </Row>
                <span className="mr-auto" />
                <div>
                    <Button
                        style={{ border: "0" }}
                        onClick={() => alert("Ban da nhan vao link")}
                    >
                        <Phone size={20} strokeWidth={1} />
                    </Button>
                    <Button style={{ border: "0" }}>
                        <Video size={20} strokeWidth={1} />
                    </Button>
                    <Button style={{ border: "0" }}>
                        <Info size={20} strokeWidth={1} />
                    </Button>
                </div>
            </Header>
            <ChatStyled ref={scrollRef}>
                <>{record && renderMessage(record.messages)}</>
            </ChatStyled>
            <div className="px-3 py-2" style={{ background: "#f9f9f9" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button className="bg-transparent" style={{ border: "0" }}>
                        <Image size={20} strokeWidth={1} />
                    </Button>
                    <Button className="bg-transparent" style={{ border: "0" }}>
                        <Anchor size={20} strokeWidth={1} />
                    </Button>
                    <Button className="bg-transparent" style={{ border: "0" }}>
                        <Mic size={20} strokeWidth={1} />
                    </Button>
                    <Input ref={inputMessageRef}
                        placeholder="Type a message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        style={{ borderRadius: "1rem" }}
                        onPressEnter={handleSendClick}
                        suffix={
                            <Smile
                                style={{ cursor: "pointer" }}
                                size={20}
                                strokeWidth={1}
                                onClick={() => setEmojiVisible(!emojiVisible)}
                            />
                        }
                    />
                    {renderEmojiPicker()}

                    <Button type="link" onClick={handleSendClick}>
                        <Send size={20} strokeWidth={1} />
                    </Button>
                </div>
            </div>
        </Layout>
    );
}

export default ChatContent;
