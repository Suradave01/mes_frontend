/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
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
  UnorderedListOutlined,
  DatabaseOutlined,
  HomeOutlined,
  DownloadOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import classes from "./LayoutPage.module.css";
import Link from "next/link";
import menu from "antd/lib/menu";
import { useRouter } from "next/router";

import { userService } from "../../services/user-management";
import {
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";

const Layout_Page = (props: any) => {
  var PJson = require("../../package.json");
  const router = useRouter();
  const menuPath = router.pathname.split("-");

  const mainMenu = menuPath[0].substring(1);
  const subMenu = router.pathname.substring(1).split("/");

  const { SubMenu } = Menu;
  // const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4", "sub5", "sub6"];
  // const SubMenu = Menu.SubMenu;
  const { Header, Content, Sider, Footer } = Layout;
  // const [openKeys, setOpenKeys] = React.useState(["sub"]);

  const menu = (
    <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
      <div className={`${classes.layoutUser} ${classes.bdr}`}>
        <div>
          <p>test test</p>
          <p>test@gmail.com</p>
        </div>
      </div>
      <Menu.Item icon={<SettingOutlined />}>Setting</Menu.Item>
      <Menu.Item icon={<LogoutOutlined />}>Log out</Menu.Item>
    </Menu>
  );

  const notifications = (
    <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
      <div className={`${classes.layoutNoti} ${classes.bdr}`}>
        <p className={classes.txtnoti}>
          Notification <SettingOutlined />
        </p>
      </div>
      <div className={classes.layoutsubNoti}>
        {/* <div className={classes.notinone}><BellOutlined style={{ fontSize: '55px' }}/></div> */}
        <div>
          <Menu.Item>แจ้งเตือน1</Menu.Item>
          <Menu.Item>แจ้งเตือน2</Menu.Item>
        </div>
      </div>
    </Menu>
  );

  const [state, setState] = useState({
    collapsed: false,
  });

  const onCollapse = (collapsed: any) => {
    setState({ collapsed });
  };

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  // const onOpenChange = (keys) => {
  //   const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
  //   if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //     setOpenKeys(keys);
  //   } else {
  //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //   }
  // };

  return (
    <div>
      <Layout>
        <Sider
          collapsible
          collapsed={state.collapsed}
          onCollapse={onCollapse}
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            height: "100vh",
            position: "sticky",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 2,
          }}
        >
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Image
                preview={false}
                className={classes.logoMenu}
                src="https://upload.sodazaa.com/images/2022/07/05/H6MoB.png"
              />
            </Col>
          </Row>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[router.pathname]}
            defaultOpenKeys={[menuPath[0]]}
            // openKeys={openKeys}
            // onOpenChange={onOpenChange}
          >
            <Menu.Item key="/planning-management/wip">
              <Link href="/planning-management/wip/">WIP</Link>
            </Menu.Item>
            <Menu.Item key="/planning-management/wip-flow">
              <Link href="/planning-management/wip-flow/">WIP Flow</Link>
            </Menu.Item>

            <SubMenu key="/import" icon={<DownloadOutlined />} title="Import">
              <Menu.Item key="/import-file/customer-data">
                <Link href="/import-file/customer-data">
                  Import file customer data
                </Link>
              </Menu.Item>
              <Menu.Item key="/import-file/planning-data">
                <Link href="/import-file/planning-data">
                  Import file planning data
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="/contact" icon={<PhoneOutlined />} title="Contact">
              <Menu.Item key="/contact-management">
                <Link href="/contact-management">Contact Management</Link>
              </Menu.Item>
              <Menu.Item key="/contact-management/notify">
                <Link href="/contact-management/notify">Notify</Link>
              </Menu.Item>
            </SubMenu>

            {/* <Menu.Item key="/import">
              <Link href="/import">Import</Link>
            </Menu.Item>
            <Menu.Item key="/import/import-planning">
              <Link href="/import/import-planning">Import Planning</Link>
            </Menu.Item> */}

            <SubMenu
              key="/planning"
              icon={<UnorderedListOutlined />}
              title="Planning Management"
            >
              <Menu.Item key="/planning-management/planning">
                <Link href="/planning-management/planning">Planning</Link>
              </Menu.Item>
              <Menu.Item key="/planning-management/slitter">
                <Link href="/planning-management/slitter">Slitter</Link>
              </Menu.Item>
              <Menu.Item key="/planning-management/printing">
                <Link href="/planning-management/printing">Printing</Link>
              </Menu.Item>
              <Menu.Item key="/planning-management/diecut">
                <Link href="/planning-management/diecut">Die cut</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="/asset"
              icon={<SettingOutlined />}
              title="Asset Management"
            >
              <Menu.Item key="/asset-management/asset">
                <Link href="/asset-management/asset">Asset</Link>
              </Menu.Item>
              {/* <Menu.Item key="/asset-management/trigger">
                <Link href="/asset-management/trigger">Trigger</Link>
              </Menu.Item> */}
            </SubMenu>

            <SubMenu
              key="/camera"
              icon={<DatabaseOutlined />}
              title="Camera Management"
            >
              <Menu.Item key="/camera-management">
                <Link href="/camera-management/">Camera</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="/device"
              icon={<DatabaseOutlined />}
              title="Device Management"
            >
              <Menu.Item key="/device-management">
                <Link href="/device-management/">Device</Link>
              </Menu.Item>
              {/* <Menu.Item key="/device-management/condition">
                <Link href="/device-management/condition">Condition</Link>
              </Menu.Item> */}
            </SubMenu>

            {/* <SubMenu
              key="/alarm"
              icon={<BellOutlined />}
              title="Alarms Management"
            >
              <Menu.Item key="13">sub-menu</Menu.Item>
            </SubMenu> */}

            <SubMenu
              key="/user"
              icon={<UserOutlined />}
              title="User Management"
            >
              <Menu.Item key="/user-management/users">
                <Link href="/user-management/users">User</Link>
              </Menu.Item>
              <Menu.Item key="/user-management/roles">
                <Link href="/user-management/roles">Role</Link>
              </Menu.Item>
              <Menu.Item key="/user-management/permissions">
                <Link href="/user-management/permissions">Permission</Link>
              </Menu.Item>
              <Menu.Item key="/user-management/resources">
                <Link href="/user-management/resources">Resource</Link>
              </Menu.Item>
              <Menu.Item key="/user-management/groups">
                <Link href="/user-management/groups">Group</Link>
              </Menu.Item>
              <Menu.Item key="/user-management/partitions">
                <Link href="/user-management/partitions">Partition</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="/company"
              icon={<HomeOutlined />}
              title="Company Management"
            >
              <Menu.Item key="/company-management/companies">
                <Link href="/company-management/companies">Company</Link>
              </Menu.Item>
              {/* <Menu.Item key="/company-management/customer">
                <Link href="/company-management/customer">Customer</Link>
              </Menu.Item> */}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              position: "fixed",
              zIndex: 1,
              width: "100%",
              left: 0,
            }}
          >
            <Row>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 24, offset: 0 }}
                md={{ span: 24, offset: 0 }}
                lg={{ span: 19, offset: 0 }}
                xl={{ span: 20, offset: 0 }}
                xxl={{ span: 21, offset: 0 }}
                style={{
                  paddingRight: "0px",
                  marginLeft: "100px",
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
          <Layout style={{ padding: "0 60px 0px" }}>
            <Breadcrumb style={{ margin: "80px 0 0 0" }}>
              {/* <Breadcrumb.Item>
                <Link href={mainMenu}>{mainMenu}</Link>
              </Breadcrumb.Item> */}
              <Breadcrumb.Item>{subMenu[0]}</Breadcrumb.Item>
              <Breadcrumb.Item>{subMenu[1]}</Breadcrumb.Item>
              <Breadcrumb.Item>{subMenu[2]}</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ overflow: "initial" }}>
              <div
                className={classes.site_layout_background_content}
                style={{
                  padding: 24,
                  minHeight: "100%",
                  marginTop: 25,
                }}
              >
                {props.children}
              </div>
            </Content>
            <Footer className={classes.footer} style={{ textAlign: "center" }}>
              <div className={classes.footer_sub}>
                <Image
                  preview={false}
                  className={classes.logoFooter}
                  src="https://upload.sodazaa.com/images/2022/07/05/H6ZnI.png"
                />
                <p>
                  M E S ©2022 Created by Total Service Development Co., Ltd.
                </p>
              </div>
              <p>Version {PJson.version}</p>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default Layout_Page;
