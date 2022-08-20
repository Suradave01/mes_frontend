import { Col, Form, Input, InputNumber, Modal, Row, Space } from "antd";
import form from "antd/lib/form";
import { Button } from "antd/lib/radio";
import React, { useCallback, useState } from "react";
import classes from "./WorkDetail.module.css";
import { planningService } from "../../services/planning-management";

const ModalCancel = ({
  titleModal,
  open,
  handleCancel,
  dataDetail,
  updateWoItemCancel,
}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [visible, setVisible] = useState();

  const onFinish = async (value: any) => {
    const id = dataDetail.workorder_id;
    const params = {
      asset_name: dataDetail.this_asset,
      wo_item_id: dataDetail.workorder_item_id,
      wip_flow_mapping_id: dataDetail.wip_flow_mapping_id,
      note: value.note,
    };
    updateWoItemCancel(id, params);
    setVisible(handleCancel);
  };

  return (
    <div>
      <Modal
        centered
        onOk={form.submit}
        title={titleModal}
        visible={open[0]}
        onCancel={handleCancel}
        width={800}
      >
        <Form
          form={form}
          name="horizontal_login"
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item
                label="สาเหตุ"
                name="note"
                className={classes.marginform}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalCancel;
