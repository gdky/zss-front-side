/**
 * Created by ming on 2016/4/11.
 */

const model = {
    columns: [
        { title: '序号', dataIndex: 'key', key: 'key', width: 60 },
        { title: '年度', dataIndex: 'nd', key: 'nd', width: 50 },
        { title: '单位名称', dataIndex: 'DWMC', key: 'DWMC'},
        { title: '收入总额（单位：万元）', dataIndex: 'SRZE', key: 'SRZE', width: 150 },
        { title: '支出总额（单位：万元）', dataIndex: 'ZCZE', key: 'ZCZE', width: 150 },
        { title: '利润总额（单位：万元）', dataIndex: 'LRZE', key: 'LRZE', width: 150 },
        { title: '状态', key: 'ZTMC', dataIndex: 'ZTMC',width: 100},
    ]
};

module.exports = model;