import { Button, Row, Col, Space, message, Upload, Form } from "antd";
import Layout_Page from "../../../components/layouts/LayoutPage";
import { UploadOutlined } from "@ant-design/icons";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { wipService } from "../../../services/planning-management";

import ModalViewWip from "../../../components/planning-management/wip/ModalViewWip";
import { Link } from "../../../components/Link";

import router, { useRouter } from "next/router";
import Swal from "sweetalert2";

const Index = () => {
  const gridRef = useRef<any>(null);
  const [openView, setOpenView] = useState([false, null]);
  const containerStyle = useMemo(() => ({ width: "100%", height: "30vw" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const columnDefs = [
    { headerName: "File ID", field: "id", width: 100 },
    { headerName: "WIP Name", field: "name" },
    // { headerName: "Max wip", field: "max_wip", width: 120 },
    // { headerName: "Calculate function", field: "calculate_function" },
    // { headerName: "Presentation template", field: "presentation_template" },
    { headerName: "Description", field: "description" },
    {
      headerName: "State",
      field: "state",
      width: 130,
      cellRendererFramework: (params: any) => <div>{params?.data?.state}</div>,
    },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params: any) => (
        <div>
          <Space>
            <Button onClick={() => onView(params.data.id)}>View</Button>
            <Link href={`/planning-management/wip/edit/${params.data.id}`}>
              <Button>Edit</Button>
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

  const sizeToFit = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const onGridReady = useCallback(async (params) => {
    const data = await wipService.findAllWip();
    setRowData(data);
    // sizeToFit()
  }, []);

  // const onDelete = async (data: any) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you want to delete?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#1890ff",
  //     cancelButtonColor: "#ff4d4f",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //       assetService.delete(data.id).then(async (data) => {
  //         onGridReady(data);
  //       });
  //     }
  //   });
  // };


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

  const headerHeight = 70;
  const pivotHeaderHeight = 100;

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
                {/* <h1 style={{ fontSize: "22px" }}>WIP</h1> */}
                <Link href="/planning-management/wip/add">
                  <Button type="primary" style={{ fontSize: 14 }} size={"large"}>
                    Add WIP
                  </Button>
                </Link>
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
                    colResizeDefault={"shift"}
                    columnHoverHighlight={false}
                    onGridReady={onGridReady}
                    paginationAutoPageSize={true}
                    pagination={true}
                    cacheBlockSize={15}
                    sideBar={true}
                    // rowGroupPanelShow={"always"}
                    animateRows={true}
                    headerHeight={headerHeight}
                    pivotHeaderHeight={pivotHeaderHeight}
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
