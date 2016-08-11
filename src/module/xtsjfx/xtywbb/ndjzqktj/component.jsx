import React from 'react'
import {Table,Modal,Row,Col,Button,Icon,Alert} from 'antd'
import CompPageHead from 'component/CompPageHead'
import Panel from 'component/compPanel'
import {columns,entityModel} from './model'
import req from 'reqwest';

import config from 'common/configuration'
import BaseTable from 'component/compBaseTable'
import {entityFormat} from 'common/utils'



const API_URL = config.HOST + config.URI_API_PROJECT + '/ndjzqktj';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;


const ndjzqktj = React.createClass({
    //初始化state
    getInitialState(){
        return {
            data: [],
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: 5,
                showQuickJumper: true,
                pageSizeOptions: ['5', '10', '20']

            },
           
            detailViewToggle: false,
            where: '',
            helper: false,
            entity: '',
            detailHide: true
        }
    },

    //改变页码
    handleChange(pagination, filters, sorter){
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({pagination: pager});

        this.fetchData({
            page: pager.current,
            pageSize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(this.state.where))
        })
    },

    //通过API获取数据
    fetchData(params = {page: 1, pageSize: this.state.pagination.pageSize}){
        this.setState({loading: true});
        req({
            url: API_URL,
            type: 'json',
            method: 'get',
            data: params,
            contentType: 'application/json'
        }).then(resp=> {
            const p = this.state.pagination;
            p.total = resp.total > 1000 ? 1000 : resp.total;
            p.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            this.setState({
                data: resp.data,
                pagination: p,
                loading: false
            })
        }).fail(err=> {
            this.setState({loading: false});
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                        <p>Status: {err.status}</p>
                    </div>  )
            });
        })
    },

    componentDidMount(){
        this.fetchData();
    },

    render(){
        

        

        return <div className="xtywbb-ndjzqktj">
            <div className="wrap">
                
<Panel title="年度鉴证情况统计">
                    <div className="h-scroll-table">
                        <Table columns={columns}
                               dataSource={this.state.data}
                               rowKey={resp=>resp.xmlx}
                               pagination={this.state.pagination}
                               loading={this.state.loading}
                               onChange={this.handleChange}
                    />
                    </div>
                </Panel>
                
            </div>
        </div>
    }
});

module.exports = ndjzqktj;