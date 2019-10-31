<template>
  <div ref="wrap"
       class="wrap">

  </div>
</template>
<script >
import Echarts from 'echarts'

export default {
  name: 'BarEcharts',
  data () {
    return {
      option: {
        baseOption: {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],

          }]

        },
        media: [
          {
            option: {
              legend: {
                right: 'center',
                bottom: 0,
                orient: 'horizontal'
              },
              series: [
                {
                  radius: [20, '50%'],
                  center: ['25%', '50%']
                }
              ]
            }
          }

        ]

      },
      oBar: null
    }

  },
  mounted () {

    this.oBar = Echarts.init(this.$refs.wrap);
    this.oBar.setOption(this.option)

  }
}
</script>
<style scoped>
.wrap {
  width:100%;
  height:300px;
}
</style>