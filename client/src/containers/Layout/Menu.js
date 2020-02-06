import { Layout as AntLayout, Menu as AntMenu, Icon } from "antd";
import React, { useEffect, useState } from "react";
import SiderWrapper from "./styles/SiderWrapper";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import selectors from "./selectors";
import actions from "./actions";
import routes from "../routes";
const { Sider } = AntLayout;

const Menu = ({ url }) => {
    const dispatch = useDispatch();
    const [selectedKeys, setSelectedKeys] = useState(null);
    let hideMenu = () => {
        dispatch(actions.doHideMenu());
    };

    let showMenu = () => {
        dispatch(actions.doShowMenu());
    };

    let toggleMenuOnResize = () => {
        window.innerWidth < 576 ? hideMenu() : showMenu();
    };

    let getSelectedKeys = () => {
        const match = routes.privateRoutes.find(option => {
            return setSelectedKeys([url]);
        });

        if (match) {
            return setSelectedKeys([match.path]);
        }

        return null;
    };

    useEffect(() => {
        toggleMenuOnResize();
        window.addEventListener("resize", toggleMenuOnResize);
        getSelectedKeys();
        return () => {
            window.removeEventListener("resize", toggleMenuOnResize);
        };
    },[]);
    return (
        <SiderWrapper
            style={{
                display: useSelector(selectors.selectMenuVisible)
                    ? "block"
                    : "none"
            }}
        >
            <Sider theme="light" trigger={null}>
                <div className="logo">
                    <h2>Saigon</h2>
                </div>

                <AntMenu
                    theme="light"
                    mode="inline"
                    selectedKeys={selectedKeys}
                >
                        {routes.privateRoutes
                            .filter(privateRoute => !!privateRoute.menu)
                            .map(route => (
                                <AntMenu.Item key={route.path}>
                                    <Link to={route.path}>
                                        <Icon type={route.icon} />
                                        <span>{route.label}</span>
                                    </Link>
                                </AntMenu.Item>
                            ))}
                        {routes.publicRoutes
                            .filter(publicRoute => !!publicRoute.menu)
                            .map(route => (
                                <AntMenu.Item key={route.path}>
                                    <Link to={route.path}>
                                        <Icon type={route.icon} />
                                        <span>{route.label}</span>
                                    </Link>
                                </AntMenu.Item>
                            ))}
                </AntMenu>
            </Sider>
        </SiderWrapper>
    );
};

export default Menu;
