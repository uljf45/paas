<template>
  <div>
    <div class="chart-title" v-text="title"></div>
    <div class="chart-select-time clearfix">
      <el-button-group>
        <el-button size="small" @click="filter('day')" :type="btnTypeBy('day')">天</el-button>
        <el-button size="small" @click="filter('week')" :type="btnTypeBy('week')">周</el-button>
        <el-button size="small" @click="filter('month')" :type="btnTypeBy('month')">月</el-button>
        <el-button size="small" @click="filter('season')" :type="btnTypeBy('season')">季</el-button>
        <el-button size="small" @click="filter('halfyear')" :type="btnTypeBy('halfyear')">半年</el-button>
        <el-button size="small" @click="filter('year')" :type="btnTypeBy('year')">年</el-button>
      </el-button-group>
      <div class="chart-toolBox fr">
        <el-button size="small" @click="exportPic">导出</el-button>
      </div>
    </div>
    <div class="flex-center">
      <div id="hashratespline-container" class="flex-center echart-container">
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {getBrowser} from '@/common/browser.js'
export default {
  name: 'HashrateSpline',
  props: {
    hashrateList: {
      default () {
        return {
          day: [],
          week: [],
          month: [],
          season: [],
          halfyear: [],
          year: []
        }
      }
    },
    title: ''
  },
  data () {
    return {
      filterKey: 'day',
      myChart: null
    }
  },
  methods: {
    btnTypeBy (fk) {
      return fk === this.filterKey ? 'primary' : ''
    },
    filter (fk) {
      this.filterKey = fk
      this.refreshData(this.hashrateList[this.filterKey])
    },
    pad0 (num) {
      return num < 10 ? '0' + num : num
    },
    formatTime (timespan) {
      let date = new Date(timespan)
      let y = date.getFullYear().toString() + '/'
      let M = this.pad0(date.getMonth() + 1) + '/'
      let d = this.pad0(date.getDate()) + ' '
      let h = this.pad0(date.getHours()) + ':'
      let m = this.pad0(date.getMinutes()) + ':'
      let s = this.pad0(date.getSeconds())
      return y + M + d + h + m + s
    },
    initData () {
      let vm = this
      const colors = ['#5793f3', '#675bba', '#d14a61']
      const option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: !1,
            lineStyle: {
              color: '#5793f3'
            }
          },
          enterable: !1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderColor: '#333',
          padding: 7,
          textStyle: {
            fontSize: 12,
            fontWeight: 'lighter'
          },
          formatter: function (params) {
            return vm.formatTime(params[0].data[0]) + '<br>\n' + '算力: ' + params[0].data[1].toFixed(2)
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: !0
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none'
        //     },
        //     dataView: {readOnly: false},
        //     magicType: {type: ['bar', 'line']},
        //     restore: {},
        //     saveAsImage: {}
        //   },
        //   right: 3
        // },
        xAxis: {
          type: 'time',
          // data: this.sevenDay,
          splitLine: {
            show: !1
          },
          boundaryGap: !1,
          offset: 10,
          axisLabel: {
            margin: 2,
            // formatter: function (timespan) {
            //   return vm.formatTime(timespan)
            // },
            textStyle: {
              color: '#888'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#aaa'
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '算力',
            position: 'left',
            boundaryGap: !1,
            splitLine: {
              show: !1
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.05)']
              }
            },
            axisLine: {
              lineStyle: {
                color: '#aaa'
              }
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#888'
              }
            }
          }
        ],
        series: [
          {
            name: '算力',
            type: 'line',
            smooth: true,
            data: this.hashrateList[this.filterKey],
            yAxisIndex: 0,
            symbol: 'emptyCircle',
            symbolSize: 4,
            itemStyle: {
              color: '#5793f3'
            },
            lineStyle: {
              color: '#5793f3',
              width: '2'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#C3DCF3'
              }, {
                offset: 1,
                color: '#fff'
              }])
            },
            emphasis: {
              itemStyle: {
                color: '#5793f3'
              }
            }
          }
        ]
      }
      this.myChart.setOption(option)
    },
    refreshData (data) {
      if (!this.myChart) return
      var opt = this.myChart.getOption()
      opt.series[0].data = data
      this.myChart.setOption(opt)
    },
    exportPic () {
      let picInfo = this.myChart.getConnectedDataURL({
        type: 'png',
        backgroundColor: '#fff',
        pixelRatio: 1,
        excludeComponents: [
          'toolbox'
        ]
      })

      let a = document.createElement('a')
      a.download = 'hashrate-spline.png'
      a.target = '_blank'
      a.href = picInfo

      let browserInfo = getBrowser()

      if (typeof MouseEvent === 'function' && browserInfo.browser !== 'IE' && browserInfo.browser !== 'Edge') {
        console.log(browserInfo)
        let evt = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: false
        })
        a.dispatchEvent(evt)
      } else { // IE
        if (window.navigator.msSaveOrOpenBlob) {
          var bstr = atob(picInfo.split(',')[1])
          var n = bstr.length
          var u8arr = new Uint8Array(n)

          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }

          var blob = new Blob([u8arr])
          window.navigator.msSaveOrOpenBlob(blob, 'hashrate-spline.png')
        } else {
          var lang = '右键另存为图片'
          var html = '' + '<body style="margin:0;">' + '<img src="' + picInfo + '" style="max-width:100%;" title="' + lang + '" />' + '</body>'
          var tab = window.open()
          tab.document.write(html)
        }
      }
    }
  },
  watch: {
    hashrateList (newList) {
      if (!this.myChart) {
        this.myChart = echarts.init(document.getElementById('hashratespline-container'))
        this.initData()
      } else {
        var opt = this.myChart.getOption()
        opt.series[0].data = newList.day
        this.myChart.setOption(opt)
      }
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
