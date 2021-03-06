import api from "./api.service";

export const afterSaleService = ({
  buGUID,
  projGUID,
  customerName,
  customerPhone,
  zygwxm,
  roomNumberWord,
  tradeGUID,
  serviceProcess,
  pageIndex,
  pageSize,
  reclassify,
  bankName,
  dataFilter
}, url) =>{
  return api.get(url, {
    params:{
      buGUID,
      projGUID,
      customerName,
      customerPhone,
      zygwxm,
      roomNumberWord,
      tradeGUID,
      serviceProcess,
      pageIndex,
      pageSize,
      reclassify,
      bankName,
      dataFilter
    }
  });
}

export const unHandledAfterSale = (params) => {
  return afterSaleService({...params, reclassify: '未办理'} ,"/api/MortgageLoan/NotHandledQuery")
};

export const handlingAfterSale = (params) => {
  return afterSaleService({...params, reclassify: '受理中'} ,"/api/MortgageLoan/DoingHandledQuery")
};

export const handledAfterSale = (params, reclassify = '已放款') => {
  return afterSaleService({...params, reclassify: reclassify} ,"/api/MortgageLoan/LoanHandledQuery")
};

// mortgageLoan service
export const unHandledMortgageLoan = (params) => unHandledAfterSale({
  ...params,
  serviceProcess:"按揭贷款"
})

export const handlingMortgageLoan = (params) => handlingAfterSale({
  ...params,
  serviceProcess:"按揭贷款"
})

export const handledMortgageLoan = (params) => handledAfterSale({
  ...params,
  serviceProcess:"按揭贷款"
})


//contract service
export const unHandledCommonFound = (params) => unHandledAfterSale({
  ...params,
  serviceProcess:"公积金贷款"
})

export const handlingCommonFound = (params) => handlingAfterSale({
  ...params,
  serviceProcess:"公积金贷款"
})

export const handledCommonFound = (params) => handledAfterSale({
  ...params,
  serviceProcess:"公积金贷款"
})

//commonFound service
export const unHandledContract = (params) => unHandledAfterSale({
  ...params,
  serviceProcess:"合同登记"
})

export const handlingContract = (params) => handlingAfterSale({
  ...params,
  serviceProcess:"合同登记"
})

export const handledContract = (params, reclassify = '已放款') => handledAfterSale({
  ...params,
  serviceProcess:"合同登记"
}, reclassify)

export const getLoanBank = ({
  bUGUID,
  dataFilter
})=>{
  return api.get('/api/MortgageLoan/LoanBankQuery', {
    params: {
      bUGUID,
      dataFilter
    }
  })
}
