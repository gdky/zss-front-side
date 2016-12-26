/**
 * Created by ming on 2016/4/11.
 */
import React from 'react'
import {Icon} from 'antd'

const model = {
    columns: [{
        title:'锁定状态',
        dataIndex:'yxbz',
        key:'yxbz',
        width:80,
        render(text,record){
            if (text == 1) {
                return <span style={{fontSize:'14px',color:'#E01515'}}><Icon type="lock"/></span>
            }else {
                return <span style={{fontSize:'14px',color:'#CCCCCC'}} ><Icon type="unlock"/> </span>
            }
        }
    },{
        title: '税务师姓名',
        dataIndex: 'xming',
        key: 'xming',
        width: 100
    },{
        title: '锁定时间',
        dataIndex: 'sdtime',
        key: 'sdtime',
        width: 100
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
        width:100
    }]
};

module.exports = model;