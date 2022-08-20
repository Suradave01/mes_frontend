import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  TimePicker,
} from "antd";
import type { Moment } from "moment";
import form from "antd/lib/form";
import moment from "moment";
import { endianness } from "os";
import React, { useEffect, useRef, useState } from "react";
import { planningService } from "../../services/planning-management";
import classes from "./WorkDetail.module.css";

const ModalWorkDetail = ({
  isModalVisible,
  handleOk,
  handleCancel,
  dataDetail,
}: any) => {
  const [form] = Form.useForm();

  //from keyboard
  const [setup_k, setSetup_k] = useState<number>();
  const [timeStart_k, setTimeStart_k] = useState<string>();
  const [speed_k, setSpeed_k] = useState<number>();

  //from database
  const prevSetup = dataDetail?.setup;
  const prevSpeed = dataDetail?.speed;
  const prveTime = dataDetail?.time;
  const prevStartTime = dataDetail?.plan_start_time;
  const prevMater = dataDetail?.meter_m;

  //display
  const [time, setTime] = useState<string>();
  const [timePlanFinish, setTimePlanFinish] = useState<string>();

  async function calTimeFinish(
    time: any,
    setup: any,
    timeStart: any,
    mater: any,
    speed: any
  ) {
    if (time == null) {
      time = prveTime;
    }
    if (setup == null) {
      setup = prevSetup;
    }
    if (timeStart == null) {
      timeStart = prevStartTime;
    }
    if (mater == null) {
      mater = prevMater;
    }
    if (speed == null) {
      speed = prevSpeed;
    }
    // console.log(time);
    // console.log(setup);
    // console.log(timeStart);
    // console.log(mater);
    // console.log(speed);

    //calTime
    const m_speed = Math.ceil(dataDetail?.meter_m / speed) + 2;
    const h_speed = Math.round(m_speed / 60);
    const m_speed_display =
      h_speed > 0 && m_speed >= 60 ? m_speed - 60 : m_speed;
    const h_time_display =
      h_speed > 0 && h_speed >= 10 ? h_speed + ":" : "0" + h_speed + ":";
    const m_time_display =
      m_speed_display > 0 && m_speed_display >= 10
        ? m_speed_display
        : "0" + m_speed_display;
    const totalTimeSpeed = h_time_display + m_time_display; //สำหรับแสดงตรง Time
    if (totalTimeSpeed == "0NaN:0NaN") {
      setTime("");
    } else {
      setTime(totalTimeSpeed);
    }
    const m_totalTimeSpeed = m_speed + h_speed; //สำหรับคำนวณ

    console.log(timeStart);
    

    //timeStart
    const h_timeStart = timeStart?.substring(0, 2);
    const m_timeStart = timeStart?.substring(3);

    const m_totalTimeStart = (m_timeStart % 60) + h_timeStart * 60; //สำหรับคำนวณ

    //calTime + Setup?
    var time_plan_finish = 0;
    if (setup == undefined) {
      time_plan_finish = m_totalTimeSpeed + m_totalTimeStart; //
    } else {
      time_plan_finish = setup - 0 + m_totalTimeSpeed + m_totalTimeStart;
    }

    const h_timePlanFinish = Math.floor(time_plan_finish / 60);
    const m_timePlanFinish = time_plan_finish % 60;

    const h_timePlanFinish_display =
      h_timePlanFinish >= 24 ? h_timePlanFinish - 24 : h_timePlanFinish;
    const m_timePlanFinish_display =
      h_timePlanFinish > 0 && m_timePlanFinish >= 60
        ? m_timePlanFinish - 60
        : m_timePlanFinish;
    const h_display =
      h_timePlanFinish_display > 0 && h_timePlanFinish_display >= 10
        ? h_timePlanFinish_display
        : "0" + h_timePlanFinish_display;
    const m_display =
      m_timePlanFinish_display > 0 && m_timePlanFinish_display >= 10
        ? m_timePlanFinish_display
        : "0" + m_timePlanFinish_display;

    const totalTimePlanFinish = h_display + ":" + m_display; //สำหรับแสดงตรง เวลาแผนสิ้นสุด
    if (totalTimePlanFinish == "0NaN:0NaN") {
      setTimePlanFinish("");
    } else {
      setTimePlanFinish(totalTimePlanFinish);
    }
  }

  const onChangeTimeStart = async (time:any, timeString: any) => {
    setTimeStart_k(timeString);
    console.log(timeString);
    
    await calTimeFinish(null, setup_k, timeString, null, speed_k);
  };
  const onChangeSetup = async (val: number) => {
    setSetup_k(val);
    await calTimeFinish(null, val, timeStart_k, null, speed_k);
  };
  const onChangeSpeed = async (val: number) => {
    setSpeed_k(val);
    await calTimeFinish(null, setup_k, timeStart_k, null, val);
  };

  ///////////////////////////////////////////////////////////////////////////////////

  const [pstr, setPstr] = useState<any>();
  function onChange_pstr(time: any, timeString: any) {
    setPstr(timeString);
  }

  const [pftr, setPftr] = useState<any>();
  function onChange_pftr(time: any, timeString: any) {
    setPftr(timeString);
  }

  const format = "HH:mm";

  const [visible, setVisible] = useState();

  const onFinish = async (value: any) => {
    const id = dataDetail.workorder_id;
    const data = {
      id,
      MC_No: value.MC_No,
      plan_start_time: timeStart_k,
      plan_finish_time: timePlanFinish,
      time,
      speed: speed_k,
      setup: setup_k,
      setup_reason: slBefore,
      cus_name: value.cus_name,
      date_due: value.date_due,
      detail: value.detail,
      q_pro: value.in,
      q_pro_out: value.out,
      job_no: value.job_no,
      meter_m: value.meter_m,
      _p: value.p,
      _q: value.q,
      plan_start_time_real: pstr,
      plan_finish_time_real: pftr,
      setup_time: value.setup_time,
    };
    console.log(data);

    await planningService.updateWorkOrderItemDetail(data);
    setVisible(handleOk);
  };

  React.useEffect(() => {
    setTime(dataDetail?.time);
    setTimePlanFinish(dataDetail?.plan_finish_time);
    form.setFieldsValue({
      job_no: dataDetail?.job_no,
      MC_No: dataDetail?.mc_no,
      cus_name: dataDetail?.cus_name,
      detail: dataDetail?.desc_name,
      date_due: dataDetail?.date_pro,
      meter_m: dataDetail?.meter_m,
      in: dataDetail?.q_pro,
      out: dataDetail?.q_pro_out,
      p: dataDetail?.p,
      q: dataDetail?.q,
      speed: dataDetail?.speed,
      selectBefore: dataDetail?.setup_reason,
      setup: dataDetail?.setup,
      time: time,
      plan_finish_time: moment(dataDetail?.plan_finish_time, "HH:mm"),
      plan_finish_time_real: moment(dataDetail?.plan_finish_time_real, "HH:mm"),
      plan_start_time: moment(dataDetail?.plan_start_time, "HH:mm"),
      plan_start_time_real: moment(dataDetail?.plan_start_time_real, "HH:mm"),
    });
  }, [dataDetail]);

  const { Option } = Select;
  const [slBefore, setSlBeforee] = useState<any>();

  const handleChange = (value: string) => {
    setSlBeforee(value);
  };

  const selectBefore = (
    <Select
      defaultValue="กรุณาเลือก"
      className="select-before"
      onChange={handleChange}
    >
      <Option value="ล้างผ้าใบ">ล้างผ้าใบ</Option>
      <Option value="เวลาพัก">เวลาพัก</Option>
      <Option value="Setup">Setup</Option>
    </Select>
  );

  return (
    <div>
      <Modal
        title="รายละเอียดการผลิต"
        centered
        visible={isModalVisible}
        onOk={form.submit}
        // onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Form
          form={form}
          name="horizontal_login"
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8}>
              <Form.Item
                label="Job id"
                name="job_no"
                className={classes.marginform}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="MC/No"
                name="MC_No"
                className={classes.marginform}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="ชื่อลูกค้า"
                name="cus_name"
                className={classes.marginform}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                label="รายละเอียด"
                name="detail"
                className={classes.marginform}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="ส่ง"
                name="date_due"
                className={classes.marginform}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item label="เข้า" name="in" className={classes.marginform}>
                <InputNumber
                  disabled={false}
                  formatter={(value) =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ออก" name="out" className={classes.marginform}>
                <InputNumber
                  formatter={(value) =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {/* <Col span={6}>
              <Form.Item label="Job" name="job" className={classes.marginform}>
                <Input defaultValue="1" disabled={false} />
              </Form.Item>
            </Col> */}
            <Col span={12}>
              <Form.Item
                label="เมตร"
                name="meter_m"
                className={classes.marginform}
              >
                {/* <Input disabled={false} /> */}
                <InputNumber type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Speed เมตร/นาที"
                name="speed"
                className={classes.marginform}
              >
                <InputNumber
                  type="number"
                  // onChange={(val) => onChangeTimeSpeed(val)}
                  onChange={(val: number) => onChangeSpeed(val)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                label="Setup"
                name="setup"
                className={classes.marginform}
              >
                {/* <Input
                  addonBefore={selectBefore}
                  ref={setupTime}
                  id="setup"
                  type="number"
                  // onChange={(val) => onChangeSetup(val)}
                  onChange={onChangesub}
                /> */}
                <InputNumber
                  addonBefore={selectBefore}
                  // ref={setupTime}
                  // type="number"
                  // onChange={(val) => onChangesub(val)}
                  onChange={(val: number) => onChangeSetup(val)}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Time"
                name="time"
                // value={time}
                className={classes.marginform}
              >
                {/* {totalTimeSpeedData} */}
                {/* {timeData} */}
                {time}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                label="เวลาแผน เริ่ม"
                name="plan_start_time"
                className={classes.marginform}
                // className={classes.fullWidth}
              >
                <TimePicker
                  format={format}
                  onChange={onChangeTimeStart}
                  className={classes.datefullWidth}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="เวลาแผน สิ้นสุด"
                name="plan_finish_time"
                className={classes.marginform}
              >
                {timePlanFinish}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                label="เวลาจริง เริ่ม"
                name="plan_start_time_real"
                className={classes.marginform}
              >
                {/* <Input /> */}
                <TimePicker
                  format={format}
                  onChange={onChange_pstr}
                  className={classes.datefullWidth}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="เวลาจริง สิ้นสุด"
                name="plan_finish_time_real"
                className={classes.marginform}
              >
                {/* <Input /> */}
                <TimePicker
                  format={format}
                  onChange={onChange_pftr}
                  className={classes.datefullWidth}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item
                label="Setup"
                name="setup_time"
                className={classes.marginform}
              >
                <InputNumber type="number" />
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item label="P" name="p" className={classes.marginform}>
                {/* <Input defaultValue="0" disabled={false} /> */}
                <InputNumber type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item label="Q" name="q" className={classes.marginform}>
                {/* <Input defaultValue="0.00" disabled={false} /> */}
                <InputNumber
                  type="number"
                  // min={1}
                  precision={2}
                  step={0.1}
                  // max={10}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalWorkDetail;
