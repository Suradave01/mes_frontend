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
import { resourceService } from "../../../services/user-management";

import classes from "./AddEdit.module.css";


export { AddEdit };

function AddEdit(props: any) {
  const resource = props?.resource;
  const isAddMode = !resource;
  const router = useRouter();
  console.log(resource);

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
      resource_code: values.resource_code,
      resource_name: values.resource_name,
      resource_type: values.resource_type,
    };
    console.log(data);

    return isAddMode
      ? await resourceService.create(data).then(async () => {
          message.success("Add success!");
          router.back();
        })
      : await resourceService.update(resource.id, data).then(async () => {
          message.success(`Edit success! ${resource.id}`);
          router.back();
        });
  };

  return (
    <Layout_Page>
      {/* <h1 className={classes.txthead}>
        {isAddMode ? "Add Resource" : `Edit Resource ID: ${resource.id} `}
      </h1> */}
      <Row className={classes.dislayout}>
        <Col span={24}>
          <Form
            {...formItemLayout}
            form={form}
            layout="vertical"
            name="createResource"
            onFinish={onFinish}
            initialValues={
              !isAddMode
                ? {
                    resource_code: `${resource?.resource_code}`,
                    resource_name: `${resource?.resource_name}`,
                    resource_type: `${resource?.resource_type}`,
                  }
                : []
            }
            scrollToFirstError
          >
            <Form.Item
              name="resource_code"
              label="Resource Code"
              rules={[
                {
                  required: true,
                  message: `Please input Resource Code`,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"resource_name"}
              label={"Resource Name"}
              rules={[
                {
                  required: true,
                  message: `Please input resource Name!`,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Type"
              name="resource_type"
              rules={[
                {
                  required: true,
                  message: `Please Select Type`,
                },
              ]}
            >
              <Select placeholder="Select a Type">
                <Option value="ENTITY">ENTITY</Option>
                <Option value="MENU">MENU</Option>
              </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Space>
                <Button type="primary" htmlType="submit" className={classes.btn}>
                  Save
                </Button>
                <Link href="/user-management/resources">
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
