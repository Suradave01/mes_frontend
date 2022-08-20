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
  Radio,
} from "antd";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout_Page from "../../layouts/LayoutPage";
import { Link } from "../../Link";
import React from "react";
import {
  permissionService,
  resourceService,
} from "../../../services/user-management";
import { Resource } from "../../../models/resource";

import classes from "./AddEdit.module.css";

export { AddEdit };

function AddEdit(props: any) {
  const permission = props?.permission;
  const isAddMode = !permission;
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
  const { Option } = Select;

  const onFinish = async (values: any) => {
    const data = {
      permission_name: values.permission_name,
      permission: checkedPermission,
      resource_id: values.resource_id,
    };
    console.log(data);

    return isAddMode
      ? await permissionService.create(data).then(async () => {
          message.success("Add success!");
          router.back();
        })
      : await permissionService.update(permission.id, data).then(async () => {
          message.success(`Edit success! ${permission.id}`);
          router.back();
        });
  };

  //Resource
  const [resourcesMenu, setResourcesMenu] = useState<Resource[]>([]);
  useEffect(() => {
    (async () => {
      const data = await resourceService.getAllEntity();
      setResourcesMenu(data);
    })();
  }, []);

  const permissionData = [
    { id: 1, value: "Read" },
    { id: 2, value: "Read / Print" },
    { id: 3, value: "Read / Print / Write" },
    { id: 4, value: "Read / Print / Write / Delete" },
  ];

  const [checkedPermission, setCheckedPermission] = useState(
    permission ? permission.permission : 1
  );

  function onChangePermission(id: any) {
    setCheckedPermission(id);
  }

  return (
    <Layout_Page>
      {/* <h1 className={classes.txthead}>
        {isAddMode ? "Add Permission" : `Edit Permission ID: ${permission.id} `}
      </h1> */}
      <Row className={classes.dislayout}>
        <Col span={14}>
          <Form
            {...formItemLayout}
            form={form}
            layout="vertical"
            name="createPermission"
            onFinish={onFinish}
            initialValues={
              !isAddMode
                ? {
                    permission_name: `${permission?.permission_name}`,
                    permission: `${permission?.permission}`,
                    resource_id: `${permission?.resource_id}`,
                  }
                : []
            }
            scrollToFirstError
          >
            <Form.Item
              name={"permission_name"}
              label={"Permission Name"}
              rules={[
                {
                  required: true,
                  message: `Please input permission Name!`,
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* <Form.Item
              label="Permission"
              name="permission"
              rules={[
                {
                  required: true,
                  message: `Please Check Permission Level`,
                },
              ]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={1}>Read</Radio>
                  <Radio value={2}>Read / Print</Radio>
                  <Radio value={3}>Read / Print / Write</Radio>
                  <Radio value={4}>Read / Print / Write / Delete</Radio>
                </Space>
              </Radio.Group>
            </Form.Item> */}

            <Form.Item label="Permission" name="permission">
              {/* <Radio.Group> */}
              <Space direction="vertical">
                {permissionData.map(({ value, id }) => {
                  return (
                    <Radio
                      key={id}
                      onChange={() => onChangePermission(id)}
                      checked={id === checkedPermission}
                    >
                      {value}
                    </Radio>
                  );
                })}
              </Space>
              {/* </Radio.Group> */}
            </Form.Item>

            <Form.Item
              label="Entity"
              name="resource_id"
              rules={[
                {
                  required: true,
                  message: `Please Select Entity`,
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Search to Select Entity"
                optionFilterProp="children"
              >
                {resourcesMenu.map((resource) => {
                  return (
                    <Option key={resource.id} value={resource.id}>
                      {resource.resource_name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Space>
                <Button type="primary" htmlType="submit" className={classes.btn}>
                  Save
                </Button>
                <Link href="/user-management/permissions">
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
