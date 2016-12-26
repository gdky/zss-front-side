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
        title: '汇算清缴户数',
        key: 'HSQJJE_HS',
        dataIndex: 'HSQJJE_HS',
        width: 120
    }, {
        title: '汇算清缴金额',
        key: 'HSQJJE_JE',
        dataIndex: 'HSQJJE_JE',
        width:120
    }, {
        title: '调增户数',
        key: 'TZYNSDSE_HS',
        dataIndex: 'TZYNSDSE_HS',
        width: 100
    }, {
        title: '调增金额',
        key: 'TZYNSDSE_JE',
        dataIndex: 'TZYNSDSE_JE',
        width:100
    }, {
        title: '调减户数',
        key: 'TJYNSDSE_HS',
        dataIndex: 'TJYNSDSE_HS',
        width:100
    }, {
        title: '调减金额',
        key: 'TJYNSDSE_JE',
        dataIndex: 'TJYNSDSE_JE'
    }]
};

module.exports = model;