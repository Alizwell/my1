import api from "./api.service";

export const payTraceMortgageService = ({
  bUGUID,
  projGUID,
  moneyType,
  roomNumberWord,
  customerName,
  zygwxm,
  tradeGUID,
  feeGUID,
  reason,
  dataFilter
}) => {
  return api.get("/api/Payment/MortgageQuery", {
    params: {
      bUGUID,
      projGUID,
      moneyType,
      roomNumberWord,
      customerName,
      zygwxm,
      tradeGUID,
      feeGUID,
      reason,
      dataFilter
    }
  });
};

export const unSignedPayTrace = ({
  bUGUID,
  projGUID,
  paymentType,
  roomNumberWord,
  customerName,
  zygwxm,
  tradeGUID,
  orderGUID,
  reason,
  dataFilter
}) => {
  return api.get("/api/Payment/NoSignedQuery", {
    params: {
      bUGUID,
      projGUID,
      paymentType,
      roomNumberWord,
      customerName,
      zygwxm,
      tradeGUID,
      orderGUID,
      reason,
      dataFilter
    }
  });
};

//非按揭类
export const notMortgagePayTrace = params => {
  return payTraceMortgageService({ ...params, moneyType: "非贷款类房款" });
};

//按揭类
export const mortgagePayTrace = params => {
  return payTraceMortgageService({ ...params, moneyType: "贷款类房款" });
};

export const unsignReason = ({ dataFilter }) => {
  return api.get("/api/Payment/WQYQuery", {
    params: {
      dataFilter
    }
  });
};

export const unpaidReason = ({ dataFilter }) => {
  return api.get("/api/Payment/WHKQuery", {
    params: {
      dataFilter
    }
  });
};
