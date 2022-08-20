import { Col, Form, Modal, Row, Space } from "antd";
import { Button } from "antd/lib/radio";
import { count } from "console";
import React, { useCallback, useState } from "react";
import { wipService } from "../../../services/planning-management";
import classes from "./AddEdit.module.css";

const ModalViewWip = ({ titleModal, open, handleCancel }: any) => {
  const [data, setData] = useState<any>([]);

  const onView = useCallback(async (id) => {
    const data = await wipService.getById(id);
    setData(data);
    console.log(data.field_default.length);
  }, []);

  if (open[1] != undefined) {
    onView(open[1]);
  }

  return (
    <div>
      <Modal
        title={titleModal}
        centered
        visible={open[0]}
        onOk={handleCancel}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        // className={classes.scrollbar}
      >
        <div>
          <b>Field Default : </b> <br />
          <Space className={classes.fildLeft}>
            {data.field_default &&
              data.field_default.map((wip: any) => {
                return (
                  <div key={wip.name}>
                    <p>
                      Name: [{wip.name}]<br />
                    </p>
                  </div>
                );
              })}
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default ModalViewWip;
