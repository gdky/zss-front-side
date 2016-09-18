/**
 * Created by ming on 2016/4/11.
 */

const model = {
    columns: [{
        title:'序号',
        dataIndex: 'rownum',
        key: 'rownum',
        width:50
    },{
        title: '锁定时间',
        dataIndex: 'sdtime',
        key: 'sdtime',
        width: 100
    }, {
        title: '事务所名称',
        dataIndex: 'swsmc',
        key: 'swsmc',
        width: 300
    }, {
        title: '锁定人',
        key: 'sdr',
        dataIndex: 'sdr',
        width:100
    }, {
        title: '锁定人角色',
        key: 'sdr_role',
        dataIndex: 'sdr_role',
        width: 100
    }, {
        title: '锁定原因',
        key: 'sdyy',
        dataIndex: 'sdyy',
        width:200
    },{
        title: '解锁人',
        key: 'jsr',
        dataIndex: 'jsr',
        width:100
    }, {
        title: '解锁人角色',
        key: 'jsr_role',
        dataIndex: 'jsr_role',
        width: 100
    },{
        title: '解锁时间',
        dataIndex: 'jstime',
        key: 'jstime',
        width: 100
    }]
};

module.exports = model;