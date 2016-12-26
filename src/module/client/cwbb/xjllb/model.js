/**
 * Created by ming on 2016/4/11.
 * Edited by lss on 2016/10/15.
 */
import React from 'react'
import {Button ,Icon } from 'antd'
import numeral from 'numeral'
var model = {
    entityModel: [
        {
            id: 'ND',
            name: '年度',
            render(value) {
                return value + "";
            }
        },
        {
            id: 'TJRQ',
            name: '提交日期',
            render(num) {
                let date = new Date(num);
                return date.toLocaleDateString()
            }
        },
        {
            id: 'JYHD_XJLR_XSLW',
            name: '销售商品、提供劳务收到的现金',
            render(num) { 
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'JYHD_XJLR_SKFH',
            name: '收到的税费返还',
            render(num) { 
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'JYHD_XJLR_QTJY',
            name: '收到的其它与经营活动有关的现金',
            render(num) { 
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'JYHD_XJLR_XJ',
            name: '现金流入小计',
            render(num) { 
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'JYHD_XJLC_GMLW',
            name: '购买商品、接收劳务支付的现金',
            render(num) { 
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'JYHD_XJLC_ZFZG',
            name: '支付给职工以及为职工支付的现金',
            render(num) { 
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'JYHD_XJLC_SF',
            name: '支付的各项税费',
            render(num) { 
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'JYHD_XJLC_QTJY',
            name: '支付的其它与经营活动有关的现金',
            render(num) { 
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'JYHD_XJLC_XJ',
            name: '现金流出小计',
            render(num) { 
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'JYHD_JE',
            name: '经营活动产生的现金流量净额',
            render(num) { 
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'TZHD_XJLR_SHTZ',
            name: '收回投资所收到的现金',
            render(num) { 
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'TZHD_XJLR_TZSY',
            name: '取得投资收益所收到的现金',
            render(num) { 
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'TZHD_XJLR_CZZC',
            name: '处置固定资产、无形资产和其他长期资产所收回的现金净额',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'TZHD_XJLR_QTTZ',
            name: '收到其他与投资活动有关的现金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'TZHD_XJLR_XJ',
            name: '投资活动现金流入小计',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'TZHD_XJLC_GJZC',
            name: '购建固定资产、无形资产和其他长期资产所支付的现金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'TZHD_XJLC_TZ',
            name: '投资所支付的现金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'TZHD_XJLC_QTTZ',
            name: '支付的其他与投资活动有关的现金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'TZHD_XJLC_XJ',
            name: '投资活动现金流出小计',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'TZHD_JE',
            name: '投资活动产生的现金流量净额',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'CZHD_XJLR_XSTZ',
            name: '吸收投资所收到的现金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'CZHD_XJLR_JK',
            name: '借款所收到的现金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'CZHD_XJLR_QTCZ',
            name: '收到的其它与筹资活动有关的现金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'CZHD_XJLR_XJ',
            name: '筹资活动现金流入小计',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'CZHD_XJLC_CHZW',
            name: '偿还债务所支付的现金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'CZHD_XJLC_FPLR',
            name: '分配股利、利润或偿付利息所支付的现金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'CZHD_XJLC_QTCZ',
            name: '支付的其它与筹资活动有关的现金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'CZHD_XJLC_XJ',
            name: '筹资活动现金流出小计',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'CZHD_JE',
            name: '筹资活动产生的现金流量净额',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'HLBDYX',
            name: '四、汇率变动对现金的影响',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'XJJZZJ',
            name: '五、现金及现金等价物净增加额',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_JLR',
            name: '补充资料净利润',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_JTZCJZ',
            name: '加：计提的资产减值准备',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_GDZCZJ',
            name: '固定资产折旧',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_WXZCTX',
            name: '无形资产摊销',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_CQDTFY',
            name: '长期待摊费用摊销',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_DTFYJS',
            name: '待摊费用减少（减：增加）',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_YTFYJS',
            name: '预提费用减少（减：减少）',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_ZCSS',
            name: '处置固定资产、无形资产和其他长期资产的损失（减：收益）',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_GDZCBF',
            name: '固定资产报废损失',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_CWFY',
            name: '财务费用',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_TZSS',
            name: '投资损失（减：收益）',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_DYSDDX',
            name: '递延税款贷项（减：借项）',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_CHJS',
            name: '存货的减少（减：增加）',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_YSXMJS',
            name: '经营性应收项目的减少（减：增加）',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_YFXMZJ',
            name: '经营性应付项目的增加（减：减少）',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_QT',
            name: '其它',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_XJLLJE',
            name: '补充资料经营活动产生的现金流量净额',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_ZWZWZB',
            name: '债务转为资本',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_YNDQZJ',
            name: '一年内到期的可转换公司债券',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_RZZRZC',
            name: '融资租入固定资产',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_XJQMYE',
            name: '现金的期末余额',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_XJQCYE',
            name: '减：现金的期初余额',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_XJDJWQMYE',
            name: '加：现金的等价物的期末余额',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_XJDJWQCYE',
            name: '减：现金等价物的期初余额',
            render(num) { 
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'BCZL_XJDJWJEZJ',
            name: '补充资料现金及现金等价物净增加额',
            render(num) { 
                return numeral(num).format('0,0.00')
            }
        }
    ]
};

module.exports = model;