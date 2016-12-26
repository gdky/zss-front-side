import React from 'react'
const columns = [{ //设定列
  title: '序号', //设定该列名称
  dataIndex: 'key', //设定该列对应后台字段名
  key: 'key', //列key，必须设置，建议与字段名相同
}, {
  title: '姓名',
  dataIndex: 'XMING',
  key: 'XMING',
  sorter: true,
}, {
  title: '注册证书号',
  dataIndex: 'ZYZSBH',
  key: 'ZYZSBH',
},{
  title: '原工作单位',
  dataIndex: 'yjg',
  key: 'yjg',
  sorter: true,
},  {
  title: '调入工作单位',
  dataIndex: 'xjg',
  key: 'xjg',
}, {
  title: '调入工作单位地址',
  dataIndex: 'DZHI',
  key: 'DZHI',
}, {
  title: '新单位电话',
  dataIndex: 'DHUA',
  key: 'DHUA',
}, 
];

const autoform = {
   colGroupNum: 2,
  props: [
    {
 id:'xm',
 name: '姓名：', }, 
    {
 id:'dwmc',
 name: '所属机构：', }, 
    {
 id:'cs',
 name: '所在城市：', }, 
    {
 id:'xb',
 name:  '性别：', }, 
    {
 id:'mz',
 name:  '民族：', }, 
    {
 id:'csny',
 name:  '出生年月：', }, 
    {
 id:'xl',
 name:  '学历：', }, 
    {
 id:'sfzh',
 name:  '身份证号码：', }, 
    {
 id:'zzmm',
 name:  '政治面貌：', }, 
    {
 id:'txdz',
 name: '通讯地址：', }, 
    {
 id:'yddh',
 name: '移动电话：', }, 
    {
 id:'yzbm',
 name:  '邮政编码：', }, 
    {
 id:'zw',
 name: '职务（职称）：', }, 
    {
 id:'dhhm',
 name:  '电话号码：', }, 
    {
 id:'byyx',
 name:  '毕业院校：', }, 
    {
 id:'zyzgzsbh',
 name:  '执业资格证书编号：', }, 
    {
 id:'bysj',
 name:  '毕业时间：', }, 
    {
 id:'qfrq',
 name: '执业资格证书签发日期：', }, 
    {
 id:'ywkssj',
 name:  '业务开始时间：', }, 
    {
 id:'zyzsbh',
 name: '执业注册（备案）编号：', }, 
    {
 id:'zyzcrq',
 name: '执业注册日期：', }, 
    {
 id:'grhybh',
 name: '个人会员注册号：', }, 
    {
 id:'rhsj',
 name: '入会时间：', }, 
    {
 id:'czr',
 name: '是否出资人：', }, 
    {
 id:'cze',
 name: '出资额（万元）：', }, 
    {
 id:'fqr',
 name: '是否发起人：', }, 
    {
 id:'rydazt',
 name: '人事档案状态：',groupspan: 2 }, 
    
  ]
}

const pageSetting = { //分页设置
  page: true, //是否分页
  pageSize: 5, //初始化显示记录条数
  showSizeChanger: true, //是否可以改变每页记录条数
  showTotal(total) {
          return "共"+total+"条";
        },//是否显示总条数
  showQuickJumper: true, //是否可以快速跳转至某页
  size: 'small', //分页样式，当为「small」时，是小尺寸分页
  pageSizeOptions: ['5', '10', '20', '30', '40'], //指定每页可以显示多少条，与showSizeChanger配合使用
  current:1,
}

const columnsZyrybgjl = [{ //设定列
  title: '变更名称', //设定该列名称
  dataIndex: 'bgmc', //设定该列对应后台字段名
  key: 'bgmc', //列key，必须设置，建议与字段名相同
}, {
  title: '旧值',
  dataIndex: 'jzhi',
  key: 'jzhi',
 
}, {
  title: '新值',
  dataIndex: 'xzhi',
  key: 'xzhi',

},{
  title: '更新时间',
  dataIndex: 'gxsj',
  key: 'gxsj',

},]
const columnsZyryzsjl = [{ //设定列
  title: '审批状态', //设定该列名称
  dataIndex: 'spztmc', //设定该列对应后台字段名
  key: 'spztmc', //列key，必须设置，建议与字段名相同
}, {
  title: '本人意见',
  dataIndex: 'bryj',
  key: 'bryj',
 
}, {
  title: '原单位意见',
  dataIndex: 'ydwyj',
  key: 'ydwyj',

},{
  title: '填报时间',
  dataIndex: 'tbrq',
  key: 'tbrq',

},]
const columnsZyryzjjl = [{ //设定列
  title: '审批状态', //设定该列名称
  dataIndex: 'spztmc', //设定该列对应后台字段名
  key: 'spztmc', //列key，必须设置，建议与字段名相同
}, {
  title: '转籍原因',
  dataIndex: 'zjyj',
  key: 'zjyj',
 
}, {
  title: '单位意见',
  dataIndex: 'dwyj',
  key: 'dwyj',

},{
  title: '填报日期',
  dataIndex: 'tbrq',
  key: 'tbrq',

},]

const columnsZyryzzjl = [{ //设定列
  title: '转执申请', //设定该列名称
  dataIndex: 'zzsq', //设定该列对应后台字段名
  key: 'zzsq', //列key，必须设置，建议与字段名相同
}, {
  title: '单位意见',
  dataIndex: 'dwyj',
  key: 'dwyj',
 
}, {
  title: '填报日期',
  dataIndex: 'tbrq',
  key: 'tbrq',

},{
  title: '审批日期',
  dataIndex: 'spsj',
  key: 'spsj',
  

},]
const columnsZyrynjjl = [{ //设定列
  title: '年检年度', //设定该列名称
  dataIndex: 'nd', //设定该列对应后台字段名
  key: 'nd', //列key，必须设置，建议与字段名相同
}, {
  title: '所属机构',
  dataIndex: 'dwmc',
  key: 'dwmc',
 
}, {
  title: '负责人意见',
  dataIndex: 'swsfzryj',
  key: 'swsfzryj',

},{
  title: '年检状态',
  dataIndex: 'njzt',
  key: 'njzt',

},{
  title: '审批日期',
  dataIndex: 'spsj',
  key: 'spsj',

},]

const ryjl = [{ //设定列
  title: '起止年月', //设定该列名称
  dataIndex: 'qzny', //设定该列对应后台字段名
  key: 'qzny', //列key，必须设置，建议与字段名相同
}, {
  title: '何时何地单位工作学习及职称（职务）',
  dataIndex: 'xxxx',
  key: 'xxxx',
 
}, {
  title: '证明人',
  dataIndex: 'zmr',
  key: 'zmr',

}]

const model = {
  columns:columns,
  autoform:autoform,
  pageSetting:pageSetting,
  columnsZyrybgjl:columnsZyrybgjl,
  columnsZyryzsjl:columnsZyryzsjl,
  columnsZyryzjjl:columnsZyryzjjl,
  columnsZyryzzjl:columnsZyryzzjl,
  columnsZyrynjjl:columnsZyrynjjl,
  ryjl:ryjl,
} 
module.exports = model