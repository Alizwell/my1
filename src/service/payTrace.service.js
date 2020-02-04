import api from "./api.service";

export const unSignedPayTrace = ({
  bUGUID = "",
  projGUID = "",
  paymentType = "",
  roomNumberWord = "",
  tradeGUID = "",
  orderGUID = "",
  reason = "",
  dataFilter = "",
}) => {
  return api.get("/api/Payment/NoSignedQuery");
  //   return api.get("/api/MortgageLoan/NotHandledQuery", {
    // bUGUID,
    // projGUID,
    // paymentType,
    // roomNumberWord,
    // tradeGUID,
    // orderGUID,
    // reason,
    // dataFilter,
  //   });
};

export const notMortgagePayTrace = ({
  bUGUID = "",
  projGUID = "",
  paymentType = "",
  roomNumberWord = "",
  tradeGUID = "",
  orderGUID = "",
  reason = "",
  dataFilter = "",
}) => {
  return api.get("/api/Payment/MortgageQuery");
  //   return api.get("/api/MortgageLoan/NotHandledQuery", {
    // bUGUID,
    // projGUID,
    // paymentType,
    // roomNumberWord,
    // tradeGUID,
    // orderGUID,
    // reason,
    // dataFilter,
  //   });
};

export const mortgagePayTrace = ({
  bUGUID = "",
  projGUID = "",
  paymentType = "",
  roomNumberWord = "",
  tradeGUID = "",
  orderGUID = "",
  reason = "",
  dataFilter = "",
}) => {
  return api.get("/api/Payment/MortgageQuery");
};
