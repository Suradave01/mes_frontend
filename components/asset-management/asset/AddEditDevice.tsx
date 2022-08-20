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
import { deviceService } from "../../../services/device-management";
import router, { useRouter } from "next/router";

import classes from "./AddEdit.module.css";
import { count } from "console";

let allRowData: any[];

export { AddEditDevice };

function AddEditDevice(props: any) {
  const asset = props?.asset;
  const isAddMode = !asset;
  const router = useRouter();

  console.log(asset);

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
      field: "id",
      cellRendererFramework: (params: any) => (
        <div>
          <Space>
            {params.data.AssetMappingDevices.length <= 0 && (
              <Button
                type="primary"
                onClick={() => onUpdateStateActive(params.data.id)}
              >
                Select
              </Button>
            )}
            {params.data.AssetMappingDevices[0]?.asset_id == asset.id &&
            params.data.AssetMappingDevices.length > 0 ? (
              <Button
                danger
                type="primary"
                onClick={() =>
                  onUpdateStateInactive(params.data.AssetMappingDevices[0].id)
                }
              >
                Not Select
              </Button>
            ) : params.data.AssetMappingDevices.length > 0 ? (
              <p>
                This Device Use By Asset:{" "}
                {params.data.AssetMappingDevices[0]?.Asset?.asset_name}
              </p>
            ) : (
              <p></p>
            )}
          </Space>
        </div>
      ),
    },
  ]);

  const onUpdateStateActive = async (values: any) => {
    const data = {
      asset_id: asset.id,
      device_id: values,
    };
    console.log(data);

    await assetService.createAssetMappingDevice(data).then(async () => {
      onGridReady([]);
    });
  };

  const onUpdateStateInactive = async (id: number) => {
    await assetService.removeAssetMappingDevice(id).then(async () => {
      onGridReady([]);
    });
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      enablePivot: false,
      enableRowGroup: true,
      floatingFilter: true,
    };
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
        ],
        defaultColDef: {
          flex: 1,
          sortable: true,
        },
      },
      getDetailRowData: function (params: any) {
        params.successCallback(params.data.DeviceFields);
      },
    };
  }, []);

  const onGridReady = useCallback(async (params) => {
    const data = await deviceService.getAll();
    allRowData = data;
    setRowData(data);
  }, []);

  const onFirstDataRendered = useCallback((params) => {
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
        {/* <h1 className={classes.txthead}>
          {"Add device in asset name: " + asset.asset_name}
        </h1> */}
        <Row>
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            style={{ textAlign: "left" }}
          >
            <div style={{ marginBottom: 10 }}></div>
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
                    rowGroupPanelShow={"always"}
                    animateRows={true}
                    groupDefaultExpanded={0}
                    masterDetail={true}
                    detailCellRendererParams={detailCellRendererParams}
                    detailRowAutoHeight={true}
                    onFirstDataRendered={onFirstDataRendered}
                    enableCellChangeFlash={true}
                  ></AgGridReact>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Layout_Page>
    </div>
  );
}
