import { Layout as AntLayout } from "antd";
import React, { Component } from "react";
import Header from "./Header";
import LayoutWrapper from "./styles/LayoutWrapper";
import Menu from "./Menu";
import NoteDrawer from "../NotePage/list/NoteDrawer";
const { Content } = AntLayout;

const Layout = WrappedComponent => class extends Component {
    
    render() {
      return (
          <LayoutWrapper>
              <NoteDrawer />
              <Menu url={this.props.match.url} />

              <AntLayout>
                  <Header />

                  <Content>
                      <WrappedComponent {...this.props} />
                  </Content>
              </AntLayout>
          </LayoutWrapper>
      );
    }}

export default Layout;
