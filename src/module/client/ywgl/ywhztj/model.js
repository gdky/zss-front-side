/**
 * Created by ming on 2016/4/11.
 */

const model = {
    columns: [{
        title: '序号',
        dataIndex: 'xh',
        key: 'xh',
        width: 50
    }, {
        title: '企业名称',
        dataIndex: 'wtdw',
        key: 'wtdw',
        width: 250
    },{
        title: '税务登记证号',
        key: 'wtdwnsrsbh',
        dataIndex: 'wtdwnsrsbh',
        width:130
    },{
        title: '业务发生地',
        key: 'cs',
        dataIndex: 'cs',
        width: 120
    }, {
        title: '报告文号',
        key: 'bgwh',
        dataIndex: 'bgwh',
        width:120
    }, {
        title: '报备号码',
        key: 'bbhm',
        dataIndex: 'bbhm',
        width: 130
    }, {
        title: '一级复核',
        key: 'yjfh',
        dataIndex: 'yjfh',
        width:80
    }, {
        title: '二级复核',
        key: 'rjfh',
        dataIndex: 'rjfh',
        width:80
    }, {
        title: '三级复核',
        key: 'sjfh',
        dataIndex: 'sjfh',
        width:80
    }, {
        title: '签名注师',
        key: 'qzsws',
        dataIndex: 'qzsws',
        width:100,
    }, {
        title: '税别',
        key: 'sb',
        dataIndex: 'sb',
        width:80
    }, {
        title: '主管税务机关',
        key: 'zgswjg',
        dataIndex: 'zgswjg',
        width:120
    }, {
        title: '协议收费金额',
        key: 'xyje',
        dataIndex: 'xyje',
        width:100
    }, {
        title: '实际收费金额',
        key: 'sjsqje',
        dataIndex: 'sjsqje',width:100
    }, {
        title: '报备时间',
        key: 'bbrq',
        dataIndex: 'bbrq'
    }]
};

module.exports = model;