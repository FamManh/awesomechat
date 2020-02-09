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
    Divider,
    Icon,
    Tooltip
} from "antd";
import {
    PhoneCall,
    Phone,
    Video,
    UserPlus,
    UserMinus,
    MessageCircle,
    UserCheck,
    UserX
} from "react-feather";
import Search from "antd/lib/input/Search";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions";
import selectors from "../selectors";
import contactActions from "../../ContactPage/actions";
import contactSelectors from "../../ContactPage/selectors";
const UserList = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch = useDispatch();
    const users = useSelector(selectors.selectUsers);
    const handleSearch = term => {
        dispatch(actions.list({ term }));
    };

    const searchbar = (
        <div className="py-3 px-3" style={{ backgroundColor: "#fff" }}>
            <Search placeholder="Search contact" onSearch={handleSearch} />
        </div>
    );

    const handleAddContactClick = userInfo => {
        dispatch(contactActions.doCreate(userInfo));
    };

    const handleRemoveContactClick = userInfo => {
        if (userInfo.type === "request") {
            dispatch(contactActions.doDestroyRequest(userInfo));
        } else if (userInfo.type === "requestSent") {
            dispatch(contactActions.doDestroyRequestSent(userInfo));
        } else if (userInfo.type === "contact") {
            dispatch(contactActions.doDestroyContact(userInfo));
        }
    };

    const handleConfirmContactClick = userInfo => {
        dispatch(contactActions.doUpdate(userInfo));
    };
    const renderFriendsList = () => {
        return (
            <List
                className="scroll-y flex-1 bg-transparent"
                itemLayout="horizontal"
                dataSource={users}
                renderItem={(item, index) => (
                    <List.Item
                        onClick={() => setSelectedIndex(index)}
                        className={`"border-0" border-0 px-4 py-3`}
                    >
                        <List.Item.Meta
                            avatar={
                                <Badge dot status="success">
                                    <Avatar
                                        size={48}
                                        style={{
                                            color: "#f56a00",
                                            backgroundColor: "#fde3cf"
                                        }}
                                    >
                                        {item.firstname[0].toUpperCase() +
                                            item.lastname[0].toUpperCase()}
                                    </Avatar>
                                </Badge>
                            }
                            title={
                                <span
                                    style={{
                                        display: "flex",
                                        width: "100%"
                                    }}
                                >
                                    {item.firstname + " " + item.lastname}
                                </span>
                            }
                            description={
                                <>
                                    {!!item.type && item.type === "notContact" && (
                                        <Tooltip title="Add Contact">
                                            <Button
                                                type="primary"
                                                size="small"
                                                onClick={() =>
                                                    handleAddContactClick(item)
                                                }
                                            >
                                                Add Contact
                                            </Button>
                                        </Tooltip>
                                    )}
                                    {!!item.type && item.type === "request" && (
                                        <>
                                            <Tooltip title="Confirm request">
                                                <Button
                                                    type="primary"
                                                    size="small"
                                                    onClick={() =>
                                                        handleConfirmContactClick(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Confirm
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Remove request">
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        handleRemoveContactClick(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </Tooltip>
                                        </>
                                    )}
                                    {!!item.type &&
                                        item.type === "requestSent" && (
                                            <Tooltip title="Cancel request">
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        handleRemoveContactClick(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Cancel Request
                                                </Button>
                                            </Tooltip>
                                        )}
                                    {!!item.type && item.type === "contact" && (
                                        <>
                                            <Tooltip title="Remove contact">
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        handleRemoveContactClick(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Remove Contact
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Send a message">
                                                <a
                                                    href="#"
                                                    style={{
                                                        margin: "0px 3px"
                                                    }}
                                                >
                                                    <MessageCircle
                                                        size={20}
                                                        strokeWidth={2}
                                                    />
                                                </a>
                                            </Tooltip>
                                        </>
                                    )}
                                    {!!item.type && item.type === "you" && (
                                        <span>You</span>
                                    )}
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        );
    };
    return (
        <>
            {searchbar}
            {renderFriendsList()}
        </>
    );
};
export default UserList;
