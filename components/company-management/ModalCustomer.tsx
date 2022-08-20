/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Form, Input, Checkbox, Row, Col, Switch, Select } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

const ModalCustomer = ({
  titleModal,
  open,
  handleCancel,
  onCreate,
  confirmLoading,
}: any) => {
  // Form;
  const [form] = Form.useForm();
  const { Option } = Select;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  //   const [role, setRole] = useState([]);
  //   useEffect(() => {
  //     (async () => {
  //       const { data } = await axios.get(
  //         "http://localhost:3000/api/mes/user-management/findAllRole"
  //       );

  //       setRole(data);
  //     })();
  //   }, []);

  //   const [partition, setPartition] = useState([]);
  //   useEffect(() => {
  //     (async () => {
  //       const { data } = await axios.get(
  //         "http://localhost:3000/api/mes/user-management/findAllPartitionActive"
  //       );

  //       setPartition(data);
  //     })();
  //   }, []);

  const [checked, setChecked] = useState<any>([]);
  const onCheckboxChange = (event: any) => {
    var updatedList: any = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }

    setChecked(updatedList);
  };

  return (
    <div>
      <Modal
        title={titleModal}
        visible={open[0]}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              values.partition_id = checked;
              form.resetFields();
              onCreate(values);
              setChecked([]);
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
            label={"Name"}
            name={"name"}
            rules={[
              {
                required: true,
                message: `Please input Name!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Customer No"}
            name={"customer_no"}
            rules={[
              {
                required: true,
                message: `Please input Number!`,
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

export default ModalCustomer;
