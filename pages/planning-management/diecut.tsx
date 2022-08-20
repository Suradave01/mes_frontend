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
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
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
import ModalFinishDieCut from "../../components/planning-management/ModalWorkFinish";
import ModalWorkDetail from "../../components/planning-management/ModalWorkDetail";
import axios from "axios";
import { wipService } from "../../services/planning-management";
import { planningService } from "../../services/planning-management";
import Swal from "sweetalert2";
import { apiUrl } from "../../config";
const Diecut = () => {
  let initValues: any[] = [];
  const gridRef = useRef<any>(null);
  const [rowData, setRowData] = useState();
  const [open, setOpen] = useState([false, null]);
  const [openView, setOpenView] = useState([false]);
  const [openWorkDetail, setOpenWorkDetail] = useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [openCancel, setOpenCancel] = useState([false]);

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

  const closeModal = () => {
    setOpen([false]);
    setOpenView([false]);
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

  const containerStyle = useMemo(() => ({ width: "100%", height: "34vw" }), []);
  const gridStyle = useMemo(
    () => ({ height: "100%", width: "100%", marginTop: "40px" }),
    []
  );
  // const [rowData, setRowData] = useState();
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
    },
    { headerName: "M/C No.", field: "mc_no" },
    { headerName: "Date", field: "date_od", hide: true, filter: true },
    { headerName: "This asset", field: "this_asset", hide: true, filter: true },
    {
      headerName: "จำนวนสั่ง",
      field: "quant",
      valueFormatter: currencyFormatter,
    },
    { headerName: "ชื่อลูกค้า", field: "cus_name" },
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
      headerName: "กำหนดส่ง",
      field: "date_pro",
    },
    {
      headerName: "State",
      field: "state",
    },
    {
      pinned: "right",
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params: any) => (
        <div>
          <Space>
            <Button
              // ghost
              // type="primary"
              onClick={() => showModalWorkDetail(params.data)}
            >
              ข้อมูลการผลิต
            </Button>
            {/* <Button ghost type="primary" onClick={() => showModalView()}>
              จำนวนสั่ง
            </Button> */}
            {params?.data?.state === "ready" && (
              <Button onClick={() => updateWoItemStart(params.data)}>
                Start
              </Button>
            )}
            {params?.data?.state === "on_process" && (
              <Space>
                <Button
                  //loading={loadings}
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
                  //loading={loadings}
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
                  //loading={loadings}
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

  const [finishDetail, setFinishDetail] = useState();

  const showModalView = async (params: any) => {
    const id = params.wip_flow_mapping_id;
    const finishData = await planningService.getValueSensorSuccess(id);
    console.log(finishData);
    setFinishDetail(finishData);
    setOpenView([true]);
    setDataDetail(params);
  };

  const showModalCancel = (params: any) => {
    setOpenCancel([true]);
    setDataDetail(params);
  };

  /////////////////////// LOADING BUTTON /////////////////////////

  const [loadings, setLoadings] = useState(false);

  const enterLoading = () => {
    console.log("เมื่อไรจะได้เยดเข้");
    setLoadings(true);
  };
  console.log(loadings);

  //////////////////////////////////////////////////////////////

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

  const autoSizeAll = useCallback((skipHeader: any) => {
    const allColumnIds: any[] = [];
    gridRef.current.columnApi.getAllColumns().forEach((column: any) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }, []);

  const onGridReady = useCallback((params) => {
    const baseUrl = `${apiUrl}/production-planning-management`;
    initValues = [];
    // params.api.getToolPanelInstance("filters").expandFilters();
    fetch(`${baseUrl}/findAllWorkOrderByWip/3`)
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
          data[i]["typeItem"] = "Please Select";
        }
        setRowData(data);
        // autoSizeAll(false);
      });
  }, []);

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

  const onCellValueChanged = useCallback((params) => {
    const colId = params.column.getId();
    if (colId === "typeItem") {
      const id = params.data.workorder_id;
      const selectedTypeItem = params.data.typeItem;
      const typeItem = {
        id,
        selectedTypeItem,
      };
      console.log(typeItem);
    }
  }, []);

  const { TabPane } = Tabs;
  const [tabName, setTabName] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const data = await wipService.getById(9);
      setTabName(data);
      console.log(data);
    })();
  }, []);
  console.log(tabName);

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
                {/* <Button type="primary" size={"large"} onClick={showModal}>
                    Add Work
                  </Button> */}
                {/* <div className="button-bar">
                  <Button onClick={sizeToFit}>ปรับขนาดให้พอดีกับหน้า</Button>
                  <Button onClick={() => autoSizeAll(false)}>
                    ปรับขนาดให้พอดีกับข้อมูล
                  </Button>
                </div> */}
              </Space>
              <ModalFinishDieCut
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
                    rowDragManaged={true}
                    rowDragMultiRow={true}
                    rowSelection={"multiple"}
                    cacheBlockSize={15}
                    sideBar={"filters"}
                    rowGroupPanelShow={"always"}
                    animateRows={true}
                    onCellValueChanged={onCellValueChanged}
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

export default Diecut;
