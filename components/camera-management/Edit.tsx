import { Input, Row, Col, Button, Form, Space, message } from "antd";
import router, { useRouter } from "next/router";
import Layout_Page from "../layouts/LayoutPage";
import { Link } from "../../components/Link";
import React, { useEffect, useState } from "react";
import classes from "./AddEdit.module.css";
import { cameraService } from "../../services/camera-management";

export { AddEdit };

function AddEdit(props: any) {
  const router = useRouter();
  const [ipAddress, setIpAddress] = useState();
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
      camera_name: values.camera_name,
      ip_address: values.ip_address,
      position: values.position,
      user: values.user,
      pass: values.pass,
    };
    console.log(data);
  };

  setInterval(async function () {
    const id = router.query.id;
    const data = await cameraService.getCameraById(id);
    setIpAddress(data.ip_address);
  }, 1000);

  return (
    <Layout_Page>
      <Row className={classes.dislayout}>
        <Col span={14}>
          <Form
            {...formItemLayout}
            form={form}
            layout="vertical"
            name="editCamera"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item label="Camera Name" name="camera_name">
              <Input />
            </Form.Item>

            <Form.Item
              label="IP address"
              name="ip_address"
              rules={[
                {
                  required: true,
                  message: `Please input IP Address`,
                },
              ]}
            >
              <Input defaultValue={ipAddress} />
            </Form.Item>

            <Form.Item label="Position" name="position">
              <Input />
            </Form.Item>

            <Form.Item label="Username" name="user">
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="pass">
              <Input.Password />
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
                <Link href="/camera-management">
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
