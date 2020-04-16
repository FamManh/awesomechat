import React, { useEffect, useState } from "react";
import { Layout } from "antd";

import Sidebar from "./Sidebar";
import Content from "./Content";
import actions from './actions'
import userActions from '../UserPage/actions'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RightSideBar from "./RightSidebar";
import selectors from "./selectors";
export default function ChatPage() {
    const rightSidebarVisible = useSelector(selectors.selectRightSidebarVisible)
    const dispatch = useDispatch();
    let {userId} = useParams();
    useEffect(() => {
        dispatch(actions.list());
    }, []);
    useEffect(() => {
        dispatch(actions.doFind(userId));
    }, [userId]);
    
    
    return (
        <Layout style={{ height: "100vh", backgroundColor: "#fff" }}>
            <Layout className="fill-workspace rounded shadow-sm overflow-hidden">
                <Sidebar />
                <Content />
                {rightSidebarVisible && <RightSideBar />}
            </Layout>
        </Layout>
    );
}
