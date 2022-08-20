import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Modal, Row, Space } from "antd";
import form from "antd/lib/form";
import React, { useState } from "react";
import classes from "./WorkDetail.module.css";

const ModalWorkDetailDieCut = ({
  isModalVisible,
  handleOk,
  // handleOk,
  handleCancel,
  dataDetail,
}: any) => {
  const [form] = Form.useForm();
  // เข้า
  const enter = (dataDetail?.q_pro * dataDetail?.sheet_l) / 1000;

  // const [isModalVisible, setIsModalVisible] = useState(true);

  const [visible, setVisible] = useState();
  const onFinish = (value: any) => {
    const id = dataDetail.workorder_id 
    const data = {id, value}
    // console.log("Finish:",dataDetail.workorder_id , params);
    console.log(data);
    setVisible(handleOk)
  };

  

  React.useEffect(() => {
    form.setFieldsValue({
      job_no: dataDetail?.job_no,
      MC_No: dataDetail?.mc_no,
      cus_name: dataDetail?.cus_name,
      detail: dataDetail?.desc_name,
      date_due: dataDetail?.date_pro,
      // master_no: enter,
    });
  }, [dataDetail]);

  return (
    <div>
      <Modal
        title="รายละเอียดการผลิต"
        centered
        visible={isModalVisible}
        onOk={form.submit}
        // onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Form
          form={form}
          name="horizontal_login"
          layout="vertical"
          // initialValues={{
          //   job_no: dataDetail?.job_no,
          //   MC_No: dataDetail?.mc_no,
          //   cus_name: dataDetail?.cus_name,
          //   detail: dataDetail?.desc_name,
          //   date_due: dataDetail?.date_pro,
          // }}
          onFinish={onFinish}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8}>
              <Form.Item
                label="Job id"
                name="job_no"
                className={classes.marginform}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="MC/No"
                name="MC_No"
                className={classes.marginform}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="ชื่อลูกค้า"
                name="cus_name"
                className={classes.marginform}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                label="รายละเอียด"
                name="detail"
                className={classes.marginform}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="ส่ง"
                name="date_due"
                className={classes.marginform}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item label="เข้า" name="in" className={classes.marginform}>
                <InputNumber
                  disabled={false}
                  formatter={(value) =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ออก" name="out" className={classes.marginform}>
                <InputNumber
                  formatter={(value) =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8}>
              <Form.Item label="Job" name="job" className={classes.marginform}>
                <Input defaultValue="1" disabled={false} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Speed เมตร/นาที"
                name="speed"
                className={classes.marginform}
              >
                <Input defaultValue="40" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Time"
                name="time"
                className={classes.marginform}
              >
                <Input defaultValue="01:28" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                label="เวลาแผน เริ่ม"
                name="plan_start_time"
                className={classes.marginform}
              >
                <Input defaultValue="13:00" disabled={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="เวลาแผน สิ้นสุด"
                name="plan_finish_time"
                className={classes.marginform}
              >
                <Input defaultValue="14:28" disabled={false} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                label="เวลาจริง เริ่ม"
                name="plan_start_time_real"
                className={classes.marginform}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="เวลาจริง สิ้นสุด"
                name="plan_finish_time_real"
                className={classes.marginform}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                label="Setup"
                name="setup"
                className={classes.marginform}
              >
                <Input defaultValue="30" disabled={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Setup"
                name="setup_time"
                className={classes.marginform}
              >
                <Input disabled={false} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item label="P" name="p" className={classes.marginform}>
                <Input defaultValue="0" disabled={false} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item label="Q" name="q" className={classes.marginform}>
                <Input defaultValue="0.00" disabled={false} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalWorkDetailDieCut;
