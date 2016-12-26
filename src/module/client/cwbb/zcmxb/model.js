/**
 * Created by ming on 2016/4/11.
 */
import React from 'react'
import {Button ,Icon } from 'antd'

var model = {
    entityModel: [
         {
            id: 'JSSJ',
            name: '结束时间',
            render(num){
                let date = new Date(num);
               
                return date.toLocaleDateString()
            }
        },
            {
            id: 'KSSJ',
            name: '开始时间',
            render(num){
                let date = new Date(num);
               
                return date.toLocaleDateString()
            }
        },
       
    ]

};

module.exports = model;