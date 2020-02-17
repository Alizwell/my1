import React from "react";
import { Helmet } from "react-helmet";
import {
  unHandledContract,
  handlingContract,
  handledContract
} from "../../service/afterSale.service";

import AfterSale from "../AfterSale";

const Contract = () => {
  const loadData = {
    loadTabs0: unHandledContract,
    loadTabs1: handlingContract,
    loadTabs2: handledContract
  };

  return (
    <>
      <Helmet>
        <title>合同登记服务</title>
      </Helmet>
      <AfterSale {...loadData} serviceType={'contract'} showTabs={["process"]} followUpBtns={
        [{
          attr: 'process',
          value: '跟进进程',
          content: {
            title: '跟进进程',
            list: [{
              type: 'Picker',
              category: 'process',
              props: {},
              label: '服务进程'
            }]
          }
        }]
      } />
    </>
  );
};

export default Contract;
