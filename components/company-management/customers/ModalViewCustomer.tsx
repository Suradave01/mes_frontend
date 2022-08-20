import { Col, Form, Modal, Row, Space } from "antd";
import { Button } from "antd/lib/radio";
import React, { useCallback, useState } from "react";

const ModalViewCompany = ({ titleModal, open, handleCancel }: any) => {
  const [data, setData] = useState<any>([]);

  //   const onView = useCallback(async (id) => {
  //     await fetch(
  //       `http://localhost:3000/api/mes/user-management/findOneUser/${id}`
  //     )
  //       .then(async (resp) => await resp.json())
  //       .then((data) => {
  //         setData(data);
  //       });
  //   }, []);

  if (open[1] != undefined) {
    // onView(open[1]);
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
            <b>Customer ID : </b> {data.id}
          </p>
          <p>
            <b>Customer Name : </b>
            {data.name}
          </p>
          <p>
            <b>Customer No : </b>
            {data.customer_no}
          </p>

          <p>
            <b>Status : </b>
            {data.state == "start" ? "Non Active" : "Active"}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalViewCompany;
