export const unSignedPayTraceFormat = original => {
  return {
    buguid: original.buguid,
    companyName: original.BUName,
    projectName: original.ProjName,
    projGUID: original.ProjGUID,
    buildingNo: original.房号,
    paymentMethod: original.付款方式,
    tradeGUID: original.TradeGUID,
    orderGUID: original.OrderGUID,
    endDate: original.EndDate,
    money: original.RmbYe,
    arrearageReason: original.ArrearageReasonName,
    dataCreated: original.CreateOn,
    remark: original.Remark,
    overdueDays: original.逾期天数
  };
};

export const notMortgagePayTraceFormat = original => {
  return {};
};

export const mortgagePayTraceFormat = original => {
  return {};
};
