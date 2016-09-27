import React from 'react'
import {Table, Button, Icon, notification} from 'antd'
import model from './modelZysws'

const list = React.createClass({
    getDefaultProps(){
        return{
            pageSize:5,
            keyCol:'id',
            columns:model.columns,
            data:[]
        }
    },

    //初始化state
    getInitialState(){
        return {
            loading: false,
            data: [],
            pagination: {
                current: 1,
                pageSize: this.props.pageSize,
                showTotal (total) {
                    return `共 ${total} 人`
                }
            }
        }
    },
    getColWidth(model){
        let w = 0;
        model.columns.map(item=> {
            w = item.width ? w + item.width : w + 100;
        });
        return w;
    },
    //通过API获取数据
    fetchData(params){
        const {fetch} = this.props;
        this.setState({loading: true});
        fetch({
            method: 'get',
            data: params
        }).then(resp=> {
            const p = this.state.pagination;
            p.current = params.page;
            p.pageSize = params.pagesize;
            p.total = resp.total > 1000 ? 1000 : resp.total;
            p.showTotal = total => {
                return `共 ${total} 人`
            };
            this.setState({data: resp.data, pagination: p, loading: false,where:where})
        }).fail(e=> {
            this.setState({loading: false});
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '可能网络访问原因，请稍后尝试'
            });
        })
    },

    //改变页码
    handleChange(pagination){
        let params = {
            page: pagination.current,
            pagesize: pagination.pageSize,
        };
        this.fetchData(params)
    },

    render(){
        const {keyCol,columns,data} = this.props;
        return  <Table columns={columns}
                       dataSource={data || this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleChange}
                       rowKey={record => record[keyCol]}
                       scroll={{x: this.getColWidth(model)}}
                       size="middle"/>
    }
});

module.exports = list;