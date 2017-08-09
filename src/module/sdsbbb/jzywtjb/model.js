/**
 * Created by ming on 2016/4/11.
 */
import React from 'react'
import {Popconfirm} from 'antd'

function reject(record) {
}
const model = {
    setfunc(func){
        reject = func
    },
    columns:[{
        title: '序号',
        dataIndex: 'key',
        key: 'key'
    },{
        title: '年度',
        dataIndex: 'nd',
        key: 'nd',
    },{
        title: '事务所名称',
        dataIndex: 'dwmc',
        key: 'dwmc',

    }, {
        title: '汇算清缴户数',
        dataIndex: 'HSQJJE_HS',
        key: 'HSQJJE_HS',
    }, {
        title: '汇算清缴金额',
        key: 'HSQJJE_JE',
        dataIndex: 'HSQJJE_JE',
    }, {
        title: '调增户数',
        key: 'TZYNSDSE_HS',
        dataIndex: 'TZYNSDSE_HS',

    }, {
        title: '调增金额',
        key: 'TZYNSDSE_JE',
        dataIndex: 'TZYNSDSE_JE',
    }, {
        title: '调减户数',
        key: 'TJYNSDSE_HS',
        dataIndex: 'TJYNSDSE_HS',
    },  {
        title: '调减金额',
        key: 'TJYNSDSE_JE',
        dataIndex: 'TJYNSDSE_JE',
    },{
        title: '状态',
        key: 'ZTBJ',
        dataIndex: 'ZTBJ',
    },  {
        title: '操作',
        key: 'operation',
        render: (text, record) => {
            return <span className="act-group">
                    <Popconfirm title="确认要退回？" onConfirm={() => {
                        reject(record)
                    }}>
                    <a href="#">退回</a>
                    </Popconfirm>
                </span>;
        }
    }]
};

module.exports = model;