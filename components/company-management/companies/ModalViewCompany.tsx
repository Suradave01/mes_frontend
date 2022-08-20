import { Col, Form, Modal, Row, Space } from "antd";
import { Button } from "antd/lib/radio";
import React, { useCallback, useState } from "react";
import { companyService } from "../../../services/company-management";

const ModalViewCompany = ({ titleModal, open, handleCancel }: any) => {
  const [data, setData] = useState<any>([]);

  const onView = useCallback(async (id) => {
    const data = await companyService.getById(id);
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
        footer={[]}
      >
        <div>
          <p>
            <b>Company ID : </b> {data.id}
          </p>
          <p>
            <b>Company Name : </b>
            {data.name}
          </p>
          <p>
            <b>Address : </b>
            {data.address}
          </p>
          <p>
            <b>Telephone_No : </b>
            {data.telephone_no}
          </p>
          <p>
            <b>State : </b>
            {data.state}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalViewCompany;
