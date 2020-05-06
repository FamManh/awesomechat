import React, { useEffect } from "react";
import { Layout, Row, Result } from "antd";
import layoutSelectors from "../Layout/selectors";
import Sidebar from "./Sidebar";
import ChatContent from "./ChatContent";
import actions from "./actions";
import contactActions from '../ContactPage/actions'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RightSideBar from "./RightSidebar";
import selectors from "./selectors";
import layoutActions from "../Layout/actions";

export default function ChatPage() {
    const dispatch = useDispatch();
    let { userId } = useParams();
    const rightSidebarVisible = useSelector(
        layoutSelectors.selectRightSidebarVisible
    );
    const isMobileDevice = useSelector(layoutSelectors.selectIsMobileDevice);
    const leftSidebarVisible = useSelector(
        layoutSelectors.selectLeftSidebarVisible
    );
    const record = useSelector(selectors.selectRecord);

    const windowOnResize = () => {
        dispatch(layoutActions.doWindowResize(window.innerWidth));
    };

    useEffect(() => {
        dispatch(actions.list());
        dispatch(contactActions.listRequests());
        windowOnResize(window.innerWidth);
        window.addEventListener("resize", windowOnResize);
        return () => {
            window.removeEventListener("resize", windowOnResize);
        };
    }, []);
    useEffect(() => {
        if (userId) {
            dispatch(actions.doFind(userId));
            // dispatch(layoutActions.doHideRightSidebar())
        }
    }, [userId]);

    if (record) {
        dispatch(layoutActions.doHideLeftSidebar());
    }

    return (
        <Layout style={{ height: "100vh", backgroundColor: "#fff" }}>
            <Layout className="fill-workspace rounded shadow-sm overflow-hidden">
                
                <Sidebar />
                {record ? (
                    <>
                        <ChatContent />
                        {rightSidebarVisible && <RightSideBar />}
                    </>
                ) : !isMobileDevice ? (
                    <Row
                        type="flex"
                        align="middle"
                        justify="center"
                        className="px-3 bg-white mh-page"
                        style={{
                            minHeight: "100vh",
                            width: "100%"
                        }}
                    >
                        <Result
                            icon={<img width="300" src="/logo-chat.png" />}
                            title="Welcome to Awesome Chat"
                            subTitle="On Being Awesome"
                        />
                    </Row>
                ) : null}
            </Layout>
        </Layout>
    );
}
