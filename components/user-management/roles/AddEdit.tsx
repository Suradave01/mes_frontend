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
  permissionService,
  resourceService,
  roleService,
} from "../../../services/user-management";

import classes from "./AddEdit.module.css";

export { AddEdit };

function AddEdit(props: any) {
  const role = props?.role;
  const isAddMode = !role;
  const router = useRouter();
  console.log(role);

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

  //Resource
  const [resources, setResources] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await resourceService.getAllMenu();
      setResources(data);
    })();
  }, []);
  const defaultResources = role?.MenuMappingRoles?.map((Resource: any) => {
    return `${Resource.resource_id}`;
  });
  const [checkedResource, setCheckedResource] = useState(defaultResources);

  const optionResources = resources.map((Resource: any) => {
    return {
      label: `${Resource.resource_name}`,
      value: `${Resource.id}`,
    };
  });

  function onChangeResource(checkedValues: any) {
    console.log("checked = ", checkedValues);
    setCheckedResource(checkedValues);
  }

  //Permission
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await permissionService.getAllActive();
      setPermissions(data);
    })();
  }, []);
  const defaultPermissions = role?.RoleMappingPermissions?.map(
    (Permission: any) => {
      return `${Permission.permission_id}`;
    }
  );
  const [checkedPermission, setCheckedPermission] =
    useState(defaultPermissions);

  const optionPermissions = permissions.map((Permission: any) => {
    return {
      label: `${Permission.permission_name}`,
      value: `${Permission.id}`,
    };
  });

  function onChangePermission(checkedValues: any) {
    console.log("checked = ", checkedValues);
    setCheckedPermission(checkedValues);
  }

  const onFinish = async (values: any) => {
    const data = {
      role_name: values.role_name,
      role_description: values.role_description,
      resource_id: checkedResource,
      permission_id: checkedPermission,
    };
    console.log(data);

    return isAddMode
      ? await roleService.create(data).then(async () => {
          message.success("Add success!");
          router.back();
        })
      : await roleService.update(role.id, data).then(async () => {
          message.success(`Edit success! ${role.id}`);
          router.back();
        });
  };

  return (
    <Layout_Page>
      {/* <h1 className={classes.txthead}>{isAddMode ? "Add Role" : `Edit Role ID: ${role.id} `}</h1> */}
      <Row className={classes.dislayout}>
        <Col span={14}>
          <Form
            {...formItemLayout}
            form={form}
            name="createRole"
            layout="vertical"
            onFinish={onFinish}
            initialValues={
              !isAddMode
                ? {
                    role_name: `${role?.role_name}`,
                    role_description: `${role?.role_description}`,
                    resource: defaultResources,
                    permission: defaultPermissions,
                  }
                : []
            }
            scrollToFirstError
          >
            <Form.Item
              name={"role_name"}
              label={"Role Name"}
              rules={[
                {
                  required: true,
                  message: `Please input role Name!`,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="role_description">
              <Input.TextArea />
            </Form.Item>

            <Form.Item name="resource" label="Resource">
              <Checkbox.Group
                options={optionResources}
                onChange={onChangeResource}
              />
            </Form.Item>

            <Form.Item name="permission" label="Permission">
              <Checkbox.Group
                options={optionPermissions}
                onChange={onChangePermission}
              />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Space>
                <Button type="primary" htmlType="submit" className={classes.btn}>
                  Save
                </Button>
                <Link href="/user-management/roles">
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
