import React, { useState, useEffect } from "react";
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
    Tooltip
} from "antd";
import {
    CheckCircle,
    Heart,
    RefreshCcw,
    Star,
    Phone,
    Video,
    UserPlus,
    MoreHorizontal,
    Users,
    MessageCircle,
    Bell,
    Search as SearchIcon
} from "react-feather";
import { Link, useLocation } from "react-router-dom";
import authActions from "../AuthPage/actions";
import { getUserInfo } from "../shared/getUserInfo";
import MessageList from "./MessageList";
import ContactList from "../ContactPage/list/List";
import UserList from "../UserPage/list/List";
import { isAuthenticated } from "../shared/routes/permissionChecker";
import { useSelector, useDispatch } from "react-redux";
import userSelectors from '../UserPage/selectors'
import ModalCreateGroupchat from "./ModalCreateGroupchat";
import AvatarCus from "../../components/AvatarCus";

const { Sider, Header } = Layout;
const { Search } = Input;

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



function ChatSidebar() {
    const dispatch = useDispatch()
    const [currentTab, setCurrentTab] = useState("message");
    const [modalCreateGroupChatVisible, setModalCreateGroupChatVisible] = useState(false)
    const currentUser = useSelector(userSelectors.selectCurrentUser);

    const messageFooter = (
        <div className="py-3 px-3" style={{ backgroundColor: "#fff" }}>
            <Search placeholder="Search contact" />
        </div>
    );

    const messagesSidebar = () => {
        if (currentTab === "contact") {
            return <ContactList />;
        } else if (currentTab === "notification") {
            return <div>Notifications</div>;
        } else if (currentTab === "user") {
            return <UserList/>;
        }
        return <MessageList />;
    };

    const handleMenuClick = e => {
        setCurrentTab(e.key);
    };

    const messageHeader = (
        <Menu
            mode="horizontal"
            className="border-0"
            selectedKeys={[currentTab]}
            onClick={handleMenuClick}
        >
            <Menu.Item
                key="message"
                style={{
                    width: "25%",
                    textAlign: "center"
                }}
            >
                <MessageCircle size={20} strokeWidth={1} />
            </Menu.Item>
            <Menu.Item
                key="contact"
                style={{
                    width: "25%",
                    textAlign: "center"
                }}
            >
                <Badge dot={true}>
                    <Users size={20} strokeWidth={1} />
                </Badge>
            </Menu.Item>
            <Menu.Item
                key="user"
                style={{
                    width: "25%",
                    textAlign: "center"
                }}
            >
                <SearchIcon size={20} strokeWidth={1} />
            </Menu.Item>
            <Menu.Item
                key="notification"
                style={{
                    width: "25%",
                    textAlign: "center"
                }}
            >
                <Badge dot={true}>
                    <Bell size={20} strokeWidth={1} />
                </Badge>
            </Menu.Item>
        </Menu>
    );

    const menu = (
        <Menu style={{ width: "150px" }}>
            {currentUser && (
                <Menu.Item key="0">
                    <Link to={`/user/${currentUser.id}/update`}>
                        Update info
                    </Link>
                </Menu.Item>
            )}
            {currentUser && (
                <Menu.Item key="1">
                    <Link to={`/user/${currentUser.id}/update-password`}>
                        Change password
                    </Link>
                </Menu.Item>
            )}
            <Menu.Item key="2">
                <a>Settings</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" onClick={()=>dispatch(authActions.doSignout())}>
                <a>Sign out</a>
            </Menu.Item>
        </Menu>
    );

    const userInfo = (
        <Header
            style={{
                display: "flex",
                alignItems: "center",
                padding: "0.3rem 1.5rem",
                zIndex: "1",
                boxShadow:
                    "0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02)",
                height: "auto",
                lineHeight: "auto",
                backgroundColor: "#fff",
            }}
        >
            <Row type="flex" align="middle">
                <AvatarCus record={currentUser ? currentUser : null} />
                <span className="ml-3" style={{ lineHeight: "1" }}>
                    <span style={{ display: "block" }}>
                        {currentUser
                            ? `${currentUser.firstname} ${currentUser.lastname}`
                            : ""}
                    </span>
                    <small className="text-muted">
                        <span>Online</span>
                    </small>
                </span>
            </Row>
            <span className="mr-auto" />
            <div>
                <Tooltip title="Settings">
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button
                            className="ant-dropdown-link"
                            style={{ border: "0" }}
                            shape="circle"
                            icon="setting"
                        ></Button>
                    </Dropdown>
                </Tooltip>
                <Tooltip title="Create new group chat">
                    <Button
                        icon="edit"
                        shape="circle"
                        style={{ border: "0" }}
                        onClick={() =>
                            setModalCreateGroupChatVisible(
                                !modalCreateGroupChatVisible
                            )
                        }
                    ></Button>
                </Tooltip>
            </div>
        </Header>
    );

    return (
        <Sider width={350}>
            <ModalCreateGroupchat
                visible={modalCreateGroupChatVisible}
                doToggle={() =>
                    setModalCreateGroupChatVisible(!modalCreateGroupChatVisible)
                }
            />
            <div
                style={{
                    display: "flex",
                    flex: "1",
                    flexDirection: "column",
                    backgroundColor: "#fff",
                    height: "100%",
                    borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                }}
            >
                {userInfo}
                {messageHeader}
                {/* {messageFooter} */}
                {messagesSidebar()}
            </div>
        </Sider>
    );
}

export default ChatSidebar;
