/**
 * Created by ming on 2016/4/11.
 */

const model = {
    columns: [{
        title: '年度',
        dataIndex: 'nd',
        key: 'nd',
        width: 60
    },{
        title: '状态',
        key: 'ywzt',
        dataIndex: 'ywzt',
        width:100
    },{
        title: '委托企业名称',
        dataIndex: 'wtdw',
        key: 'wtdw',
        width: 250
    }, {
        title: '业务发生地',
        key: 'city',
        dataIndex: 'city',
        width:100
    }, {
        title: '业务类型',
        key: 'ywlx',
        dataIndex: 'ywlx',
        width: 200
    }, {
        title: '协议号',
        key: 'xyh',
        dataIndex: 'xyh',
        width: 130
    }, {
        title: '协议金额',
        key: 'xyje',
        dataIndex: 'xyje',
        width:100
    }, {
        title: '发票金额',
        key: 'sjsqje',
        dataIndex: 'sjsqje',
        width:100
    }, {
        title: '报备号码',
        key: 'bbhm',
        dataIndex: 'bbhm',
        width:130
    },{
        title: '报备日期',
        key: 'bbrq',
        dataIndex: 'bbrq',
        width:100
    }, {
        title: '签字税务师',
        key: 'qzsws',
        dataIndex: 'qzsws',
        width:100
    }]
};

module.exports = model;