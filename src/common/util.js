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
  return {
    value,
    unit,
    text
  }
}

export default {
  pad0: pad0,
  formatTime: formatTime,
  formatHashrate
}
