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
    initData () {
      this.sevenDate = []
      this.sevenDate[0] = [[1525869615000 - 365 * 24 * 60 * 60 * 1000, 20], [1525870515000, 527.65], [1525871415000, 67.55], [1525872315000, 469.12]]
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
          trigger: 'axis'
        },
        legend: {
          data: ['新注册用户', '新增订单', '新增管理员']
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
          boundaryGap: false,
          data: this.sevenDay
        },
        yAxis: [
          {
            type: 'value',
            name: '用户',
            min: 0,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '订单',
            min: 0,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '新注册用户',
            type: 'line',
            smooth: true,
            data: this.sevenDate[0],
            yAxisIndex: 1,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            }
          },
          {
            name: '新增订单',
            type: 'line',
            smooth: true,
            data: this.sevenDate[1],
            yAxisIndex: 1,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            }
          },
          {
            name: '新增管理员',
            type: 'line',
            smooth: true,
            data: this.sevenDate[2],
            yAxisIndex: 1,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
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
  .chart-container {
    display: flex;
    justify-content: center;
  }
</style>
