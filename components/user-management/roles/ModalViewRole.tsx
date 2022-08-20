import { Col, Form, Modal, Row, Space } from "antd";
import { Button } from "antd/lib/radio";
import React, { useCallback, useState } from "react";
import { roleService } from "../../../services/user-management";
import classes from "./AddEdit.module.css";

const ModalViewRole = ({ titleModal, open, handleCancel }: any) => {
  const [data, setData] = useState<any>([]);

  const onView = useCallback(async (id) => {
    const data = await roleService.getById(id);
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
            <b>Role ID : </b> {data.id}
          </p>
          <p>
            <b>Role Name : </b>
            {data.role_name}
          </p>
          <Row className={classes.dislayout}>
            <b>Permission :&nbsp;</b>
            <Space>
              {data.RoleMappingPermissions &&
                data.RoleMappingPermissions.map((permission: any) => {
                  return (
                    <div key={permission.Permission.id}>
                      <p>[{permission.Permission.permission_name}]</p>
                    </div>
                  );
                })}
            </Space>
          </Row>

          <Row className={classes.dislayout}>
            <b>Menu :&nbsp;</b>
            <Space>
              {data.MenuMappingRoles &&
                data.MenuMappingRoles.map((menu: any) => {
                  return (
                    <div key={menu.Resource.id}>
                      <p>[{menu.Resource.resource_name}]</p>
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

export default ModalViewRole;
