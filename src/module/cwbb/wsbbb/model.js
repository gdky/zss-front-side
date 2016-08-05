import numeral from 'Numeral'
const model = {
    columns: [
             {title: '序号', dataIndex: 'key', key: 'key'},
        {title: '报表年度', dataIndex: 'nd', key: 'nd'},
        {title: '机构名称', dataIndex: 'DWMC', key: 'DWMC'},   
        {title: '城市', key: 'cs', dataIndex: 'cs'},
        {title: '联系电话', key: 'DHUA', dataIndex: 'DHUA'},
        {title: '上报状态', key: 'ZTBJ', dataIndex: 'ZTBJ'},
    ],
};

module.exports = model;