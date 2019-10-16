function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n;
}
export function formatTime (number, format) {
  if(!number) return ''
  let time = new Date(number)
  let newArr = []
  let formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
  newArr.push(time.getFullYear())
  newArr.push(formatNumber(time.getMonth() + 1))
  newArr.push(formatNumber(time.getDate()))

  newArr.push(formatNumber(time.getHours()))
  newArr.push(formatNumber(time.getMinutes()))
  newArr.push(formatNumber(time.getSeconds()))
  for (let i in newArr) {
      format = format.replace(formatArr[i], newArr[i])
  }
  return format;
}