import { Col, Form, Modal, Row, Space } from "antd";
import { Button } from "antd/lib/radio";
import React, { useCallback, useState } from "react";
import { resourceService } from "../../../services/user-management";

const ModalViewResource = ({ titleModal, open, handleCancel }: any) => {
  const [data, setData] = useState<any>([]);

  const onView = useCallback(async (id) => {
    const data = await resourceService.getById(id);
    setData(data);
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
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <div>
          <p>
            <b>Resource ID : </b> {data.id}
          </p>
          <p>
            <b>Resource Code : </b>
            {data.resource_code}
          </p>
          <p>
            <b>Resource Name : </b> {data.resource_name}
          </p>
          <p>
            <b>Type : </b> {data.resource_type}
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

export default ModalViewResource;
