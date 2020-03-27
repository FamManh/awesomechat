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
import { useSelector } from "react-redux";
import selectors from "./selectors";
import { Link, useParams } from "react-router-dom";
import userSelectors from '../UserPage/selectors';

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

const MessageList = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const {userId} = useParams();
    const messages = useSelector(selectors.selectMessages);
    const currentUser = useSelector(userSelectors.selectCurrentUser);


    return (
        <List
            style={{marginTop: "5px"}}
            className="scroll-y flex-1 bg-transparent"
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(item, index) => {
                let user = item.sender._id === currentUser.id ? item.receiver : item.sender;
                return (
                    <Link to={`/m/${user._id}`}>
                        <List.Item
                            style={{
                                backgroundColor:
                                    user._id === userId ? "#e6f7ff" : "#fff",
                                cursor: "pointer",
                                borderRadius: "0.8rem"
                            }}
                            className={`${
                                selectedIndex === index ? "" : "border-0"
                            } border-0 px-4 py-3`}
                        >
                            <List.Item.Meta
                                avatar={getAvatar(user)}
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
                                            style={{fontSize: "14px"}}
                                        >
                                            {user.firstname +
                                                " " +
                                                user.lastname}
                                        </span>
                                    </small>
                                }
                                description={<span>{item.lastMessage}</span>}
                            />
                        </List.Item>
                    </Link>
                );
            }}
        />
    );
};
export default MessageList;
