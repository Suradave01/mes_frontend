import { Button, Row, Col, Space, message, Upload, Form } from "antd";
import Layout_Page from "../../../components/layouts/LayoutPage";
import { UploadOutlined } from "@ant-design/icons";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { importService } from "../../../services/import";
import router, { useRouter } from "next/router";
import Swal from "sweetalert2";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import axios from "axios";
import { addAbortSignal } from "stream";
import { apiUrl } from "../../../config";

const Index = () => {
  const gridRef = useRef<any>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "34vw" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const columnDefs = [
    {
      headerName: "File ID",
      field: "id",
      width: 100,
    },
    { headerName: "File Name", field: "file_name" },
    {
      headerName: "State",
      field: "state",
      width: 90,
      cellRendererFramework: (params: any) => <div>{params?.data?.state}</div>,
    },
    {
      headerName: "Actions",
      field: "id",
      // width: 50,
      cellRendererFramework: (params: any) => (
        <div>
          <Space>
            <Space>
              <Button onClick={() => onProcess(params.data.id)}>Process</Button>
              <Button
                danger
                type="primary"
                onClick={() => onDelete(params.data.id)}
              >
                Delete
              </Button>
            </Space>
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
    const data = await importService.findAllImportCusData();
    setRowData(data);
  }, []);

  const onDelete = async (id: any) => {
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
        importService.delete(id).then(async (data) => {
          onGridReady(data);
        });
      }
    });
  };

  const onProcess = async (id: number) => {
    Swal.fire({
      icon: "success",
      title: "Process",
      text: "Process success!",
    });
    await importService
      .processImportDataCustomer(id, null)
      .then(async (data) => {
        onGridReady(data);
      });
  };

  const [showUploadList, setShowUploadList] = useState<any>(false);
  const [fileList, setFileList] = useState<any>(null);
  const props: UploadProps = {
    beforeUpload: (file) => {
      setFileList([fileList, file]);
      const isXLSX =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isXLSX) {
        message.error(`${file.name} is not a xlsx file`);
      }
      setShowUploadList(true);
      return isXLSX || Upload.LIST_IGNORE;
      // return false;
    },
    onRemove: (file) => {
      setFileList(null);
    },
    // fileList
  };

  const uploadFile = async (values: any) => {
    const baseUrl = `${apiUrl}/import-data`;
    const data = new FormData();
    data.append("file_import", values.imageFile.file.originFileObj);
    axios
      .post(`${baseUrl}/single-file/singleCusData`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Add success!",
        });
        setFileList(null);
        setShowUploadList(false);
        onGridReady(data);
        // message.success(response.data.message);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "error",
          text: "Add error!",
        });
        // message.error(error);
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
              <Form
                form={form}
                layout="vertical"
                name="createAsset"
                onFinish={uploadFile}
              >
                <Form.Item name="imageFile">
                  <Upload
                    {...props}
                    maxCount={1}
                    showUploadList={showUploadList}
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button
                    // type="primary"
                    htmlType="submit"
                    disabled={fileList === null}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
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
