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
    Tooltip,
    Collapse,
    Icon,
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
    Search as SearchIcon,
} from "react-feather";
import { Link, useLocation } from "react-router-dom";
import authActions from "../AuthPage/actions";
import { getUserInfo } from "../shared/getUserInfo";
import MessageList from "./MessageList";
import ContactList from "../ContactPage/list/List";
import UserList from "../UserPage/list/List";
import { isAuthenticated } from "../shared/routes/permissionChecker";
import { useSelector } from "react-redux";
import userSelectors from "../UserPage/selectors";
import ModalCreateGroupchat from "./ModalCreateGroupchat";
import selectors from "./selectors";

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

const ButtonCus = ({text, icon, onClick}) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                justifyItems: "center",
                cursor: "pointer",
                height: "40px",
                lineHeight: "40px",
            }}
            onClick={onClick}
        >
            <span>{text}</span>
            {/* <Button
                icon="stop"
                shape="circle"
                style={{ border: "0px" }}
            ></Button> */}
            <span>
                <Icon type={icon} />
            </span>
        </div>
    );
}

function RightSideBar() {
    const currentUser = useSelector(userSelectors.selectCurrentUser);
    const record = useSelector(selectors.selectRecord);
    const userInfo = (
        <Header
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0.3rem 1.5rem",
                zIndex: "1",
                boxShadow:
                    "0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02)",
                height: "auto",
                lineHeight: "auto",
                backgroundColor: "#fff",
                marginTop: "30px",
            }}
        >
            <Row>
                <div>{getAvatar(record ? record.receiver : null, 100)}</div>
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {record ? (record.conversationType === "ChatGroup"
                        ? `${record.receiver.name}`
                        : `${record.receiver.firstname} ${record.receiver.lastname}`):null}
                </div>
            </Row>
        </Header>
    );
    console.log(record)

    const text = (
        <p style={{ paddingLeft: 24 }}>
            A dog is a type of domesticated animal. Known for its loyalty and
            faithfulness, it can be found as a welcome guest in many households
            across the world.
        </p>
    );
    const renderContent = () => {
        return (
            <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                    <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
                expandIconPosition="right"
            >
                <Collapse.Panel
                    header={
                        <span style={{ color: "rgba(126, 126, 126, 0.85)" }}>
                            OPTIONS
                        </span>
                    }
                    key="1"
                >
                    <ButtonCus text="Blocks Message" icon="stop" onClick={()=>alert("Clicked")}/>
                   
                </Collapse.Panel>
                <Collapse.Panel
                    header={
                        <span style={{ color: "rgba(126, 126, 126, 0.85)" }}>
                            SHARED PHOTOS
                        </span>
                    }
                    key="2"
                >
                    {text}
                </Collapse.Panel>
            </Collapse>
        );
    };

    return (
        <Sider width={350}>
            <div
                style={{
                    display: "flex",
                    flex: "1",
                    flexDirection: "column",
                    backgroundColor: "#fff",
                    height: "100%",
                    borderLeft: "1px solid rgba(0, 0, 0, 0.05)",
                }}
            >
                {userInfo}
                {renderContent()}
            </div>
        </Sider>
    );
}

export default RightSideBar;
