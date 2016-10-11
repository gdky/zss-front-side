import React from 'react'

const headerQs = [
        {title: '序号', key: 'xh', rowSpan:2},
        {title: '地区', key: 'dq', rowSpan:2},
        {title: '事务所户数', key: 'swshs', rowSpan:2},
        {title: '委托单位户数', key: 'wtdwhs', rowSpan:2},
        {title: '协议收费总金额', key: 'xysfzje', rowSpan:2},
        {title: '实际收费总金额', key: 'sjsfzje', rowSpan:2},
        {title: '企业技术开发费加计扣除鉴证', key: 'ywlx1', colSpan:4},
        {title: '企业所得税税前扣除鉴证', key: 'ywlx2', colSpan:5},
        {title: '企业所得税汇算清缴鉴证', key: 'ywlx3', colSpan:6},
        {title: '土地增值税鉴证', key: 'ywlx4', colSpan:6},
        {title: '房地产涉税调整鉴证', key: 'ywlx5', colSpan:6},
        {title: '其它鉴证', key: 'ywlx6', colSpan:6},
        {title: '高新技术企业认定专项鉴证', key: 'ywlx7', colSpan:4},
        {title: '企业注销税务登记税款清算鉴证', key: 'ywlx8', colSpan:6},
        {title: '企业变更税务登记税款清算鉴证', key: 'ywlx9', colSpan:6},
        {title: '个人所得税汇算清缴鉴证', key: 'ywlx10', colSpan:6},
        {title: '事务所户数', key: 'swshs_jskf'},
        {title: '委托单位户数', key: 'wtdwhs_jskf'},
        {title: '协议收费总金额', key: 'xysfzje_jskf'},
        {title: '实际收费总金额', key: 'sjsfzje_jskf'},
        {title: '事务所户数', key: 'swshs_sqkc'},
        {title: '委托单位户数', key: 'wtdwhs_sqkc'},
        {title: '协议收费总金额', key: 'xysfzje_sqkc'},
        {title: '实际收费总金额', key: 'sjsfzje_sqkc'},
        {title: '所得税税前扣除项目鉴证金额', key: 'sqkcxmje_sqkc'},
        {title: '事务所户数', key: 'swshs_sdshsqj'},
        {title: '委托单位户数', key: 'wtdwhs_sdshsqj'},
        {title: '协议收费总金额', key: 'xysfzje_sdshsqj'},
        {title: '实际收费总金额', key: 'sjsfzje_sdshsqj'},
        {title: '纳税调整增加额', key: 'nstzzje_sdshsqj'},
        {title: '纳税调整减少额', key: 'nstzjse_sdshsqj'},
        {title: '事务所户数', key: 'swshs_td'},
        {title: '委托单位户数', key: 'wtdwhs_td'},
        {title: '协议收费总金额', key: 'xysfzje_td'},
        {title: '实际收费总金额', key: 'sjsfzje_td'},
        {title: '应补税额', key: 'ybse_td'},
        {title: '应退税额', key: 'ytse_td'},
        {title: '事务所户数', key: 'swshs_fdc'},
        {title: '委托单位户数', key: 'wtdwhs_fdc'},
        {title: '协议收费总金额', key: 'xysfzje_fdc'},
        {title: '实际收费总金额', key: 'sjsfzje_fdc'},
        {title: '应补税额', key: 'ybse_fdc'},
        {title: '应退税额', key: 'ytse_fdc'},
        {title: '事务所户数', key: 'swshs_qt'},
        {title: '委托单位户数', key: 'wtdwhs_qt'},
        {title: '协议收费总金额', key: 'xysfzje_qt'},
        {title: '实际收费总金额', key: 'sjsfzje_qt'},
        {title: '其他鉴证应补税额', key: 'ybse_qt'},
        {title: '其他鉴证应退税额', key: 'ytse_qt'},
        {title: '事务所户数', key: 'swshs_gxjs'},
        {title: '委托单位户数', key: 'wtdwhs_gxjs'},
        {title: '协议收费总金额', key: 'xysfzje_gxjs'},
        {title: '实际收费总金额', key: 'sjsfzje_gxjs'},
        {title: '事务所户数', key: 'swshs_zx'},
        {title: '委托单位户数', key: 'wtdwhs_zx'},
        {title: '协议收费总金额', key: 'xysfzje_zx'},
        {title: '实际收费总金额', key: 'sjsfzje_zx'},
        {title: '注销税务应补税额', key: 'ybse_zx'},
        {title: '注销税务应退税额', key: 'ytse_zx'},
        {title: '事务所户数', key: 'swshs_bg'},
        {title: '委托单位户数', key: 'wtdwhs_bg'},
        {title: '协议收费总金额', key: 'xysfzje_bg'},
        {title: '实际收费总金额', key: 'sjsfzje_bg'},
        {title: '变更税务应补税额', key: 'ybse_bg'},
        {title: '变更税务应退税额', key: 'ytse_bg'},
        {title: '事务所户数', key: 'swshs_grhsqj'},
        {title: '委托单位户数', key: 'wtdwhs_grhsqj'},
        {title: '协议收费总金额', key: 'xysfzje_grhsqj'},
        {title: '实际收费总金额', key: 'sjsfzje_grhsqj'},
        {title: '纳税调整增加额', key: 'nstzzje_grhsqj'},
        {title: '纳税调整减少额', key: 'nstzjse_grhsqj'}
    ];

const headerDq = [
        {title: '序号', key: 'xh', rowSpan:2},
        {title: '事务所名称', key: 'dwmc', rowSpan:2}, 
        {title: '委托单位户数', key: 'wtdwhs', rowSpan:2},
        {title: '协议收费总金额', key: 'xysfzje', rowSpan:2},
        {title: '实际收费总金额', key: 'sjsfzje', rowSpan:2},
        {title: '企业技术开发费加计扣除鉴证', key: 'ywlx1', colSpan:3},
        {title: '企业所得税税前扣除鉴证', key: 'ywlx2', colSpan:4},
        {title: '企业所得税汇算清缴鉴证', key: 'ywlx3', colSpan:5},
        {title: '土地增值税鉴证', key: 'ywlx4', colSpan:5},
        {title: '房地产涉税调整鉴证', key: 'ywlx5', colSpan:5},
        {title: '其它鉴证', key: 'ywlx6', colSpan:5},
        {title: '高新技术企业认定专项鉴证', key: 'ywlx7', colSpan:3},
        {title: '企业注销税务登记税款清算鉴证', key: 'ywlx8', colSpan:5},
        {title: '企业变更税务登记税款清算鉴证', key: 'ywlx9', colSpan:5},
        {title: '个人所得税汇算清缴鉴证', key: 'ywlx10', colSpan:5}, 
        {title: '委托单位户数', key: 'wtdwhs_jskf'},
        {title: '协议收费总金额', key: 'xysfzje_jskf'},
        {title: '实际收费总金额', key: 'sjsfzje_jskf'},
        {title: '委托单位户数', key: 'wtdwhs_sqkc'},
        {title: '协议收费总金额', key: 'xysfzje_sqkc'},
        {title: '实际收费总金额', key: 'sjsfzje_sqkc'},
        {title: '所得税税前扣除项目鉴证金额', key: 'sqkcxmje_sqkc'}, 
        {title: '委托单位户数', key: 'wtdwhs_sdshsqj'},
        {title: '协议收费总金额', key: 'xysfzje_sdshsqj'},
        {title: '实际收费总金额', key: 'sjsfzje_sdshsqj'},
        {title: '纳税调整增加额', key: 'nstzzje_sdshsqj'},
        {title: '纳税调整减少额', key: 'nstzjse_sdshsqj'}, 
        {title: '委托单位户数', key: 'wtdwhs_td'},
        {title: '协议收费总金额', key: 'xysfzje_td'},
        {title: '实际收费总金额', key: 'sjsfzje_td'},
        {title: '应补税额', key: 'ybse_td'},
        {title: '应退税额', key: 'ytse_td'}, 
        {title: '委托单位户数', key: 'wtdwhs_fdc'},
        {title: '协议收费总金额', key: 'xysfzje_fdc'},
        {title: '实际收费总金额', key: 'sjsfzje_fdc'},
        {title: '应补税额', key: 'ybse_fdc'},
        {title: '应退税额', key: 'ytse_fdc'}, 
        {title: '委托单位户数', key: 'wtdwhs_qt'},
        {title: '协议收费总金额', key: 'xysfzje_qt'},
        {title: '实际收费总金额', key: 'sjsfzje_qt'},
        {title: '其他鉴证应补税额', key: 'ybse_qt'},
        {title: '其他鉴证应退税额', key: 'ytse_qt'}, 
        {title: '委托单位户数', key: 'wtdwhs_gxjs'},
        {title: '协议收费总金额', key: 'xysfzje_gxjs'},
        {title: '实际收费总金额', key: 'sjsfzje_gxjs'}, 
        {title: '委托单位户数', key: 'wtdwhs_zx'},
        {title: '协议收费总金额', key: 'xysfzje_zx'},
        {title: '实际收费总金额', key: 'sjsfzje_zx'},
        {title: '注销税务应补税额', key: 'ybse_zx'},
        {title: '注销税务应退税额', key: 'ytse_zx'}, 
        {title: '委托单位户数', key: 'wtdwhs_bg'},
        {title: '协议收费总金额', key: 'xysfzje_bg'},
        {title: '实际收费总金额', key: 'sjsfzje_bg'},
        {title: '变更税务应补税额', key: 'ybse_bg'},
        {title: '变更税务应退税额', key: 'ytse_bg'}, 
        {title: '委托单位户数', key: 'wtdwhs_grhsqj'},
        {title: '协议收费总金额', key: 'xysfzje_grhsqj'},
        {title: '实际收费总金额', key: 'sjsfzje_grhsqj'},
        {title: '纳税调整增加额', key: 'nstzzje_grhsqj'},
        {title: '纳税调整减少额', key: 'nstzjse_grhsqj'}
    ];
const columns = [
        
    ];

const headerSws = [
        {title: '事务所', key: 'sws'},
        {title: '年度', key: 'nd'},
    ];

const headerYw = [
        {title: '项目', key: 'xmmc', rowSpan:2},
        {title: '人员', key: 'ry', colSpan:3},
        {title: '学历', key: 'xl', colSpan:4},
        {title: '年龄', key: 'nl', colSpan:4},
        {title: '备注', key: 'bz', rowSpan:2},
        {title: '总计', key: 'zj' },
        {title: '其中：女', key: 'v_zrs' },
        {title: '男', key: 'n_zrs' },
        {title: '研究生以上', key: 'yjs_zrs' },
        {title: '大学本科', key: 'bk_zrs' },
        {title: '大专',  key: 'dz_zrs' },
        {title: '中专及以下', key: 'zz_zrs' },
        {title: '35岁以下', key: '35_zrs'},
        {title: '36-50岁', key: '50_zrs'},
        {title: '51-60岁', key: '60_zrs' },
        {title: '60岁以上',key: '61_zrs' },   
    ];

const ywlx = [
  {'id':1,"mc":'企业技术开发费加计扣除鉴证'}, 
  {'id':2,"mc":'企业所得税税前扣除鉴证'},
  {'id':3,"mc":'企业所得税汇算清缴鉴证'},
  {'id':4,"mc":'土地增值税鉴证'},
  {'id':5,"mc":'房地产涉税调整鉴证'}, 
  {'id':6,"mc":'其它鉴证'},
  {'id':7,"mc":'高新技术企业认定专项鉴证'},
  {'id':8,"mc":'企业注销税务登记税款清算鉴证'}, 
  {'id':9,"mc":'企业变更税务登记税款清算鉴证'},
  {'id':10,"mc":'个人所得税汇算清缴鉴证'}
];

const model = {
  headerQs:headerQs,
  headerDq:headerDq,
  headerSws:headerSws,
  headerYw:headerYw,
  ywlx:ywlx
} 
module.exports = model