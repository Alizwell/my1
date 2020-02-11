import React from "react";
import { Helmet } from 'react-helmet';
import {
  unHandledMortgageLoan,
  handlingMortgageLoan,
  handledMortgageLoan
} from "../../service/afterSale.service";

import AfterSale from '../AfterSale';

const Mortgage = ()=>{
  const loadData = {
    loadTabs0: unHandledMortgageLoan,
    loadTabs1: handlingMortgageLoan,
    loadTabs2: handledMortgageLoan
  }
  return (
    <>
      <Helmet>
        <title>按揭贷款服务</title>
      </Helmet>
      <AfterSale  {...loadData} />
    </>
  )
}

export default Mortgage;
