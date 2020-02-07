import React from "react";

import {
  unHandledMortgageLoan,
  handlingMortgageLoan,
  handledMortgageLoan
} from "../../service/afterSale.service";

import AfterSale from '../AfterSale';
import { setTitle } from '../../utils/title';

const Mortgage = ()=>{
  const loadData = {
    loadTabs0: unHandledMortgageLoan,
    loadTabs1: handlingMortgageLoan,
    loadTabs2: handledMortgageLoan
  }
  setTitle("按揭贷款服务");
  return <AfterSale  {...loadData} />
}


export default Mortgage;
