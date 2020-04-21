import React from "react";
import {
    Icon,List
} from "antd";
import { useSelector } from "react-redux";
import selectors from "./selectors";
import { Link, useParams } from "react-router-dom";
import userSelectors from "../UserPage/selectors";
import AvatarCus from "../../components/AvatarCus";

const MessageList = () => {
    const { userId } = useParams();
    const messages = useSelector(selectors.selectMessages);
    const currentUser = useSelector(userSelectors.selectCurrentUser);

    if (messages && messages.length > 0) {
        return (
            <List
                style={{ marginTop: "5px" }}
                className="scroll-y flex-1 bg-transparent"
                itemLayout="horizontal"
                dataSource={messages}
                renderItem={(item, index) => {
                    if (!currentUser) return;
                    let user = "";
                    if (item.conversationType === "ChatGroup") {
                        user = item.receiver;
                    } else {
                        user =
                            item.sender._id === currentUser.id
                                ? item.receiver
                                : item.sender;
                    }
                    return (
                        <Link to={`/m/${user._id}`}>
                            <List.Item
                                style={{
                                    backgroundColor:
                                        user._id === userId
                                            ? "#e6f7ff"
                                            : "#fff",
                                    cursor: "pointer",
                                    borderRadius: "0.8rem",
                                }}
                                className={`${
                                    user._id === userId ? "" : "border-0"
                                } border-0 px-4 py-3`}
                            >
                                <List.Item.Meta
                                    avatar={<AvatarCus record={user} />}
                                    title={
                                        <small
                                            style={{
                                                display: "flex",
                                                width: "100%",
                                            }}
                                        >
                                            <span style={{ fontSize: "14px" }}>
                                                {item.conversationType ===
                                                "ChatGroup"
                                                    ? item.receiver.name
                                                    : user.firstname +
                                                      " " +
                                                      user.lastname}
                                            </span>
                                        </small>
                                    }
                                    description={
                                        <p
                                            style={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                width: "200px",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {item.type === "text" ? (
                                                item.message ? item.message : ""
                                            ) : item.type === "image" ? (
                                                <>
                                                    <Icon type="file-image" />
                                                    Photo(s)
                                                </>
                                            ) : item.type === "file" ? (
                                                <>
                                                    <Icon type="paper-clip" />
                                                    File(s)
                                                </>
                                            ) : null}
                                        </p>
                                    }
                                />
                            </List.Item>
                        </Link>
                    );
                }}
            />
        );
    }
    return null
};
export default MessageList;
