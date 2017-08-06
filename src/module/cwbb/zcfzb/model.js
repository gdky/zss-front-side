/**
 * Created by ming on 2016/4/11.
 */
import React from 'react'
import numeral from 'numeral'
import {Popconfirm} from 'antd'

function reject(record) {
}
const model = {
    setfunc(func){
        reject = func
    },
    columns: [
        {title: '序号', dataIndex: 'key', key: 'key'},
        {title: '事务所名称', dataIndex: 'dwmc', key: 'dwmc'},
        {title: '年度', dataIndex: 'nd', key: 'nd'},
        {title: '统计时间段', key: 'tjsjd', dataIndex: 'tjsjd'},
        {title: '城市', key: 'cs', dataIndex: 'cs'},
        {
            title: '资产总计',
            key: 'zczj',
            dataIndex: 'zczj',
            render(num){
                return numeral(num).format('0,0.00')
            }
        }, {
            title: '负债和所有者权益合计',
            key: 'fzsyzqy_hj',
            dataIndex: 'fzsyzqy_hj',
            render(num){
                return numeral(num).format('0,0.00')
            }
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => {
                let actGroup = <span className="act-group">
                    <Popconfirm title="确认要退回？" onConfirm={() => {
                        reject(record)
                    }}>
                    <a href="#">退回</a>
                    </Popconfirm>
                </span>;
                return actGroup
            }
        }
    ],
    entityModel: [
        {id: 'ID', name: '编号'},
        {id: 'JG_ID', name: '机构ID'},
        {id: 'USE_ID', name: '用户ID'},
        {id: 'KSSJ', name: '开始时间'},
        {id: 'JSSJ', name: '结束时间'},
        {id: 'TJSJ', name: '提交日期'},
        {id: 'ZTBJ', name: '状态(0:保存，1:提交)'},
        {id: 'LDZC_HJ', name: '流动资产'},
        {id: 'LDZC_HBZJ', name: '货币资金'},
        {id: 'LDZC_DQTZ', name: '短期投资'},
        {id: 'LDZC_YSPJ', name: '应收票据'},
        {id: 'LDZC_YSGL', name: '应收股利'},
        {id: 'LDZC_YSLX', name: '应收利息'},
        {id: 'LDZC_YSZK', name: '应收账款'},
        {id: 'LDZC_QTYS', name: '其他应收款'},
        {id: 'LDZC_YFZK', name: '预付账款'},
        {id: 'LDZC_YSBT', name: '应收补贴款'},
        {id: 'LDZC_CH', name: '存货'},
        {id: 'LDZC_DTFY', name: '待摊费用'},
        {id: 'LDZC_DQZJ', name: '一年内到期的长期债券投资'},
        {id: 'LDZC_QTLDZC', name: '其他流动资产'},
        {id: 'CQTZ_GQ', name: '长期股权投资'},
        {id: 'CQTZ_ZQ', name: '长期债权投资'},
        {id: 'CQTZ_HJ', name: '长期投资合计'},
        {id: 'GDZC_YJ', name: '固定资产原价'},
        {id: 'GDZC_LJZJ', name: '固定资产累计折旧'},
        {id: 'GDZC_JZ', name: '固定资产净值'},
        {id: 'GDZC_JZZB', name: '固定资产减值准备'},
        {id: 'GDZC_JE', name: '固定资产净额'},
        {id: 'GDZC_GCWZ', name: '固定资产工程物资'},
        {id: 'GDZC_ZJGC', name: '固定资产在建工程'},
        {id: 'GDZC_QL', name: '固定资产清理'},
        {id: 'GDZC_HJ', name: '固定资产合计'},
        {id: 'WXQT_WXZC', name: '无形资产'},
        {id: 'WXQT_CQDT', name: '长期待摊费用'},
        {id: 'WXQT_QTCQ', name: '其他长期资产'},
        {id: 'WXQT_HJ', name: '无形资产和其他资产合计'},
        {id: 'YDSX_SKJX', name: '延递税款借项'},
        {id: 'ZCZJ', name: '资产总计'},
        {id: 'LDFZ_DQJK', name: '短期借债'},
        {id: 'LDFZ_YFPJ', name: '应付票据（流动负债）'},
        {id: 'LDFZ_YFZK', name: '应付账款'},
        {id: 'LDFZ_YSZK', name: '预收账款'},
        {id: 'LDFZ_YFGZ', name: '应付工资'},
        {id: 'LDFZ_YFFL', name: '应付福利费'},
        {id: 'LDFZ_YFGL', name: '应付股利'},
        {id: 'LDFZ_YJSJ', name: '应缴税金'},
        {id: 'LDFZ_QTYJ', name: '其他应交款'},
        {id: 'LDFZ_QTYF', name: '其他应付款'},
        {id: 'LDFZ_YTFY', name: '预提费用'},
        {id: 'LDFZ_YJFZ', name: '预计负债'},
        {id: 'LDFZ_DQFZ', name: '一年内到期的长期负债'},
        {id: 'LDFZ_QTFZ', name: '其他流动负债'},
        {id: 'LDFZ_HJ', name: '流动负债合计'},
        {id: 'CQFZ_CQJK', name: '长期借款'},
        {id: 'CQFZ_YFZQ', name: '应付债券'},
        {id: 'CQFZ_CQYF', name: '长期应付款'},
        {id: 'CQFZ_ZXYF', name: '专项应付款'},
        {id: 'CQFZ_ZYFXJJ', name: '职业风险基金'},
        {id: 'CQFZ_QTFZ', name: '其他长期负债'},
        {id: 'CQFZ_HJ', name: '长期负债合计'},
        {id: 'DYSX_DYSKDX', name: '递延税款贷项'},
        {id: 'DYSX_FZHJ', name: '负债合计'},
        {id: 'SYZQY_SSZBJE', name: '实收资本（股本）净额'},
        {id: 'SYZQY_YHTZ', name: '已归还投资'},
        {id: 'SYZQY_SSZB', name: '实收资本'},
        {id: 'SYZQY_ZBGJ', name: '资本公积'},
        {id: 'SYZQY_YYGJ', name: '盈余公积'},
        {id: 'SYZQY_WFPLR', name: '未分配利润'},
        {id: 'SYZQY_HJ', name: '所有者权益合计'},
        {id: 'FZSYZQY_HJ', name: '负债和所有者权益合计'},
        {id: 'ND', name: '上报年度'},
        {id: 'TIMEVALUE', name: '0表示上半年,1表示全年'},
        {id: 'ZGKJ', name: '主管会计'},
        {id: 'SZ', name: '所长'},
        {id: 'ZBR', name: '制表人'},
        {id: 'LDZC_HJ_NC', name: '流动资产(年初)'},
        {id: 'LDZC_HBZJ_NC', name: '货币资金(年初)'},
        {id: 'LDZC_DQTZ_NC', name: '短期投资(年初)'},
        {id: 'LDZC_YSPJ_NC', name: '应收票据(年初)'},
        {id: 'LDZC_YSGL_NC', name: '应收股利(年初)'},
        {id: 'LDZC_YSLX_NC', name: '应收利息(年初)'},
        {id: 'LDZC_YSZK_NC', name: '应收账款(年初)'},
        {id: 'LDZC_QTYS_NC', name: '其他应收款(年初)'},
        {id: 'LDZC_YFZK_NC', name: '预付账款(年初)'},
        {id: 'LDZC_YSBT_NC', name: '应收补贴款(年初)'},
        {id: 'LDZC_CH_NC', name: '存货(年初)'},
        {id: 'LDZC_DTFY_NC', name: '待摊费用(年初)'},
        {id: 'LDZC_DQZJ_NC', name: '一年内到期的长期债券投资(年初)'},
        {id: 'LDZC_QTLDZC_NC', name: '其他流动资产(年初)'},
        {id: 'CQTZ_GQ_NC', name: '长期股权投资(年初)'},
        {id: 'CQTZ_ZQ_NC', name: '长期债权投资(年初)'},
        {id: 'CQTZ_HJ_NC', name: '长期投资合计(年初)'},
        {id: 'GDZC_YJ_NC', name: '固定资产原价(年初)'},
        {id: 'GDZC_LJZJ_NC', name: '固定资产累计折旧(年初)'},
        {id: 'GDZC_JZ_NC', name: '固定资产净值(年初)'},
        {id: 'GDZC_JZZB_NC', name: '固定资产减值准备(年初)'},
        {id: 'GDZC_JE_NC', name: '固定资产净额(年初)'},
        {id: 'GDZC_GCWZ_NC', name: '固定资产工程物资(年初)'},
        {id: 'GDZC_ZJGC_NC', name: '固定资产在建工程(年初)'},
        {id: 'GDZC_QL_NC', name: '固定资产清理(年初)'},
        {id: 'GDZC_HJ_NC', name: '固定资产合计(年初)'},
        {id: 'WXQT_WXZC_NC', name: '无形资产(年初)'},
        {id: 'WXQT_CQDT_NC', name: '长期待摊费用(年初)'},
        {id: 'WXQT_QTCQ_NC', name: '其他长期资产(年初)'},
        {id: 'WXQT_HJ_NC', name: '无形资产和其他资产合计(年初)'},
        {id: 'YDSX_SKJX_NC', name: '延递税款借项(年初)'},
        {id: 'ZCZJ_NC', name: '资产总计(年初)'},
        {id: 'LDFZ_DQJK_NC', name: '短期借债(年初)'},
        {id: 'LDFZ_YFPJ_NC', name: '应付票据（流动负债）(年初)'},
        {id: 'LDFZ_YFZK_NC', name: '应付账款(年初)'},
        {id: 'LDFZ_YSZK_NC', name: '预收账款(年初)'},
        {id: 'LDFZ_YFGZ_NC', name: '应付工资(年初)'},
        {id: 'LDFZ_YFFL_NC', name: '应付福利费(年初)'},
        {id: 'LDFZ_YFGL_NC', name: '应付股利(年初)'},
        {id: 'LDFZ_YJSJ_NC', name: '应缴税金(年初)'},
        {id: 'LDFZ_QTYJ_NC', name: '其他应交款(年初)'},
        {id: 'LDFZ_QTYF_NC', name: '其他应付款(年初)'},
        {id: 'LDFZ_YTFY_NC', name: '预提费用(年初)'},
        {id: 'LDFZ_YJFZ_NC', name: '预计负债(年初)'},
        {id: 'LDFZ_DQFZ_NC', name: '一年内到期的长期负债(年初)'},
        {id: 'LDFZ_QTFZ_NC', name: '其他流动负债(年初)'},
        {id: 'LDFZ_HJ_NC', name: '流动负债合计(年初)'},
        {id: 'CQFZ_CQJK_NC', name: '长期借款(年初)'},
        {id: 'CQFZ_YFZQ_NC', name: '应付债券(年初)'},
        {id: 'CQFZ_CQYF_NC', name: '长期应付款(年初)'},
        {id: 'CQFZ_ZXYF_NC', name: '专项应付款(年初)'},
        {id: 'CQFZ_ZYFXJJ_NC', name: '职业风险基金(年初)'},
        {id: 'CQFZ_QTFZ_NC', name: '其他长期负债(年初)'},
        {id: 'CQFZ_HJ_NC', name: '长期负债合计(年初)'},
        {id: 'DYSX_DYSKDX_NC', name: '递延税款贷项(年初)'},
        {id: 'DYSX_FZHJ_NC', name: '负债合计(年初)'},
        {id: 'SYZQY_SSZBJE_NC', name: '实收资本（股本）净额(年初)'},
        {id: 'SYZQY_YHTZ_NC', name: '已归还投资(年初)'},
        {id: 'SYZQY_SSZB_NC', name: '实收资本(年初)'},
        {id: 'SYZQY_ZBGJ_NC', name: '资本公积(年初)'},
        {id: 'SYZQY_YYGJ_NC', name: '盈余公积(年初)'},
        {id: 'SYZQY_WFPLR_NC', name: '未分配利润(年初)'},
        {id: 'SYZQY_HJ_NC', name: '所有者权益合计(年初)'},
        {id: 'FZSYZQY_HJ_NC', name: '负债和所有者权益合计(年初)'}
    ]

};

module.exports = model;