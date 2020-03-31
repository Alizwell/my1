export const bankDataFormat = (data)=>{
  return data.map(item=>({
    ...item,
    value: item.BankName
  }))
}