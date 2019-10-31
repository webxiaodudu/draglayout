<template>
  <div ref="piewrap"
       class="wrap">

  </div>
</template>
<script>
import Echarts from 'echarts'
export default {
  name: 'PieEcharts',
  data () {
    return {
      option: {
        baseOption: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
              ]
            }
          ]
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
                  radius: ['30%','50%'],
                  center: ['50%', '50%']
                }
              ]
            }
          }

        ]
      },
      oPie: null
    }
  },
  mounted () {

    this.oPie = Echarts.init(this.$refs.piewrap);
    this.oPie.setOption(this.option)

  }
}
</script>
<style scoped>
.wrap {
  width:100%;
  height:300px;
}
</style>