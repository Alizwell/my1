import api from "./api.service";

export const payTraceMortgageService = ({
  bUGUID,
  projGUID,
  moneyType,
  roomNumberWord,
  tradeGUID,
  feeGUID,
  reason,
  dataFilter,
}) =>{ 
  return api.get('/api/Payment/MortgageQuery', {
    params:{
      bUGUID,
      projGUID,
      moneyType,
      roomNumberWord,
      tradeGUID,
      feeGUID,
      reason,
      dataFilter,
    }
  });
}

export const unSignedPayTrace = ({
  bUGUID,
  projGUID,
  paymentType,
  roomNumberWord,
  tradeGUID,
  orderGUID,
  reason,
  dataFilter,
}) => {
  return api.get("/api/Payment/NoSignedQuery", {
    params: {
      bUGUID,
      projGUID,
      paymentType,
      roomNumberWord,
      tradeGUID,
      orderGUID,
      reason,
      dataFilter
    }
  });
};

//非按揭类
export const notMortgagePayTrace = (params)=>{
  return payTraceMortgageService({...params, moneyType: '非贷款类房款'})
}

//按揭类
export const mortgagePayTrace =  (params)=>{
  return payTraceMortgageService({...params, moneyType: '贷款类房款'})
}