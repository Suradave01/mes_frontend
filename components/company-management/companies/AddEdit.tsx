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
import { companyService } from "../../../services/company-management";

export { AddEdit };

function AddEdit(props: any) {
  const company = props?.company;
  const isAddMode = !company;
  const router = useRouter();
  console.log(company);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
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
        offset: 8,
      },
    },
  };

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const data = {
      name: values.name,
      fullName: values.fullName,
      address: values.address,
      telephone_no: values.telephone_no,
    };
    console.log(data);

    return isAddMode
      ? await companyService.create(data).then(async () => {
          message.success("Add success!");
          router.back();
        })
      : await companyService.update(company.id, data).then(async () => {
          message.success(`Edit success! ${company.id}`);
          router.back();
        });
  };

  return (
    <Layout_Page>
      <h1>{isAddMode ? "Add Company" : `Edit Company ID: ${company.id} `}</h1>
      <Row>
        <Col span={24}>
          <Form
            {...formItemLayout}
            form={form}
            name="createCompany"
            onFinish={onFinish}
            initialValues={
              !isAddMode
                ? {
                    name: `${company?.name}`,
                    fullName: `${company?.fullname}`,
                    address: `${company?.address}`,
                    telephone_no: `${company?.telephone_no}`,
                  }
                : []
            }
            scrollToFirstError
          >
            <Form.Item
              label={"Company Name"}
              name={"name"}
              rules={[
                {
                  required: true,
                  message: `Please input Company Name!`,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={"FullName"}
              name={"fullName"}
              rules={[
                {
                  required: true,
                  message: `Please input FullName!`,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={"Address"}
              name={"address"}
              rules={[
                {
                  required: true,
                  message: `Please input Address !`,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={"Telephone"}
              name={"telephone_no"}
              rules={[
                {
                  required: true,
                  message: `Please input Telephone Number!`,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Link href="/company-management/companies">
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
