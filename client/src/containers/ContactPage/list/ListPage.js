import React, { useEffect } from "react";
import ListToolbar from "./ListToolbar";
import Layout from "../../Layout";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import PageTitle from "../../shared/styles/PageTitle";
import Breadcrumb from "../../shared/Breadcrumb";
import { useDispatch } from "react-redux";
import actions from '../actions';
import ListTable from "./ListTable";

const ListPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.list());
    },[])
    return (
        <React.Fragment>
            <Breadcrumb items={[["Trang chủ", "/"], ["Chi nhánh"]]} />

            <ContentWrapper>
                <PageTitle>Chi nhánh</PageTitle>

                <ListToolbar />
                <ListTable />
            </ContentWrapper>
        </React.Fragment>
    );
};

export default Layout(ListPage);
