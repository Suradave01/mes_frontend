import { Checkbox, Col, Form, Modal, Row, Select, Space } from "antd";
import Radio, { Button, RadioChangeEvent } from "antd/lib/radio";
import React, { useCallback, useEffect, useState } from "react";
import { assetService } from "../../../services/asset-management";
import classes from "./modalselectFlow.module.css";
import { wipFlowService } from "../../../services/planning-management/wip-flow.service";
import Swal from "sweetalert2";
import { importService } from "../../../services/import";
import form from "antd/lib/form";

const ModalSelectFlow = ({
  titleModal,
  open,
  handleCancel,
  onProcess,
  dataDetail,
  openView,
  gridReady,
}: any) => {
  const [data, setData] = useState<any>([]);

  const [form] = Form.useForm();

  const onView = useCallback(async (id) => {
    const data = await assetService.getById(id);
    setData(data);
    // console.log(data.AssetMappingDevices[1].Device.device_name);
  }, []);

  if (open[1] != undefined) {
    onView(open[1]);
  }
  const handleChange = (value: string) => {
    console.log(value);
  };

  const [selectFlow, setSelectFlow] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const data = await wipFlowService.findAllWipFlow();
      setSelectFlow(data);
    })();
  }, []);

  const optionFlow: any = selectFlow.map((flow: any) => {
    return <div key={flow.id}>{flow.wip_flow_name}</div>;
  });
  const [visible, setVisible] = useState();
  const onFinish = async (value: any) => {
    setVisible(handleCancel);
    Swal.fire({
      title: 'Please wait!',
      html: 'please wait a moment.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

    const flow_data_number = Number(value.flow_data);
    const id = dataDetail;
    const params = {
      ref_wip_flow_id: flow_data_number,
    };
    console.log(params);

    await importService.processImportDataPlanning(id, params).then(async () => {
      Swal.fire({
        icon: "success",
        title: "Process",
        text: "Process success!",
      }).then((result) => {
        if (result.isConfirmed) {
          gridReady(data);
        }
      });
    });
  };

  return (
    <div>
      <Modal
        title={titleModal}
        centered
        visible={open[0]}
        // onOk={onProcess}
        onOk={form.submit}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form
          form={form}
          name="horizontal_login"
          layout="vertical"
          onFinish={onFinish}
        >
          <div>
            <Form.Item
              label="flow :"
              name="flow_data"
              // className={classes.marginform}
            >
              <Select
                defaultValue="กรุณาเลือก"
                style={{ width: "100%" }}
                onChange={handleChange}
              >
                {optionFlow}
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalSelectFlow;
