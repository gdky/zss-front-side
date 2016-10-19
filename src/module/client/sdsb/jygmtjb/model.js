/**
 * Created by ming on 2016/4/11.
 */

const model = {
    columns: [{
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        width: 60
    }, {
        title: '机构名称',
        dataIndex: 'DWMC',
        key: 'DWMC',
        width: 200
    },{
        title: '年度',
        key: 'nd',
        dataIndex: 'nd',
        width:120
    },{
        title: '合计',
        key: 'BNSRZE_HJ',
        dataIndex: 'BNSRZE_HJ',
        width:120
    }, {
        title: '涉税服务收入',
        key: 'BNSRZE_SSFW',
        dataIndex: 'BNSRZE_SSFW',
        width: 120
    }, {
        title: '涉税鉴证收入',
        key: 'BNSRZE_SSJZ',
        dataIndex: 'BNSRZE_SSJZ',
        width:120
    }, {
        title: '上年收入总额',
        key: 'SNSRZE',
        dataIndex: 'SNSRZE',
        width: 120
    }, {
        title: '状态',
        key: 'ZTDM',
        dataIndex: 'ZTDM',
        width:120
    }, ]
};

module.exports = model;