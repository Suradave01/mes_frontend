/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Col,
  Dropdown,
  Layout,
  Menu,
  PageHeader,
  Row,
  Space,
  Image,
} from "antd";
import {
  LaptopOutlined,
  UserOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import classes from "./LayoutPage.module.css";
import Link from "next/link";
import menu from "antd/lib/menu";

const Layout_Home = (props: any) => {
  const { SubMenu } = Menu;
  const { Header, Content, Sider, Footer } = Layout;
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          User info
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  const notifications = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          เครื่องหยุดทำงาน
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          ความร้อนเกิน
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            height: "100vh",
            position: "sticky",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 1
          }}
        >
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Image
                preview={false}
                className={classes.logo}
                src="https://www.tsdevelopment.co.th/img/profile.jpg"
              />
            </Col>
          </Row>
          <Menu theme="dark" mode="inline">
            <SubMenu key="sub4" icon={<LaptopOutlined />} title="Planning">
              <Menu.Item key="10">sub-menu</Menu.Item>
              <Menu.Item key="11">sub-menu</Menu.Item>
              <Menu.Item key="12">sub-menu</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub2"
              icon={<LaptopOutlined />}
              title="Asset Management"
            >
              <Menu.Item key="5">
                <Link href="/planning/slitter">sub-menu</Link>
              </Menu.Item>
              <Menu.Item key="6">sub-menu</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<LaptopOutlined />}
              title="Device Management"
            >
              <Menu.Item key="9">sub-menu</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              icon={<LaptopOutlined />}
              title="Alarms Management"
            >
              <Menu.Item key="13">sub-menu</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub1"
              icon={<LaptopOutlined />}
              title="User Management"
            >
              <Menu.Item key="1">
                <Link href="/user-management/">User</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link href="/user-management/role">Role</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link href="/user-management/permission">Permission</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              paddingLeft: 24,
              position: "fixed",
              zIndex: 1,
              width: "100%",
              textAlign: "center",
            }}
          >
            <Row>
              <Col
                span={4}
                style={{ textAlign: "right", color: "white" }}
              ></Col>
              <Col span={18} style={{ textAlign: "right", color: "white" }}>
                <Space size={30}>
                  <Button
                    htmlType="button"
                    style={{
                      color: "white",
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                  >
                    TsdDev
                  </Button>
                  <Dropdown
                    trigger={["click"]}
                    overlay={notifications}
                    placement="bottomRight"
                    arrow
                  >
                    <Badge count={100}>
                      <Button
                        icon={<NotificationOutlined />}
                        style={{ borderRadius: "15px" }}
                      />
                    </Badge>
                  </Dropdown>
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    placement="bottomRight"
                    arrow
                  >
                    <Button
                      icon={<UserOutlined />}
                      style={{ borderRadius: "15px" }}
                    ></Button>
                  </Dropdown>
                </Space>
              </Col>
              <Col
                span={2}
                style={{ textAlign: "right", color: "white" }}
              ></Col>
            </Row>
          </Header>
          <Layout style={{ padding: "0 24px 0px" }}>
            <Breadcrumb style={{ margin: "80px 0 0 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ overflow: "initial" }}>
              <div
                className={classes.site_layout_background_content}
                style={{
                  padding: 24,
                  minHeight: "100%",
                  marginTop: 55,
                  textAlign: "center",
                }}
              >
                {props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              M E S ©2022 Created by Total Service Development Co., Ltd.
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default Layout_Home;
