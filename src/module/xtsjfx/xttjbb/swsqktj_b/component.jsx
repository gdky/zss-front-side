/*
事务所情况统计表b
*/
import React from 'react'
import {Table,Modal,Row,Col,Button,Icon,Alert,Select,Form} from 'antd'
import CompPageHead from 'component/CompPageHead'
import Panel from 'component/compPanel'
import {columns} from './model'
import req from 'reqwest';
import config from 'common/configuration'
import BaseTable from 'component/compBaseTable'
import {entityFormat} from 'common/utils'
import SelectorYear from './year'


const API_URL = config.HOST + config.URI_API_PROJECT + '/swstj1';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;


const swsqktj_b = React.createClass({
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
            searchToggle: false,
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

    //查询按钮
    handleSearchToggle(){
        this.setState({searchToggle: !this.state.searchToggle});
    },

    //刷新按钮
    handleRefresh(){
        const pager = this.state.pagination;
        pager.current = 1;
        this.setState({pagination: pager, where: ''});
        this.fetchData();
    },

    //帮助按钮
    handleHelper(){
        this.setState({helper: !this.state.helper})
    },
    //手动关闭帮助提示
    handleHelperClose(){
        this.setState({helper: false})
    },

    //提交条件查询
    handleSearchSubmit(value){
        const pager = this.state.pagination;
        pager.current = 1;
        const params = {
            page: 1,
            pageSize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(value))
        };
        this.setState({pagination: pager, where: value});
        this.fetchData(params);
        this.setState({searchToggle: false})
    },

    //点击某行
    handleRowClick(record){
        req({
            url: API_URL + '/' + record.id,
            type: 'json',
            method: 'get'
        }).then(resp=> {
            let entity = entityFormat(resp,entityModel);
            this.setState({entity: entity,detailHide:false});
        }).fail(err=> {
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
    //明细表关闭
    handleDetailClose(){
        this.setState({detailHide: true})
    },
    
    //通过API获取数据
    fetchData(params = {year:this.state.year}){
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
        const params={
             year:2016
        }
        this.fetchData(params);
    },
    //下拉框选择日期执行的方法
    handleYearChange(value){
             const params={
            year:value
           };
           
       this.fetchData(params) 
    },

    render(){
       //定义工具栏内容
        let toolbar = <ToolBar><SelectorYear style={{width:'100px'}} onChange={this.handleYearChange}/>

        </ToolBar>;

        //定义提示内容
        let helper = [];
        helper.push(<p key="helper-0">下拉选择年份可以查看当年机构详细信息</p>);
   

        return <div className="xttjbb-swsqktj_b">
            <div className="wrap">
                {<Alert message="操作提示"
                                         description={helper}
                                             type="info"
                                             />}

                <Panel title="事物所情况统计" toolbar={toolbar}> 
               
                    {this.state.searchToggle && <SearchForm
                        onSubmit={this.handleSearchSubmit}/>}
                    <div className="h-scroll-table">
                        <Table columns={columns}
                               dataSource={this.state.data}
                               pagination={!this.state.pagination}
                               loading={this.state.loading}
                               onChange={this.handleSelectYear}
                               />
                    </div>
                </Panel>
               
            </div>
        </div>
    }
});

module.exports =swsqktj_b;
