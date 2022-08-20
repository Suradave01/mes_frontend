import { Col, Form, Modal, Row, Space } from "antd";
import { Button } from "antd/lib/radio";
import React, { useCallback, useState } from "react";
import { assetService } from "../../../services/asset-management";
import classes from "./AddEdit.module.css";

const ModalViewAsset = ({ titleModal, open, handleCancel }: any) => {
  const [data, setData] = useState<any>([]);

  const onView = useCallback(async (id) => {
    const data = await assetService.getById(id);
    setData(data);
    // console.log(data.AssetMappingDevices[1].Device.device_name);
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
        cancelButtonProps={{ style: { display: 'none' } }} 
      >
        <div>
          <div className={classes.pd10}>
            <b>Asset ID : </b> {data.id}
          </div>
          <div className={classes.pd10}>
            <b>Asset Name : </b>
            {data.asset_name}
          </div>
          <div className={classes.pd10}>
            <b>Description : </b> {data.description}
          </div>

          <div className={classes.pd10}>
            <b>Status : </b>
            {data.state}
          </div>
          <div className={classes.pd10}>
            <b>Device : </b>
            <Space>
              {data.AssetMappingDevices &&
                data.AssetMappingDevices?.map((device: any) => {
                  return (
                    <div key={device.Device.id}>
                      <div>[{device.Device.device_name}]</div>
                    </div>
                  );
                })}
            </Space>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalViewAsset;
