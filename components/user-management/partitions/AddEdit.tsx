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
import { partitionService } from "../../../services/user-management";

import classes from "./AddEdit.module.css";

export { AddEdit };

function AddEdit(props: any) {
  const partition = props?.partition;
  const isAddMode = !partition;
  const router = useRouter();
  console.log(partition);

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

  const onFinish = async (values: any) => {
    const data = {
      partition_name: values.partition_name,
      partition_description: values.partition_description,
      model_name: values.model_name,
      sql_append: values.sql_append,
    };
    console.log(data);

    return isAddMode
      ? await partitionService.create(data).then(async () => {
          message.success("Add success!");
          router.back();
        })
      : await partitionService.update(partition.id, data).then(async () => {
          message.success(`Edit success! ${partition.id}`);
          router.back();
        });
  };

  return (
    <Layout_Page>
      {/* <h1 className={classes.txthead}>
        {isAddMode ? "Add Partition" : `Edit Partition ID: ${partition.id} `}
      </h1> */}
      <Row className={classes.dislayout}>
        <Col span={14}>
          <Form
            {...formItemLayout}
            form={form}
            layout="vertical"
            name="createPartition"
            onFinish={onFinish}
            initialValues={
              !isAddMode
                ? {
                    partition_name: `${partition?.partition_name}`,
                    partition_description: `${partition?.partition_description}`,
                    model_name: `${partition?.model_name}`,
                    sql_append: `${partition?.sql_append}`,
                  }
                : []
            }
            scrollToFirstError
          >
            <Form.Item
              name={"partition_name"}
              label={"Partition Name"}
              rules={[
                {
                  required: true,
                  message: `Please input Partition Name!`,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="partition_description">
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="Model Name" name="model_name">
              <Input />
            </Form.Item>

            <Form.Item label="SQL Append" name="sql_append">
              <Input.TextArea />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Space>
                <Button type="primary" htmlType="submit" className={classes.btn}>
                  Save
                </Button>
                <Link href="/user-management/partitions">
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
