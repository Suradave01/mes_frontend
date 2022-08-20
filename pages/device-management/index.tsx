/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Row, Col, Space } from "antd";
import Layout_Page from "../../components/layouts/LayoutPage";

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
import { Link } from "../../components/Link";
import { deviceService } from "../../services/device-management";
import ModalViewDevice from "../../components/device-management/ModalViewDevice";

let allRowData: any[];

const Index = () => {
  const gridRef = useRef<any>(null);
  const [openView, setOpenView] = useState([false, null]);
  const containerStyle = useMemo(() => ({ width: "100%", height: "34vw" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Device Name",
      field: "device_name",
      cellRenderer: "agGroupCellRenderer",
    },
    { field: "description" },
    { field: "state" },
    {
      headerName: "Actions",
      field: "device_id",
      cellRendererFramework: (params: any) => (
        <Space>
          <Button onClick={() => onView(params.data.id)}>View</Button>
          {params?.data?.state === "start" && (
            <Button
              type="primary"
              onClick={() => onUpdateStateActive(params.data.id)}
            >
              Active
            </Button>
          )}
          {params?.data?.state === "active" && (
            <Button onClick={() => onUpdateStateInactive(params.data.id)}>
              Inactive
            </Button>
          )}
          {params?.data?.state === "inactive" && (
            <Space>
              <Button
                type="primary"
                onClick={() => onUpdateStateActive(params.data.id)}
              >
                Active
              </Button>
              <Button
                danger
                type="primary"
                onClick={() => onDelete(params.data.id)}
              >
                Delete
              </Button>
            </Space>
          )}
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
      floatingFilter: true,
    };
  }, []);

  const getRowId = useCallback(function (params: any) {
    return params.data.id;
  }, []);

  const detailCellRendererParams = useMemo(() => {
    return {
      refreshStrategy: "rows",

      detailGridOptions: {
        rowSelection: "multiple",
        enableCellChangeFlash: true,
        getRowId: function (params: any) {
          return params.data.id;
        },
        columnDefs: [
          { headerName: "Field Name", field: "field_name" },
          { headerName: "Field Type", field: "field_type" },
          { headerName: "String Value", field: "string_value" },
          { headerName: "Number Value", field: "number_value" },
          { headerName: "Description", field: "description" },
          { headerName: "State", field: "state" },
          {
            headerName: "Actions",
            field: "device_field_id",
            cellRendererFramework: (params: any) => (
              <Space>
                {params?.data?.state === "start" && (
                  <Button
                    type="primary"
                    onClick={() => onUpdateFieldStateActive(params.data.id)}
                  >
                    Active
                  </Button>
                )}
                {params?.data?.state === "active" && (
                  <Button
                    danger
                    type="primary"
                    onClick={() => onDeleteField(params.data.id)}
                  >
                    Delete
                  </Button>
                )}
                {params?.data?.state === "inactive" && (
                  <Button
                    danger
                    type="primary"
                    onClick={() => onDeleteField(params.data.id)}
                  >
                    Delete
                  </Button>
                )}
              </Space>
            ),
          },
        ],
        defaultColDef: {
          flex: 1,
          sortable: true,
        },
      },
      getDetailRowData: function (params: any) {
        // params.successCallback([]);
        params.successCallback(params.data.DeviceFields);
      },
    };
  }, []);

  // delete device
  const onDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await deviceService.delete(id).then(async (data) => {
        onGridReady(data);
      });
    }
  };

  const onDeleteField = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await deviceService.deleteField(id).then(async (data) => {
        onGridReady(data);
      });
    }
  };

  const onUpdateStateActive = async (id: number) => {
    await deviceService.active(id, null).then(async (data) => {
      onGridReady(data);
    });
  };

  const onUpdateFieldStateActive = async (id: number) => {
    await deviceService.activeField(id, null).then(async (data) => {
      onGridReady(data);
    });
  };

  const onUpdateStateInactive = async (id: number) => {
    await deviceService.inactive(id, null).then(async (data) => {
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
        // {
        //   id: "filters",
        //   labelDefault: "Filters",
        //   labelKey: "filters",
        //   iconKey: "filter",
        //   toolPanel: "agFiltersToolPanel",
        // },
      ],
    };
  }, []);

  const onGridReady = useCallback(async (params) => {
    const data = await deviceService.getAll();
    allRowData = data;
    setRowData(data);
    // sizeToFit();
  }, []);

  setInterval(async function () {
    const data = await deviceService.getAll();
    allRowData = data;
  }, 1000);

  const onFirstDataRendered = useCallback((params) => {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      gridRef.current.api.getDisplayedRowAtIndex(0).setExpanded(true);
    }, 0);
    setInterval(function () {
      if (!allRowData) {
        return;
      }

      const data = allRowData[0];

      const newDeviceFields: {}[] = [];
      data.DeviceFields.forEach(function (record: any, index: any) {
        newDeviceFields.push({
          field_name: record.field_name,
          field_type: record.field_type,
          string_value: record.string_value,
          number_value: record.number_value,
          description: record.description,
          state: record.state,
        });
      });
      data.DeviceFields = newDeviceFields;

      const tran = {
        update: [data],
      };
      gridRef?.current?.api?.applyTransaction(tran);
    }, 2000);
  }, []);

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
                <Link href="/device-management/add">
                  <Button type="primary" size={"large"}>
                    Add device
                  </Button>
                </Link>
              </Space>
              <ModalViewDevice
                titleModal={"View Device"}
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
                    sideBar={sideBar}
                    rowGroupPanelShow={"always"}
                    animateRows={true}
                    groupDefaultExpanded={0}
                    masterDetail={true}
                    detailCellRendererParams={detailCellRendererParams}
                    detailRowAutoHeight={true}
                    // getRowId={getRowId}
                    onFirstDataRendered={onFirstDataRendered}
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
