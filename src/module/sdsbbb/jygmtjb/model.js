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
        title: '事务所名称',
        dataIndex: 'dwmc',
        key: 'dwmc',
    },{
        title: '年度',
        dataIndex: 'nd',
        key: 'nd',

    }, {
        title: '合计',
        dataIndex: 'BNSRZE_HJ',
        key: 'BNSRZE_HJ',
    }, {
        title: '涉税服务收入',
        key: 'BNSRZE_SSFW',
        dataIndex: 'BNSRZE_SSFW',
    }, {
        title: '涉税鉴证收入',
        key: 'BNSRZE_SSJZ',
        dataIndex: 'BNSRZE_SSJZ',

    }, {
        title: '其他收入',
        key: 'BNSRZE_QTYW',
        dataIndex: 'BNSRZE_QTYW',
    }, {
        title: '上年收入总额',
        key: 'SNSRZE',
        dataIndex: 'SNSRZE',
    },{
        title: '状态',
        key: 'ZTBJ',
        dataIndex: 'ZTBJ',
    },  {
        title: '操作',
        key: 'operation',
        render: (text, record) => {
            let actGroup = <span className="act-group">
                    <Popconfirm title="确认要退回？" onConfirm={() => {
                        reject(record)
                    }}>
                    <a href="#">退回</a>
                    </Popconfirm>
                </span>;
            return actGroup
        }
    }]
};



module.exports = model;