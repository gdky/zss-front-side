import React from 'react'
import {Table,message,Button,Icon,Alert} from 'antd'
import Panel from 'component/compPanel'
import model from './model'
import req from 'common/request';
import SearchForm from './searchForm'
import Jzywtjbxx from './Jzywtjbxx'
import config from 'common/configuration'


const RJ_URL = config.HOST  + config.URI_API_PROJECT + '/rjb6/';
const API_URL = config.HOST + config.URI_API_PROJECT + '/sdsb/jzywtjb';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;


const jzywtjb = React.createClass({
    //初始化state
    getInitialState(){
        return {
            urls: '',
            entity: {},
            data: [],
            pagination: {
                
                current: 1,
                showSizeChanger: true,
                pageSize: 5,
                showQuickJumper: true,
                pageSizeOptions: ['5', '10', '20'],
                showTotal (total) {
                    return `共 ${total} 条`
                }
            },
            searchToggle: false,
            where: '',
            helper: false,
            detailHide: true
        }
    },

    //改变页码
    handleChange(pagination, filters, sorter){
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({pagination: pager,detailHide: true});
        
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
        this.setState({pagination: pager, where: '',detailHide: true});
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
        this.setState({pagination:pager,where: value,detailHide: true});
        this.fetchData(params);
        this.setState({searchToggle: false})
    },

    //通过API获取数据
    fetchData(params = {page: 1, pageSize: this.state.pagination.pageSize}){
        this.setState({loading: true});
        req({
            url: API_URL,
            method: 'get',
            data: params
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
        }).catch(e=> {
            this.setState({loading: false});
            message.error('网络访问故障');
        })
    },

     //获取表的详细信息
     fetch_jzywtjbxx(){
        req({
            url:API_URL+'/'+this.state.urls,
            method:'get'
        }).then(resp=>{
            this.setState({entity:resp.data,});
        }).catch(err=>{
            message.error('网络访问故障');
        })
    },
     //明细表关闭
    handleDetailClose(){
        this.setState({detailHide: true})
    },
    
    //点击某行
    onSelect(record) {

        this.state.urls = record.id;
        this.setState({detailHide:false});
        this.fetch_jzywtjbxx();
    },
    //处理退回
    handleReject(record){
        req({
            url:RJ_URL + record.id,
            method:'get',
        }).then(resp=>{
            this.handleRefresh()
        }).catch(e=>{
            message.error('网络访问故障')
        })
    },
    

    componentDidMount(){
        this.fetchData();
    },

    render(){
        let toolbar = <ToolBar>
            <Button onClick={this.handleSearchToggle}>
                <Icon type="search"/>查询
                { this.state.searchToggle ? <Icon className="toggle-tip" type="circle-o-up"/> :
                  <Icon className="toggle-tip" type="circle-o-down"/>}
            </Button>

            <ButtonGroup>
                <Button type="primary" onClick={this.handleHelper}><Icon type="question"/></Button>
                <Button type="primary" onClick={this.handleRefresh}><Icon type="reload"/></Button>
            </ButtonGroup>

        </ToolBar>;

        let helper = [];
        helper.push(<p key="helper-0">本功能主要提供查询</p>);
        helper.push(<p key="helper-1">查询相关事务所现</p>);
        model.setfunc(this.handleReject);

        return <div className="sdsb-jzywtjb">
            <div className="wrap">
                {this.state.helper && <Alert message="使用帮助"
                                             description={helper}
                                             type="info"
                                             closable
                                             onClose={this.handleHelperClose}/>}

                <Panel title="检索" toolbar={toolbar}>
                    {this.state.searchToggle && <SearchForm
                      onSubmit={this.handleSearchSubmit}/>}
                    <div className="h-scroll-table">
                        <Table columns={model.columns}
                               dataSource={this.state.data}
                               pagination={this.state.pagination}
                               loading={this.state.loading}
                               onChange={this.handleChange}
                               onRowClick={this.onSelect}/>
                    </div>
                </Panel>
              {this.state.detailHide ? null : <Panel title="详细信息"
              onClose={this.handleDetailClose}
              closable >
                <Jzywtjbxx data={this.state.entity} />  
                </Panel>}
            </div>
        </div>
    }
});

module.exports = jzywtjb;