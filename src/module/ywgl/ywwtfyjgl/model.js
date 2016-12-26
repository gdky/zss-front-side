/**
 * Created by ming on 2016/4/11.
 */

const model = {
    columns: [{
        title: '年度',
        dataIndex: 'nd',
        key: 'nd',
        width: 60
    }, {
        title: '事务所名称',
        dataIndex: 'swsmc',
        key: 'swsmc',
        width: 300
    }, {
        title: '委托企业名称',
        key: 'wtdw',
        dataIndex: 'wtdw',
        width:300
    }, {
        title: '业务类型',
        key: 'ywlx',
        dataIndex: 'ywlx',
        width: 220
    }, {
        title: '协议金额',
        key: 'xyje',
        dataIndex: 'xyje',
        width:100
    }, {
        title: '报备号码',
        key: 'bbhm',
        dataIndex: 'bbhm',
        width:150
    }, {
        title: '报备日期',
        key: 'bbrq',
        dataIndex: 'bbrq',
        width:100
    }, {
        title: '业务状态',
        key: 'ywzt',
        dataIndex: 'ywzt'
    }]
};

module.exports = model;