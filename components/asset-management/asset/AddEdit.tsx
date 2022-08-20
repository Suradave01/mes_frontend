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
import { assetService } from "../../../services/asset-management";
import { deviceService } from "../../../services/device-management";
import { wipService } from "../../../services/planning-management/wip.service";

import classes from "./AddEdit.module.css";

import Swal from "sweetalert2";

import { count } from "console";

export { AddEdit };

function AddEdit(props: any) {
  const asset = props?.asset;
  const isAddMode = !asset;
  const router = useRouter();
  console.log(asset);

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

  const [device, setDevice] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await deviceService.getAll();
      setDevice(data);
    })();
  }, []);

  const defaultDevices = asset?.AssetMappingDevices?.map((Device: any) => {
    return `${Device.device_id}`;
  });

  const [selectDevice, setSelectDevice] = useState(defaultDevices);

  const { Option } = Select;

  const optionDevice = device.map((Device: any) => {
    return <Option key={Device.id}>{Device.device_name}</Option>;
  });

  const handleChange = (value: string) => {
    console.log(value);
  };

  const [selectWip, setSelectWip] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await wipService.findAllWip();
      setSelectWip(data);
    })();
  }, []);

  const optionWip = selectWip.map((wip: any) => {
    // console.log(wip);
    return <Option key={wip.id}>{wip.name}</Option>;
  });

  const initValues: any = [];

  for (let i = 0; i < asset?.AssetMappingDevices.length; i++) {
    // console.log(asset?.AssetMappingDevices[i].device_id);

    initValues.push(
      // <Option key={asset?.AssetMappingDevices[i].device_id}>
      asset?.AssetMappingDevices[i].device_id
      // </Option>
    );
  }

  console.log(initValues);

  const onFinish = async (values: any) => {
    const data = {
      asset_name: values.asset_name,
      description: values.description,
      wip_id: values.wip_id,
      device_id: values.device,
      company_id: values.company_id,
    };
    console.log(data);

    return isAddMode
      ? await assetService.create(data).then(async () => {
          // message.success("Add success!");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Add success!",
          });
          router.back();
        })
      : await assetService.update(asset.id, data).then(async () => {
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
                    asset_name: `${asset?.asset_name}`,
                    wip_id: `${asset?.wip_id}`,
                    description: `${asset?.description}`,
                    device: initValues,
                    company_id: `${asset?.company_id}`,
                  }
                : []
            }
            scrollToFirstError
          >
            <Form.Item
              label="Asset Name"
              name="asset_name"
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
              label="Wip"
              name="wip_id"
              rules={[
                {
                  required: true,
                  message: `Please select Asset`,
                },
              ]}
            >
              <Select
                placeholder="Please select"
                value={optionWip}
                // onChange={handleChange}
              >
                {optionWip}
              </Select>
            </Form.Item>

            {/* <Form.Item
              label="Device"
              name="device"
              rules={[
                {
                  required: true,
                  message: `Please input device`,
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
              >
                {optionDevice}
              </Select>
            </Form.Item> */}

            <Form.Item label="Company" name="company_id">
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea />
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
