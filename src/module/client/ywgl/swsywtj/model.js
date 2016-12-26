import React from 'react'

const columnsDetail = [
  { title: '序号', dataIndex: 'xh', key: 'xh', width:'50' },
  { title: '企业名称', dataIndex: 'wtdw', key: 'wtdw', width: "230" },
  { title: '税务登记证号', dataIndex: 'swsswdjzh', key: 'swsswdjzh', width: "120" },
  { title: '业务发生地', dataIndex: 'fsd', key: 'fsd', width: "80" },
  { title: '报告文号', dataIndex: 'bgwh', key: 'bgwh', width: "230" },
  { title: '一级复核', dataIndex: 'yjfh', key: 'yjfh', width: "80" },
  { title: '二级复核', dataIndex: 'rjfh', key: 'rjfh', width: "80" },
  { title: '三级复核', dataIndex: 'sjfh', key: 'sjfh', width: "80" },
  { title: '签名注册税务师', dataIndex: 'qzsws', key: 'qzsws', width: "120" },
  { title: '税别', dataIndex: 'sb', key: 'sb', width: "80" },
  { title: '主管税务机关', dataIndex: 'zgswjg', key: 'zgswjg', width: "120" },
  { title: '协议收费金额', dataIndex: 'xyje', key: 'xyje', width: "120" },
  { title: '收费金额', dataIndex: 'sjsqje', key: 'sjsqje', width: "120" },
  { title: '报备时间', dataIndex: 'bbrq', key: 'bbrq', width: "120" },
  { title: '纳税调整增加额', dataIndex: 'tzvalue1', key: 'tzvalue1', width: "120" },
  { title: '纳税调整减少额', dataIndex: 'tjvalue2', key: 'tjvalue2', width: "120" },
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

const model = {
  columnsDetail: columnsDetail,
  ywlx:ywlx
}
module.exports = model