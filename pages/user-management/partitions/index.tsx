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
import { partitionService } from "../../../services/user-management";
import ModalViewPartition from "../../../components/user-management/partitions/ModalViewPartition";

const Index = () => {
  const gridRef = useRef<any>(null);
  const [openView, setOpenView] = useState([false, null]);
  const containerStyle = useMemo(() => ({ width: "100%", height: "34vw" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const columnDefs = [
    // { headerName: "#", field: "id" },
    {
      headerName: "Partition Name",
      field: "partition_name",
    },
    { headerName: "Description", field: "partition_description" },
    { headerName: "Default Role", field: "default_role" },
    { headerName: "Model Name", field: "model_name" },
    {
      headerName: "State",
      field: "state",
      cellRendererFramework: (params: any) => <div>{params?.data?.state}</div>,
    },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params: any) => (
        <div>
          <Space>
            <Button onClick={() => onView(params.data.id)}>View</Button>
            <Link href={`/user-management/partitions/edit/${params.data.id}`}>
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
      enablePivot: false,
      enableRowGroup: true,
      floatingFilter: true,
    };
  }, []);

  const autoSizeAll = useCallback((skipHeader: any) => {
    const allColumnIds: any[] = [];
    gridRef.current?.columnApi.getAllColumns().forEach((column: any) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current?.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }, []);

  const sizeToFit = useCallback(() => {
    gridRef.current?.api.sizeColumnsToFit();
  }, []);

  const onGridReady = useCallback(async (params) => {
    const data = await partitionService.getAll();
    setRowData(data);
    // sizeToFit();
  }, []);

  // delete partition
  const onDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await partitionService.delete(id).then(async (data) => {
        onGridReady(data);
      });
    }
  };

  const onUpdateStateActive = async (id: number) => {
    await partitionService.active(id, null).then(async (data) => {
      onGridReady(data);
    });
  };

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
                <Link href="/user-management/partitions/add">
                  <Button type="primary" size={"large"}>
                    Add Partition
                  </Button>
                </Link>
              </Space>
              <ModalViewPartition
                titleModal={"View Partition"}
                handleCancel={closeModal}
                open={openView}
              />
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
