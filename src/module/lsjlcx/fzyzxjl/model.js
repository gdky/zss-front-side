import numeral from 'numeral'
const model = {
    columns: [
             {title: '序号', dataIndex: 'key', key: 'key'},
        {title: '姓名', dataIndex: 'XMING', key: 'XMING'},
        {title: '所属机构', dataIndex: 'ZZDW', key: 'ZZDW'},   
        {title: '性别', key: 'xb', dataIndex: 'xb'},
        {title: '学历', key: 'xl', dataIndex: 'xl'},
        {title: '职务', key: 'zw', dataIndex: 'zw'},
        {title: '原因', key: 'yy', dataIndex: 'yy'},
        {title: '注销日期', key: 'zxrq', dataIndex: 'zxrq'},
        {title: '审批日期', key: 'sprq', dataIndex: 'sprq'},
        {title: '状态', key: 'zt', dataIndex: 'zt'},
    ],
};

module.exports = model;