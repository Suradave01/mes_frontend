/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Row,
  Col,
  Space,
  Modal,
  Checkbox,
  Form,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  Upload,
  Input,
  Progress,
  message,
  Alert,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import Layout_Page from "../../../components/layouts/LayoutPage";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";

import axios from "axios";
// import ModalCustomer from "../../components/assets/company-management/ModalCustomer";
// import ModalViewCustomer from "../../components/assets/company-management/ModalViewCustomer";

function Customer() {
  const [open, setOpen] = useState([false, null]);
  const [openView, setOpenView] = useState([false, null]);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showModal = async (data: any) => {
    if (data.type != "click") {
      setOpen([false, data]);
    } else {
      setOpen([true]);
    }
  };

  const showModalView = (data: any) => {
    if (data.type != "click") {
      setOpenView([true, data]);
      setTimeout(async () => {
        setOpenView([true]);
      }, 0);
    } else {
      setOpenView([true]);
    }
  };

  const closeModal = () => {
    setOpen([false]);
    setOpenView([false]);
    setConfirmLoading(false);
  };

  const containerStyle = useMemo(() => ({ width: "100%", height: "38vw" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const columnDefs = [
    {
      headerName: "Customer ID",
      field: "id",
    },
    { headerName: "Customer Name", field: "name" },
    { headerName: "Customer No.", field: "customer_no" },
    {
      headerName: "State",
      field: "state",
    },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params: any) => (
        <div>
          <Space>
            <Button ghost type="primary" onClick={() => onView(params.data.id)}>
              View
            </Button>
            {params?.data?.state === "start" && (
              <Button
                type="primary"
                onClick={() => onUpdateState(params.value)}
              >
                Active
              </Button>
            )}
            {params?.data?.state === "imported" && (
              <Button type="primary" onClick={() => onDelete(params.value)}>
                Approve
              </Button>
            )}
            {params?.data?.state === "active" && (
              <Button
                danger
                type="primary"
                onClick={() => onDelete(params.value)}
              >
                Delete
              </Button>
            )}
          </Space>
        </div>
      ),
    },
  ];
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("http://localhost:3000/api/mes/company-management/findAllCustomer")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onView = (data: any) => {
    showModalView(data);
  };

  // create Group
  const onCreate = async (values: any) => {
    console.log(values);

    setConfirmLoading(true);
    await axios
      .post("http://localhost:3000/api/mes/user-management/createGroup", {
        group_name: values.group_name,
        group_description: values.group_description,
        default_role: values.default_role,
        partition_id: values.partition_id,
      })
      .then(async (data) => {
        setTimeout(async () => {
          closeModal();
          setConfirmLoading(false);
          onGridReady(data);
        }, 500);
      });
  };

  // delete Group
  const onDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await axios
        .delete(
          `http://localhost:3000/api/mes/user-management/removeGroup/${id}`
        )
        .then(async (data) => {
          onGridReady(data);
        });
    }
  };

  const onUpdateState = async (id: number) => {
    await axios
      .patch(
        `http://localhost:3000/api/mes/user-management/updateStateGroupActive/${id}`
      )
      .then(async (data) => {
        onGridReady(data);
      });
  };

  const upload = {
    name: "file",
    action: "",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Layout_Page>
        <Row>
          {/* <Col xs={{ span: 1, offset: 0 }} lg={{ span: 3, offset: 0 }}></Col> */}
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            style={{ textAlign: "left" }}
          >
            <div style={{ marginBottom: 10 }}>
              <Space>
                <Button type="primary" size={"large"} onClick={showModal}>
                  Add Customer
                </Button>
                <Upload {...upload}>
                  <Button icon={<UploadOutlined />}>Import File</Button>
                </Upload>
                <Button type="primary" size={"large"} onClick={showModal}>
                  Approve All
                </Button>
              </Space>
              {/* <ModalCustomer
                titleModal={"Add Customer"}
                open={open}
                handleCancel={closeModal}
                onCreate={onCreate}
                confirmLoading={confirmLoading}
              />
              <ModalViewCustomer
                titleModal={"View Customer"}
                handleCancel={closeModal}
                open={openView}
              />*/}
            </div>
          </Col>
          {/* <Col xs={{ span: 1, offset: 0 }} lg={{ span: 3, offset: 0 }}></Col> */}
        </Row>
        <Row>
          {/* <Col xs={{ span: 1, offset: 0 }} lg={{ span: 2, offset: 0 }}></Col> */}
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
            <div>
              <div style={containerStyle}>
                <div style={gridStyle} className="ag-theme-alpine">
                  <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    columnHoverHighlight={false}
                    onGridReady={onGridReady}
                    paginationAutoPageSize={true}
                    pagination={true}
                    cacheBlockSize={15}
                    sideBar={true}
                    rowGroupPanelShow={"always"}
                    animateRows={true}
                    // rowModelType={"serverSide"}
                    // serverSideStoreType={"partial"}
                  ></AgGridReact>
                </div>
              </div>
            </div>
          </Col>
          {/* <Col xs={{ span: 1, offset: 0 }} lg={{ span: 2, offset: 0 }}></Col> */}
        </Row>
      </Layout_Page>
    </div>
  );
}

export default Customer;
