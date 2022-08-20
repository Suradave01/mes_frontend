import "antd/dist/antd.variable.min.css";
import "../styles/globals.css";
import "../styles/globals.less";

import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const licenseKey =
  "CompanyName=Total Service Development Co., Ltd.,LicensedGroup=TSDDEV,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-025706,ExpiryDate=22_February_2023_[v2]_MTY3NzAyNDAwMDAwMA==fa7cd570b6dec91b20907742290eb747";
LicenseManager.setLicenseKey(licenseKey);

import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
