import React from 'react'
import {  DatePicker,Modal,Form, Input, Select,Table, Icon,Tabs,Button,Row,Col,message }from 'antd'
const data = {
   colGroupNum: 2,
  props: [
    {
 id:'dwmc',
 name: '单位名称：', required:true,disabled:true,}, 
    {
 id:'isgz',
 name: '是否改制：', required:true,inputType:'isgz',type: 'number'}, 
    {
 id:'csdm',
 name: '所在城市：',required:true, inputType:'cs',type: 'number' }, 
    {
 id:'fddbr',
 name:  '法定代表人：',required:true, }, 
    {
 id:'dzhi',
 name:  '办公地址：',required:true, }, 
  {
 id:'zsbh',
 name: '证书编号：',required:true, }, 
     {
 id:'swsxz',
 name: '机构性质：',required:true,inputType:'jgxz',type: 'number' }, 
    {
 id:'zczj',
 name:  '注册资金（万元）：',required:true, }, 
     {
 id:'zcdz',
 name:  '注册地址：',required:true, }, 
    {
 id:'yzbm',
 name: '邮政编码：', }, 
    {
 id:'czhen',
 name:  '传真：',}, 
    {
 id:'dhua',
 name: '电话：',required:true, }, 
     {
 id:'khh',
 name: '开户行：', }, 
    {
 id:'khhzh',
 name: '开户行帐号：', }, 
      {
 id:'yyzzhm',
 name: '营业执照号码：', }, 
    {
 id:'jyfw',
 name: '经营范围：', }, 
    {
 id:'swdjhm',
 name: '税务登记号码：', }, 
     {
 id:'jgdmzh',
 name: '机构代码证号：', }, 
    {
 id:'szyx',
 name:  '所长邮箱：', }, 
     {
 id:'szphone',
 name: '所长手机：',}, 
    {
 id:'txyxming',
 name:  '通讯员姓名：', }, 
    {
 id:'xtyyx',
 name:  '通讯员邮箱：',}, 
    {
 id:'xtyphone',
 name:  '通讯员手机：', }, 
    {
 id:'dzyj',
 name: '电子邮件：', }, 
    {
 id:'gszzh',
 name: '工商执照号：', },   
 {
 id:'gsyhmcbh',
 name: '工商预核名称编号：', }, 
    {
 id:'yhdw',
 name: '预核单位：', }, 
    {
 id:'yhsj',
 name: '预核时间：',inputType:'date',type: 'date' }, 
    {
 id:'gzbh',
 name: '公证编号：', }, 
    {
 id:'gzdw',
 name: '公证单位：', }, 
    {
 id:'gzry',
 name: '公证员：', }, 
    {
 id:'gzsj',
 name: '公证时间：',inputType:'date',type: 'date' }, 
    {
 id:'yzbh',
 name: '验资编号：', }, 
    {
 id:'yzdw',
 name: '验资单位：', }, 
    {
 id:'yzry',
 name: '验资人员：', }, 
    {
 id:'yzsj',
 name: '验资时间：',inputType:'date',type: 'date' }, 

     {
 id:'sjlzxsbwh',
 name:  '省管理中心上报文号：',}, 
     {
 id:'sglzxsbsj',
 name:  '省管理中心上报时间：',inputType:'date',type: 'date' }, 
     {
 id:'zjpzwh',
 name: '总局批准文号：', }, 
    {
 id:'zjpzsj',
 name:  '总局批准时间：',inputType:'date',type: 'date' }, 
    {
 id:'fj',
 name: '附件：', }, 
    {
 id:'jbqk',
 name: '情况简介：',
 groupspan: 2,
 inputType: 'textarea',
  span:15,
  rows:3 }, 
    {
 id:'glzd',
 name: '事务所内部管理制度：',
  groupspan: 2,
 inputType: 'textarea',
    span:15,
    rows:3}, 
    {
 id:'gddh',
 name: '第一次股东会决议：',groupspan: 2,inputType: 'textarea',
        span:15,
        rows:3 }, 
    {
 id:'bgcszczm',
 name: '办公场所的产权或使用权证明：', groupspan: 2,inputType: 'textarea',
        span:15,
        rows:3}, 
    
  ]
}

const nbjgsz = {
rowNum:5,
startCol:3,
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
  data:data,
  nbjgsz:nbjgsz,
} 
module.exports = model