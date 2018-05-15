<template>
  <div>
    <div class="chart-title">总算力图表</div>
    <div class="chart-select-time">
      <el-button-group>
        <el-button size="small" @click="filter('day')" :type="btnTypeBy('day')">天</el-button>
        <el-button size="small" @click="filter('week')" :type="btnTypeBy('week')">周</el-button>
        <el-button size="small" @click="filter('month')" :type="btnTypeBy('month')">月</el-button>
        <el-button size="small" @click="filter('season')" :type="btnTypeBy('season')">季</el-button>
        <el-button size="small" @click="filter('halfyear')" :type="btnTypeBy('halfyear')">半年</el-button>
        <el-button size="small" @click="filter('year')" :type="btnTypeBy('year')">年</el-button>
      </el-button-group>
    </div>
    <div class="flex-center">
      <div id="echart-container" class="flex-center echart-container">
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'HashrateSpline',
  data () {
    return {
      filterKey: 'day',
      myChart: null,
      fakeDatas: null
    }
  },
  mounted () {
    let vm = this
    function fakingDatas () {
      vm.fakeDatas = {
        day: [],
        week: [],
        month: [],
        season: [],
        halfyear: [],
        year: []
      }
      let endTimespan = new Date().getTime()
      for (let i = 0; i < 24; i++) {
        vm.fakeDatas.day.push([ endTimespan - i * 60 * 60 * 1000, Math.random() * 100 ])
      }
      for (let i = 0; i < 28; i++) {
        vm.fakeDatas.week.push([ endTimespan - i * 6 * 60 * 60 * 1000, Math.random() * 100 ])
      }
      for (let i = 0; i < 30; i++) {
        vm.fakeDatas.month.push([ endTimespan - i * 24 * 60 * 60 * 1000, Math.random() * 100 ])
      }
      for (let i = 0; i < 30; i++) {
        vm.fakeDatas.season.push([ endTimespan - i * 3 * 24 * 60 * 60 * 1000, Math.random() * 100 ])
      }
      for (let i = 0; i < 26; i++) {
        vm.fakeDatas.halfyear.push([ endTimespan - i * 7 * 24 * 60 * 60 * 1000, Math.random() * 100 ])
      }
      for (let i = 0; i < 24; i++) {
        vm.fakeDatas.year.push([ endTimespan - i * 15 * 24 * 60 * 60 * 1000, Math.random() * 100 ])
      }
    }
    fakingDatas()
    this.myChart = echarts.init(document.getElementById('echart-container'))
    this.initData()
  },
  methods: {
    btnTypeBy (fk) {
      return fk === this.filterKey ? 'primary' : ''
    },
    filter (fk) {
      this.filterKey = fk
      this.refreshData(this.fakeDatas[this.filterKey])
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
        // title: {
        //   text: '总算力图表',
        //   subtext: ''
        // },
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
            data: this.fakeDatas[this.filterKey],
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
    }
  }
}
</script>

<style scoped>
  .flex-center {
    display: flex;
    justify-content: center;
  }
  .echart-container {
    width: 96%;
    height: 450px;
  }
  .chart-title {
    width: 96%;
    padding-bottom: 4px;
    margin: 0 auto 20px;
    border-bottom: 1px solid #e4e7ed;
    font-size: 16px;
  }
  .chart-select-time {
    margin-left: 2%;
  }
</style>
