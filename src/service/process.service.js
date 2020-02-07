import api from './api.service';

export const getProcess = ({
  saleServiceProcGUID,
  saleServiceGUID,
  jbr,
  dataFilter
})=>{
  return api.get('/api/HandledProcess/HandledProcessQuery', {
    params: {
      saleServiceProcGUID,
      saleServiceGUID,
      jbr,
      dataFilter
    }
  })
}