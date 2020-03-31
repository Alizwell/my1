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
      <AfterSale 
        {...loadData}
        searchList={[0, 1]}
        serviceType={'contract'} 
        showTabs={["process"]}
        customTabs={[
          { title: "未办理"}, 
          { title: "受理中"}, 
          { title: "已完成"}]
        }
        followUpBtns={
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
        } 
      />
    </>
  );
};

export default Contract;
