import React from 'react'
const columns = [
        {title: '序号', dataIndex: 'xh', key: 'xh'},
        {title: '项目', dataIndex: 'xmmc', key: 'xmmc'},
        {title: '户数', dataIndex: 'sn_hs', key: 'sn_hs'},
        {title: '金额', dataIndex: 'sn_je', key: 'sn_je'},
        {title: '户数', dataIndex: 'jn_hs', key: 'jn_hs'},
        {title: '金额', dataIndex: 'jn_je', key: 'jn_je'},
        {title: '户数', dataIndex: 'zj_hs', key: 'zj_hs'},
        {title: '金额', dataIndex: 'zj_je', key: 'zj_je'},
        {title: '户数', dataIndex: 'zjl_hs', key: 'zjl_hs'},
        {title: '金额', dataIndex: 'zjl_hs', key: 'zjl_je'}
    ];

const header = [
        {title: '序号', key: 'xh', rowSpan:2},
        {title: '项目类别', key: 'xmmc', rowSpan:2},
        {title: '上年数', key: 'sns', colSpan:2},
        {title: '本年数', key: 'bns', colSpan:2},
        {title: '比上年增减额', key: 'zje', colSpan:2},
        {title: '增减%', key: 'zjl', colSpan:2},
        {title: '户数', key: 'sn_hs' },
        {title: '金额', key: 'sn_je' },
        {title: '户数', key: 'bn_hs' },
        {title: '金额', key: 'bn_je' },
        {title: '户数', key: 'zj_hs' },
        {title: '金额', key: 'zj_je' },
        {title: '户数', key: 'zjl_hs' },
        {title: '金额', key: 'zjl_je' } 
    ];
const model = {
  columns:columns,
  header:header
} 
module.exports = model