import React, { useEffect } from "react";
import { Layout } from "antd";

import Sidebar from "./Sidebar";
import Content from "./Content";
import contactActions from '../ContactPage/actions';
import {onAddNewContact} from '../ContactPage/socket';
import { useDispatch } from "react-redux";
export default function ChatPage() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        // onAddNewContact((error, data)=>{
        //     dispatch(contactActions.doAdded(data));
        // }); 
    }, []);
    return (
        <Layout style={{ height: "100vh", backgroundColor: "#fff" }}>
            <Layout className="fill-workspace rounded shadow-sm overflow-hidden">
                <Sidebar />
                <Content />
            </Layout>
        </Layout>
    );
}
