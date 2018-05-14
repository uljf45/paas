<template>
  <div class="flex-center">
    <div id="echart-container" class="flex-center" style="width: 90%; height: 450px;">

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'HashrateSpline',
  mounted () {
    this.myChart = echarts.init(document.getElementById('echart-container'))
    this.initData()
  },
  methods: {
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
      this.sevenDate = []
      // this.sevenDate[0] = [[1525869615000 - 365 * 24 * 60 * 60 * 1000, 20], [1525870515000, 527.65], [1525871415000, 67.55], [1525872315000, 469.12]]
      this.sevenDate[0] = [[1525869615000, 20], [1525870515000, 527.65], [1525871415000, 67.55], [1525872315000, 469.12]]
      this.sevenDate[1] = [[1525869615000, 4], [1525870515000, 527.65], [1525871415000, 67.55], [1525872315000, 469.12]]
      this.sevenDate[2] = [[1525869615000, 5], [1525870515000, 527.65], [1525871415000, 67.55], [1525872315000, 469.12]]
      this.sevenDate[3] = [[1525869615000, 6], [1525870515000, 527.65], [1525871415000, 67.55], [1525872315000, 469.12]]
      const colors = ['#5793f3', '#675bba', '#d14a61']
      const option = {
        color: colors,
        title: {
          text: '算力图表',
          subtext: ''
        },
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
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['bar', 'line']},
            restore: {}
          }
        },
        xAxis: {
          type: 'time',
          data: this.sevenDay,
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
            data: this.sevenDate[0],
            yAxisIndex: 0,
            symbol: 'emptyCircle',
            symbolSize: 4,
            itemStyle: {
              normal: {
                color: '#5793f3',
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#C3DCF3'
                  }, {
                    offset: 1,
                    color: '#fff'
                  }])
                },
                lineStyle: {
                  color: '#5793f3',
                  width: '2'
                }
              },
              emphasis: {
                color: '#5793f3'
              }
            }
          }
        ]
      }
      this.myChart.setOption(option)
    }
  }
}
</script>

<style>
  .flex-center {
    display: flex;
    justify-content: center;
  }
</style>
