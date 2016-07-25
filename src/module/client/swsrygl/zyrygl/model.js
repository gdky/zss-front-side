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
const autoform2 = {
   colGroupNum: 2,
  props: [
    {
 id:'xm',
 name: '姓名：',required:true }, 
    {
 id:'dwmc',
 name: '所属机构：',required:true }, 
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
 name: '出资额（万元）：',type: 'number' }, 
    {
 id:'fqr_dm',
 name: '是否发起人：',inputType:'is',type: 'number' }, 
    {
 id:'rydazt',
 name: '人事档案状态：', }, 
    
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

const props={
    'xm': '姓名',
    'dwmc': '所属机构',
    'CS_DM':  '所在城市',
    'XB_DM':  '性别',
    'MZ_DM':  '民族',
    'csny':  '出生年月',
    'XL_DM':  '学历',
    'sfzh':  '身份证号码',
    'ZZMM_DM': '政治面貌',
    'txdz': '通讯地址',
    'yddh':  '移动电话',
    'yzbm': '邮政编码',
    'ZW_DM':  '职务（职称）',
    'dhhm':  '电话号码',
    'byyx':  '毕业院校',
    'zyzgzsbh':  '执业资格证书编号',
    'bysj': '毕业时间',
    'qfrq':  '执业资格证书签发日期',
    'ywkssj': '业务开始时间',
    'zrszyzsbh': '执业注册（备案）编号',
    'zyzcrq': '执业注册日期',
    'grhybh': '个人会员注册号',
    'rhsj': '入会时间',
    'czr_dm': '是否出资人',
    'cze': '出资额（万元）',
    'fqr_dm': '是否发起人',
    'rydazt': '人事档案状态',
    
  }
  const dzb = {
    'CS_DM':{
        '-1':'直属',
         '1':'广州市', 
         '2':'珠海市', 
         '3':'汕头市', 
         '4':'韶关市',
          '5':'佛山市', 
          '6':'江门市', 
          '7':'湛江市', 
          '8':'茂名市', 
          '9':'肇庆市',
           '10':'惠州市', 
           '11':'梅州市', 
           '12':'汕尾市', 
           '13':'河源市',
            '14':'阳江市', 
            '15':'清远市', 
            '16':'东莞市', 
            '17':'中山市', 
            '18':'潮州市', 
            '19':'揭阳市', 
            '20':'云浮市', 
            '89742924':'深圳市',
    },
    'XB_DM': {
        '1':'男',
        '2':'女',
    },
    'MZ_DM': {
'1':'汉族',
'2':'回族',
'3':'阿昌族',
'4':'白族',
'5':'保安族',
'6':'布朗族',
'7':'布依族',
'8':'朝鲜族',
'9':'傣族',
'10':'侗族',
'11':'德昂族',
'12':'独龙族',
'13':'东乡族',
'14':'达斡尔族',
'15':'鄂伦春族',
'16':'俄罗斯族',
'17':'鄂温克族',
'18':'仡佬族',
'19':'高山族',
'20':'哈尼族',
'21':'哈萨克族',
'22':'赫哲族',
'23':'京族',
'24':'基诺族',
'25':'柯尔克孜族',
'26':'黎族',
'27':'珞巴族',
'28':'拉祜族',
'29':'景颇族',
'30':'僳僳族',
'31':'满族',
'32':'苗族',
'33':'门巴族',
'34':'蒙古族',
'35':'仫佬族',
'36':'毛南族',
'37':'怒族',
'38':'纳西族',
'39':'普米族',
'40':'羌族',
'41':'畲族',
'42':'水族',
'43':'撒拉族',
'44':'土族',
'45':'土家族',
'46':'塔吉克族',
'47':'塔塔尔族',
'48':'佤族',
'49':'维吾尔族',
'50':'乌孜别克族',
'51':'锡伯族',
'52':'瑶族',
'53':'彝族',
'54':'裕固族',
'55':'藏族',
'56':'壮族',

    },
    'XL_DM': {
        '1':'男',
        '2':'女',
    }
  }

const model = {
  autoform:autoform,
  autoform2:autoform2,
  pageSetting:pageSetting,
  columnsZyrybgjl:columnsZyrybgjl,
  columnsZyrynjjl:columnsZyrynjjl,
  ryjl:ryjl,
   bgmc:{props:props,
     dzb:dzb,}
} 
module.exports = model