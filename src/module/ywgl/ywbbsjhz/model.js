import React from 'react'

const columnsHz = [
  { title: '人员', dataIndex: 'ry', key: 'ry', width: "120" },
  { title: '企业技术开发费加计扣除鉴证', dataIndex: 'jskf', key: 'jskf' },
  { title: '企业所得税税前扣除鉴证', dataIndex: 'sqkc', key: 'sqkc' },
  { title: '企业所得税汇算清缴鉴证', dataIndex: 'qyhsqj', key: 'qyhsqj' },
  { title: '土地增值税鉴证', dataIndex: 'td', key: 'td' },
  { title: '房地产涉税调整鉴证', dataIndex: 'fdc', key: 'fdc' },
  { title: '其它鉴证', dataIndex: 'qt', key: 'qt' },
  { title: '高新技术企业认定专项鉴证', dataIndex: 'gxjs', key: 'gxjs' },
  { title: '企业注销税务登记税款清算鉴证', dataIndex: 'zx', key: 'zx' },
  { title: '企业变更税务登记税款清算鉴证', dataIndex: 'bg', key: 'bg' },
  { title: '个人所得税汇算清缴鉴证', dataIndex: 'grhsqj', key: 'grhsqj' }
];

const columnsSws = [
  { title: '序号', dataIndex: 'xh', key: 'xh', width:'50' },
  { title: '事务所名称', dataIndex: 'swsmc', key: 'swsmc', width: "230" },
  { title: '企业名称', dataIndex: 'wtdw', key: 'wtdw', width: "230" },
  { title: '税务登记证号', dataIndex: 'swsswdjzh', key: 'swsswdjzh', width: "120" },
  { title: '业务发生地', dataIndex: 'fsd', key: 'fsd', width: "80" },
  { title: '报告文号', dataIndex: 'bgwh', key: 'bgwh', width: "230" },
  { title: '报备号码', dataIndex: 'bbhm', key: 'bbhm', width: "120" },
  { title: '一级复核', dataIndex: 'yjfh', key: 'yjfh', width: "80" },
  { title: '二级复核', dataIndex: 'rjfh', key: 'rjfh', width: "80" },
  { title: '三级复核', dataIndex: 'sjfh', key: 'sjfh', width: "80" },
  { title: '签名注册税务师', dataIndex: 'qzsws', key: 'qzsws', width: "120" },
  { title: '协议收费金额', dataIndex: 'xyje', key: 'xyje', width: "120" },
  { title: '实际收费金额', dataIndex: 'sjsqje', key: 'sjsqje', width: "120" },
  { title: '报备时间', dataIndex: 'bbrq', key: 'bbrq', width: "120" },
  { title: '纳税调整增加额', dataIndex: 'tzvalue1', key: 'tzvalue1', width: "120" },
  { title: '纳税调整减少额', dataIndex: 'tjvalue2', key: 'tjvalue2', width: "120" },
];

const columnsWs = [
  { title: '序号', dataIndex: 'xh', key: 'xh', width:'50' },
  { title: '事务所名称', dataIndex: 'swsmc', key: 'swsmc', width:'230' },
  { title: '企业名称', dataIndex: 'wtdw', key: 'wtdw', width:'230' },
  { title: '税务登记证号', dataIndex: 'swsswdjzh', key: 'swsswdjzh', width:'120' },
  { title: '业务发生地', dataIndex: 'fsd', key: 'fsd', width:'80' },
  { title: '报告文号', dataIndex: 'bgwh', key: 'bgwh', width:'230' },
  { title: '报备号码', dataIndex: 'bbhm', key: 'bbhm', width:'120' },
  { title: '一级复核', dataIndex: 'yjfh', key: 'yjfh', width:'80' },
  { title: '二级复核', dataIndex: 'rjfh', key: 'rjfh', width:'80' },
  { title: '三级复核', dataIndex: 'sjfh', key: 'sjfh', width:'80' },
  { title: '签名注册税务师', dataIndex: 'qzsws', key: 'qzsws', width:'120' },
  { title: '协议收费金额', dataIndex: 'xyje', key: 'xyje', width:'120' },
  { title: '实际收费金额', dataIndex: 'sjsqje', key: 'sjsqje', width:'120' },
  { title: '报备时间', dataIndex: 'bbrq', key: 'bbrq', width:'120' } 
];

const columnsJe = [
  { title: '序号', dataIndex: 'xh', key: 'xh' },
  { title: '事务所名称', dataIndex: 'swsmc', key: 'swsmc' },
  { title: '协议收费金额', dataIndex: 'xyje', key: 'xyje',className: 'column-center'},
  { title: '实际收费金额', dataIndex: 'sjsqje', key: 'sjsqje',className: 'column-center'}
];


const ywlx = [
  {'id':1,"mc":'企业技术开发费加计扣除鉴证'}, 
  {'id':2,"mc":'企业所得税税前扣除鉴证'},
  {'id':3,"mc":'企业所得税汇算清缴鉴证'},
  {'id':4,"mc":'土地增值税鉴证'},
  {'id':5,"mc":'房地产涉税调整鉴证'}, 
  {'id':6,"mc":'其它鉴证'},
  {'id':7,"mc":'高新技术企业认定专项鉴证'},
  {'id':8,"mc":'企业注销税务登记税款清算鉴证'}, 
  {'id':9,"mc":'企业变更税务登记税款清算鉴证'},
  {'id':10,"mc":'个人所得税汇算清缴鉴证'}
];

const cs=[
    {"id": -1, "mc": "直属"},
    {"id": 1, "mc": "广州市"},
    {"id": 2, "mc": "珠海市"},
    {"id": 3, "mc": "汕头市"},
    {"id": 4, "mc": "韶关市"},
    {"id": 5, "mc": "佛山市"},
    {"id": 6, "mc": "江门市"},
    {"id": 7, "mc": "湛江市"},
    {"id": 8, "mc": "茂名市"},
    {"id": 9, "mc": "肇庆市"},
    {"id": 10, "mc": "惠州市"},
    {"id": 11, "mc": "梅州市"},
    {"id": 12, "mc": "汕尾市"},
    {"id": 13, "mc": "河源市"},
    {"id": 14, "mc": "阳江市"},
    {"id": 15, "mc": "清远市"},
    {"id": 16, "mc": "东莞市"},
    {"id": 17, "mc": "中山市"},
    {"id": 18, "mc": "潮州市"},
    {"id": 19, "mc": "揭阳市"},
    {"id": 20, "mc": "云浮市"},
    {"id": 89742924, "mc": "深圳市"}
];

const model = {
  columnsHz: columnsHz,
  columnsSws: columnsSws,
  columnsWs:columnsWs,
  columnsJe:columnsJe,
  ywlx: ywlx,
  cs:cs
}
module.exports = model