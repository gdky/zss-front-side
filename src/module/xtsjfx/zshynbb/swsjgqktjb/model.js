import React from 'react'
const columns = [
{
    title: '机构总数',
    dataIndex: 'zjgs',
    key: 'zjgs'
},
{
    title: '有限',
    dataIndex: 'yx_jgs',
    key: 'yx_jgs'
},
{
    title: '合伙',
    dataIndex: 'hh_jgs',
    key: 'hh_jgs'
},
//本年度新增机构数
{
    title: '合计',
    dataIndex: 'xz_jgs',
    key: 'xz_jgs'
},
{
    title: '有限',
    dataIndex: 'xz_yx_jgs',
    key: 'xz_yx_jgs'
},
{
    title: '合伙',
    dataIndex: 'xz_hh_jgs',
    key: 'xz_hh_jgs'
},
//本年度注销机构数
{
    title: '合计',
    dataIndex: 'zx_jgs',
    key: 'zx_jgs'
},
{
    title: '有限',
    dataIndex: 'zx_yx_jgs',
    key: 'zx_yx_jgs'
},
{
    title: '合伙',
    dataIndex: 'zx_hh_jgs',
    key: 'zx_hh_jgs'
},
//本年度变更数
{
    title: '变更户数',
    dataIndex: 'bg_jgs',
    key: 'bg_jgs'
},
{
    title: '有限转合伙',
    dataIndex: 'bg_yxhh_jgs',
    key: 'bg_yxhh_jgs'
},
{
    title: '合伙转有限',
    dataIndex: 'bg_hhyx_jgs',
    key: 'bg_hhyx_jgs'
},
{
    title: '法人变更',
    dataIndex: 'bg_fr_jgs',
    key: 'bg_fr_jgs'
},
{
    title: '所名变更',
    dataIndex: 'bg_sm_jgs',
    key: 'bg_sm_jgs'
},
{
    title: '注册基金变更',
    dataIndex: 'bg_zczj_jgs',
    key: 'bg_zczj_jgs'
},
{
    title: '经营地址变更',
    dataIndex: 'bg_bgdz_jgs',
    key: 'bg_bgdz_jgs'
},

{
    title: '本年度合并总数',
    dataIndex: 'hb_jgs',
    key: 'hb_jgs'
}
];

const header = [
        {title: '机构总数', key: 'jgzs', rowSpan:3},
        {title: '有限', key: 'yx', rowSpan:3},
        {title: '合伙', key: 'hh', rowSpan:3},
        {title: '本年度新设机构数', key: 'bndxsjgs', rowSpan:2, colSpan:3},
        {title: '本年度注销机构数', key: 'bndzxjgs', rowSpan:2, colSpan:3 },
        {title: '本年度变更数', key: 'bndbgs', colSpan:7 },
        {title: '本年度合并数', key: 'bndhbs', rowSpan:3 },
        {title: '变更户数', key: 'bghs' , rowSpan:2},
        {title: '变更项目', key: 'bgxm' , colSpan:6},
        {title: '合计', key: 'bndxsjgs_hj' },
        {title: '合伙',  key: 'bndxsjgs_hh' },
        {title: '有限', key: 'bndxsjgs_yx' },
        {title: '合计', key: 'bndzxjgs_hj' },
        {title: '合伙',  key: 'bndzxjgs_hh' },
        {title: '有限', key: 'bndzxjgs_yx' },
        {title: '有限转合伙', key: 'yxhh' },
        {title: '合伙转有限', key: 'hhyx' },
        {title: '法人代表（所长）变更',  key: 'frdbbg' },
        {title: '所名变更', key: 'smbg' },
        {title: '注册资金变革', key: 'zczjbg' },
        {title: '经营地址变更', key: 'jydz' }
    ];

const model = {
  columns:columns,
  header:header
} 
module.exports = model