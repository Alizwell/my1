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
    overdueDays: original.逾期天数,
    FeeGUID: original.FeeGUID
  };
};

export const notMortgagePayTraceFormat = original => {
  return {
    buguid: original.buguid,
    companyName: original.BUName,
    projectName: original.ProjName,
    projGUID: original.ProjGUID,
    buildingNo: original.房号,
    paymentMethod: original.付款方式,
    tradeGUID: original.TradeGUID,
    feeGUID: original.FeeGUID,
    itemType: original.ItemType,
    itemName: original.ItemName,
    lastDate: original.lastDate,
    money: original.RmbYe,
    arrearageReason: original.ArrearageReasonName,
    dataCreated: original.CreateOn,
    remark: original.Remark,
    overdueDays: original.逾期天数
  };
};

export const mortgagePayTraceFormat = original => {
  return notMortgagePayTraceFormat(original);
};

export const unSignedReasonFormat = original => {
  return {
    ...original,
    value: original.ArrearageReasonParamGUID,
    label: original.ArrearageReasonParamName
  };
};

export const unPaidReasonFormat = unSignedReasonFormat;
