export const processInfoFormat = (original)=>{
  return {
    SaleServiceProcGUID: original.SaleServiceProcGUID,
    SaleServiceGUID: original.SaleServiceGUID,
    process: original.ServiceProc,
    completeDate: original.CompleteDate,
    followPeople: original.Jbr,
    ProcMemo: original.ProcMemo
  }
}