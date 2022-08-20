import { Col, Form, Modal, Row, Space } from "antd";
import { Button } from "antd/lib/radio";
import React, { useCallback, useState } from "react";
import { partitionService } from "../../../services/user-management";

const ModalViewPartition = ({ titleModal, open, handleCancel }: any) => {
  const [data, setData] = useState<any>([]);

  const onView = useCallback(async (id) => {
    const data = await partitionService.getById(id);
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
            <b>Partition ID : </b> {data.id}
          </p>
          <p>
            <b>Partition Name : </b>
            {data.partition_name}
          </p>
          <p>
            <b>Description : </b> {data.partition_description}
          </p>
          <p>
            <b>Model Name : </b> {data.model_name}
          </p>
          <p>
            <b>SQL Append : </b> {data.sql_append}
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

export default ModalViewPartition;
