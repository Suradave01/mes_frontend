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
import { assetService } from "../../../services/asset-management";
import ModalViewAsset from "../../../components/asset-management/asset/ModalViewAsset";
import Swal from "sweetalert2";

const Index = () => {
  const gridRef = useRef<any>(null);
  const [openView, setOpenView] = useState([false, null]);
  const containerStyle = useMemo(() => ({ width: "100%", height: "34vw" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const columnDefs = [
    { headerName: "Asset ID", field: "id" },
    { headerName: "Asset Name", field: "asset_name" },
    { headerName: "Description", field: "description" },
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
            <Link href={`/asset-management/asset/add-device/${params.data.id}`}>
              <Button>Add Device</Button>
            </Link>
            <Link href={`/asset-management/asset/edit/${params.data.id}`}>
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
                onClick={() => onUpdateStateInactive(params.value)}
              >
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
    const data = await assetService.getAll();
    setRowData(data);
    // autoSizeAll(false)
    // sizeToFit();
  }, []);

  // delete Asset
  // const onDelete = async (id: number) => {
  //   if (window.confirm("Are you sure?")) {
  //     await assetService.delete(id).then(async (data) => {
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
        assetService.delete(data.id).then(async (data) => {
          onGridReady(data);
        });
      }
    });
  };

  const onUpdateStateActive = async (id: number) => {
    await assetService.active(id, null).then(async (data) => {
      onGridReady(data);
    });
  };

  const onUpdateStateInactive = async (id: number) => {
    await assetService.inactive(id, null).then(async (data) => {
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
                <Link href="/asset-management/asset/add">
                  <Button type="primary" size={"large"}>
                    Add Asset
                  </Button>
                </Link>
              </Space>
              <ModalViewAsset
                titleModal={"View Asset"}
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
