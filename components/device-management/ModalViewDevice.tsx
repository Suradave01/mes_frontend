import { Col, Form, Modal, Row, Space } from "antd";
import { Button } from "antd/lib/radio";
import React, { useCallback, useState } from "react";

const ModalViewDevice = ({ titleModal, open, handleCancel }: any) => {
  const [data, setData] = useState<any>([]);

  const onView = useCallback(async (id) => {
    await fetch(
      `http://localhost:3000/api/mes/device-management/findOneDevice/${id}`
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
            <b>Device ID : </b> {data.id}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalViewDevice;
