import { Col, Form, Modal, Row, Space } from "antd";
import { Button } from "antd/lib/radio";
import React, { useCallback, useState } from "react";
import { groupService } from "../../../services/user-management";
import classes from "./AddEdit.module.css";

const ModalViewGroup = ({ titleModal, open, handleCancel }: any) => {
  const [data, setData] = useState<any>([]);

  const onView = useCallback(async (id) => {
    const data = await groupService.getById(id);
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
            <b>Group ID : </b> {data.id}
          </p>
          <p>
            <b>Group Name : </b>
            {data.group_name}
          </p>
          <p>
            <b>Default Role : </b>
            {data.default_role}
          </p>

            <Row className={classes.dislayout}>
              <b>Partition :&nbsp;</b>
              <Space>
                {data.PartitionMappingGroups &&
                  data.PartitionMappingGroups.map((partition: any) => {
                    return (
                      <div key={partition.Partition.id}>
                        <p>[{partition.Partition.partition_name}]</p>
                      </div>
                    );
                  })}
              </Space>
            </Row>

          <p>
            <b>Status : </b>
            {data.state}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalViewGroup;
