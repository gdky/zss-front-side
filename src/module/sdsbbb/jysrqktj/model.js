import numeral from 'numeral'
const model = {
    columns: [
        {title: '序号', dataIndex: 'key', key: 'key'},
        {title: '事务所名称', dataIndex: 'dwmc', key: 'dwmc'},
        {title: '统计年度', dataIndex: 'ND', key: 'ND'},
        {title: '收入总额', key: 'SRZE', dataIndex: 'SRZE'},
        {title: '支出总额', key: 'ZCZE', dataIndex: 'ZCZE'},
        {title: '利润总额', key: 'QTCYRY_RY_ZJ', dataIndex: 'QTCYRY_RY_ZJ'},
        {title: '所在城市', key: 'cs', dataIndex: 'cs'},
        {title: '上报日期', key: 'sbsj', dataIndex: 'sbsj'},
        {title: '状态', key: 'bbzt', dataIndex: 'bbzt'},
    ],
};

module.exports = model;