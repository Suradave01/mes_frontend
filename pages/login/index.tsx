import { Row, Col } from "antd";
import type { NextPage } from "next";
// import { Image } from "antd";
import Login from "../../components/layouts/Login";
import classes from "./Login.module.css";
import profilePic from "../../public/image/mes_logo.png";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className={classes.fullPage}>
      {/* <Layout_Pagelogin> */}
      <Row className={classes.fullPage}>
        <Col span={12}>
          <div className={classes.bg}>{/* <Carousel></Carousel> */}</div>
        </Col>
        <Col span={12} className={classes.disFlex}>
          <Col span={13} className={classes.txtCenter}>
            <Image className={classes.imglogo} src={profilePic} />
            {/* <p className={classes.fontlog}>Log in</p> */}
            <p className={classes.fontlog}>Hello! let&apos;s get started</p>
            <p className={classes.fontlogsub}>Sign in to continue.</p>
            <br />
            <Login></Login>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
