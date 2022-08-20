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
import Layout_Page from "../layouts/LayoutPage";
import { Link } from "../../components/Link";
import React from "react";
import { deviceService } from "../../services/device-management";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { companyService } from "../../services/company-management";
import classes from "./AddEdit.module.css";

export { AddEdit };

function AddEdit(props: any) {
  const device = props?.device;
  const isAddMode = !device;
  const router = useRouter();
  console.log(device);

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
  const subformItemLayout = {
    labelCol: {
      xs: { span: 8 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 24 },
    },
  };

  const [form] = Form.useForm();
  const { Option } = Select;

  const onFinish = async (values: any) => {
    const data = {
      device_name: values.device_name,
      description: values.description,
      company_id: values.company_id,
      deviceField: values.deviceField,
      field_name: values.field_name,
      field_type: values.field_type,
      field_order: values.field_order,
      field_description: values.field_description,
    };
    console.log(data);

    return isAddMode
      ? await deviceService.create(data).then(async () => {
          message.success("Add success!");
          router.back();
        })
      : await deviceService.update(device.id, data).then(async () => {
          message.success(`Edit success! ${device.id}`);
          router.back();
        });
  };

  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await companyService.getAllActive();
      setCompanies(data);
    })();
  }, []);

  return (
    <Layout_Page>
      {/* <h1>{isAddMode ? "Add device" : `Edit device ID: ${device.id} `}</h1> */}
      <Row className={classes.dislayout}>
        <Col span={14}>
          <Form
            {...formItemLayout}
            form={form}
            layout="vertical"
            name="createDevice"
            onFinish={onFinish}
            initialValues={
              !isAddMode
                ? {
                    device_name: `${device?.device_name}`,
                    description: `${device?.description}`,
                    company_id: `${device?.company_id}`,
                    deviceField: `${device?.deviceField}`,
                    field_name: `${device?.field_name}`,
                    field_type: `${device?.field_type}`,
                    field_order: `${device?.field_order}`,
                    field_description: `${device?.field_description}`,
                  }
                : []
            }
            scrollToFirstError
          >
            <Form.Item
              label="Device Name"
              name="device_name"
              rules={[
                {
                  required: true,
                  message: `Please input Device Name`,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="Company" name="company_id">
              <Select
                showSearch
                placeholder="Search to Select Company"
                optionFilterProp="children"
              >
                {companies.map((company: any) => {
                  return (
                    <Option key={company.id} value={company.id}>
                      {company.name} : {company.fullname}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.List
              name="deviceField"
              rules={[
                {
                  validator: async (_, deviceField) => {
                    if (!deviceField || deviceField.length < 1) {
                      return Promise.reject(new Error("At least 1 Field"));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        marginBottom: 8,
                        maxWidth: "66.66666667%",
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        {...subformItemLayout}
                        name={[name, "field_name"]}
                        rules={[
                          { required: true, message: "Missing Field Name" },
                        ]}
                      >
                        <Input placeholder="Field Name" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        {...subformItemLayout}
                        name={[name, "field_type"]}
                        rules={[
                          { required: true, message: "Missing Field Type" },
                        ]}
                      >
                        <Input placeholder="Field Type" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        {...subformItemLayout}
                        name={[name, "field_order"]}
                      >
                        <Input placeholder="Field Order" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        {...subformItemLayout}
                        name={[name, "field_description"]}
                      >
                        <Input placeholder="Field Description" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>

            <Form.Item {...tailFormItemLayout}>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={classes.btn}
                >
                  Save
                </Button>
                <Link href="/device-management/device">
                  <Button htmlType="button" className={classes.btn}>
                    Cancel
                  </Button>
                </Link>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout_Page>
  );
}
