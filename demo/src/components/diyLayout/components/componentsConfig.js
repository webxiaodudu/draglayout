/**
 * auther:LiWen.Zhang
 * data:2019/10/17
 * descript:components list config
 */

export const basicComponents = [
  {
    id: 0,
    type: 'Table',
    name: '表格',
    active: false,
  },
  {
    id: 1,
    type: 'DataPicker',
    name: '日期选择器',
    active: false,
  },
  {
    id: 2,
    type: 'Pagegation',
    name: '分页',
    active: false,
  },
  {
    id: 3,
    type: 'Calender',
    name: '日历',
    active: false,
  },
  {
    id: 4,
    type: 'ElRate',
    name: '评分组件',
    active: false,
  }
 
]

export const layoutComponents = [
  {
    id: 0,
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
  },
  {
    id: 1,
    type: 'ElDivider',
    name: '分割线',
    active: false,
  },
]
