
export const formatNumber = (digit: number)=>{
  return new Intl.NumberFormat('eng-Us').format(digit)
}