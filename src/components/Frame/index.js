import React from "react";
import { Layout, Menu, Icon, Dropdown, Avatar, message, Badge } from "antd";
import logo from "./logo.jpg";
import { adminRoutes } from "../../routes";
import { withRouter } from "react-router-dom";
import "./frame.css";
import { clearToken } from "../../utils/auth";
import { connect } from "react-redux";

// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const routes = adminRoutes.filter((route) => route.isShow);

function Index(props) {
  const popMenu = (
    <Menu
      onClick={(p) => {
        if (p.key === "logout") {
          clearToken();
          props.history.push("/login");
        } else if (p.key === "noti") {
          props.history.push("/admin/notice");
        } else {
          message.info(p.key);
        }
      }}
    >
      <Menu.Item key="noti">通知中心</Menu.Item>
      <Menu.Item key="setting">设置</Menu.Item>
      <Menu.Item key="logout">退出</Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header className="header" style={{ backgroundColor: "#428bca" }}>
        <div className="logo">
          <img src={logo} alt="logo" style={{ width: 40, height: 40 }} />
        </div>
        <Dropdown overlay={popMenu}>
          <div>
            <Avatar>U</Avatar>
            <span style={{ color: "#fff" }}>超级管理员</span>
            <Badge dot={!props.notices.isAllRead}></Badge>
            <Icon type="down" />
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {routes.map((route) => {
              //todo
              return (
                <Menu.Item
                  key={route.path}
                  onClick={(item) => props.history.push(item.key)}
                >
                  <Icon type={route.icon} />
                  {route.title}
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: "16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            style={{
              background: "#fff",
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(Index));
