import React from "react";
// import "antd/dist/antd.css";
import { Avatar, Button, Input, Layout, Row, Tooltip, Icon } from "antd";
import ChatStyled from "./styles/chat";

import { Anchor, Image, Send, Mic, Phone, Video, Info } from "react-feather";

const { Header } = Layout;
const { TextArea } = Input;

function ChatContent() {
    const date = Date.now();

    const MockChats = [
        {
            message: "Hey.",
            type: "received",
            date: new Date(date - 1000 * 60 * 60 * 10)
        },
        {
            message: "How are the wife and kids Taylor?",
            type: "received",
            date: new Date(date - 1000 * 60 * 60 * 6)
        },
        {
            message: "Pretty good Samuel.",
            type: "sent",
            date: new Date(date - 1000 * 60 * 60 * 3)
        },
        {
            message: "Cras mattis consectetur purus sit amet fermentum.",
            type: "received",
            date: new Date(date - 1000 * 60 * 60 * 2)
        },
        {
            message: "Goodnight.",
            type: "sent",
            date: new Date(date - 1000 * 60 * 60 * 1)
        },
        {
            message:
                "Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.",
            type: "received",
            date: new Date(date - 1000 * 60 * 30)
        },
        {
            message:
                "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.",
            type: "sent",
            date: date
        },
        {
            message: "Received it thanks 😀",
            type: "received",
            date: new Date(date - 1000 * 60 * 20)
        },
        {
            message: "Received it thanks 😀",
            type: "received",
            date: new Date(date - 1000 * 60 * 20)
        },
        {
            message: "Received it thanks 😀",
            type: "received",
            date: new Date(date - 1000 * 60 * 20)
        },
        {
            message: "Received it thanks 😀",
            type: "received",
            date: new Date(date - 1000 * 60 * 20)
        },
        {
            message: "Received it thanks 😀",
            type: "received",
            date: new Date(date - 1000 * 60 * 20)
        },
        {
            message: "Received it thanks 😀",
            type: "received",
            date: new Date(date - 1000 * 60 * 20)
        },
        {
            message: "Received it thanks 😀",
            type: "received",
            date: new Date(date - 1000 * 60 * 20)
        },
        {
            message: "Received it thanks 😀",
            type: "received",
            date: new Date(date - 1000 * 60 * 20)
        },
        {
            message: "Received it thanks 😀",
            type: "received",
            date: new Date(date - 1000 * 60 * 20)
        },
        {
            message: "Received it thanks 😀",
            type: "received",
            date: new Date(date - 1000 * 60 * 20)
        },
        {
            message: "You're welcome 👍🏿",
            type: "sent",
            date: new Date(date - 1000 * 60 * 10)
        },
        {
            message: "Typing...",
            type: "received",
            date: date
        }
    ];
    return (
        <Layout>
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
                    <Avatar
                        shape="circle"
                        size={40}
                        src="/static/images/avatar.jpg"
                    />
                    <span className="ml-3" style={{ lineHeight: "1" }}>
                        <span style={{ display: "block" }}>John Doe</span>
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
            <ChatStyled>
                <>
                    {MockChats.map((chat, index) => (
                        <div
                            key={index}
                            className={`conversation
                       						 ${
                                                 chat.type === "sent"
                                                     ? "conversation-sent"
                                                     : "conversation-received"
                                             }`}
                        >
                            <div
                                className={` body shadow-sm
                          					${
                                                chat.type === "sent"
                                                    ? "body-sent"
                                                    : "body-received text-body"
                                            }`}
                            >
                                <p color="inherit">{chat.message}</p>
                                <p
                                    variant="caption"
                                    className={`date
                            						${
                                                        chat.type === "sent"
                                                            ? "date-sent"
                                                            : "date-received"
                                                    } `}
                                >
                                    {/* {format(chat.date, 'hh:mm')} */}
                                </p>
                            </div>
                        </div>
                    ))}
                </>
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

                    <TextArea
                        placeholder="Type a message"
                        autoSize={{ maxRows: 4 }}
                        suffix={
                            <Tooltip title="Extra information">
                                <Icon
                                    type="info-circle"
                                    style={{ color: "rgba(0,0,0,.45)" }}
                                />
                            </Tooltip>
                        }
                    />
                    <Button type="link">
                        <Send size={20} strokeWidth={1} />
                    </Button>
                </div>
            </div>
        </Layout>
    );
}

export default ChatContent;
