import { Button, Row, Col, Space, message, Upload, Form } from "antd";
import Layout_Page from "../../../components/layouts/LayoutPage";
import { UploadOutlined } from "@ant-design/icons";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { wipFlowService } from "../../../services/planning-management";

import ModalViewWip from "../../../components/planning-management/wip/ModalViewWip";
import { Link } from "../../../components/Link";

import router, { useRouter } from "next/router";
import Swal from "sweetalert2";

const Index = () => {
  const gridRef = useRef<any>(null);
  const [openView, setOpenView] = useState([false, null]);
  const containerStyle = useMemo(() => ({ width: "100%", height: "34vw" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const columnDefs = [
    { headerName: "File ID", field: "id" , width: 100},
    { headerName: "WIP Flow Name", field: "wip_flow_name" },
    { headerName: "Presentation template", field: "presentation_template" },
    { headerName: "Description", field: "description" },
    {
      headerName: "State",
      field: "state",
      width: 100,
      cellRendererFramework: (params: any) => <div>{params?.data?.state}</div>,
    },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params: any) => (
        <div>
          <Space>
            <Button onClick={() => onView(params.data.id)}>
              View
            </Button>
            <Link href={`/planning-management/wip-flow/edit/${params.data.id}`}>
              <Button>
                Edit
              </Button>
            </Link>
          </Space>
        </div>
      ),
    },
  ];

  const [form] = Form.useForm();

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      enablePivot: false,
      enableRowGroup: true,
      floatingFilter: true,
    };
  }, []);

  const autoSizeAll = useCallback((skipHeader: any) => {
    const allColumnIds: any[] = [];
    gridRef.current.columnApi.getAllColumns().forEach((column: any) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }, []);

  const sizeToFit = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const onGridReady = useCallback(async (params) => {
    const data = await wipFlowService.findAllWipFlow();
    setRowData(data);
    // autoSizeAll(false);
    // sizeToFit()
  }, []);

  const onView = (data: any) => {
    showModalView(data);
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
    setOpenView([false]);
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
                <Link href="/planning-management/wip-flow/add">
                  <Button type="primary" size={"large"}>
                    Add WIP Flow
                  </Button>
                </Link>
              </Space>
              <ModalViewWip
                titleModal={"View Wip"}
                handleCancel={closeModal}
                open={openView}
              />
              <Form
                form={form}
                layout="vertical"
                name="createAsset"
                // onFinish={onFinish}
              ></Form>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
            <div>
              <div style={containerStyle}>
                <div
                  style={gridStyle}
                  className="ag-theme-alpine ag-theme-custom"
                >
                  <AgGridReact
                    ref={gridRef}
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

export default Index;
