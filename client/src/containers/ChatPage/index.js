import React from "react";
import { Layout } from "antd";

import Sidebar from "./Sidebar";
import Content from "./Content";

export default function ChatPage() {
    return (
        <Layout style={{ height: "100vh", backgroundColor: "#fff" }}>
            <Layout className="fill-workspace rounded shadow-sm overflow-hidden">
                <Sidebar />
                <Content />
            </Layout>
        </Layout>
    );
}
