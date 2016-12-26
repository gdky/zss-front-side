import React from 'react'
const columns = [
        {title: '机构名称', dataIndex: 'dwmc', key: 'dwmc'},
        {title: '合计', dataIndex: 'bnsrze_hj', key: 'bnsrze_hj'},
        {title: '涉税服务收入', dataIndex: 'bnsrze_ssfw', key: 'bnsrze_ssfw'},
        {title: '涉税鉴证收入', dataIndex: 'bnsrze_ssjz', key: 'bnsrze_ssjz'},
        {title: '其他业务收入', dataIndex: 'bnsrze_qtyw', key: 'bnsrze_qtyw'},
        {title: '上年收入总额', dataIndex: 'snsrze', key: 'snsrze'},
        {title: '比上年增长%', dataIndex: 'zzl', key: 'zzl'},
        {title: '备注', dataIndex: 'bz', key: 'bz'}
    ];

const header = [
        {title: '机构名称', key: 'dwmc', rowSpan:2},
        {title: '本年度收入总额', key: 'bndsrze', colSpan:4},
        {title: '上年收入总额', key: 'snsrze', rowSpan:2},
        {title: '比上年增长%', key: 'zzl', rowSpan:2},
        {title: '备注', key: 'bz', rowSpan:2},
        {title: '合计', key: 'bnsrze_hj' },
        {title: '涉税服务收入', key: 'bnsrze_ssfw' },
        {title: '涉税鉴证收入', key: 'bnsrze_ssjz' },
        {title: '其他业务收入', key: 'bnsrze_qtyw' }
    ];

const model = {
  columns:columns,
  header:header
} 
module.exports = model