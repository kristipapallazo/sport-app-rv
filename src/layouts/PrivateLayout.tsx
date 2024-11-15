import React, { useState } from "react";
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
interface PrivateLayoutPropsType {
  children: React.ReactNode;
}

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5")]),
  getItem("Team", "sub2", <TeamOutlined />, [getItem("Team 1", "6"), getItem("Team 2", "8")]),
  getItem("Files", "9", <FileOutlined />),
];

export const PrivateLayout = ({ children, ...restProps }: PrivateLayoutPropsType): JSX.Element => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={false}>
        {/* <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} /> */}
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ maxHeight: "100vh", overflow: "auto" }}>{children}</Content>
        {/* <Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
    // <Layout style={{ minHeight: "100vh" }}>
    //   <Sider style={{ backgroundColor: "white" }} width={320}>
    //     <SideMenu />
    //   </Sider>
    //   <Layout style={{ maxHeight: "100vh" }}>
    //     <Content style={{ maxHeight: "100vh", overflow: "auto" }}>{children}</Content>
    //     <Footer style={{ textAlign: "center" }}>
    //       Copyright: <a href={"https://bit.al"}>bit.al</a>
    //     </Footer>
    //   </Layout>
    // </Layout>
  );
};

export default PrivateLayout;
