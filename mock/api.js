const fs = require('fs')
const path = require('path')
const express = require('express')
const apiRoutes = express.Router()

function getJsonBy (fileName) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, fileName)))
}

function initApi (app) {
  apiRoutes.get('/v1/mining', function (req, res) {
    let data = {
      'mining': [{
        'id': 20701,
        'date': '2018-05-23T02:18:06.000Z',
        'mhs': 11681500,
        'normal': 3,
        'abnormal': 1,
        'total': 30,
        'temperature': 37,
        'humidity': 10
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
    miners = miners.slice(offset, offset + size)
    let result = {
      miners,
      total
    }
    res.json(result)
  })

  app.use(apiRoutes)
}

module.exports = initApi
