import React, { useState } from "react";
// import SideNavBar from "../components/admin/SideNavBar";
// import { Divcenter, DivDouble } from "../components/styled/Containers";

import "antd/dist/antd.css";
// import './index.css';
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Item from "antd/lib/list/Item";
import styled from "styled-components";
import Icon from "../components/layout/Icon";
import CreateProduct from "../components/admin/CreateProduct";
import AddDepartment from "../components/admin/AddDepartment";
import AddCategory from "../components/admin/AddCategory";
import AddSeller from "../components/admin/AddSeller";
import AddTag from "../components/admin/AddTag";

import { Route, useRouteMatch, Switch } from "react-router-dom";

const UserRow = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 100%;
  color: aliceblue;
  font-family: "Roboto", sans-serif;
  padding: 0rem;
  width: 100%;
  max-width: 100%;
`;

const Span = styled.span`
  font-size: 0.8rem;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminDeshboard = ({ user, history }) => {
  const [state, setState] = useState({
    collapsed: false,
  });

  let { path, url } = useRouteMatch();

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setState({ collapsed });
  };

  const { collapsed } = state;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width={220}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["9"]} mode="inline">
          <SubMenu
            key="sadqw"
            icon={<UserOutlined src={user.imageUrl} />}
            title={user.username}
          >
            <Item>
              <UserRow>
                <Icon icon_name="far fa-envelope" />
                <Span>{user.username}</Span>
              </UserRow>
            </Item>
            <Item>
              <UserRow>
                <Icon icon_name="far fa-envelope" />
                <Span>{user.email}</Span>
              </UserRow>
            </Item>
            <Item>
              <UserRow>
                <Icon icon_name="far fa-envelope" />
                <Span>{user.type}</Span>
              </UserRow>
            </Item>
            <Item>
              <UserRow>
                <Icon icon_name="far fa-envelope" />
                <Span>{user.userId}</Span>
              </UserRow>
            </Item>
          </SubMenu>
          <Menu.Item
            key="9"
            icon={<FileOutlined />}
            onClick={() => history.push(`${url}`)}
          >
            Resumen
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Forms">
            <Menu.Item
              key="3"
              onClick={() => history.push(`${url}/forms/create-product`)}
            >
              Create Product
            </Menu.Item>
            <Menu.Item
              key="4"
              onClick={() => history.push(`${url}/forms/add-department`)}
            >
              Add department
            </Menu.Item>
            <Menu.Item
              key="5"
              onClick={() => history.push(`${url}/forms/add-category`)}
            >
              Add Category
            </Menu.Item>
            <Menu.Item
              key="12315"
              onClick={() => history.push(`${url}/forms/add-seller`)}
            >
              Add Seller
            </Menu.Item>
            <Menu.Item
              key="312i9812"
              onClick={() => history.push(`${url}/forms/add-tag`)}
            >
              Add Tags
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Products">
            <Menu.Item key="6">All products</Menu.Item>
            <Menu.Item key="8">Products Per Department</Menu.Item>
            <Menu.Item key="12o3">Most Selled</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<DesktopOutlined />} title="Analitics">
            <Menu.Item key="6" icon={<UserOutlined />}>
              Resumen
            </Menu.Item>
            <Menu.Item key="8" icon={<MailOutlined />}>
              Gains/Costs
            </Menu.Item>
            <Menu.Item key="12o3" icon={<FileOutlined />}>
              Charts
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <h1 color="white">asndkqkjejio</h1>
        </Header>

        <Content style={{ margin: "0 16px", height: "100%" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Switch>
              <Route
                exact
                path={path}
                render={() => <h1> This is a resume </h1>}
              />
              <Route
                path={`${path}/forms/create-product`}
                exact
                render={() => <CreateProduct />}
              />
              <Route
                path={`${path}/forms/add-department`}
                exact
                component={AddDepartment}
              />
              <Route
                path={`${path}/forms/add-category`}
                exact
                render={() => <AddCategory />}
              />
              <Route
                path={`${path}/forms/add-seller`}
                exact
                render={() => <AddSeller />}
              />
              <Route
                path={`${path}/forms/add-tag`}
                exact
                render={() => <AddTag />}
              />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

// const AdminDeshboard = ({ user }) => {
//   const [editor, setEditor] = useState("");
//   console.log(editor);
//   return (
//     <div style={{ width: "100%", height: "100%" }}>
//       <DivDouble
//         first={20}
//         second={80}
//         width={100}
//         height={100}
//         percentaje={true}
//       >
//         <SideNavBar />
//       </DivDouble>
//     </div>
//   );
// };

export default AdminDeshboard;
