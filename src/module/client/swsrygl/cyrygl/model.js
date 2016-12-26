import React from 'react'
const autoformCy = {
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
 id:'xzsngzgw',
 name:  '工作岗位：', }, 
    {
 id:'bysj',
 name:  '毕业时间：', }, 
    {
 id:'lrsj',
 name: '录入时间：', }, 
    {
 id:'swdlywkssj',
 name:  '代理业务开始时间：', }, 
    {
 id:'zgxlzymc',
 name: '最高学历专业名称：', }, 
    {
 id:'zgxlfzjgjsj',
 name: '最高学历发证机关及时间：', }, 
    {
 id:'rydazt',
 name: '人事档案状态：', }, 
  ]
}
const autoformCy2 = {
   colGroupNum: 2,
  props: [
    {
 id:'xm',
 name: '姓名：',required:true }, 
    {
 id:'CS_DM',
 name: '所在城市：',inputType:'cs',required:true,type: 'number' }, 
    {
 id:'XB_DM',
 name:  '性别：',inputType:'xb',required:true,
  type: 'number' }, 
    {
 id:'MZ_DM',
 name:  '民族：',inputType:'mz',required:true,
  type: 'number'
 }, 
    {
 id:'csny',
 name:  '出生年月：',inputType:'date',type: 'date',required:true, }, 
    {
 id:'XL_DM',
 name:  '学历：',inputType:'xl',required:true, 
 type: 'number' }, 
    {
 id:'sfzh',
 name:  '身份证号码：',required:true }, 
    {
 id:'ZZMM_DM',
 name:  '政治面貌：',inputType:'zzmm', required:true,
 type: 'number'  }, 
    {
 id:'txdz',
 name: '通讯地址：',required:true, }, 
    {
 id:'yddh',
 name:<span><p>移动电话：</p><p>（格式：13888888888）</p></span>, }, 
    {
 id:'yzbm',
 name:  '邮政编码：',required:true }, 
    {
 id:'ZW_DM',
 name: '职务（职称）：',inputType:'zw',type: 'number',required:true, }, 
    {
 id:'dhhm',
 name: <span><p>电话号码：</p><p>（格式：027-888888）</p></span> , }, 
    {
 id:'byyx',
 name:  '毕业院校：', }, 
    {
 id:'xzsngzgw',
 name:  '所内工作岗位：',required:true, }, 
    {
 id:'bysj',
 name:  '毕业时间：',inputType:'date',type: 'date',required:true }, 
    {
 id:'lrsj',
 name: '录入时间：', inputType:'date',type: 'date'}, 
    {
 id:'swdlywkssj',
 name:  '税务代理业务开始时间：', inputType:'date',type: 'date'}, 
    {
 id:'zgxlzymc',
 name: '最高学历专业名称：', }, 
    {
 id:'zgxlfzjgjsj',
 name: '最高学历发证机关及时间：',required:true }, 
    {
 id:'rydazt',
 name: '人事档案状态：',width:'50%',groupspan: 2 }, 
  ]
}
const autoform2 = {
   colGroupNum: 1,
props: [
    {   id:'FZYSQ',
        name:  '转执原因：',
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
    {   id:'ZXYY_DM',
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
    {   id:'DZYY',
        name:  '调出原因：',
        required:true,
    },{   id:'BDRQ',
        name:  '调出日期：',
        inputType:'date',
        required:true,
        type: 'date' 
    },{  id:'SWSYJ',
        name: '事务所意见：',
        inputType: 'textarea',
        rows:3
    },{   id:'DRDW',
        name:  '调入单位：',
    }, 
]};
const autoform6 = {
   colGroupNum: 1,
props: [
    {   id:'XJG_ID',
        name:  '新事务所名称：',
        required:true,
    },
   ,{  id:'YSWSYJ',
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

const ryjl = {
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
const autoformba = {
   colGroupNum: 2,
  props: [
    {
 id:'xm',
 name: '姓名：',required:true,disabled:true }, 
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
 name:  '身份证号码：',required:true,disabled:true }, 
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
const model = {
  autoformCy:autoformCy,
  autoformCy2:autoformCy2,
    autoform2:autoform2,
  autoform3:autoform3,
  autoform4:autoform4,
  autoform6:autoform6,
  pageSetting:pageSetting,
  autoformba:autoformba,
  columnsZyrybgjl:columnsZyrybgjl,
  ryjl:ryjl,
} 
module.exports = model