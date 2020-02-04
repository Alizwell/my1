import api from "./api.service";

export const unHandleMortgageLoan = ({
  buGUID = "",
  projGUID = "",
  customerName = "",
  customerPhone = "",
  zygwxm = "",
  roomNumberWord = "",
  tradeGUID = "",
  serviceProcess = "",
  reclassify = "",
  dataFilter
}) => {
  return api.get("/api/MortgageLoan/NotHandledQuery");
  //   return api.get("/api/MortgageLoan/NotHandledQuery", {
  //     buGUID,
  //     projGUID,
  //     customerName,
  //     customerPhone,
  //     zygwxm,
  //     roomNumberWord,
  //     tradeGUID,
  //     serviceProcess,
  //     reclassify,
  //     dataFilter
  //   });
};

export const handlingMortgageLoan = ({
  buGUID = "",
  projGUID = "",
  customerName = "",
  customerPhone = "",
  zygwxm = "",
  roomNumberWord = "",
  tradeGUID = "",
  serviceProcess = "",
  reclassify = "",
  dataFilter
}) => {
  return api.get("/api/MortgageLoan/DoingHandledQuery");
  //   return api.get("/api/MortgageLoan/NotHandledQuery", {
  //     buGUID,
  //     projGUID,
  //     customerName,
  //     customerPhone,
  //     zygwxm,
  //     roomNumberWord,
  //     tradeGUID,
  //     serviceProcess,
  //     reclassify,
  //     dataFilter
  //   });
};

export const handledMortgageLoan = ({
  buGUID = "",
  projGUID = "",
  customerName = "",
  customerPhone = "",
  zygwxm = "",
  roomNumberWord = "",
  tradeGUID = "",
  serviceProcess = "",
  reclassify = "",
  dataFilter
}) => {
  return api.get("/api/MortgageLoan/LoanHandledQuery");
  //   return api.get("/api/MortgageLoan/NotHandledQuery", {
  //     buGUID,
  //     projGUID,
  //     customerName,
  //     customerPhone,
  //     zygwxm,
  //     roomNumberWord,
  //     tradeGUID,
  //     serviceProcess,
  //     reclassify,
  //     dataFilter
  //   });
};
