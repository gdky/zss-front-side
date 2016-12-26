/**
 * Created by ming on 2016/4/11.
 */
import React from 'react'
import {Icon} from 'antd'

const model = {
    columns: [{
        title: '姓名',
        dataIndex: 'xming',
        key: 'xming',
        width: 80
    }, {
        title: '所属事务所',
        dataIndex: 'swsmc',
        key: 'swsmc',
        width: 250
    }, {
        title: '执业资格证编号',
        key: 'zyzgzsbh',
        dataIndex: 'zyzgzsbh',
        width:100
    }, {
        title: '资质状态',
        key: 'islock',
        dataIndex: 'islock',
        width: 80,
        render(text, record){
            if (text == 1) {
                return <span style={{fontSize:'14px',color:'#E01515'}}><Icon type="lock"/></span>
            }else {
                return <span > 正常 </span>
            }

        }
    }]
};

module.exports = model;