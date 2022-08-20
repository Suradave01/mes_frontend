import { Col, Form, Input, InputNumber, Modal, Row, Space } from "antd";
import form from "antd/lib/form";
import { Button } from "antd/lib/radio";
import React, { useCallback, useState } from "react";
import { planningService } from "../../services/planning-management";
import classes from "./WorkDetail.module.css";
import Swal from "sweetalert2";

const ModalUpdatePlanning = ({
  titleModal,
  open,
  handleCancel,
  dataDetail,
  finishDetail,
  gridReady,
}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [visible, setVisible] = useState();

  React.useEffect(() => {
    if (finishDetail) {
      form.setFieldsValue({
        finish_good_asset: finishDetail[0]?.fg,
        fail_good_asset: finishDetail[0]?.ok_ng,
        // true_number_completed: dataDetail?.cus_name,
        // trye_number_fail: dataDetail?.desc_name,
      });
    }
  }, [dataDetail]);

  const onFinish = async (value: any) => {
    const id = dataDetail.workorder_id;
    const wip_flow_mapping_id = dataDetail.wip_flow_mapping_id;
    const asset_name = dataDetail.this_asset;
    const wo_item_id = dataDetail.workorder_item_id;
    const data = {
      wip_flow_mapping_id,
      asset_name,
      wo_item_id,
      finish_good_emp: value.finish_good_emp,
      fail_good_emp: value.fail_good_emp,
      finish_good_asset: value.finish_good_asset,
      fail_good_asset: value.fail_good_asset,
    };
    console.log(id);
    let timerInterval: any;
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: 8000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        planningService.updateWoItemFinish(id, data);
      },
      willClose: () => {
        clearInterval(timerInterval);
        setVisible(handleCancel);
        gridReady(data);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // planningService.updateWoItemFinish(id, data).then(async (data) => {
        // });
      }
    });
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
            <Col span={12}>
              <Form.Item
                label="จำนวนงานเสร็จที่นับได้"
                name="finish_good_asset"
                className={classes.marginform}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="จำนวนของเสียที่นับได้"
                name="fail_good_asset"
                className={classes.marginform}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                label="จำนวนงานเสร็จจริง"
                name="finish_good_emp"
                className={classes.marginform}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="จำนวนของเสียจริง"
                name="fail_good_emp"
                className={classes.marginform}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalUpdatePlanning;
