/**
 * Created by ming on 2016/4/11.
 */

const model = {
   columns: [
        {title: '序号', dataIndex: 'key', key: 'key'},           
        {title: '统计年度', dataIndex: 'nd', key: 'nd'},  
        {title: '人员总数', dataIndex: 'RYZS_RY_ZJ', key: 'RYZS_RY_ZJ'}, 
        {title: '执业总数', dataIndex: 'ZYSWS_RY_ZJ', key: 'ZYSWS_RY_ZJ'},  
        {title: '其他从业人数', dataIndex: 'QTCYRY_RY_ZJ', key: 'QTCYRY_RY_ZJ'}, 
        {title: '上报日期', dataIndex: 'SBRQ', key: 'SBRQ'},                  
        {title: '状态', key: 'ZTBJ', dataIndex: 'ZTBJ'},
    ]
};

module.exports = model;