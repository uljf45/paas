function pad0 (num) {
  return num < 10 ? '0' + num : num
}

function formatTime (timespan) {
  let date = new Date(timespan)
  let y = date.getFullYear().toString() + '/'
  let M = pad0(date.getMonth() + 1) + '/'
  let d = pad0(date.getDate()) + ' '
  let h = pad0(date.getHours()) + ':'
  let m = pad0(date.getMinutes()) + ':'
  let s = pad0(date.getSeconds())
  return y + M + d + h + m + s
}

export default {
  pad0: pad0,
  formatTime: formatTime
}
