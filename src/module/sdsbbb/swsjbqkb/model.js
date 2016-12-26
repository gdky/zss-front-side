import numeral from 'numeral'
const model = {
    columns: [
        {title: '序号', dataIndex: 'key', key: 'key'},
        {title: '事务所名称', dataIndex: 'dwmc', key: 'dwmc'},
        {title: '年度', dataIndex: 'nd', key: 'nd'},
        {title: '组织形式', key: 'jgxz', dataIndex: 'jgxz'},
        {title: '股东人数', key: 'czrs', dataIndex: 'czrs'},
        {title: '合伙人数', key: 'hhrs', dataIndex: 'hhrs'},
        {title: '人员总数', key: 'ryzs', dataIndex: 'ryzs'},
        {title: '执业人数', key: 'zyzcswsrs', dataIndex: 'zyzcswsrs'},
        {
            title: '注册资金（万元）',
            key: 'zczj',
            dataIndex: 'zczj',
            render(num){
                return numeral(num).format('0,0.00')
            }},
        {title: '机构所在地', key: 'cs', dataIndex: 'cs'},
        {title: '委托人户数', key: 'wths', dataIndex: 'wths'},
        {title: '状态', key: 'bbzt', dataIndex: 'bbzt'},
    ],
};

module.exports = model;