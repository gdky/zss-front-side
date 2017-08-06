/**
 * Created by ming on 2016/4/11.
 */
import React from 'react'
import {Popconfirm} from 'antd'

function reject(record){}
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
        dataIndex: 'DWMC',
        key: 'DWMC',

    }, {
        title: '统计时间',
        dataIndex: 'TJSJ',
        key: 'TJSJ',
    }, {
        title: '经营活动产生的现金流入小计',
        key: 'JYHD_XJLR_XJ',
        dataIndex: 'JYHD_XJLR_XJ',
    }, {
        title: '经营活动产生的现金流出小计',
        key: 'JYHD_XJLC_XJ',
        dataIndex: 'JYHD_XJLC_XJ',

    }, {
        title: '投资活动产生的现金流入小计',
        key: 'TZHD_XJLR_XJ',
        dataIndex: 'TZHD_XJLR_XJ',
    }, {
        title: '投资活动产生的现金流出小计',
        key: 'TZHD_XJLC_XJ',
        dataIndex: 'TZHD_XJLC_XJ',
    }, {
        title: '状态',
        key: 'ZTBJ',
        dataIndex: 'ZTBJ',
    },  {
        title: '操作',
        key: 'operation',
        render: (text, record)=> {
            let actGroup = <span className="act-group">
                    <Popconfirm title="确认要退回？"  onConfirm={()=> {
                        reject(record)
                    }} >
                    <a href="#">退回</a>
                    </Popconfirm>
                </span>;
            return actGroup
        }
    }],
    entityModel:{
        colGroupNum: 2,
        props: []
    }
} ;

module.exports = model;