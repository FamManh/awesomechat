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
    Divider
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
const { Sider, Header } = Layout;
const { Search } = Input;

function ChatSidebar() {

    const [currentTab, setCurrentTab] = useState("user");

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
                <Users size={20} strokeWidth={1} />
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
                <Bell size={20} strokeWidth={1} />
            </Menu.Item>
        </Menu>
    );

    const menu = (
        <Menu style={{ width: "150px" }}>
            <Menu.Item key="0">
                <a>Update info</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a>Change password</a>
            </Menu.Item>
            <Menu.Item key="2">
                <a>Settings</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" onClick={authActions.doSignout}>
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
                    <span style={{ display: "block" }}>
                        {getUserInfo() &&
                            getUserInfo().lastname +
                                " " +
                                getUserInfo().firstname}
                    </span>
                    <small className="text-muted">
                        <span>Online</span>
                    </small>
                </span>
            </Row>
            <span className="mr-auto" />
            <div>
                <Dropdown overlay={menu} trigger={["click"]}>
                    <Button
                        className="ant-dropdown-link"
                        style={{ border: "0" }}
                    >
                        <MoreHorizontal size={20} strokeWidth={1} />
                    </Button>
                </Dropdown>
            </div>
        </Header>
    );

    return (
        <Sider width={300}>
            <div
                style={{
                    display: "flex",
                    flex: "1",
                    flexDirection: "column",
                    backgroundColor: "#fff",
                    height: "100%",
                    borderRight: "1px solid rgba(0, 0, 0, 0.05)"
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
