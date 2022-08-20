/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Form, Input, Checkbox, Row, Col, Switch } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

const ModalTrigger = ({ open, handleCancel, onCreate, confirmLoading }:any) => {
  // Form;
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <div>
      <Modal
        title="Trigger Modal"
        visible={open[0]}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} name="form" {...formItemLayout}>
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
        </Form>
      </Modal>
    </div>
  );
};

export default ModalTrigger;
