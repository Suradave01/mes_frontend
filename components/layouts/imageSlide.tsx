import { Carousel } from "antd";
import classes from "./imageSlide.module.css";

import React from "react";

const imageSlide = () => {
  return (
    <Carousel autoplay>
      <div>
        <h3 className={classes.Carousel}>1</h3>
      </div>
      <div>
        <h3 className={classes.Carousel}>2</h3>
      </div>
      <div>
        <h3 className={classes.Carousel}>3</h3>
      </div>
      <div>
        <h3 className={classes.Carousel}>4</h3>
      </div>
    </Carousel>
  );
};

export default imageSlide;
