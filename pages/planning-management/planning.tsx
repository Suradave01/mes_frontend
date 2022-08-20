/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Row,
  Col,
  Space,
  Modal,
  Checkbox,
  Form,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  Upload,
  Input,
  Progress,
  Tabs,
} from "antd";
import {
  UploadOutlined,
  InboxOutlined,
  PoweroffOutlined,
  CopyOutlined,
} from "@ant-design/icons";
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
// import axios from "axios";
import ModalFinishPlanning from "../../components/planning-management/ModalWorkFinish";
import ModalWorkDetail from "../../components/planning-management/ModalWorkDetail";
import ModalCancel from "../../components/planning-management/ModalCanncel";

import { planningService } from "../../services/planning-management";
import { wipService } from "../../services/planning-management";

import "antd/dist/antd.css";
// import Spin from 'antd/es/spin';
// import "antd/es/spin/style/css";
import "antd/lib/spin/style/index.css";
import Swal from "sweetalert2";
import { apiUrl } from "../../config";

const Planning = () => {
  let initValues: any[] = [];
  const gridRef = useRef<any>(null);
  const [open, setOpen] = useState([false, null]);
  const [openView, setOpenView] = useState([false]);
  const [openWorkDetail, setOpenWorkDetail] = useState(false);
  const [openCancel, setOpenCancel] = useState([false]);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [sumTotalMeter, setSumTotalMeter] = useState<any>([]);

  const { TabPane } = Tabs;

  const onGridReady = useCallback(async (params) => {
    const baseUrl = `${apiUrl}/production-planning-management`;
    initValues = [];
    fetch(`${baseUrl}/findAllWorkOrderByWip/1`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        for (let i = 0; i < data.length; i++) {
          if (data[i].state == "on_process") {
            initValues.push("on_process");
            console.log(initValues);
          }
        }

        for (let i = 0; i < data.length; i++) {
          if (data[i]["typeItem"] == null) {
            data[i]["typeItem"] = "Please Select";
          }
        }

        for (let i = 0; i < data.length; i++) {
          const num = Number(data[i].meter_m);
          sumMeter.push(num);
        }
        setSumTotalMeter(sumMeter);

        setRowData(data);
        autoSizeAll(false);
      });
  }, []);

  const sumMeter: any = [];

  const totalMeter = sumTotalMeter.reduce(
    (previousScore: any, currentScore: any, index: any) =>
      previousScore + currentScore,
    0
  );

  const totalSumMeter = totalMeter.toLocaleString();

  const newDate = new Date();

  // interface ColumnWidthCallbackParams {
  //   column: "job_no";
  //   index: 0;
  // }

  const getParams = () => ({
    columnKeys: [
      "job_no",
      "width1",
      "flute",
      "cus_name",
      "g_n1",
      "g_n2",
      "g_n3",
      "g_n6",
      "g_n7",
      "g_n4",
      "g_n5",
      "meter_m",
      "sheet_l",
      "q_pro",
      " ",
      "c_send",
    ],
    rowHeight: 35,
    prependContent: [
      { cells: [] },
      {
        cells: [
          {
            styleId: "coverText",
            mergeAcross: 1,
            data: {
              value: "วันที่ " + newDate.toLocaleDateString(),
              type: "String",
            },
          },
          {
            styleId: "coverHeading",
            mergeAcross: 11,
            data: { value: "แผนการผลิตประจำวันแผนกลูกฟูก", type: "String" },
          },
          {
            styleId: "txtRight",
            mergeAcross: 1,
            data: { value: "แผนที่ 1 ", type: "String" },
          },
        ],
      },
      {
        cells: [
          {
            styleId: "coverText",
            mergeAcross: 13,
            data: { value: "ผู้จัดทำ", type: "String" },
          },
          {
            styleId: "txtRight",
            mergeAcross: 1,
            data: {
              value: "เวลา " + newDate.toLocaleTimeString(),
              type: "String",
            },
          },
        ],
      },
      { cells: [] },
    ],
    appendContent: [
      { cells: [] },
      {
        cells: [
          {
            styleId: "txtBottom",
            mergeAcross: 9,
            data: {
              value: "Doc Flow : แผนกวางแผน --------------> แผนกลูกฟูก",
              type: "String",
            },
          },
          {
            styleId: "txtBottom",
            mergeAcross: 0,
            data: { value: "รวม", type: "String" },
          },
          {
            styleId: "txtBottom",
            mergeAcross: 0,
            data: { value: totalSumMeter, type: "String" },
          },
          {
            styleId: "txtBottom",
            mergeAcross: 0,
            data: { value: "(เมตร)", type: "String" },
          },
          {
            styleId: "txtBottomRight",
            mergeAcross: 2,
            data: { value: "FM-ฝผ-002 R004 040257", type: "String" },
          },
        ],
      },
      {
        cells: [
          {
            styleId: "txtBottom",
            mergeAcross: 13,
            data: {
              value:
                "หมายเหตุ ความเร็วเฉลี่ย_____________ม/ชม. เริ่ม_____________น. ถึง_____________น. ผลิตจริง_____________ม/ชม.",
              type: "String",
            },
          },
        ],
      },
      { cells: [] },
    ],
    pageSetup: {
      orientation: "Landscape",
      pageSize: "A4",
    },
    fontSize: 10,
  });

  const excelStyles: any = useMemo(() => {
    return [
      {
        id: "coverHeading",
        font: {
          size: 16,
          bold: true,
        },
        alignment: {
          horizontal: "Center",
        },
      },
      {
        id: "coverText",
        font: {
          size: 10,
        },
      },
      {
        id: "txtRight",
        alignment: {
          horizontal: "Right",
        },
        font: {
          size: 10,
        },
      },
      {
        id: "txtBottom",
        font: {
          size: 9,
        },
      },
      {
        id: "txtBottomRight",
        font: {
          size: 9,
        },
        alignment: {
          horizontal: "Right",
        },
      },
      {
        id: "boldBorders",
        borders: {
          borderBottom: {
            color: "#000000",
            lineStyle: "Continuous",
            weight: 1,
          },
          borderLeft: {
            color: "#000000",
            lineStyle: "Continuous",
            weight: 1,
          },
          borderRight: {
            color: "#000000",
            lineStyle: "Continuous",
            weight: 1,
          },
          borderTop: {
            color: "#000000",
            lineStyle: "Continuous",
            weight: 1,
          },
        },
      },
      {
        id: "widthColumn",
        font: {
          size: 9,
        },
      },
    ];
  }, []);

  const showModal = async (data: any) => {
    if (data.type != "click") {
      setOpen([false, data]);
    } else {
      setOpen([true]);
    }
  };

  const [dataDetail, setDataDetail] = useState();

  const showModalWorkDetail = (params: any) => {
    setDataDetail(params);
    setOpenWorkDetail(true);
  };

  const showModalCancel = (params: any) => {
    setOpenCancel([true]);
    setDataDetail(params);
  };

  const closeModal = () => {
    setOpen([false]);
    setOpenView([false]);
    setOpenCancel([false]);
    setOpenWorkDetail(false);
    setConfirmLoading(false);
  };

  const gridReady = (data: any) => {
    initValues = [];

    onGridReady(null);
  };

  const currencyFormatter = (params: any) => {
    return formatNumber(params.value);
  };

  const formatNumber = (number: any) => {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  /////////////////////// LOADING BUTTON /////////////////////////

  const [loadings, setLoadings] = useState(false);

  const enterLoading = () => {
    console.log("เมื่อไรจะได้กั้ปปี้");
    setLoadings(true);
  };
  console.log(loadings);

  //////////////////////////////////////////////////////////////

  const containerStyle = useMemo(() => ({ width: "100%", height: "34vw" }), []);
  const gridStyle = useMemo(
    () => ({ height: "100%", width: "100%", marginTop: "40px" }),
    []
  );
  const [rowData, setRowData] = useState();
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
      // filter: true,
      checkboxSelection: true,
      rowDrag: true,
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },

    {
      headerName: "หน้า",
      field: "width1",
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    {
      headerName: "ชื่อลูกค้า",
      field: "cus_name",
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    { headerName: "Date", field: "date_od", hide: true, filter: true },
    // { headerName: "Asset", field: "this_asset", hide: true, filter: true },
    {
      headerName: "หมายเหตุ",
      field: " ",
      hide: true,
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
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
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    {
      headerName: "ลอน",
      field: "flute",
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    {
      headerName: "หน้า",
      field: "g_n1",
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    {
      headerName: "ลอนB",
      field: "g_n2",
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    {
      headerName: "หลัง",
      field: "g_n3",
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    {
      headerName: "ลอนC",
      field: "g_n4",
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    {
      headerName: "หลัง",
      field: "g_n5",
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    {
      headerName: "ลอนE",
      field: "g_n6",
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    {
      headerName: "หลัง",
      field: "g_n7",
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    {
      headerName: "จำนวน (เมตร)",
      field: "meter_m",
      valueFormatter: currencyFormatter,
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    {
      headerName: "ความยาว (มม.)",
      field: "sheet_l",
      valueFormatter: currencyFormatter,
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    {
      headerName: "จำนวนแผ่น",
      field: "q_pro",
      valueFormatter: currencyFormatter,
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    {
      headerName: "this_asset",
      field: "this_asset",
      filter: true,
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
    },
    {
      headerName: "ส่งไป",
      field: "c_send",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellClassRules: {
        boldBorders: (params: any) => {
          return true;
        },
      },
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
    { headerName: "ซัพพลายกระดาษหน้า", field: "ven_id1" },
    { headerName: "ซัพพลายกระดาษลอนB", field: "ven_id2" },
    { headerName: "ซัพพลายกระดาษหลัง", field: "ven_id3" },
    { headerName: "ซัพพลายกระดาษลอนC", field: "ven_id4" },
    { headerName: "ซัพพลายกระดาษหลัง", field: "ven_id5" },
    { headerName: "ซัพพลายกระดาษลอนE", field: "ven_id6" },
    { headerName: "ซัพพลายกระดาษหลัง", field: "ven_id7" },
    {
      headerName: "น้ำหนักกระดาษหน้า",
      field: "we_1",
      valueFormatter: currencyFormatter,
    },
    {
      headerName: "น้ำหนักกระดาษลอนB",
      field: "we_2",
      valueFormatter: currencyFormatter,
    },
    {
      headerName: "น้ำหนักกระดาษหลัง",
      field: "we_3",
      valueFormatter: currencyFormatter,
    },
    {
      headerName: "น้ำหนักกระดาษลอนC",
      field: "we_4",
      valueFormatter: currencyFormatter,
    },
    {
      headerName: "น้ำหนักกระดาษหลัง",
      field: "we_5",
      valueFormatter: currencyFormatter,
    },
    {
      headerName: "น้ำหนักกระดาษลอนE",
      field: "we_6",
      valueFormatter: currencyFormatter,
    },
    {
      headerName: "น้ำหนักกระดาษหลัง",
      field: "we_7",
      valueFormatter: currencyFormatter,
    },

    {
      headerName: "State",
      field: "state",
      filter: true,
    },
    {
      pinned: "right",
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params: any) => (
        <div>
          <Space>
            <Button
              icon={<CopyOutlined />}
              onClick={() => copyWorkOrder(params.data)}
            />
            <Button onClick={() => showModalWorkDetail(params.data)}>
              ข้อมูลการผลิต
            </Button>
            {params?.data?.state === "ready" && (
              <Button onClick={() => updateWoItemStart(params.data)}>
                Start
              </Button>
            )}
            {params?.data?.state === "on_process" && (
              <Space>
                <Button
                  loading={loadings}
                  onClick={() => updateWoItemStop(params.data)}
                >
                  Stop
                </Button>
                <Button onClick={() => showModalView(params.data)}>
                  finish
                </Button>
              </Space>
            )}
            {params?.data?.state === "stop" && (
              <Space>
                <Button
                  loading={loadings}
                  onClick={() => updateWoItemResume(params.data)}
                >
                  Resume
                </Button>
                <Button
                  // loading={loadings[1]}
                  onClick={() => showModalCancel(params.data)}
                >
                  Cancel
                </Button>
                {/* <Button
                  type="primary"
                  icon={<PoweroffOutlined />}
                  loading={loadings}
                  onClick={() => enterLoading()}
                /> */}
              </Space>
            )}
            {params?.data?.state === "cancel" && (
              <Space>
                <Button onClick={() => updateWoItemRetrieve(params.data)}>
                  Retrieve
                </Button>
                {/* <Button onClick={() => updateWoItemStart(params.data)}>
                  Start
                </Button> */}
              </Space>
            )}
          </Space>
        </div>
      ),
    },
  ]);

  const updateWoItemStart = async (data: any) => {
    if (initValues[0] == "on_process") {
      Swal.fire({
        icon: "error",
        title: "มีงานที่กำลังทำอยู่",
        text: "โปรดทำงานก่อนหน้าให้เสร็จก่อน",
      });
    } else {
      const id = data.workorder_id;
      const params = {
        asset_name: data.this_asset,
        wo_item_id: data.workorder_item_id,
        wip_flow_mapping_id: data.wip_flow_mapping_id,
      };
      let timerInterval: any;
      Swal.fire({
        title: "Auto close alert!",
        html: "I will close in <b></b> milliseconds.",
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          planningService.updateWoItemStart(id, params);
        },
        willClose: () => {
          clearInterval(timerInterval);
          onGridReady(data);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          // planningService.updateWoItemFinish(id, data).then(async (data) => {
          // });
        }
      });
      // await planningService.updateWoItemStart(id, params).then(async (data) => {
      //   onGridReady(data);
      // });
    }
  };

  const updateWoItemStop = async (data: any) => {
    // enterLoading(2);
    setLoadings(true);
    const id = data.workorder_id;
    const params = {
      asset_name: data.this_asset,
      wo_item_id: data.workorder_item_id,
      wip_flow_mapping_id: data.wip_flow_mapping_id,
    };
    console.log(params);
    let timerInterval: any;
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        planningService.updateWoItemStop(id, params);
      },
      willClose: () => {
        clearInterval(timerInterval);
        onGridReady(data);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // planningService.updateWoItemFinish(id, data).then(async (data) => {
        // });
      }
    });
    // await planningService.updateWoItemStop(id, params).then(async (data) => {
    //   onGridReady(data);
    // });
  };

  const updateWoItemResume = async (data: any) => {
    // enterLoading(0);
    const id = data.workorder_id;
    const params = {
      asset_name: data.this_asset,
      wo_item_id: data.workorder_item_id,
      wip_flow_mapping_id: data.wip_flow_mapping_id,
    };
    console.log(params);
    let timerInterval: any;
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        planningService.updateWoItemResume(id, params);
      },
      willClose: () => {
        clearInterval(timerInterval);
        onGridReady(data);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // planningService.updateWoItemFinish(id, data).then(async (data) => {
        // });
      }
    });
    // await planningService.updateWoItemResume(id, params).then(async (data) => {
    //   onGridReady(data);
    // });
  };

  const updateWoItemCancel = async (id: any, params: any) => {
    console.log(params);
    let timerInterval: any;
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        planningService.updateWoItemCancel(id, params);
      },
      willClose: (data) => {
        clearInterval(timerInterval);
        onGridReady(data);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // planningService.updateWoItemFinish(id, data).then(async (data) => {
        // });
      }
    });
    // await planningService.updateWoItemCancel(id, params).then(async (data) => {
    //   onGridReady(data);
    // });
  };

  const updateWoItemRetrieve = async (data: any) => {
    const id = data.workorder_id;
    const params = {
      asset_name: data.this_asset,
      wo_item_id: data.workorder_item_id,
      wip_flow_mapping_id: data.wip_flow_mapping_id,
    };
    console.log(params);
    let timerInterval: any;
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        planningService.updateWoItemRetrieve(id, params);
      },
      willClose: () => {
        clearInterval(timerInterval);
        onGridReady(data);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // planningService.updateWoItemFinish(id, data).then(async (data) => {
        // });
      }
    });
    // await planningService
    //   .updateWoItemRetrieve(id, params)
    //   .then(async (data) => {
    //     onGridReady(data);
    //   });
  };

  const copyWorkOrder = async (data: any) => {
    const id = data.workorder_id;
    console.log(id);
    await planningService.copyWorkOrder(id).then(async (data) => {
      onGridReady(data);
    });
  };

  const [finishDetail, setFinishDetail] = useState();

  const showModalView = async (params: any) => {
    const id = params.wip_flow_mapping_id;
    await planningService.updateDataDeviceField();
    const finishData = await planningService.getValueSensorSuccess(id);
    console.log(finishData);
    setFinishDetail(finishData);
    setOpenView([true]);
    setDataDetail(params);
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      enablePivot: false,
      enableRowGroup: true,
      floatingFilter: true,
      editable: true,
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

  // const onRowDragEnd = useCallback((data) => {
  //   console.log("index: " + data.overNode.childIndex);
  //   console.log("id: " + data.overNode.data.workorder_id);
  // }, []);

  const onRowDragEnd = async (data: any) => {
    // console.log(data.node.parent.allLeafChildren);
    const prioritize: any = {
      id: [],
      rowIndex: [],
    };
    for (let i = 0; i < data.node.parent.allLeafChildren.length; i++) {
      prioritize.id.push(data.node.parent.allLeafChildren[i].data.workorder_id);
      prioritize.rowIndex.push(data.node.parent.allLeafChildren[i].rowIndex);
    }
    // console.log(prioritize);

    await planningService.prioritizeWorkOrder(prioritize).then(async () => {});
  };

  const onCellValueChanged = useCallback(async (params) => {
    const colId = params.column.getId();
    const id = params.data.workorder_id;
    if (colId === "typeItem") {
      const typeItem = params.data.typeItem;
      const mc_no = params.data.mc_no;
      const options: any = {
        id,
        typeItem,
        mc_no,
      };
      console.log(options);
      await planningService.updateWorkOrderItemType(options);
    }
    if (colId === "c_send") {
      const job_no = params.data.job_no;
      const new_send = params.data.c_send;
      const old_send = params.oldValue;
      const options: any = {
        id,
        job_no,
        new_send,
        old_send,
      };
      console.log(options);
      await planningService.updateWorkOrderItemNextAsset(options);
    }
  }, []);

  // const [data, setData] = useState<any>([]);

  const [tabName, setTabName] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const data = await wipService.getById(6);
      setTabName(data);
    })();
  }, []);

  const popupParent = useMemo(() => {
    if (typeof window !== "undefined") {
      return document.body;
    }
  }, []);

  const onBtExport = useCallback<any>(() => {
    console.log(getParams());

    // const { pageSetup, margins } = defaultExcelExportParams();
    gridRef.current.api.exportDataAsExcel(getParams());
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
                {/* <div className="columns"> */}
                {/* <div>
                  <label className="option" htmlFor="prependContent">
                    <input type="checkbox" id="prependContent" />
                    Prepend Content
                  </label>
                  <label className="option" htmlFor="appendContent">
                    <input type="checkbox" id="appendContent" /> Append Content
                  </label>
                </div> */}
                <div>
                  <button
                    onClick={onBtExport}
                    style={{ margin: "5px 0px", fontWeight: "bold" }}
                  >
                    Export to Excel
                  </button>
                </div>
              </Space>
              <ModalFinishPlanning
                titleModal={"เสร็จสิ้น"}
                handleCancel={closeModal}
                open={openView}
                dataDetail={dataDetail}
                finishDetail={finishDetail}
                gridReady={gridReady}
              />
              <ModalWorkDetail
                isModalVisible={openWorkDetail}
                handleOk={closeModal}
                handleCancel={closeModal}
                dataDetail={dataDetail}
              />
              <ModalCancel
                titleModal={"สาเหตุการปิดงาน"}
                handleCancel={closeModal}
                open={openCancel}
                dataDetail={dataDetail}
                updateWoItemCancel={updateWoItemCancel}
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
                    onRowDragEnd={onRowDragEnd}
                    onCellValueChanged={onCellValueChanged}
                    rowDragManaged={true}
                    rowDragMultiRow={true}
                    rowSelection={"multiple"}
                    cacheBlockSize={15}
                    sideBar={"filters"}
                    rowGroupPanelShow={"always"}
                    animateRows={true}
                    popupParent={popupParent}
                    header-height={0}
                    excelStyles={excelStyles}
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

export default Planning;
