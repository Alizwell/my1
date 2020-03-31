import moment from 'moment';

export const moneyDivider1000 = (money, fixed = 0)=>{
  return (Number(money) / 10000).toFixed(fixed);
}

export const moneyFormat = (money, fixed = 0 , spaceNumber = 1) => {
  let target = moneyDivider1000(money, fixed);
  return !isNaN(target) ? target + (new Array(spaceNumber).fill(' ')).join('') + '万' : '';
}

export const timeFormat = (time)=>{
  return moment(time).isValid() ? moment(time).format("YYYY-MM-DD") : '';
}
