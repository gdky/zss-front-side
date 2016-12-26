import React from 'react'
import {Icon,Popconfirm} from 'antd'

let handleEdit = function (record) {
    console.log('edit',record)
};
let handleDel = function (record) {
    console.log('del',record)
};
module.exports = {

    setEdit: function (func) {
        handleEdit = func;
    },
    setDel: function (func) {
        handleDel = func;
    },
    columns: [
        {title: '年度', dataIndex: 'nd', key: 'nd'},
        {title: '地区', dataIndex: 'mc', key: 'mc'},
        {title: '60岁以上', dataIndex: 'zrs_60', key: 'zrs_60'},
        {title: '51-60岁', dataIndex: 'zrs_50', key: 'zrs_50'},
        {title: '36-50岁', dataIndex: 'zrs_36', key: 'zrs_36'},
        {title: '36岁以下', dataIndex: 'zrs_35', key: 'zrs_35'},
        {title: '60岁以上', dataIndex: 'zy_zrs_60', key: 'zy_zrs_60'},
        {title: '51-60岁', dataIndex: 'zy_zrs_50', key: 'zy_zrs_50'},
        {title: '36-50岁', dataIndex: 'zy_zrs_36', key: 'zy_zrs_36'},
        {title: '36岁以下', dataIndex: 'zy_zrs_35', key: 'zy_zrs_35'},
        {title: '60岁以上', dataIndex: 'fzy_zrs_60', key: 'fzy_zrs_60'},
        {title: '51-60岁', dataIndex: 'fzy_zrs_50', key: 'fzy_zrs_50'},
        {title: '36-50岁', dataIndex: 'fzy_zrs_36', key: 'fzy_zrs_36'},
        {title: '36岁以下', dataIndex: 'fzy_zrs_35', key: 'fzy_zrs_35'},
        {title: '60岁以上', dataIndex: 'cy_zrs_60', key: 'cy_zrs_60'},
        {title: '51-60岁', dataIndex: 'cy_zrs_50', key: 'cy_zrs_50'},
        {title: '36-50岁', dataIndex: 'cy_zrs_36', key: 'cy_zrs_36'},
        {title: '36岁以下', dataIndex: 'cy_zrs_35', key: 'cy_zrs_35'}
    ]
};