import { Col, Form, Modal, Row, Space } from "antd";
import { Button } from "antd/lib/radio";
import React, { useCallback, useState } from "react";

const ModalViewTrigger = ({ titleModal, open, handleCancel }: any) => {
  const [data, setData] = useState<any>([]);

  const onView = useCallback(async (id) => {
    await fetch(
      `http://localhost:3000/api/mes/user-management/findOnePartition/${id}`
    )
      .then(async (resp) => await resp.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (open[1] != undefined) {
    onView(open[1]);
  }
  return (
    <div>
      <Modal
        title={titleModal}
        visible={open[0]}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={[]}
      >
        <div>
          <p>
            <b>Trigger ID : </b> {data.trigger_id}
          </p>
          <p>
            <b>Trigger Name : </b>
            {data.trigger_name}
          </p>
          <p>
            <b>Status : </b>
            {data.state}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalViewTrigger;
