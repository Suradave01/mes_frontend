import { AgGridReact } from "ag-grid-react";
import { Col, Form, Modal, Row, Space } from "antd";
import { Button } from "antd/lib/radio";
import React, { useCallback, useMemo, useRef, useState } from "react";
// import { assetService } from "../../../services/asset-management";
// import classes from "./AddEdit.module.css";

const AgGridReactPrintting = ({ dataTable }: any) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "34vw" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  // const [data, setData] = useState<any>([]);
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState();
  console.log(dataTable);

  const onGridReady = useCallback((params) => {
    setRowData(dataTable);
  }, []);
  const currencyFormatter = (params: any) => {
    return formatNumber(params.value);
  };

  const formatNumber = (number: any) => {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  const [dataDetail, setDataDetail] = useState();

  const showModalWorkDetail = (params: any) => {
    setDataDetail(params);
    // console.log(params);

    // setOpenWorkDetail(true);
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
  const onCellValueChanged = useCallback((params) => {
    const colId = params.column.getId();
    if (colId === "typeItem") {
      const id = params.data.workorder_id;
      const selectedTypeItem = params.data.typeItem;
      const typeItem = {
        id,
        selectedTypeItem,
      };
      // console.log(typeItem);
    }
    if (colId === "c_send") {
      const id = params.data.workorder_id;
      const selectedC_send = params.data.c_send;
      const c_send = {
        id,
        selectedC_send,
      };
      // console.log(c_send);
    }
  }, []);
  const [columnDefs, setColumnDefs] = useState<any>([
    // {
    // headerName: "#",
    //   field: "number",
    //   width: 70,
    //   minWidth: 50,
    //   maxWidth: 70,
    // },
    {
      headerName: "หมายเลขงาน",
      field: "job_no",
      width: 135,
      minWidth: 135,
      maxWidth: 135,
      filter: true,
    },
    { headerName: "ลอน", field: "flute", filter: true },
    {
      headerName: "ส่งไป",
      field: "c_send",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: [
          "C01",
          "D21",
          "D27",
          "P00",
          "P01",
          "P03",
          "P74",
          "S00",
          "S01",
          "S02",
          "S03",
          "B01",
        ],
      },
    },
    { headerName: "M/C No.", field: "mc_no" },
    { headerName: "รายละเอียด", field: "desc_name" },
    {
      headerName: "รูปแบบงาน",
      field: "typeItem",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: [
          "RSC",
          "RSC1",
          "RSCA",
          "RSCH",
          "RSCB",
          "RSCC",
          "RSCD",
          "RSCE",
          "RSCF",
          "RSCG",
          "DC",
          "PAD",
          "PAD1",
          "PAD2",
          "PAD3",
          "PTN",
          "PAD4",
        ],
      },
    },
    {
      headerName: "สกอร์ด้านกว้าง",
      field: "s_line",
    },
    {
      headerName: "จำนวนสั่ง",
      field: "quant",
      valueFormatter: currencyFormatter,
    },
    {
      headerName: "กำหนดส่ง",
      field: "date_pro",
    },
    {
      headerName: "สกอร์ด้านยาว",
      field: "l_line",
    },
    {
      headerName: "State",
      field: "state",
      filter: true,
    },
    {
      headerName: "สี1",
      field: "ink_1",
    },
    {
      headerName: "สี2",
      field: "ink_2",
    },
    {
      headerName: "สี3",
      field: "ink_3",
    },
    {
      headerName: "สี3",
      field: "ink_4",
    },
    {
      pinned: "right",
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params: any) => (
        <div>
          <Space>
            <Button
              type="primary"
              onClick={() => showModalWorkDetail(params.data)}
            >
              ข้อมูลการผลิต
            </Button>
            {params?.data?.state === "start" && (
              <Button type="primary">Active</Button>
            )}
            {params?.data?.state === "active" && (
              <Button type="primary">Delete</Button>
            )}
          </Space>
        </div>
      ),
    },
  ]);
  return (
    <div>
      <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-alpine ag-theme-custom">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            columnHoverHighlight={false}
            onGridReady={onGridReady}
            rowDragManaged={true}
            rowDragMultiRow={true}
            rowSelection={"multiple"}
            cacheBlockSize={15}
            sideBar={sideBar}
            rowGroupPanelShow={"always"}
            animateRows={true}
            onCellValueChanged={onCellValueChanged}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default AgGridReactPrintting;
