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

const pool = {
  rate: 1000
}

function formatHashrate (hashrate) {
  let i = -1
  var byteUnits = ['KH/S', 'MH/S', 'GH/S', 'TH/S', 'PH/S']
  do {
    hashrate = hashrate / pool.rate
    i++
  } while (hashrate > pool.rate)

  let value = hashrate.toFixed(2)
  let unit = byteUnits[i]
  let text = value + ' ' + unit
  let totalRate = Math.pow(pool.rate, i + 1)
  return {
    value,
    unit,
    text,
    totalRate
  }
}

function formatDuration (seconds = 0) {
  if (seconds < 60) {
    return seconds + '秒'
  }

  let s = seconds % 60
  let mins = (seconds - s) / 60
  if (mins < 60) {
    return mins + '分' + s + '秒'
  }

  let m = mins % 60
  let hours = (mins - m) / 60
  if (hours < 24) {
    return hours + '小时' + m + '分' + s + '秒'
  }

  let h = hours % 24
  let days = (hours - h) / 24
  return days + '天' + h + '小时' + m + '分' + s + '秒'
}

export default {
  pad0,
  formatTime,
  formatHashrate,
  formatDuration
}
