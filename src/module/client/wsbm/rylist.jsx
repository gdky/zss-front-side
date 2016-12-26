import React from 'react'
import {Table} from 'antd'

const c = React.createClass({
    //表格中的复选框勾选
    handleSelectedRowChange(selectedRowKeys){
        this.props.onSelected(selectedRowKeys)
    },
    render(){
        const columns = [{
            title: '姓名',
            dataIndex: 'xming',
            key: 'xh',
            width: 100
        }, {
            title: '性别',
            dataIndex: 'xb',
            key: 'xb',
            width: 50
        }, {
            title: '职务',
            key: 'zw',
            dataIndex: 'zw',
            width: 100
        }, {
            title: '移动电话',
            key: 'yddh',
            dataIndex: 'yddh',
            width: 100
        }, {
            title: '入住时间',
            key: 'rzsj',
            dataIndex: 'rzsj',
        }, {
            title: '离开时间',
            key: 'lksj',
            dataIndex: 'lksj',
        }, {
            title: '房型',
            key: 'fjlx',
            dataIndex: 'fjlx',
            render(t, r){
                    return t==1?'单人房':'双人房'
            }
        }, {
            title: '就餐类型',
            key: 'jclx',
            dataIndex: 'jclx',
        }, {
            title: '备注',
            key: 'bz',
            dataIndex: 'bz',
        }];
        const {data, selectedRowKeys} = this.props;
        const rowSelection = {
            type: 'checkbox',
            selectedRowKeys: selectedRowKeys,
            onChange: this.handleSelectedRowChange
        };
        if (data.length > 0) {
            data.map(item=> {
                let jclx = [!item.zaoc ? '_' : '早', !item.wuc ? '_' : '午', !item.wanc ? '_' : '晚'];
                jclx = jclx.join('/');
                item.jclx = jclx;
                return item
            })
        }
        return <div >
            <Table dataSource={data}
                   columns={columns}
                   pagination={false}
                   rowSelection={rowSelection}
                   selectedRowKeys={selectedRowKeys}
                   size="small"/>
        </div>

    }
})

module.exports = c;