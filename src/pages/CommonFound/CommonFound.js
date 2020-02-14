import React from "react";
import { Helmet } from "react-helmet";
import {
  unHandledCommonFound,
  handlingCommonFound,
  handledCommonFound
} from "../../service/afterSale.service";

import AfterSale from "../AfterSale";

const CommonFound = () => {
  const loadData = {
    loadTabs0: unHandledCommonFound,
    loadTabs1: handlingCommonFound,
    loadTabs2: handledCommonFound
  };

  return (
    <>
      <Helmet>
        <title>公积金贷款服务</title>
      </Helmet>
      <AfterSale {...loadData} canGetProcess={true} serviceType={'commonFound'}  />
    </>
  );
};

export default CommonFound;
