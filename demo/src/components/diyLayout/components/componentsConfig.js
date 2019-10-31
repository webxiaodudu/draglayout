/**
 * auther:LiWen.Zhang
 * data:2019/10/17
 * descript:components list config
 */

export const basicComponents = [
  {
    id: 0,
    type: 'BarEcharts',
    name: '柱状图',
    active: false,
  },
  {
    id: 1,
    type: 'PieEcharts',
    name: '饼图',
    active: false,
   
  }
]

export const layoutComponents = [
  {
    id: 3,
    type: 'Layout',
    name: '栅格组件',
    active: false,
    isDashed: true,
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top',
      padding: 5
    }
  }
]
