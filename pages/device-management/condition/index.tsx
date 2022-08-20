/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Row, Col, Space } from "antd";
import Layout_Page from "../../../components/layouts/LayoutPage";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Link } from "../../../components/Link";
import { deviceService } from "../../../services/device-management";

import Swal from "sweetalert2";

const Index = () => {
  const gridRef = useRef<any>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "34vw" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const columnDefs = [
    { headerName: "Condition Type Id", field: "id" },
    { headerName: "Condition Type Name", field: "condition_type_name" },
    { headerName: "Field Compare", field: "field_compare" },
    { headerName: "Operational Operator", field: "condition" },
    { headerName: "Description", field: "description" },
    {
      headerName: "Actions",
      field: "condition_type_id",
      cellRendererFramework: (params: any) => (
        <div>
          <Space>
            <Button
              danger
              type="primary"
              onClick={() => questionAlert(params.data)}
            >
              Delete
            </Button>
          </Space>
        </div>
      ),
    },
  ];
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      enablePivot: false,
      enableRowGroup: true,
      floatingFilter: true,
    };
  }, []);

  const onGridReady = useCallback(async (params) => {
    const data = await deviceService.findAllConditionType();
    setRowData(data);
  }, []);

  const questionAlert = async (data: any) => {
    // console.log(data.Triggers);
    if (data.Triggers.length > 0) {
      Swal.fire({
        title: "เชื่อมอยู่กับ trigger",
        text: "Do you want to delete?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1890ff",
        cancelButtonColor: "#ff4d4f",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          deviceService.removeConditionType(data.id).then(async (data) => {
            onGridReady(data);
          });
        }
      });
    } else {
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
          deviceService.removeConditionType(data.id).then(async (data) => {
            onGridReady(data);
          });
        }
      });
    }
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
                <Link href="/device-management/condition/add">
                  <Button type="primary" size={"large"}>
                    Add Condition
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
