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
import { companyService } from "../../../services/company-management";
import { assetService } from "../../../services/asset-management";
import { wipService } from "../../../services/planning-management";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import classes from "./AddEdit.module.css";

import Swal from "sweetalert2";

export { AddEdit };

function AddEdit(props: any) {
  const wip = props?.wip;
  const isAddMode = !wip;
  const router = useRouter();
  console.log(wip);

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
      name: values.wip_name,
      company_id: values.company_id,
      // asset_id: values.asset_id,
      fieldDefault: values.field_default,
      // calculate_function: values.calculate_function,
      // presentation_template: values.presentation_template,
      description: values.description,
      // max_wip: values.max_wip,
    };
    console.log(data);

    return isAddMode
      ? await wipService.create(data).then(async () => {
          // message.success("Add success!");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Add success!",
          });
          router.back();
        })
      : await wipService.update(wip.id, data).then(async () => {
          // message.success(`Edit success! ${wip.id}`);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Edit success!",
          });
          router.back();
        });
  };

  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await companyService.getAll();
      setCompanies(data);
    })();
  }, []);

  const optionCompany = companies.map((Company: any) => {
    return <Option key={Company.id}>{Company.name}</Option>;
  });

  const [asset, setAsset] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await assetService.getAllActive();
      setAsset(data);
      // console.log(data);
    })();
  }, []);

  const optionAsset = asset.map((Asset: any) => {
    return <Option key={Asset.id}>{Asset.asset_name}</Option>;
  });

  let initValues: any = [];
  let dataItem = {};

  for (let i = 0; i < wip?.field_default.length; i++) {
    dataItem = {
      name: wip?.field_default[i].name,
      type: wip?.field_default[i].type,
      value: wip?.field_default[i].value,
      import_key: wip?.field_default[i].import_key,
    };
    initValues.push(dataItem);
  }

  // const initValues = (Array.from({ length: 1 }, () => ({
  //   "name": wip?.field_default[0].name,
  //   "type":wip?.field_default[0].type,
  //   "value":wip?.field_default[0].value,
  //   "import_key":wip?.field_default[0].import_key,
  // })));
  // console.log(initValues);
  React.useEffect(() => {
    form.setFields([{ name: "field_default", value: initValues }]);
  }, []);

  return (
    <Layout_Page>
      {/* <h1 className={classes.txthead}>{isAddMode ? "Add WIP" : `Edit WIP`}</h1> */}
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
                    wip_name: `${wip?.name}`,
                    company_id: `${wip?.company_id}`,
                    // asset_id: `${wip?.asset_id}`,
                    // calculate_function: `${wip?.calculate_function}`,
                    // presentation_template: `${wip?.presentation_template}`,
                    // max_wip: `${wip?.max_wip}`,
                    description: `${wip?.description}`,
                    // field_default: `${wip?.field_default.length}`,
                    name: `${wip?.field_default[0].name}`,
                    type: `${wip?.field_default[0].type}`,
                    value: `${wip?.field_default[0].value}`,
                    import_key: `${wip?.field_default[0].import_key}`,
                  }
                : []
            }
            scrollToFirstError
          >
            <Form.Item
              label="WIP Name"
              name="wip_name"
              rules={[
                {
                  required: true,
                  message: `Please input WIP Name`,
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
                  message: `Please select Company`,
                },
              ]}
            >
              <Select
                placeholder="Please select"
                value={optionCompany}
                // onChange={Showdevice}
              >
                {optionCompany}
              </Select>
            </Form.Item>

            {/* <Form.Item
              label="Asset"
              name="asset_id"
              rules={[
                {
                  required: true,
                  message: `Please select Asset`,
                },
              ]}
            >
              <Select
                placeholder="Please select"
                value={optionAsset}
                // onChange={Showdevice}
              >
                {optionAsset}
              </Select>
            </Form.Item> */}

            {/* <Form.Item label="Calculate Function" name="calculate_function">
              <Input />
            </Form.Item>

            <Form.Item
              label="Presentation Template"
              name="presentation_template"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Max Wip"
              name="max_wip"
              rules={[
                {
                  required: true,
                  message: `Please input Max Wip`,
                },
              ]}
            >
              <InputNumber min={1} max={10} defaultValue={0} />
            </Form.Item> */}

            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>

            <Form.List
              name="field_default"
              rules={[
                {
                  validator: async (_, field_default) => {
                    if (!field_default || field_default.length < 1) {
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
                      Add field default
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
                        name={[name, "name"]}
                        rules={[{ required: true, message: "Missing Name" }]}
                      >
                        <Input placeholder="Name" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        {...subformItemLayout}
                        name={[name, "type"]}
                        rules={[{ required: true, message: "Missing Type" }]}
                      >
                        <Input placeholder="Type" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        {...subformItemLayout}
                        name={[name, "value"]}
                      >
                        <Input placeholder="Value" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        {...subformItemLayout}
                        name={[name, "import_key"]}
                      >
                        <Input placeholder="Import Key" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>

            <Form.Item {...tailFormItemLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Link href="/planning-management/wip">
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
