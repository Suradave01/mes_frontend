import {
  Input,
  Cascader,
  InputNumber,
  AutoComplete,
  Select,
  Row,
  Col,
  Button,
  Checkbox,
  Form,
  Space,
  message,
} from "antd";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout_Page from "../../layouts/LayoutPage";
import { Link } from "../../../components/Link";
import React from "react";
import {
  groupService,
  partitionService,
  roleService,
  userService,
} from "../../../services/user-management";

import classes from "./AddEdit.module.css";

export { AddEdit };

function AddEdit(props: any) {
  const user = props?.user;
  const isAddMode = !user;
  const router = useRouter();

  const formItemLayout = {
    labelCol: {
      xs: { span: 8 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 0,
      },
    },
  };

  const [form] = Form.useForm();

  //Role
  const [role, setRole] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await roleService.getAll();
      setRole(data);
    })();
  }, []);
  const defaultRoles = user?.UserMappingRoles?.map((Role: any) => {
    return `${Role.role_id}`;
  });
  const [checkedRole, setCheckedRole] = useState(defaultRoles);

  const optionRoles = role.map((Role: any) => {
    return {
      label: `${Role.role_name}`,
      value: `${Role.id}`,
    };
  });

  function onChangeRole(checkedValues: any) {
    console.log("checked = ", checkedValues);
    setCheckedRole(checkedValues);
  }

  //Group
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await groupService.getAll();
      setGroups(data);
    })();
  }, []);
  const defaultGroups = user?.UserMappingGroups?.map((Group: any) => {
    return `${Group.group_id}`;
  });
  const [checkedGroup, setCheckedGroup] = useState(defaultGroups);

  const optionGroups = groups.map((Group: any) => {
    return {
      label: `${Group.group_name}`,
      value: `${Group.id}`,
    };
  });

  function onChangeGroup(checkedValues: any) {
    console.log("checked = ", checkedValues);
    setCheckedGroup(checkedValues);
  }

  //Partition
  const [partitions, setPartitions] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await partitionService.getAll();
      setPartitions(data);
    })();
  }, []);
  const defaultPartitions = user?.UserMappingPartitions?.map(
    (Partition: any) => {
      return `${Partition.partition_id}`;
    }
  );
  const [checkedPartition, setCheckedPartition] = useState(defaultPartitions);

  const optionPartitions = partitions.map((Partition: any) => {
    return {
      label: `${Partition.partition_name}`,
      value: `${Partition.id}`,
    };
  });

  function onChangePartition(checkedValues: any) {
    console.log("checked = ", checkedValues);
    setCheckedPartition(checkedValues);
  }

  const onFinish = async (values: any) => {
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      role_id: checkedRole,
      group_id: checkedGroup,
      partition_id: checkedPartition,
    };

    return isAddMode
      ? await userService.create(data).then(async () => {
          message.success("Add success!");
          router.back();
        })
      : await userService.update(user.id, data).then(async () => {
          message.success(`Edit success! ${user.id}`);
          router.back();
        });
  };

  return (
    <Layout_Page>
      {/* <h1 className={classes.txthead}>{isAddMode ? "Add User" : `Edit User ID: ${user.id} `}</h1> */}
      <Row className={classes.dislayout}>
        <Col span={14}>
          <Form
            {...formItemLayout}
            form={form}
            layout="vertical"
            name="createUser"
            onFinish={onFinish}
            initialValues={
              !isAddMode
                ? {
                    username: `${user?.username}`,
                    email: `${user?.email}`,
                    password: `${user?.password}`,
                    confirm: `${user?.password}`,
                    role: defaultRoles,
                    group: defaultGroups,
                    partition: defaultPartitions,
                  }
                : []
            }
            scrollToFirstError
          >
            <Form.Item
              name={"username"}
              label={"User Name"}
              rules={[
                {
                  required: true,
                  message: `Please input User Name!`,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="role" label="Role">
              <Checkbox.Group options={optionRoles} onChange={onChangeRole}>
              <Col span={8}>
                  <Checkbox value="role"></Checkbox>
                </Col>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item name="group" label="Group">
              <Checkbox.Group options={optionGroups} onChange={onChangeGroup}>
              <Col span={8}>
                  <Checkbox value="group"></Checkbox>
                </Col>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item name="partition" label="Partition">
              <Checkbox.Group
                options={optionPartitions}
                onChange={onChangePartition}
              >
                <Col span={8}>
                  <Checkbox value="partition"></Checkbox>
                </Col>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Space>
                <Button type="primary" htmlType="submit" className={classes.btn}>
                  Save
                </Button>
                <Link href="/user-management/users">
                  <Button htmlType="button" className={classes.btn}>Cancel</Button>
                </Link>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout_Page>
  );
}
