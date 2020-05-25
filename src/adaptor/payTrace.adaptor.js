export const unSignedPayTraceFormat = original => {
  return {
    buguid: original.buguid,
    customName: original.客户名称,
    estimatedSigningTime: original.预计签约日期,
    companyName: original.BUName,
    unpaidMoney: original.欠款金额,
    projectName: original.ProjName,
    projGUID: original.ProjGUID,
    buildingNo: original.房号,
    paymentMethod: original.付款方式,
    tradeGUID: original.TradeGUID,
    orderGUID: original.OrderGUID,
    endDate: original.闭合时间,
    money: original.RmbYe,
    arrearageReason: original.ArrearageReasonName,
    subscribeDate: original.认购日期,
    remark: original.Remark,
    overdueDays: original.逾期天数,
    FeeGUID: original.FeeGUID,
    expectPayDate: original.预计回款日期,
    contractDate: original.约定签约日期,
    unPaidReason: original.未回款原因
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
