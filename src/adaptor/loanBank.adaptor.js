export const loanBankFormat = original => {
  return {
    ...original,
    BankGUID: original.BankGUID,
    BUGUID: original.BUGUID,
    value: original.BankGUID,
    label: original.BankName
  }
}

export const loanBankFilter = original => {
  return original.filter(item => parseInt(item.IsSys) === 0)
}