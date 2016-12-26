import React from 'react'

const props={
    'dwmc': '单位名称',
    'csdm': '所在城市',
    'fddbr':  '法定代表人',
    'dzhi':  '办公地址',
    'sjlzxsbwh':  '省管理中心上报文号',
    'zcdz':  '注册地址',
    'sglzxsbsj':  '省管理中心上报时间',
    'zjpzsj':  '总局批准时间',
    'yzbm': '邮政编码',
    'zjpzwh': '总局批准文号',
    'czhen':  '传真',
    'dhua': '电话',
    'szyx':  '所长邮箱',
    'txyxming':  '通讯员姓名',
    'xtyyx':  '通讯员邮箱',
    'xtyphone':  '通讯员手机',
    'zsbh': '证书编号',
    'zczj':  '注册资金',
    'jyfw': '经营范围',
    'zrs': '总人数',
    'jgxzdm': '机构性质',
    'szphone': '所长手机',
    'gsyhmcbh': '工商预核名称编号',
    'dzyj': '电子邮件',
    'yhdw': '预核单位',
    'yhsj': '预核时间',
    'gzbh': '公证编号',
    'gzdw': '公证单位',
    'gzry': '公证员',
    'gzsj': '公证时间',
    'yzbh': '验资编号',
    'yzdw': '验资单位',
    'yzry': '验资人员',
    'yzsj': '验资时间',
    'tthybh': '团体会员注册号',
    'rhsj': '入会时间',
    'khh': '开户行',
    'khhzh': '开户行帐号',
    'fj': '附件',
    'swdjhm': '税务登记号码',
    'jbqk': '情况简介',
    'glzd': '事务所内部管理制度', 
    'gddh': '第一次股东会决议',
    'bgcszczm': '办公场所的产权或使用权证明', 
    'wangzhi':'事物所网址',
    'yyzzhm':'营业执照号',
    'jgdmzh':'机构代码证号',
    'clsj':'成立时间',
  }
  const dzb = {
    'csdm':{
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
    'jgxzdm': {
        '1':'合伙事务所',
        '2':'有限公司',
        '3':'无',
    }
  }
  const nbjgsz = {
rowNum:5,
rows:[{ //设定列
  title: '部门名称', //设定该列名称
  dataIndex: 'BMMC', //设定该列对应后台字段名

}, {
  title: '基本职能',
  dataIndex: 'JBZN',
}, {
  title: '人数',
  dataIndex: 'RS',
  width:'200px',
}]}
  const model = {
  props:props,
  dzb:dzb,
  nbjgsz:nbjgsz,
} 

  module.exports = model