import React from 'react'
const columns = [{ //设定列
  title: '序号', //设定该列名称
  dataIndex: 'key', //设定该列对应后台字段名
  key: 'key', //列key，必须设置，建议与字段名相同
}, {
  title: '机构名称',
  dataIndex: 'dwmc',
  key: 'dwmc',
}, {
  title: '组织形式',
  dataIndex: 'jgxz',
  key: 'jgxz',
}, {
  title: '法定代表人（所长/负责人）姓名',
  dataIndex: 'fddbr',
  key: 'fddbr',
},{
  title: '股东人数',
  dataIndex: 'gdrs',
  key: 'gdrs',
},  {
  title: '合伙人数',
  dataIndex: 'hhrs',
  key: 'hhrs',
}, {
  title: '人员总数',
  dataIndex: 'zrs',
  key: 'zrs',
}, {
  title: '执业注册税务师人数',
  dataIndex: 'zyrs',
  key: 'zyrs',
}, {
  title: '注册资金',
  dataIndex: 'zczj',
  key: 'zczj',
}, {
  title: '运营资金',
  dataIndex: 'yyzj',
  key: 'yyzj',
}, {
  title: '资产总额',
  dataIndex: 'zcze',
  key: 'zcze',
}, {
  title: '收入总额',
  dataIndex: 'srze',
  key: 'srze',
}, {
  title: '利润总额',
  dataIndex: 'lrze',
  key: 'lrze',
}, {
  title: '机构所在地',
  dataIndex: 'szd',
  key: 'szd',
}, {
  title: '委托人户数',
  dataIndex: 'wtrhs',
  key: 'wtrhs',
}
];

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

const model = {
  columns:columns,
  pageSetting:pageSetting
} 
module.exports = model