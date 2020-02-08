import React, { useState } from "react";
import {
    Avatar,
    Input,
    Layout,
    List,
    Menu,
    Badge,
    Row,
    Button,
    Dropdown,
    Divider
} from "antd";
const MockContacts = [
    {
        name: "Bobby Sullivan",
        status: "Mollis Nullam",
        avatar: (
            <Badge dot status="success">
                <Avatar
                    size={48}
                    style={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf"
                    }}
                >
                    B
                </Avatar>
            </Badge>
        )
    },
    {
        name: "Bryan Morgan",
        status: "Risus Justo",
        avatar: <Avatar size={48} src="/static/images/face4.jpg" />
    },
    {
        name: "Phillip Caroll",
        status: "Mollis Nibh",
        avatar: (
            <Avatar
                size={48}
                style={{
                    color: "rgb(34, 245, 0)",
                    backgroundColor: "rgb(207, 253, 219)"
                }}
            >
                P
            </Avatar>
        )
    },
    {
        name: "Brandon Boyd",
        status: "Dolor Mattis",
        avatar: <Avatar size={48} src="/static/images/face1.jpg" />
    },
    {
        name: "Laura Mason",
        status: "Commodo Amet",
        avatar: <Avatar size={48} src="/static/images/face3.jpg" />
    },
    {
        name: "Barbara Chapman",
        status: "Tellus Sollicitudin",
        avatar: <Avatar size={48} src="/static/images/face2.jpg" />
    },
    {
        name: "Barbara Chapman",
        status: "Tellus Sollicitudin",
        avatar: <Avatar size={48} src="/static/images/face2.jpg" />
    },
    {
        name: "Barbara Chapman",
        status: "Tellus Sollicitudin",
        avatar: <Avatar size={48} src="/static/images/face2.jpg" />
    },
    {
        name: "Barbara Chapman",
        status: "Tellus Sollicitudin",
        avatar: <Avatar size={48} src="/static/images/face2.jpg" />
    },
    {
        name: "Barbara Chapman",
        status: "Tellus Sollicitudin",
        avatar: <Avatar size={48} src="/static/images/face2.jpg" />
    },
    {
        name: "Barbara Chapman",
        status: "Tellus Sollicitudin",
        avatar: <Avatar size={48} src="/static/images/face2.jpg" />
    },
    {
        name: "Barbara Chapman",
        status: "Tellus Sollicitudin",
        avatar: <Avatar size={48} src="/static/images/face2.jpg" />
    },
    {
        name: "Barbara Chapman",
        status: "Tellus Sollicitudin",
        avatar: <Avatar size={48} src="/static/images/face2.jpg" />
    },
    {
        name: "Barbara Chapman",
        status: "Tellus Sollicitudin",
        avatar: <Avatar size={48} src="/static/images/face2.jpg" />
    },
    {
        name: "Barbara Chapman",
        status: "Tellus Sollicitudin",
        avatar: <Avatar size={48} src="/static/images/face2.jpg" />
    },
    {
        name: "Barbara Chapman",
        status: "Tellus Sollicitudin",
        avatar: <Avatar size={48} src="/static/images/face2.jpg" />
    },
    {
        name: "Barbara Chapman",
        status: "Tellus Sollicitudin",
        avatar: <Avatar size={48} src="/static/images/face2.jpg" />
    },
    {
        name: "Barbara Chapman",
        status: "Tellus Sollicitudin",
        avatar: <Avatar size={48} src="/static/images/face2.jpg" />
    },
    {
        name: "Barbara Chapman",
        status: "Tellus Sollicitudin",
        avatar: <Avatar size={48} src="/static/images/face2.jpg" />
    },
    {
        name: "Doris Baker",
        status: "Nibh Adipiscing",
        avatar: <Avatar size={48} src="/static/images/face1.jpg" />
    },
    {
        name: "Doris Marshall",
        status: "Tellus Sollicitudin",
        avatar: (
            <Avatar
                size={48}
                style={{
                    color: "rgb(143, 0, 245)",
                    backgroundColor: "rgb(214, 207, 253)"
                }}
            >
                D
            </Avatar>
        )
    },
    {
        name: "Andrew Weber",
        status: "Nibh Adipiscing",
        avatar: <Avatar size={48} src="/static/images/face4.jpg" />
    },
    {
        name: "John Doe",
        status: "Nibh Adipiscing",
        avatar: <Avatar size={48} src="/static/images/face5.jpg" />
    }
];

const MessageList = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <List
            className="scroll-y flex-1 bg-transparent"
            itemLayout="horizontal"
            dataSource={MockContacts}
            renderItem={(item, index) => (
                <List.Item
                    style={{}}
                    onClick={() => setSelectedIndex(index)}
                    style={{
                        backgroundColor:
                            selectedIndex === index ? "#e6f7ff" : "#fff",
                        cursor: "pointer"
                    }}
                    className={`${
                        selectedIndex === index ? "" : "border-0"
                    } border-0 px-4 py-3`}
                >
                    <List.Item.Meta
                        avatar={item.avatar}
                        title={
                            <small
                                style={{
                                    display: "flex",
                                    width: "100%"
                                }}
                            >
                                <span
                                    className={`${
                                        selectedIndex === index
                                            ? "ant-menu-item-selected"
                                            : ""
                                    } `}
                                >
                                    {item.name}
                                </span>
                            </small>
                        }
                        description={<span>{item.status}</span>}
                    />
                </List.Item>
            )}
        />
    );
};
export default MessageList;
