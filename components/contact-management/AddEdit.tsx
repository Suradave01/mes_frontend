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
import { contactManagement } from "../../services/contact-management";
import { companyService } from "../../services/company-management";

import classes from "./AddEdit.module.css";

import Swal from "sweetalert2";

export { AddEdit };

function AddEdit(props: any) {
  const contact = props?.contact;
  const isAddMode = !contact;
  const router = useRouter();
  console.log(contact);

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

  const [selectCompany, setSelectCompany] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await companyService.getAll();
      setSelectCompany(data);
    })();
  }, []);

  const optionCompany = selectCompany.map((company: any) => {
    console.log(company);
    return <Option key={company.id}>{company.fullname}</Option>;
  });

  const initValues: any = [];

  console.log(initValues);

  const onFinish = async (values: any) => {
    const data = {
      contact_name: values.contact_name,
      contact_lastName: values.contact_lastName,
      company_id: values.company_id,
      address: values.address,
      telephone_no: values.telephone_no,
      line_token: values.line_token,
    };
    console.log(data);

    return isAddMode
      ? await contactManagement.createContact(data).then(async () => {
          // message.success("Add success!");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Add success!",
          });
          router.back();
        })
      : await contactManagement.updateContact(contact.id, data).then(async () => {
          // message.success(`Edit success! ${asset.id}`);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Edit success!",
          });
          router.back();
        });
  };

  return (
    <Layout_Page>
      {/* <h1 className={classes.txthead}>
        {isAddMode ? "Add Asset" : `Edit Asset ID: ${asset.id} `}
      </h1> */}
      <Row className={classes.dislayout}>
        <Col span={14}>
          <Form
            {...formItemLayout}
            form={form}
            layout="vertical"
            name="createAsset"
            onFinish={onFinish}
            initialValues={
              !isAddMode
                ? {
                  contact_name: `${contact?.contact_name}`,
                  contact_lastName: `${contact?.contact_lastname}`,
                  company_id: `${contact?.company_id}`,
                  address: `${contact?.address}`,
                  telephone_no: `${contact?.telephone_no}`,
                  line_token: `${contact?.line_token}`,
                  }
                : []
            }
            scrollToFirstError
          >
            <Form.Item
              label="Contact Name"
              name="contact_name"
              rules={[
                {
                  required: true,
                  message: `Please input Asset Name`,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Contact LastName"
              name="contact_lastName"
              rules={[
                {
                  required: true,
                  message: `Please input Asset Name`,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Company"
              name="company_id"
              rules={[
                {
                  required: true,
                  message: `Please select Asset`,
                },
              ]}
            >
              <Select
                placeholder="Please select"
                value={optionCompany}
                // onChange={handleChange}
              >
                {optionCompany}
              </Select>
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: `Please input Asset Name`,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Telephone No"
              name="telephone_no"
              
              rules={[
                {
                  required: true,
                  message: `Please input Asset Name`,
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Line Token"
              name="line_token"
              rules={[
                {
                  required: true,
                  message: `Please input Asset Name`,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={classes.btn}
                >
                  Save
                </Button>
                <Link href="/asset-management/asset">
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
