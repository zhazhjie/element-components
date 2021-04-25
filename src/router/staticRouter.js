/**
 * @author: zzj
 * @date: 2019-09-17 17:57:11
 * @version: 1.0
 */
export default [
  {
    path: '/help/tableTempDoc',
    meta: {
      icon: "icon-save",
      name: '表格模版文档'
    },
    component: (resolve) => require(['@/views/help/tableTempDoc'], resolve),
  },
  {
    path: '/help/demo2',
    meta: {
      icon: "icon-save",
      name: '表格模版文档2.0'
    },
    component: (resolve) => require(['@/views/help/tableTempDoc/demo2'], resolve),
  },
  {
    path: '/help/richText',
    meta: {
      icon: "icon-align-left",
      name: '富文本'
    },
    component: (resolve) => require(['@/views/help/richText'], resolve),
  },
  {
    path: '/help/imgClipTest',
    meta: {
      icon: "icon-swap",
      name: '图片裁切'
    },
    component: (resolve) => require(['@/views/help/imgClipTest'], resolve),
  },
]
