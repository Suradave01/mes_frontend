import React from "react";
import Link from "next/link";
import LayoutError from "../../components/layouts/LayoutError";
import { FileExclamationOutlined } from "@ant-design/icons";

const index = () => {
  return (
    <LayoutError className="not-found">
      <FileExclamationOutlined style={{ fontSize: "80px" }} />
      <br />
      <br />
      <h1>404</h1>
      <h2>Sorry, this page could not be found.</h2>
      <p>
        Go back to the
        <Link href="/">
          <a> Home page</a>
        </Link>
      </p>
    </LayoutError>
  );
};

export default index;
