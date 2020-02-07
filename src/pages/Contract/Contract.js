import React from "react";

import {
  unHandledContract,
  handlingContract,
  handledContract
} from "../../service/afterSale.service";

import AfterSale from '../AfterSale';
import { setTitle } from '../../utils/title';

const Contract = ()=>{
  const loadData = {
    loadTabs0: unHandledContract,
    loadTabs1: handlingContract,
    loadTabs2: handledContract
  }
  setTitle("合同登记服务");
  return <AfterSale  {...loadData} />
}


export default Contract;
