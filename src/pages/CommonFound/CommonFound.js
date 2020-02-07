import React from "react";

import {
  unHandledCommonFound,
  handlingCommonFound,
  handledCommonFound
} from "../../service/afterSale.service";

import AfterSale from '../AfterSale';
import { setTitle } from '../../utils/title';

const CommonFound = ()=>{
  const loadData = {
    loadTabs0: unHandledCommonFound,
    loadTabs1: handlingCommonFound,
    loadTabs2: handledCommonFound
  }
  setTitle('公积金贷款服务');
  return <AfterSale  {...loadData} canGetProcess={true} />
}


export default CommonFound;
