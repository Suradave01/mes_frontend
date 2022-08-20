import React, { useEffect, useState } from "react";
// import { ReactDOM, mountNode } from 'react-dom';
import {
  Form,
  Input,
  Button,
  Checkbox,
  message,
  Col,
  Radio,
  Switch,
} from "antd";
import "antd/dist/antd.variable.min.css";
import classes from "./LoginPage.module.css";
import { authService } from "../../services/auth/auth.service";

const Login = () => {
  const [showMe, setShowMe] = useState(false);

  function toggle() {
    setShowMe(!showMe);
  }

  const onFinish = (values: any) => {
    // console.log('Success:', values);
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    authService
      .signIn(data)
      .then(async () => {
        message.success("login success!");
      })
      .then(() => {
        window.location.href = "/user-management/users";
        console.log(data);
      })
      .catch(() => {
        message.error("login fail!");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      // labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div style={{ display: showMe ? "none" : "block" }}>
        <Form.Item
          className={classes.mrgbtm}
          label="Username"
          name="username"
          rules={[
            {
              required: showMe ? false : true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
      <div style={{ display: showMe ? "block" : "none" }}>
        <Form.Item
          className={classes.mrgbtm}
          label="Email"
          name="email"
          rules={[
            {
              required: showMe ? true : false,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <div className={classes.switch}>
        <Checkbox className={classes.font12}>Keep me Signed in</Checkbox>
        <div className={classes.disflex}>
          <span
            className={classes.pswitch}
            style={{ display: showMe ? "none" : "block" }}
          >
            Log in with Username
          </span>
          <span
            className={classes.pswitch}
            style={{ display: showMe ? "block" : "none" }}
          >
            Log in with Email
          </span>
          <Switch unCheckedChildren onChange={toggle} />
        </div>
      </div>

      <Form.Item>
        <Button className={classes.button} type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
      <Form.Item className={classes.mrg0}>
        <p>Forgot your password?</p>
      </Form.Item>
      <Form.Item>
        <div className={classes.font10}>
          <span className={classes.pdright}>Forgot password?</span>
          <span className={classes.line}>
            Don&apos;t have an account yet? Sign up
          </span>
        </div>
      </Form.Item>
      <br />
      <br />
    </Form>
  );
};

export default Login;
