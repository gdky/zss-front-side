import React from 'react'
import {Table,Modal,Row,Col,Button,Icon,Alert} from 'antd'
import { Router, Route, Link } from 'react-router'
import Panel from 'component/compPanel'
import req from 'reqwest';
import auth from 'common/auth'
import SearchForm from './searchForm'
import config from 'common/configuration'


const API_URL = config.HOST + config.URI_API_PROJECT + '/spapi/swswspcx';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;


const swswspcx = React.createClass({
    //初始化state
    getInitialState(){
        return {
            data: [],
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: 8,
                showQuickJumper: true,
                pageSizeOptions: ['5', '10', '20']
                 },
            searchToggle: false,
            where: '',
            helper: false,
            entity: '',
            detailHide: true
        }
    },

    //通过API获取数据
    fetchData(){
        this.setState({loading: true});
        req({
            url: API_URL,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
                headers:{'x-auth-token':auth.getToken()}
        }).then(resp=> {
            this.setState({
                data: resp,
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
    ztRender(text, row, index) {
                    if (row.wss==0) {
                        return <p>无审批事项</p>;
                    };
                    return <Link to={"spsh/module/"+row.lid+"?"+encodeURIComponent(row.jgid)}>[处理事项]</Link>;
  },

    componentDidMount(){
        this.fetchData();
    },

    render(){
        const columns=[
        { //设定列
                  title: '序号', //设定该列名称
                  dataIndex: 'xh', //设定该列对应后台字段名
                  key: 'xh', //列key，必须设置，建议与字段名相同
                  render(text, row, index){
                    return <p>{index+1}</p>;
                  },
        },
        {title: '审批事项名称', dataIndex: 'wsxm', key: 'wsxm'},
        {title: '待审批数', dataIndex: 'wss', key: 'wss'},
        {
              title: '操作',
              key: 'operation',
             render:this.ztRender,
            }
    ]
        return <div className="swswspcx">
            <div className="wrap">
                <Panel title="事务所内部审批" >
                    <div className="h-scroll-table">
                        <Table columns={columns}
                               dataSource={this.state.data}
                               loading={this.state.loading}
                               onChange={this.handleChange}
                               onRowClick={this.handleRowClick}/>
                    </div>
                </Panel>
                
            </div>
        </div>
    }
});

module.exports = swswspcx;