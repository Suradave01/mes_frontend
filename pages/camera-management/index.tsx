/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Row, Col, Space } from "antd";
import Layout_Page from "../../components/layouts/LayoutPage";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Link } from "../../components/Link";
import { cameraService } from "../../services/camera-management";
import Router, { useRouter } from "next/router";

let allRowData: any[];

const Index = () => {
  const router = useRouter();
  const gridRef = useRef<any>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "34vw" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Camera Name",
      field: "camera_name",
    },
    {
      headerName: "IP Address",
      field: "ip_address",
    },
    { headerName: "Position", field: "position" },
    {
      headerName: "Actions",
      field: "camera_id",
      cellRendererFramework: (params: any) => (
        <Space>
          <Button onClick={() => console.log(params.data.camera_id)}>
            View
          </Button>
          <Button type="link" onClick={() => onEdit(params.data.camera_id)}>
            Edit
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => onDelete(params.data.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      enablePivot: false,
      enableRowGroup: true,
    };
  }, []);

  // Edit camera
  const onEdit = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      const href = `/camera-management/edit/${id}`;
      router.push(href);
    }
  };

  // delete camera
  const onDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await cameraService.removeCamera(id).then(async (data) => {
        onGridReady(data);
      });
    }
  };

  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
        },
      ],
    };
  }, []);

  const onGridReady = useCallback(async (params) => {
    const data = await cameraService.getAllCamera();
    allRowData = data;
    setRowData(data);
    // sizeToFit();
  }, []);

  setInterval(async function () {
    const data = await cameraService.getAllCamera();
    allRowData = data;
  }, 1000);

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
                <Link href="/camera-management/add">
                  <Button type="primary" size={"large"}>
                    Add Camera
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
                    sideBar={sideBar}
                    rowGroupPanelShow={"always"}
                    animateRows={true}
                    groupDefaultExpanded={0}
                    masterDetail={true}
                    detailRowAutoHeight={true}
                    // getRowId={getRowId}

                    enableCellChangeFlash={true}
                    // rowModelType={"serverSide"}
                    // serverSideStoreType={"partial"}
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
