import React from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Avatar,
  Badge,
  Button,
  Col,
  Dropdown,
  PageHeader,
  Row,
  Space,
  Image,
} from "antd";
const { Header, Content, Footer } = Layout;
import classes from "./LayoutPage.module.css";
import menu from "antd/lib/menu";
import {
  LaptopOutlined,
  UserOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const LayoutPagelogin = (props: any) => {
  var PJson = require("../../package.json");

  const { Header, Content, Footer } = Layout;
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
        <Header
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            position: "fixed",
            zIndex: 1,
            width: "100%",
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
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 24, offset: 0 }}
              lg={{ span: 19, offset: 0 }}
              xl={{ span: 20, offset: 0 }}
              xxl={{ span: 21, offset: 0 }}
              style={{
                paddingRight: "0px",
                textAlign: "right",
                color: "white",
              }}
            >
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
          </Row>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <Breadcrumb style={{ margin: "180px 0" }}></Breadcrumb>
          <div
            className="site-layout-background"
            style={{ textAlign: "center", padding: 24, minHeight: 380 }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <p>M E S ©2022 Created by Total Service Development Co., Ltd.</p>
          <p>Version {PJson.version}</p>
        </Footer>
      </Layout>
    </div>
  );
};

export default LayoutPagelogin;
