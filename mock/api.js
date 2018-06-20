const fs = require('fs')
const path = require('path')
const express = require('express')
const apiRoutes = express.Router()
const bodyParser = require('body-parser')
const busboy = require('connect-busboy')
const excel = require('exceljs')

let filePath = path.join(path.normalize(__dirname) + '/..', 'static')

function getJsonBy (fileName) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, fileName)))
}

function writeJsonBy (fileName, jsonData) {
  let filePath = path.join(__dirname, fileName)
  let jsonStr = JSON.stringify(jsonData)
  fs.writeFileSync(filePath, jsonStr)
}

function pad0 (num) {
  let len = num.toString().length
  if (len === 1) {
    num = '0' + num
  }
  return num
}

function fmtDate (dateString) {
  let date = new Date(dateString)
  let y = pad0(date.getFullYear())
  let M = pad0(date.getMonth() + 1)
  let d = pad0(date.getDate())
  let h = pad0(date.getHours())
  let m = pad0(date.getMonth())
  let s = pad0(date.getSeconds())
  return `${y}-${M}-${d} ${h}:${m}:${s}`
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

function initApi (app) {
  // app.use(express.static(filePath))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extend: false}))
  app.use(busboy())

  apiRoutes.get('/v1/mining', function (req, res) {
    let data = {
      'mining': [{
        'id': 20701,
        'date': '2018-05-23T02:18:06.000Z',
        'mhs': 11681500 + Math.random(0, 1) * 1000000,
        'normal': 3,
        'abnormal': 1,
        'total': 30 + Math.random(0, 1) * 10,
        'temperature': 37 + Math.random(0, 1) * 10,
        'humidity': 10 + Math.random(0, 1) * 10
      }]
    }
    res.json(data)
  })

  apiRoutes.get('/v1/mining/mhs', function (req, res) {
    let data = {
      'mining_mhs': [
        {'date': '2018-05-03T02:18:06.000Z', 'mhs': 11681500},
        {'date': '2018-05-04T02:18:06.000Z', 'mhs': 12681500},
        {'date': '2018-05-05T02:18:06.000Z', 'mhs': 13681500},
        {'date': '2018-05-07T02:18:06.000Z', 'mhs': 12681500},
        {'date': '2018-05-08T02:18:06.000Z', 'mhs': 13681500},
        {'date': '2018-05-09T02:18:06.000Z', 'mhs': 11881500},
        {'date': '2018-05-10T02:18:06.000Z', 'mhs': 12681500},
        {'date': '2018-05-11T02:18:06.000Z', 'mhs': 11881500},
        {'date': '2018-05-12T02:18:06.000Z', 'mhs': 11181500},
        {'date': '2018-05-13T02:18:06.000Z', 'mhs': 13681500}
      ]
    }
    res.json(data)
  })

  apiRoutes.get('/v1/miners/alerts', function (req, res) {
    // offset=0&size=50
    let offset = req.query.offset
    let size = req.query.size
    let miners = getJsonBy('miners.json').list
    let minersAlerts = []
    miners.forEach((item) => {
      if (item.status === 'inactive') {
        minersAlerts.push(item)
      }
    })
    let total = minersAlerts.length
    minersAlerts = minersAlerts.slice(offset, offset + size)
    let result = {
      miners_alerts: minersAlerts,
      total
    }
    res.json(result)
  })

  apiRoutes.get('/v1/miners', function (req, res) {
    let offset = req.query.offset
    let size = req.query.size
    let miners = getJsonBy('miners.json').list
    let total = miners.length
    miners = miners.slice(offset, Number(offset) + Number(size))
    let result = {
      miners,
      total
    }
    res.json(result)
  })

  apiRoutes.get('/v1/miner', function (req, res) {
    let mac = req.query.mac
    let miners = getJsonBy('miners.json').list
    let miner = miners.find((item) => {
      return item.mac === mac
    })

    let minerList = getJsonBy('miner.json').list
    let miner2 = minerList.find((v) => v.mac === mac)

    miner = Object.assign(miner, miner2)
    res.json({miner})
  })

  apiRoutes.get('/v1/miner/mhs', function (req, res) {
    let hashrates = getJsonBy('minerHashrates.json')
    res.json(hashrates)
  })

  apiRoutes.get('/v1/miner/temperature', function (req, res) {
    let temperatures = getJsonBy('temperatures.json')
    res.json(temperatures)
  })

  apiRoutes.patch('/v1/miner', function (req, res) {
    let body = req.body
    let mac = body.mac
    let patchAction = body.patchAction

    let miners = getJsonBy('miners.json').list
    let miner = miners.find((v) => v.mac === mac)
    if (patchAction && patchAction === 'setNetwork') {
      let ipType = body.ip_type
      let ip = body.ip
      let netmask = body.netmask
      let gateway = body.gateway
      let dns = body.dns
      miner.ip_type = ipType
      miner.ip = ip
      miner.netmask = netmask
      miner.gateway = gateway
      miner.dns = dns

      let miner2list = getJsonBy('miner.json').list
      let miner2 = miner2list.find(v => v.mac === mac)
      miner2.ip = ip
      console.log(miner2list)
      writeJsonBy('miner.json', {list: miner2list})
    } else if (patchAction && patchAction === 'setPool') {
      for (let i = 1; i <= 3; i++) {
        miner['pool' + i + '_addr'] = body['pool' + i + '_addr']
        miner['pool' + i + '_miner_addr'] = body['pool' + i + '_miner_addr']
        miner['pool' + i + '_password'] = body['pool' + i + '_password']
      }
    } else if (patchAction && patchAction === 'setPosition') {
      let position = body.position
      if (typeof position !== 'undefined') {
        miner.position = position
      }
    } else if (patchAction && patchAction === 'setNumber') {
      let number = body.number
      if (typeof number !== 'undefined') {
        miner.number = number
      }
    }
    writeJsonBy('miners.json', {list: miners})

    setTimeout(() => {
      res.json({result: 'success'})
    }, 1000)
  })

  apiRoutes.put('/v1/batch/pools', function (req, res) {
    res.json({result: 'success'})
  })

  apiRoutes.put('/v1/batch/reboot', function (req, res) {
    res.json({result: 'success'})
  })

  apiRoutes.put('/v1/batch/upgrade', function (req, res) {
    res.json({result: 'success'})
  })

  apiRoutes.post('/v1/upload/firmwareImage', function (req, res) {
    if (req.busboy) {
      req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log(filename)
        let savePath = path.join(filePath, filename)
        file.pipe(fs.createWriteStream(savePath))

        file.on('data', function (data) {
        })

        file.on('end', function () {
          console.log('File [' + fieldname + '] Finished')
          console.log(req)
          res.json({result: 'success', url: req.headers.origin + '/static/' + filename})
        })
      })
      req.busboy.on('finish', function () {
        console.log('Done parsing form !')
        console.log(req)
      })
      return req.pipe(req.busboy)
    }
  })

  apiRoutes.get('/v1/system/smtp', function (req, res) {
    let smtp = getJsonBy('config.json').smtp
    res.json({smtp, result: 'success'})
  })

  apiRoutes.get('/v1/system/mineName', function (req, res) {
    let mineName = getJsonBy('config.json').mineName
    res.json({mineName, result: 'success'})
  })

  apiRoutes.put('/v1/system/mineName', function (req, res) {
    let body = req.body
    let mineName = body.mineName
    let config = getJsonBy('config.json')
    config.mineName = mineName
    writeJsonBy('config.json', config)
    setTimeout(() => {
      res.json({result: 'success', mineName: config.mineName})
    })
  })

  apiRoutes.put('/v1/system/smtp', function (req, res) {
    let body = req.body
    let {host, port, secure, user, pass, from, to, period, enable} = body
    let config = getJsonBy('config.json')
    config.smtp.host = host
    config.smtp.port = port
    config.smtp.secure = secure
    config.smtp.host = host
    config.smtp.from = from
    config.smtp.to = to
    config.smtp.enable = enable
    config.smtp.auth.user = user
    config.smtp.auth.pass = pass
    config.smtp.period = period
    writeJsonBy('config.json', config)
    setTimeout(() => {
      res.json({result: 'success', smtp: config.smtp})
    })
  })

  apiRoutes.get('/v1/websocket/host', function (req, res) {
    let config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')))
    let websocket = config.websocket
    res.json(Object.assign({result: 'success', host: websocket.ip + ':' + websocket.port, ip: websocket.ip, port: websocket.port}))
  })

  apiRoutes.get('/v1/excel/hashrate/all/:interval', function (req, res) {
    let datas = {
      'mining_mhs': [
        {'date': '2018-05-03T02:18:06.000Z', 'mhs': 11681500},
        {'date': '2018-05-04T02:18:06.000Z', 'mhs': 12681500},
        {'date': '2018-05-05T02:18:06.000Z', 'mhs': 13681500},
        {'date': '2018-05-07T02:18:06.000Z', 'mhs': 12681500},
        {'date': '2018-05-08T02:18:06.000Z', 'mhs': 13681500},
        {'date': '2018-05-09T02:18:06.000Z', 'mhs': 11881500},
        {'date': '2018-05-10T02:18:06.000Z', 'mhs': 12681500},
        {'date': '2018-05-11T02:18:06.000Z', 'mhs': 11881500},
        {'date': '2018-05-12T02:18:06.000Z', 'mhs': 11181500},
        {'date': '2018-05-13T02:18:06.000Z', 'mhs': 13681500}
      ]
    }

    let interval = req.params.interval

    let data = []
    data.push(['时间', '算力'])

    let mhsList = datas.mining_mhs.map((item) => {
      return [fmtDate(item.date), formatHashrate(item.mhs * 1024 * 1024).text]
    })

    data = data.concat(mhsList)

    let mySheetName = 'hashrate_' + interval
    // var buffer = xlsx.build([{name: mySheetName, data: data}]) // Returns a buffer

    let xlsxContentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

    res.setHeader('Content-Type', xlsxContentType)
    res.setHeader('Content-Disposition', `attachment; filename=${mySheetName}.xlsx`)

    let options = {
      stream: res,
      userStyles: true,
      useSharedStrings: true
    }

    let workbook = new excel.stream.xlsx.WorkbookWriter(options)
    let worksheet = workbook.addWorksheet(mySheetName)
    let headers = [
      {header: '时间', width: 20},
      {header: '算力', width: 15}
    ]
    worksheet.columns = headers

    console.log(worksheet)

    mhsList.forEach(item => {
      worksheet.addRow(item)
    })

    worksheet.commit()
    workbook.commit()
    // res.writeHead(200)
    // res.end(buffer)
  })

  app.use(apiRoutes)
}

module.exports = initApi
