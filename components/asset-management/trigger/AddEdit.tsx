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

import { triggerService } from "../../../services/asset-management";
import { assetService } from "../../../services/asset-management";
import { deviceService } from "../../../services/device-management";
import { ChannelService } from "../../../services/alarm-management";

import classes from "./AddEdit.module.css";

import Swal from "sweetalert2";

import { count } from "console";

export { AddEdit };
const { Option } = Select;

function AddEdit(props: any) {
  const trigger = props?.trigger;
  const isAddMode = !trigger;
  const router = useRouter();
  console.log(trigger);

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
      trigger_name: values.trigger_name,
      type: values.type,
      asset_id: values.asset_id,
      device_field_id: values.device_field_id,
      channel_id: values.channel_id,
      condition_type_id: values.condition_type_id,
      value: values.value,
    };
    console.log(data);

    return isAddMode
      ? await triggerService.create(data).then(async () => {
          // message.success("Add success!");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Add success!",
          });
          router.back();
        })
      : await triggerService.update(trigger.id, data).then(async () => {
          // message.success(`Edit success! ${trigger.id}`);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Edit success!",
          });
          router.back();
        });
  };
  function handleChange(values: any) {
    // console.log(`selected ${values}`);
  }

  function onChange(values: any) {
    // console.log("changed", values);
  }

  const { Option } = Select;

  const [asset, setAsset] = useState([]);
  const [device, setDevice] = useState<any>([]);
  const [devicefield, setDevicefield] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const data = await assetService.getAll();
      setAsset(data);
      // console.log(data);
    })();
  }, []);

  const optionAsset = asset.map((Asset: any) => {
    return <Option key={Asset.id}>{Asset.asset_name}</Option>;
  });

  const [channel, setChannel] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await ChannelService.findAllChannel();
      setChannel(data);
      console.log(data);
    })();
  }, []);

  const optionChannel = channel.map((Channel: any) => {
    return <Option key={Channel.id}>{Channel.channel_name}</Option>;
  });

  const [condition, setCondition] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await deviceService.findAllConditionType();
      setCondition(data);
    })();
  }, []);

  const optionCondition = condition.map((Condition: any) => {
    return <Option key={Condition.id}>{Condition.condition_type_name}</Option>;
  });

  const [optiondevice, setOptiondevice] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await deviceService.getAll();
      setOptiondevice(data);
      console.log(data);
    })();
  }, []);

  const optiondeviceselect = optiondevice.map((optiondevice: any) => {
    return <Option key={device.id}>{device.device_name}</Option>;
  });

  const Showdevice = (value: any) => {
    const DeviceData = asset.map((Asset: any) => {
      // console.log(Asset.id);
      if (value == Asset.id && Asset.AssetMappingDevices.length > 0) {
        return (
          <Option key={Asset.AssetMappingDevices[0].Device.id}>
            {Asset.AssetMappingDevices[0].Device.device_name}
          </Option>
        );
      } else {
      }
    });
    setDevice(DeviceData);
  };

  const Showfielddevice = (value: any) => {
    const fieldDeviceData = asset.map((Asset: any) => {
      if (value == Asset.id) {
        return (
          <Option key={Asset.AssetMappingDevices[0].Device.DeviceFields[0].id}>
            {Asset.AssetMappingDevices[0].Device.DeviceFields[0].field_name}
          </Option>
        );
      }
    });
    setDevicefield(fieldDeviceData);
  };

  return (
    <Layout_Page>
      {/* <h1 className={classes.txthead}>
        {isAddMode ? "Add Trigger" : `Edit Trigger ID: ${trigger.id} `}
      </h1> */}
      <Row className={classes.dislayout}>
        <Col span={14}>
          <Form
            {...formItemLayout}
            form={form}
            layout="vertical"
            name="createTrigger"
            onFinish={onFinish}
            initialValues={
              !isAddMode
                ? {
                    trigger_name: `${trigger?.trigger_name}`,
                    device_field_id: `${trigger?.device_field_id}`,
                    device_id: `${trigger?.Asset.AssetMappingDevices[0].Device.id}`,
                    asset_id: `${trigger?.asset_id}`,
                    channel_id: `${trigger?.channel_id}`,
                    condition_type_id: `${trigger?.condition_type_id}`,
                    value: `${trigger?.value}`,
                    type: `${trigger?.type}`,
                  }
                : []
            }
            scrollToFirstError
          >
            <Form.Item
              label="Trigger Name"
              name="trigger_name"
              rules={[
                {
                  required: true,
                  message: `Please input Trigger Name`,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Asset"
              name="asset_id"
              rules={[
                {
                  required: true,
                  message: `Please input Asset`,
                },
              ]}
            >
              <Select
                placeholder="Please select"
                value={optionAsset}
                onChange={Showdevice}
              >
                {optionAsset}
              </Select>
            </Form.Item>

            <Form.Item
              label="Device"
              name="device_id"
              rules={[
                {
                  required: true,
                  message: `Please input Asset`,
                },
              ]}
            >
              <Select
                placeholder="Please select"
                value={device}
                onChange={Showfielddevice}
              >
                {device}
              </Select>
            </Form.Item>

            <Form.Item
              label="Device Field"
              name="device_field_id"
              rules={[
                {
                  required: true,
                  message: `Please input Asset`,
                },
              ]}
            >
              <Select value={devicefield} placeholder="Please select">
                {devicefield}
              </Select>
            </Form.Item>

            <Form.Item
              label="Channel"
              name="channel_id"
              rules={[
                {
                  required: true,
                  message: `Please input Channel`,
                },
              ]}
            >
              <Select placeholder="Please select" onChange={handleChange}>
                {optionChannel}
              </Select>
            </Form.Item>

            <Form.Item
              label="Condition"
              name="condition_type_id"
              rules={[
                {
                  required: true,
                  message: `Please input Condition`,
                },
              ]}
            >
              <Select placeholder="Please select" onChange={handleChange}>
                {optionCondition}
              </Select>
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: `Please input Type`,
                },
              ]}
            >
              <Select>
                <Option value="INFO">Info</Option>
                <Option value="WARNING">Warning</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Value"
              name="value"
              rules={[
                {
                  required: true,
                  message: `Please input Device`,
                },
              ]}
            >
              <InputNumber
                min={1}
                max={10}
                defaultValue={0}
                onChange={onChange}
              />
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
                <Link href="/asset-management/trigger">
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
