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
        {title: '年度', dataIndex: 'ND', key: 'ND'},
        {title: '委托企业名称', dataIndex: 'WTDW', key: 'WTDW'},
        //{title: '业务发生地', dataIndex: 'CS', key: 'CS'},
        {title: '业务类型', dataIndex: 'YWLX_DM', key: 'YWLX_DM',render:(text)=>{

            let lx = {
                '1':'企业技术开发费加计扣除鉴证',
                '2':'企业所得税税前扣除鉴证',
                '3':'企业所得税汇算清缴鉴证',
                '4':'土地增值税鉴证',
                '5':'房地产涉税调整鉴证',
                '6':'其它鉴证',
                '7':'高新技术企业认定专项鉴证',
                '8':'企业注销税务登记税款清算鉴证',
                '9':'企业变更税务登记税款清算鉴证',
                '10':'个人所得税汇算清缴鉴证'
        };
            return lx[text]
        }},
        {title: '协议文号', dataIndex: 'XYH', key: 'XYH'},
        {title: '协议金额', dataIndex: 'XYJE', key: 'XYJE'},
        {title: '发票金额', dataIndex: 'SSJE', key: 'SSJE'},
        {title: '报备号码', dataIndex: 'BBHM', key: 'BBHM'},
        {title: '签字税务师', dataIndex: 'QZSWS', key: 'QZSWS'},
        {title: '状态', dataIndex: 'ZT', key: 'ZT',
            render:(text,record)=>{
                let zt = {
                    '0':'保存',
                    '1':'报备' ,
                    '2':'退回',
                        '3':'协议收费审批',
                        '4':'实际收费审批',
                        '5':'已收费'	,
                        '6':'申请退回审批',
                        '7':'申请撤销审批'
                };
                return zt[record.ZT];
            }
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return <span>
                    <a onClick={()=>handleEdit(record)}>修改</a> &nbsp;&nbsp;
                    <Popconfirm title="确定要删除吗？" placement="left" onConfirm={()=>handleDel(record)}>
                        <a>收费</a>
                    </Popconfirm>

                </span>
            }
        }
    ]
};