export const unhandledMortgageFormat = original => {
  return {
    ...original,
    buguid: original.buguid,
    companyName: original.公司名称,
    projectName: original.项目名称,
    projGUID: original.ProjGUID,
    buildingNo: original.房号,
    tradeGUID: original.TradeGUID,
    customName: original.客户姓名,
    orderDate: original.认购日期,
    contractSum: original.合同总价,
    saleServiceGUID: original.SaleServiceGUID,
    sequence: original.Sequence,
    lastProcessingDate: original.最后办理日期,
    customPhone: original.电话号码,
    remark: original.备注,
    isFirstBatchMaterial: original.是否收齐材料,
    isNoInformationReceived: original.未收到资料,
    mortgageOverdueDays: original.按揭逾期天数,
    commonFoundOverdueDay: original.公积金逾期天数
  };
};

export const handlingMortgageFormat = original => {
  return {
    buguid: original.buguid,
    companyName: original.公司名称,
    projectName: original.项目名称,
    rojGUID: original.ProjGUID,
    buildingNo: original.房号,
    tradeGUID: original.TradeGUID,
    customName: original.客户姓名,
    orderDate: original.认购日期,
    contractSum: original.合同总价,
    sequence: original.Sequence,
    lastProcessingDate: original.最后办理日期,
    customPhone: original.电话号码,
    remark: original.备注,
    isFirstBatchMaterial: original.是否首期材料,
    isNoInformationReceived: original.未收到资料,
    mortgageOverdueDays: original.按揭逾期天数,
    commonFoundOverdueDay: original.公积金逾期天数
  };
};

export const handledMortgageFormat = original => {
  return {
    ...original,
    buguid: original.buguid,
    companyName: original.公司名称,
    projectName: original.项目名称,
    rojGUID: original.ProjGUID,
    buildingNo: original.房号,
    tradeGUID: original.TradeGUID,
    customName: original.客户姓名,
    orderDate: original.认购日期,
    contractSum: original.合同总价,
    SaleServiceGUID: original.SaleServiceGUID,
    sequence: original.Sequence,
    lastProcessingDate: original.最后办理日期,
    customPhone: original.电话号码,
    remark: original.备注,
    isFirstBatchMaterial: original.是否首期材料,
    isNoInformationReceived: original.未收到资料,
    mortgageOverdueDays: original.按揭逾期天数,
    commonFoundOverdueDay: original.公积金逾期天数
  };
};


export const afterSaleFormat = original => ({
  serviceType: original.serviceType,
  SaleServiceGUID: original.SaleServiceGUID,
  房号: original.房号,
  客户姓名: original.客户姓名,
  付款方式: original.付款方式,
  认购日期: original.认购日期,
  足签日期: original.足签日期,
  网签日期: original.网签日期,
  对接人员: original.对接人员,
  合同总价: original.合同总价,
  置业顾问: original.置业顾问,
  mortgageMoney: original.按揭金额,
  mortgageBank: original.按揭银行,
  commonFoundMoney: original.公积金金额,
  commonFoundBank: original.公积金银行,
  mortgageYears: original.按揭年限,
  commonFoundYears: original.公积金年限,
  fullMaterial: original.是否收齐材料,
  unreceivedMaterial: original.未收到资料,
  dockingPeople: original.对接人,
  mortgageOverdueDate: original.按揭逾期天数,
  commonFoundOverDueDate: Number(original.公积金逾期天数),
  recordDate: original.备案日期 ? new Date(original.备案日期) : undefined,
  recordNumber: original.合同备案号,
  remark: original.备注,
})