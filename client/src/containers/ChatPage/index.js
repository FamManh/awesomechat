import React, { useEffect } from "react";
import { Layout, Row, Result } from "antd";

import Sidebar from "./Sidebar";
import ChatContent from "./ChatContent";
import actions from './actions'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RightSideBar from "./RightSidebar";
import selectors from "./selectors";
export default function ChatPage() {
    const rightSidebarVisible = useSelector(selectors.selectRightSidebarVisible)
    const record = useSelector(selectors.selectRecord);

    const dispatch = useDispatch();
    let {userId} = useParams();
    useEffect(() => {
        dispatch(actions.list());
    }, []);
    useEffect(() => {
        if(userId){
            dispatch(actions.doFind(userId));
        }
    }, [userId]);
    
    
    return (
        <Layout style={{ height: "100vh", backgroundColor: "#fff" }}>
            <Layout className="fill-workspace rounded shadow-sm overflow-hidden">
                <Sidebar />
                {record ? (
                    <>
                        <ChatContent />
                        {rightSidebarVisible && <RightSideBar />}
                    </>
                ) : (
                    <Row
                        type="flex"
                        align="middle"
                        justify="center"
                        className="px-3 bg-white mh-page"
                        style={{ minHeight: "100vh", width: "100%" }}
                    >
                        <Result
                            icon={<img width="300" src="/logo-chat.png" />}
                            title="Welcome to Awesome Chat"
                            subTitle="On Being Awesome"
                        />
                    </Row>
                )}
            </Layout>
        </Layout>
    );
}
