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
import { Link } from "../../../components/Link";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import ModalTrigger from "../../../components/asset-management/ModalTrigger";
import ModalViewTrigger from "../../../components/asset-management/trigger/ModalViewTrigger";

import { triggerService } from "../../../services/asset-management";

import Swal from "sweetalert2";

const Trigger = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "38vw" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const columnDefs = [
    { headerName: "Trigger ID", field: "id" },
    { headerName: "Trigger Name", field: "trigger_name" },

    {
      // headerName: "State",
      // field: "state",
      // cellRendererFramework: (params: any) => (
      //   <div>
      //     {params.data.state === "active" && (
      //       <Row>
      //         <Col span={9}></Col>
      //         <Col span={6}>{params?.data?.state}</Col>
      //         <Col span={9}></Col>
      //       </Row>
      //     )}
      //     {params.data.state === "start" && (
      //       <Row>
      //         <Col span={9}></Col>
      //         <Col span={6}>{params?.data?.state}</Col>
      //         <Col span={9}></Col>
      //       </Row>
      //     )}
      //   </div>
      // ),
      headerName: "State",
      field: "state",
      cellRendererFramework: (params: any) => <div>{params?.data?.state}</div>,
    },
    {
      // headerName: "Actions",
      // field: "id",
      // cellRendererFramework: (params: any) => (
      //   <div>
      //     <Space>
      //       <Button ghost type="primary">
      //         View
      //       </Button>
      //       {params.data.state === "start" && (
      //         <Button type="primary">Active</Button>
      //       )}
      //       {params.data.state === "active" && (
      //         <Button danger type="primary">
      //           Delete
      //         </Button>
      //       )}
      //     </Space>
      //   </div>
      // ),
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params: any) => (
        <div>
          <Space>
            <Button onClick={() => onView(params.data.id)}>View</Button>
            <Link href={`/asset-management/trigger/edit/${params.data.id}`}>
              <Button>Edit</Button>
            </Link>
            {params?.data?.state === "start" && (
              <Button
                type="primary"
                onClick={() => onUpdateStateActive(params.value)}
              >
                Active
              </Button>
            )}
            {params?.data?.state === "active" && (
              <Button onClick={() => onUpdateStateInactive(params.value)}>
                Inactive
              </Button>
            )}
            {params?.data?.state === "inactive" && (
              <Space>
                <Button
                  type="primary"
                  onClick={() => onUpdateStateActive(params.value)}
                >
                  Active
                </Button>
                <Button
                  danger
                  type="primary"
                  onClick={() => onDelete(params.data)}
                >
                  Delete
                </Button>
              </Space>
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

  const onGridReady = useCallback(async (params) => {
    const data = await triggerService.getAll();
    setRowData(data);
  }, []);

  const onView = (data: any) => {
    // showModalView(data);
  };
  const onUpdateStateActive = async (id: number) => {
    await triggerService.active(id, null).then(async (data) => {
      onGridReady(data);
    });
  };

  const onUpdateStateInactive = async (id: number) => {
    await triggerService.inactive(id, null).then(async (data) => {
      onGridReady(data);
    });
  };
  // const onDelete = async (id: number) => {
  //   if (window.confirm("Are you sure?")) {
  //     await triggerService.delete(id).then(async (data) => {
  //       onGridReady(data);
  //     });
  //   }
  // };

  const onDelete = async (data: any) => {
    // console.log(data.Triggers);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "#ff4d4f",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        triggerService.delete(data.id).then(async (data) => {
          onGridReady(data);
        });
      }
    });
  };

  return (
    <div>
      <Layout_Page>
        <Row>
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            style={{ textAlign: "right" }}
          >
            <div style={{ marginBottom: 10 }}>
              <Space>
                <Link href="/asset-management/trigger/add">
                  <Button type="primary" size={"large"}>
                    Add Trigger
                  </Button>
                </Link>
              </Space>
            </div>
          </Col>
        </Row>
        <Row>
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
                  ></AgGridReact>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Layout_Page>
    </div>
  );
};

export default Trigger;
