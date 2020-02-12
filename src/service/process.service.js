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
  return api.get("", {
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

export const getCommonFoundtServiceProcess = params =>
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
