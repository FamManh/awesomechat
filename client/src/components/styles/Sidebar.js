import styled from 'styled-components';

const Sidebar = styled.div`
  height: 100%;
  display: flex;
  .ant-layout-sider {
    box-shadow: 0 0px 3px rgba(0, 0, 0, 0.02), 0 0 1px rgba(0, 0, 0, 0.05);
    z-index: 10;
  }
  .ant-menu-item > a {
    display: flex;
    align-items: center;
  }
  .ant-menu-item .anticon,
  .ant-menu-submenu-title .anticon {
    margin-right: 1rem;
  }
  .ant-layout-sider-zero-width-trigger {
    z-index: 9;
  }
  .ant-menu-inline-collapsed .ant-badge {
    max-width: 0;
    display: inline-block;
    opacity: 0;
  }
  .ant-menu-inline .ant-menu-item, .ant-menu-inline .ant-menu-submenu-title {
    width: calc(100%);
  }
`;

export default Sidebar;
