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
        title: '年度',
        dataIndex: 'nd',
        key: 'nd',
        width: 50
    },{
        title: '状态',
        key: 'ZTBJ',
        dataIndex: 'ZTBJ',
        width:80
    },{
        title: '法人',
        key: 'FRDBXM',
        dataIndex: 'FRDBXM',
        width:80
    }, {
        title: '组织形式',
        key: 'JGXZ',
        dataIndex: 'JGXZ',
        width: 130
    }, {
        title: '注册资金（单位：万元）',
        key: 'ZCZJ',
        dataIndex: 'ZCZJ',
        width:180
    }, {
        title: '股东人数',
        key: 'CZRS',
        dataIndex: 'CZRS',
        width: 100
    }, {
        title: '人员人数',
        key: 'RYZS',
        dataIndex: 'RYZS',
        width:100
    }, {
        title: '执业人数',
        key: 'ZYZCSWSRS',
        dataIndex: 'ZYZCSWSRS'
    }]
};

module.exports = model;