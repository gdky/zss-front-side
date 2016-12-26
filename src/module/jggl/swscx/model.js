import React from 'react'
import {DatePicker, Modal, Form, Input, Select, Table, Icon, Tabs, Button, Row, Col, message}from 'antd'
const columns = [{ //设定列
    title: '序号', //设定该列名称
    dataIndex: 'xh', //设定该列对应后台字段名
    key: 'xh', //列key，必须设置，建议与字段名相同
}, {
    title: '机构名称',
    dataIndex: 'dwmc',
    key: 'dwmc',
    sorter: true, //是否可以排序，需后台写排序方法
}, {
    title: '注册资金（万元）',
    dataIndex: 'zczj',
    key: 'zczj',
    sorter: true,
}, {
    title: '法定代表人',
    dataIndex: 'fddbr',
    key: 'fddbr',
    sorter: true,
}, {
    title: '证书编号',
    dataIndex: 'zsbh',
    key: 'zsbh',
}, {
    title: '事务所性质',
    dataIndex: 'swsxz',
    key: 'swsxz',
}, {
    title: '城市',
    dataIndex: 'cs',
    key: 'cs',
}, {
    title: '总人数',
    dataIndex: 'zrs',
    key: 'zrs',
}, {
    title: '执业注税师人数',
    dataIndex: 'zyrs',
    key: 'zyrs',
}, {
    title: '成立时间',
    dataIndex: 'clsj',
    key: 'clsj',
    sorter: true,
}, {
    title: '操作',
    key: 'operation'
}];

const data = {
    colGroupNum: 2,
    props: [
        {
            id: 'dwmc',
            name: '单位名称：',
        },
        {
            id: 'cs',
            name: '所在城市：',
        },
        {
            id: 'fddbr',
            name: '法定代表人：',
        },
        {
            id: 'dzhi',
            name: '办公地址：',
        },
        {
            id: 'sjlzxsbwh',
            name: '省管理中心上报文号：',
        },
        {
            id: 'zcdz',
            name: '注册地址：',
        },
        {
            id: 'sglzxsbsj',
            name: '省管理中心上报时间：',
        },
        {
            id: 'zjpzsj',
            name: '总局批准时间：',
        },
        {
            id: 'yzbm',
            name: '邮政编码：',
        },
        {
            id: 'zjpzwh',
            name: '总局批准文号：',
        },
        {
            id: 'czhen',
            name: '传真：',
        },
        {
            id: 'dhua',
            name: '电话：',
        },
        {
            id: 'szyx',
            name: '所长邮箱：',
        },
        {
            id: 'txyxming',
            name: '通讯员姓名：',
        },
        {
            id: 'xtyyx',
            name: '通讯员邮箱：',
        },
        {
            id: 'xtyphone',
            name: '通讯员手机：',
        },
        {
            id: 'zsbh',
            name: '证书编号：',
        },
        {
            id: 'zczj',
            name: '注册资金：',
        },
        {
            id: 'jyfw',
            name: '经营范围：',
        },
        {
            id: 'zrs',
            name: '总人数：',
        },
        {
            id: 'swsxz',
            name: '机构性质：',
        },
        {
            id: 'szphone',
            name: '所长手机：',
        },
        {
            id: 'gsyhmcbh',
            name: '工商预核名称编号：',
        },
        {
            id: 'dzyj',
            name: '电子邮件：',
        },
        {
            id: 'yhdw',
            name: '预核单位：',
        },
        {
            id: 'yhsj',
            name: '预核时间：',
        },
        {
            id: 'gzbh',
            name: '公证编号：',
        },
        {
            id: 'gzdw',
            name: '公证单位：',
        },
        {
            id: 'gzry',
            name: '公证员：',
        },
        {
            id: 'gzsj',
            name: '公证时间：',
        },
        {
            id: 'yzbh',
            name: '验资编号：',
        },
        {
            id: 'yzdw',
            name: '验资单位：',
        },
        {
            id: 'yzry',
            name: '验资人员：',
        },
        {
            id: 'yzsj',
            name: '验资时间：',
        },
        {
            id: 'tthybh',
            name: '团体会员注册号：',
        },
        {
            id: 'rhsj',
            name: '入会时间：',
        },
        {
            id: 'khh',
            name: '开户行：',
        },
        {
            id: 'khhzh',
            name: '开户行帐号：',
        },
        {
            id: 'fj',
            name: '附件：',
        },
        {
            id: 'swdjhm',
            name: '税务登记号码：',
        },
        {
            id: 'jbqk',
            name: '情况简介：',
            groupspan: 2
        },
        {
            id: 'glzd',
            name: '事务所内部管理制度：', groupspan: 2
        },
        {
            id: 'gddh',
            name: '第一次股东会决议：', groupspan: 2
        },
        {
            id: 'bgcszczm',
            name: '办公场所的产权或使用权证明：', groupspan: 2
        },

    ]
}

const pageSetting = { //分页设置
    page: true, //是否分页
    pageSize: 5, //初始化显示记录条数
    showSizeChanger: true, //是否可以改变每页记录条数
    showTotal: true, //是否显示总条数
    showQuickJumper: true, //是否可以快速跳转至某页
    size: 'small', //分页样式，当为「small」时，是小尺寸分页
    pageSizeOptions: ['5', '10', '20', '30', '40'], //指定每页可以显示多少条，与showSizeChanger配合使用
    current: 1,
}

const columnsZyry = [{ //设定列
    title: '姓名', //设定该列名称
    dataIndex: 'xming', //设定该列对应后台字段名
    key: 'xming', //
    render(text, row, index){
        return (
            <span>
        <a href={"#/new_blank/sws/zyjbxx?" + row.zyid} target="_blank">{text}</a>
      </span>
        );
    }
}, {
    title: '是否出资人',
    dataIndex: 'czr',
    key: 'czr',

}, {
    title: '是否发起人',
    dataIndex: 'fqr',
    key: 'fqr',

}, {
    title: '是否所长',
    dataIndex: 'sz',
    key: 'sz',

}, {
    title: '打印预览',
    dataIndex: 'dy',
    key: 'dy',
    render(text) {
        return (
            <span>
        <a href="#">打印</a>
      </span>
        );
    }

},]
const columnsCyry = [{ //设定列
    title: '姓名', //设定该列名称
    dataIndex: 'xming', //设定该列对应后台字段名
    key: 'xming', //列key，必须设置，建议与字段名相同
    render(text, row, index){
        return (
            <span>
        <a href={"#/new_blank/sws/cyjbxx?" + row.cyid} target="_blank">{text}</a>
      </span>
        );
    }
}, {
    title: '学历',
    dataIndex: 'xl',
    key: 'xl',

}, {
    title: '身份证号',
    dataIndex: 'sfzh',
    key: 'sfzh',

}, {
    title: '职务（职称）',
    dataIndex: 'zc',
    key: 'zc',

}, {
    title: '打印预览',
    dataIndex: 'dy',
    key: 'dy',
    render(text) {
        return (
            <span>
        <a href="#">打印</a>
      </span>
        );
    }

},]
const columnsCzrlb = [{ //设定列
    title: '姓名', //设定该列名称
    dataIndex: 'xming', //设定该列对应后台字段名
    key: 'xming', //列key，必须设置，建议与字段名相同
}, {
    title: '出资额（万元）',
    dataIndex: 'cze',
    key: 'cze',

}, {
    title: '事务所名称',
    dataIndex: 'dwmc',
    key: 'dwmc',

}, {
    title: '身份证号',
    dataIndex: 'sfzh',
    key: 'sfzh',

}, {
    title: '打印预览',
    dataIndex: 'dy',
    key: 'dy',
    render(text) {
        return (
            <span>
        <a href="#">打印</a>
      </span>
        );
    }

},]
const columnsSwsbgxx = [{ //设定列
    title: '变更名称', //设定该列名称
    dataIndex: 'MC', //设定该列对应后台字段名
    key: 'MC', //列key，必须设置，建议与字段名相同
}, {
    title: '旧值',
    dataIndex: 'JZHI',
    key: 'JZHI',

}, {
    title: '新值',
    dataIndex: 'XZHI',
    key: 'XZHI',

}, {
    title: '更新时间',
    dataIndex: 'xgxsj',
    key: 'xgxsj',
    width: '90px',

},]
const columnsNjjl = [{ //设定列
    title: '年检年度', //设定该列名称
    dataIndex: 'nd', //设定该列对应后台字段名
    key: 'nd', //列key，必须设置，建议与字段名相同
}, {
    title: '事务所名称',
    dataIndex: 'dwmc',
    key: 'dwmc',

}, {
    title: '审核意见',
    dataIndex: 'spyj',
    key: 'spyj',

}, {
    title: '年检状态',
    dataIndex: 'njzt',
    key: 'njzt',

}, {
    title: '审批日期',
    dataIndex: 'spsj',
    key: 'spsj',

},]
const nbjgsz = [{ //设定列
    title: '部门名称', //设定该列名称
    dataIndex: 'BMMC', //设定该列对应后台字段名
    key: 'BMMC', //列key，必须设置，建议与字段名相同
}, {
    title: '基本职能',
    dataIndex: 'JBZN',
    key: 'JBZN',

}, {
    title: '人数',
    dataIndex: 'RS',
    key: 'RS',

}]

const model = {
    columns: columns,
    data: data,
    pageSetting: pageSetting,
    columnsZyry: columnsZyry,
    columnsCyry: columnsCyry,
    columnsCzrlb: columnsCzrlb,
    columnsSwsbgxx: columnsSwsbgxx,
    columnsNjjl: columnsNjjl,
    nbjgsz: nbjgsz,
}
module.exports = model