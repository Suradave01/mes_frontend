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
import { wipFlowService } from "../../../services/planning-management";
import { companyService } from "../../../services/company-management";
// import { assetService } from "../../../services/asset-management";
import { wipService } from "../../../services/planning-management";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import classes from "./AddEdit.module.css";

import Swal from "sweetalert2";

export { AddEdit };

function AddEdit(props: any) {
  const wipFlow = props?.wipFlow;
  const isAddMode = !wipFlow;
  const router = useRouter();
  console.log(wipFlow);

  // var wipFlowString = wipFlow?.wip_flow_name;

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
    // const wipArray = values.wip_flow_name;
    // const reducedwipArray = wipArray.reduce(
    //   (acc: any, curr: any) => `${acc}${curr}>`,
    //   ""
    // );

    // let strWip = reducedwipArray;
    // strWip = strWip.slice(0, -1);

    const data = {
      wip_flow_name: values.wip_flow_name,
      wip_id_map: values.wip_id_map,
      company_id: values.company_id,
      productin_id: values.productin_id,
      ref_wip_flow: values.ref_wip_flow,
      presentation_template: values.presentation_template,
      is_template: "true",
      description: values.description,
    };
    console.log(data);

    return isAddMode
      ? await wipFlowService.create(data).then(async () => {
          // message.success("Add success!");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Add success!",
          });
          router.back();
        })
      : await wipService.update(wipFlow.id, data).then(async () => {
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

  const [wipName, setWipName] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await wipService.findAllWip();
      setWipName(data);
    })();
  }, []);

  const optionWip = wipName.map((Wip: any) => {
    return <Option key={Wip.id}>{Wip.name}</Option>;
  });

  let initValues: any = [];

  for (let i = 0; i < wipFlow?.WipFlowMappings.length; i++) {
    initValues.push(
      <Option key={wipFlow?.WipFlowMappings[i].wip_id}>
        {wipFlow?.WipFlowMappings[i].wip_id}
      </Option>
    );
  }

  console.log(initValues);

  return (
    <Layout_Page>
      {/* <h1 className={classes.txthead}>
        {isAddMode ? "Add WIP Flow" : `Edit WIP Flow`}
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
                    // wip_id_map: `${wipFlow?.WipFlowMappings[0].wip_id}`,
                    wip_id_map: initValues,
                    wip_flow_name: `${wipFlow?.wip_flow_name}`,
                    company_id: `${wipFlow?.company_id}`,
                    productin_id: `${wipFlow?.productin_id}`,
                    // ref_wip_flow: `${wipFlow?.ref_wip_flow}`,
                    // presentation_template: `${wipFlow?.presentation_template}`,
                    is_template: "true",
                    description: `${wipFlow?.description}`,
                  }
                : []
            }
            scrollToFirstError
          >
            <Form.Item
              label="WIP Flow"
              name="wip_id_map"
              rules={[
                {
                  required: true,
                  message: `Please select WIP Flow`,
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
              >
                {optionWip}
              </Select>
            </Form.Item>
            <Form.Item
              label="Name"
              name="wip_flow_name"
              rules={[
                {
                  required: true,
                  message: `Please input Name`,
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
            <Form.Item label="Production" name="productin_id">
              <Select
                placeholder="Please select"
                // value={optionCompany}
                // onChange={Showdevice}
              >
                {/* {optionCompany} */}
              </Select>
            </Form.Item>
            {/* <Form.Item label="Ref WIP Flow" name="ref_wip_flow">
              <Select
                placeholder="Please select"
                value={optionCompany}
                onChange={Showdevice}
              >
                {optionCompany}
              </Select>
            </Form.Item>
            <Form.Item
              label="Presentation Template"
              name="presentation_template"
            >
              <Input />
            </Form.Item> */}
            {/* <Form.Item
              style={{ visibility: "hidden"}}
              label="Is Template"
              name="is_template"
              rules={[
                {
                  required: true,
                  message: `Please input Is Template`,
                },
              ]}
            >
              <Select style={{ width: 120 }} defaultValue="true">
                <Option value={true}>true</Option>
                <Option value={false}>false</Option>
              </Select>
            </Form.Item> */}
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Link href="/planning-management/wip-flow">
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
