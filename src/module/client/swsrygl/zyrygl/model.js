import React from 'react'

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
 name: '所在城市：',
 inputType:'cs',
 }, 
    {
 id:'xb',
 name:  '性别：', }, 
    {
 id:'mz',
 name:  '民族：', 
inputType:'mz',}, 
    {
 id:'csny',
 name:  '出生年月：',
 inputType:'date', }, 
    {
 id:'xl',
 name:  '学历：', 
inputType:'xl',}, 
    {
 id:'sfzh',
 name:  '身份证号码：', }, 
    {
 id:'zzmm',
 name:  '政治面貌：', 
inputType:'zzmm',}, 
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
 name: '人事档案状态：', }, 
    
  ]
}
const autoform1 = {
   colGroupNum: 2,
  props: [
    {
 id:'xm',
 name: '姓名：',required:true }, 
    {
 id:'CS_DM',
 name: '所在城市：',
 inputType:'cs',required:true,type: 'number'
 }, 
    {
 id:'XB_DM',
 name:  '性别：',inputType:'xb',required:true,
  type: 'number'}, 
    {
 id:'MZ_DM',
 name:  '民族：', 
  inputType:'mz',required:true,
  type: 'number'
}, 
    {
 id:'csny',
 name:  '出生年月：',
 inputType:'date',required:true,type: 'date' }, 
    {
 id:'XL_DM',
 name:  '学历：',
 inputType:'xl', 
 type: 'number'
}, 
    {
 id:'sfzh',
 name:  '身份证号码：',required:true }, 
    {
 id:'ZZMM_DM',
 name:  '政治面貌：',
 inputType:'zzmm', 
 type: 'number' 
}, 
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
 id:'ZW_DM',
 name: '职务（职称）：',  inputType:'zw',required:true,
 type: 'number'  }, 
    {
 id:'dhhm',
 name:  '电话号码：', }, 
    {
 id:'byyx',
 name:  '毕业院校：', }, 
    {
 id:'zyzgzsbh',
 name:  '执业资格证书编号：',required:true }, 
    {
 id:'bysj',
 name:  '毕业时间：', inputType:'date',type: 'date'}, 
    {
 id:'qfrq',
 name: '执业资格证书签发日期：',inputType:'date',required:true,type: 'date' }, 
    {
 id:'ywkssj',
 name:  '业务开始时间：', inputType:'date',type: 'date'}, 
    {
 id:'zyzsbh',
 name: '执业注册（备案）编号：', }, 
    {
 id:'zyzcrq',
 name: '执业注册日期：',inputType:'date',type: 'date' }, 
    {
 id:'grhybh',
 name: '个人会员注册号：', }, 
    {
 id:'rhsj',
 name: '入会时间：', inputType:'date',type: 'date'}, 
    {
 id:'czr_dm',
 name: '是否出资人：',inputType:'is',type: 'number' }, 
    {
 id:'cze',
 name: '出资额（万元）：',inputType:'number',type: 'number' }, 
    {
 id:'fqr_dm',
 name: '是否发起人：',inputType:'is',type: 'number' }, 
    {
 id:'rydazt',
 name: '人事档案状态：', }, 
    
  ]
}
const autoform2 = {
   colGroupNum: 1,
props: [
    {   id:'FZYSQ',
        name:  '转非原因：',
        inputType: 'textarea',
        rows:2,
        span:10,
        required:true,
    },{  id:'XDWYJ',
        name: '现单位意见：',
        required:true,
        inputType: 'textarea',
        rows:3
    }, 
]};
const autoform3 = {
   colGroupNum: 1,
props: [
    {   id:'ZYSWSZXYY_DM',
        name:  '注销原因：',
        inputType: 'zyzxyy',
        required:true,
        type: 'number' 
    },{   id:'ZXRQ',
        name:  '注销日期：',
        inputType:'date',
        required:true,
        type: 'date' 
    },{  id:'SWSYJ',
        name: '事务所意见：',
        required:true,
        inputType: 'textarea',
        rows:3
    }, 
]};
const autoform4 = {
   colGroupNum: 1,
props: [
    {   id:'drs',
        name:  '调入地区：',
        required:true,
    },{   id:'xjgmc',
        name:  '新机构名称：',
        required:true,
        width:300,
    },{   id:'xjgdh',
        name:  '新机构电话：',
        required:true,
    },{   id:'zjyyrq',
        name:  '转籍原因日期：',
        inputType:'date',
        required:true,
        type: 'date' 
    },{  id:'zjyy',
        name: '转籍原因：',
        required:true,
        inputType: 'textarea',
        rows:3
    }, 
]};
const autoform6 = {
   colGroupNum: 1,
props: [
    {   id:'XJG_ID',
        name:  '新事务所名称：',
        required:true,
    },
    {   id:'ZYSWSYJ',
        name:  '执业税务师意见：',
        inputType: 'textarea',
        rows:3,
        span:10,
        required:true,
    },{   id:'ZYSWSTXRQ',
        name:  '执业税务师意见填写日期：',
        inputType:'date',
        required:true,
        type: 'date' 
    },{  id:'YSWSYJ',
        name: '事务所意见：',
        required:true,
        inputType: 'textarea',
        span:10,
        rows:3
    },{   id:'YSWSYJRQ',
        name:  '事务所意见日期：',
        inputType:'date',
        required:true,
        type: 'date' 
    },{  id:'SZQM',
        name: '所长签名：',
        required:true,
    },{   id:'QMSJ',
        name:  '所长签名日期：',
        inputType:'date',
        required:true,
        type: 'date' 
    }, 
]};
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
const autoformba = {
   colGroupNum: 2,
  props: [
    {
 id:'xm',
 name: '姓名：',required:true }, 
    {
 id:'CS_DM',
 name: '所在城市：',
 inputType:'cs',required:true,type: 'number'
 }, 
    {
 id:'XB_DM',
 name:  '性别：',inputType:'xb',required:true,
  type: 'number'}, 
    {
 id:'MZ_DM',
 name:  '民族：', 
  inputType:'mz',required:true,
  type: 'number'
}, 
    {
 id:'csny',
 name:  '出生年月：',
 inputType:'date',required:true,type: 'date' }, 
    {
 id:'XL_DM',
 name:  '学历：',
 inputType:'xl', 
 type: 'number'
}, 
    {
 id:'sfzh',
 name:  '身份证号码：',required:true }, 
    {
 id:'ZZMM_DM',
 name:  '政治面貌：',
 inputType:'zzmm', 
 type: 'number' 
}, 
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
 id:'ZW_DM',
 name: '职务（职称）：',  inputType:'zw',required:true,
 type: 'number'  }, 
    {
 id:'dhhm',
 name:  '电话号码：', }, 
    {
 id:'byyx',
 name:  '毕业院校：', }, 
    {
 id:'zyzgzsbh',
 name:  '执业资格证书编号：',required:true }, 
    {
 id:'bysj',
 name:  '毕业时间：', inputType:'date',type: 'date'}, 
    {
 id:'qfrq',
 name: '执业资格证书签发日期：',inputType:'date',required:true,type: 'date' }, 
    {
 id:'grhybh',
 name: '个人会员注册号：', }, 
    {
 id:'rhsj',
 name: '入会时间：', inputType:'date',type: 'date'}, 
    {
 id:'rydazt',
 name: '人事档案状态：', }, 
  {
 id:'rslb',
 name: '入所类别：',required:true, inputType:'rslb',type: 'number'}, 
  {
 id:'rslbSM',
 name: '跨省转籍请填写以下信息：', inputType:'unInput',groupspan:2}, 
 {
 id:'DCS',
 name: '原机构所在地：', }, {
 id:'YJGMC',
 name: '原机构名称：', }, {
 id:'YJGDH',
 name: '原机构电话：', }, 
    
  ]
}
const ryjl2 = {
rowNum:6,
startCol:1,
rows:[{ //设定列
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

}]}
const model = {
  autoform:autoform,
  autoform1:autoform1,
  autoform2:autoform2,
  autoform3:autoform3,
  autoform4:autoform4,
  autoform6:autoform6,
  autoformba:autoformba,
  pageSetting:pageSetting,
  columnsZyrybgjl:columnsZyrybgjl,
  columnsZyrynjjl:columnsZyrynjjl,
  ryjl:ryjl,
  ryjl2:ryjl2,
} 
module.exports = model