import { Col, Form, Modal, Row, Space } from "antd";
import { Button } from "antd/lib/radio";
import React, { useCallback, useState } from "react";
import { userService } from "../../../services/user-management";
import classes from "./AddEdit.module.css";

const ModalViewUser = ({ titleModal, open, handleCancel }: any) => {
  const [data, setData] = useState<any>([]);

  const onView = useCallback(async (id) => {
    const data = await userService.getById(id);
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
          <Row>
            <Col span={8}>
              <p>
                <b>User ID : </b><br/>{data.id}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <b>User Name : </b><br/>
                {data.username}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <b>Email : </b><br/>
                {data.email}
              </p>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Row className={classes.dislayout}>
              <p>
                <b>Role :&nbsp;</b><br/>
                <Space>
                  {data.UserMappingRoles &&
                    data.UserMappingRoles.map((role: any) => {
                      return (
                        <div key={role.role_id}>
                          [{role.Role.role_name}]
                        </div>
                      );
                    })}
                </Space>
                </p>
              </Row>
            </Col>
            <Col span={8}>
              <Row className={classes.dislayout}>
              <p>
                <b>Group :&nbsp;</b><br/>
                <Space>
                  {data.UserMappingGroups &&
                    data.UserMappingGroups.map((group: any) => {
                      return (
                        <div key={group.Group.group_id}>
                          <p>[{group.Group.group_name}]</p>
                        </div>
                      );
                    })}
                </Space>
              </p>
              </Row>
            </Col>
          
          <Col span={8}>
            <Row className={classes.dislayout}>
            <p>
              <b>Partition :&nbsp;</b><br/>
              <Space>
                {data.UserMappingPartitions &&
                  data.UserMappingPartitions.map((partition: any) => {
                    return (
                      <div key={partition.partition_id}>
                        <p>[{partition.Partition.partition_name}]</p>
                      </div>
                    );
                  })}
              </Space>
              </p>
            </Row>
          </Col>
          </Row>
          <p>
            <b>State : </b><br/>
            {data.state=='active'? <span className={classes.active}>{data.state}</span>
            :<span className={classes.inactive}>{data.state}</span>}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalViewUser;
