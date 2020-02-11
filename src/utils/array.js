export const delWithProps = (arr, key, val)=>{
  const temp = arr.slice(0)
  const index = arr.findIndex(v => v[key] = val);
  temp.splice(index, 1);
  return temp;
}