export const moneyDivider1000 = (money, fixed = 0)=>{
  return (Number(money) / 10000).toFixed(fixed);
}


export const moneyFormat = (money, fixed = 0 , spaceNumer = 1) => {
  return moneyDivider1000(money, fixed) + (new Array(spaceNumer).fill(' ')).join('') + '万'
}