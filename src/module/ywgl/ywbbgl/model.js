/**
 * Created by ming on 2016/4/11.
 */
    import React from 'react'
const model = {
    columns: [{
        title: '序号',
        dataIndex: 'key',
        key: 'key'
    }, {
        title: '年度',
        dataIndex: 'nd',
        key: 'nd',
        width: '60px'
    }, {
        title: '事务所名称',
        dataIndex: 'swsmc',
        key: 'swsmc',
    }, {
        title: '业务发生地',
        key: 'cs',
        dataIndex: 'cs',
    }, {
        title: '业务类型',
        key: 'ywlx',
        dataIndex: 'ywlx',
        width: '100px',
    }, {
        title: '报告文号',
        key: 'bgwh',
        dataIndex: 'bgwh',
    }, {
        title: '协议金额',
        key: 'xyje',
        dataIndex: 'xyje',
    }, {
        title: '实际收取金额',
        key: 'sjsqje',
        dataIndex: 'sjsqje',
    }, {
        title: '报备号码',
        key: 'bbhm',
        dataIndex: 'bbhm',
    }, {
        title: '报备日期',
        key: 'bbrq',
        dataIndex: 'bbrq',
    }, {
        title: '验证码',
        key: 'yzm',
        dataIndex: 'yzm',
    },{
        id: 'caozuo',
        name: '操作',
        render(){
            return <span><a>退回</a></span>
        }
    }],
    entityModel:{
        colGroupNum:2,
        props:[{
            id: 'XYWH',
            name: '协议文号'
        }, {
            id: 'XYH',
            name: '协议报备号码'
        }, {
            id: 'WTDWMC',
            name: '委托单位名称'
        }, {
            id: 'DJHM_GS',
            name: '委托企业国税税务登记证号'
        }, {
            id: 'DJHM_DS',
            name: '委托企业地税税务登记证号'
        }, {
            id: 'JFLXR',
            name: '甲方联系人--委托企业联系人'
        }, {
            id: 'JFTELEPHONE',
            name: '甲方电话号码'
        }, {
            id: 'JFADDRESS',
            name: '甲方地址--委托企业联系地址'
        }, {
            id: 'SWSMC',
            name: '事务所名称'
        }, {
            id: 'XYJE',
            name: '协议收费金额'
        }, {
            id: 'XYLX_DM',
            name: '协议类型ID'
        }, {
            id: 'SHSQ1',
            name: '所属时期开始',
            type:'date'
        }, {
            id: 'SHSQ2',
            name: '所属时期结束',
            type:'date'
        }, {
            id: 'SJSQJE',
            name: '实际收取金额'
        }, {
            id: 'FPHM',
            name: '发票号码'
        }, {
            id: 'MEMO',
            name: '协议备注'
        }, {
            id: 'SHIZS',
            name: '主管税务机关'
        }, {
            id: 'HY_ID',
            name: '行业'
        }, {
            id: 'BBRQ',
            name: '报备日期',
            type:'date'
        },{
            id: 'NSRXZ',
            name: '纳税人性质'
        },{
            id: 'BGWH',
            name: '报告文号'
        },{
            id: 'BBHM',
            name: '报备号码'
        },{
            id: 'YZM',
            name: '验证码'
        },{
            id: 'YJFH',
            name: '一级复核'
        },{
            id: 'RJFH',
            name: '二级复核'
        },{
            id: 'SJFH',
            name: '三级复核'
        },{
            id: 'QZSWS',
            name: '签字注册税务师'
        },{
            id: 'SFJE',
            name: '企业营业收入'
        },{
            id: 'JTXM',
            name: '具体项目名称'
        }]
    }
};

module.exports = model;