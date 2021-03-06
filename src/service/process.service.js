import api from "./api.service";

export const getProcess = ({
  saleServiceProcGUID,
  saleServiceGUID,
  jbr,
  dataFilter
}) => {
  return api.get("/api/HandledProcess/HandledProcessQuery", {
    params: {
      saleServiceProcGUID,
      saleServiceGUID,
      jbr,
      dataFilter
    }
  });
};

export const getServiceProcess = ({ projGUID, serviceProcess, dataFilter }) => {
  return api.get("/api/MortgageLoan/ServiceProcessQuery", {
    params: {
      projGUID,
      serviceProcess,
      dataFilter
    }
  });
};

export const getMortgageServiceProcess = params =>
  getServiceProcess({
    ...params,
    serviceProcess: "按揭贷款"
  });

export const getContractServiceProcess = params =>
  getServiceProcess({
    ...params,
    serviceProcess: "合同登记"
  });

export const getCommonFoundServiceProcess = params =>
  getServiceProcess({
    ...params,
    serviceProcess: "公积金贷款"
  });

export const getPropertyServiceProcess = params =>
  getServiceProcess({
    ...params,
    serviceProcess: "产权服务"
  });

export const getOccupationServiceProcess = params =>
  getServiceProcess({
    ...params,
    serviceProcess: "入伙服务"
  });

//handle the process
export const setHandledProcess = ({
  saleServiceGUIDs,
  serviceproc,
  jbr,
  procmemo
})=> api.get('/api/HandledProcess/DoHandledProcess', {
  params: {
    saleServiceGUIDs,
    serviceproc,
    jbr,
    procmemo
  }
})

//delete the process detail
export const delProcessDetail = ({
  saleServiceProcGUIDs,
  saleServiceGUID
}) => api.get('/api/HandledProcess/DeleteHandledProcessDetail', {
  params: {
    saleServiceProcGUIDs,
    saleServiceGUID
  }
})

//handle the process reason
export const setProjectReason = ({
  itemGuidList,
  reason,
  remark,
  bhdate,
  hkdate
})=> api.get('/api/HandledProcess/DoHandledProcessReason', {
  params: {
    itemGuidList,
    reason,
    remark,
    bhdate,
    hkdate
  }
})


//handle the bank
export const setServiceBank = ({
  saleServiceGUIDlist,
  serviceitem,
  bank,
  bankyear
})=> api.get('/api/HandledProcess/DoHandledProcessBank', {
  params: {
    saleServiceGUIDlist,
    serviceitem,
    bank,
    bankyear
  }
})

//handle process detail info
export const setProcessDetail = ({
  saleServiceGUIDlist,
  serviceitem,
  djr = '',
  issq = '',
  wscl = '',
  reason = '',
  ajbank = '',
  ajyear = '',
  ajtotal = '',
  gjjbank = '',
  gjjyear = '',
  gjjtotal = '',
  badate  = '',
  bano = ''
})=>api.get('/api/HandledProcess/DoHandledSaleInfo',{
  timeout: 1000 * 8,
  params: {
    saleServiceGUIDlist,
    serviceitem,
    djr,
    issq,
    wscl,
    reason,
    ajbank,
    ajyear,
    ajtotal,
    gjjbank,
    gjjyear,
    gjjtotal,
    badate ,
    bano
  }
})