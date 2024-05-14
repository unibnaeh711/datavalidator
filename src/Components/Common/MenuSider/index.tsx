import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { Layout, Menu, theme } from "antd";
import { FileSearchOutlined, UserOutlined } from "@ant-design/icons";

import useAuth from "../../../Hooks/useAuth";

const { Sider } = Layout;

const menuStyle = {
  minHeight: "calc(100vh)",
};


const MenuSider: React.FC = () => {
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  
  const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
  
  const userItemChildren = (isLoggedIn ? [
    // {
    //   path: "/user/detail",
    //   label: <a href="/user/detail">Me</a>,
    //   key: "user-register",
    // },
    {
      path: "/auth/register",
      label: <a href="/auth/register">Register</a>,
      key: "auth-register",
    },
    {
      path: "/auth/logout",
      label: <a href="/auth/logout">Logout</a>,
      key: "auth-logout",
    },
  ] : [
    {
      path: "/auth/login",
      label: <a href="/auth/login">Login</a>,
      key: "auth-login",
    },
    {
      path: "/auth/register",
      label: <a href="/auth/register">Register</a>,
      key: "auth-register",
    },
  ])
  const userItem = {
    label: "User",
    key: "user",
    icon: <UserOutlined />,
    children: userItemChildren
  };
  const fileItemChildren = (isLoggedIn ? [
    {
      path: "/files",
      label: <a href="/files/overview">Overview</a>,
      key: "files",
    },
    {
      path: "/files/upload",
      label: <a href="/files/upload">Upload</a>,
      key: "files-upload",
    },
  ] : [
    {
      path: "/files/upload",
      label: <a href="/files/upload">Upload</a>,
      key: "files-upload",
    },
  ])
  const fileItem = {
    label: "File",
    key: "file",
    icon: <FileSearchOutlined />,
    children: fileItemChildren,
  };
  const menuItems = [userItem, fileItem];

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{
        background: colorBgContainer,
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="light"
        style={menuStyle}
        mode="inline"
        defaultSelectedKeys={["files-upload"]}
        selectedKeys={[window.location.pathname.split("/")[1]]}
        items={menuItems}
      />
    </Sider>
  );
};

export default MenuSider;
