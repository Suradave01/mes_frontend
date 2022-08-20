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
import { deviceService } from "../../../services/device-management";
import classes from "./AddEdit.module.css";

export { AddEdit };

function AddEdit(props: any) {
  const condition = props?.condition;
  const isAddMode = !condition;
  const router = useRouter();
  // console.log(asset);

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
      condition_type_name: values.condition_name,
      field_compare: values.compare,
      condition: values.condition,
      description: values.description,
    };
    console.log(data);

    return isAddMode
      ? await deviceService.createConditionType(data).then(async () => {
          message.success("Add success!");
          router.back();
        })
      : await deviceService.update(condition.id, data).then(async () => {
          message.success(`Edit success! ${condition.id}`);
          router.back();
        });
  };

  return (
    <Layout_Page>
      {/* <h1 className={classes.txthead}>
        {isAddMode ? "Add Condition Type" : `Edit Condition Type ID: ${condition.id} `}
      </h1> */}
      <Row className={classes.dislayout}>
        <Col span={14}>
          <Form
            {...formItemLayout}
            form={form}
            layout="vertical"
            name="createCondition"
            onFinish={onFinish}
            initialValues={
              !isAddMode
                ? {
                    condition_type_name: `${condition?.condition_name}`,
                    field_compare: `${condition?.compare}`,
                    condition: `${condition?.condition}`,
                    description: `${condition?.description}`,
                  }
                : []
            }
            scrollToFirstError
          >
            <Form.Item
              label="Condition Type Name"
              name="condition_name"
              rules={[
                {
                  required: true,
                  message: `Please input Condition Name`,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Operational Operator"
              name="condition"
              rules={[
                {
                  required: true,
                  message: `Please input Condition`,
                },
              ]}
            >
              {/* <Input /> */}
              <Select
                placeholder="Please select"
                // onChange={handleChange}
              >
                <Option value="<">มากกว่า (&gt;)</Option>
                <Option value=">">น้อยกว่า (&lt;)</Option>
                <Option value="<=">มากกว่าเท่ากับ (&gt;=)</Option>
                <Option value=">=">น้อยกว่าเท่ากับ (&lt;=)</Option>
                <Option value="==">เท่ากับ (==)</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Compare"
              name="compare"
              rules={[
                {
                  required: true,
                  message: `Please input Condition`,
                },
              ]}
            >
              <Select placeholder="Please select">
                <Option value="Number Value">Number Value</Option>
                <Option value="String Value">String Value</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Link href="/device-management/condition">
                  <Button htmlType="button">Cancel</Button>
                </Link>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout_Page>
  );
}
