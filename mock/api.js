const fs = require('fs')
const path = require('path')
const express = require('express')
const apiRoutes = express.Router()
const bodyParser = require('body-parser')

function getJsonBy (fileName) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, fileName)))
}

function writeJsonBy (fileName, jsonData) {
  let filePath = path.join(__dirname, fileName)
  let jsonStr = JSON.stringify(jsonData)
  fs.writeFileSync(filePath, jsonStr)
}

function initApi (app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extend: false}))

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
    } else {
      let position = body.position
      miner.position = position
    }
    writeJsonBy('miners.json', {list: miners})

    setTimeout(() => {
      res.json({result: 'success'})
    }, 1000)
  })

  app.use(apiRoutes)
}

module.exports = initApi
