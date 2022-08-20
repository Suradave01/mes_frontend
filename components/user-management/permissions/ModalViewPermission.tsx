import { Col, Form, Modal, Row, Space } from "antd";
import { Button } from "antd/lib/radio";
import React, { useCallback, useState } from "react";
import { permissionService } from "../../../services/user-management";

const ModalViewPermission = ({ titleModal, open, handleCancel }: any) => {
  const [data, setData] = useState<any>([]);

  const onView = useCallback(async (id) => {
    const data = await permissionService.getById(id);
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
            <b>Permission ID : </b> {data?.id}
          </p>
          <p>
            <b>Permission Name : </b> {data?.permission_name}
          </p>
          <p>
            <b>Resource Name : </b> {data?.Resource?.resource_name}
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

export default ModalViewPermission;
