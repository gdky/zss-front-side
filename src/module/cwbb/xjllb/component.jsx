import React from 'react'
import {Table,Button,Icon,Alert,message} from 'antd'
import Panel from 'component/compPanel'
import model from './model'
import req from 'reqwest';
import auth from 'common/auth'
import SearchForm from './searchForm'
import Xjllbxx from './Xjllbxx'
import config from 'common/configuration'
import Export from 'component/ComExcelExperss';


const RJ_URL = config.HOST  + config.URI_API_PROJECT + '/rjxjllb/';
const API_URL = config.HOST + config.URI_API_PROJECT + '/cwbb/xjllb';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;


const xjllb = React.createClass({
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
    //生成全部导出url
    genAllApi(){
        let where = encodeURIComponent(JSON.stringify(this.state.where));
        if(!!where) {
            let str = API_URL + '?page=1&pageSize=65535&where=' + where;
            return str
        }
    },

    //通过API获取数据
    fetchData(params = {page: 1, pageSize: this.state.pagination.pageSize}){
        this.setState({loading: true});
        req({
            url: API_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers:{'x-auth-token':auth.getToken()},
            contentType: 'application/json'
        }).then(resp=> {
            if(resp.data.length!=0){
            const p = this.state.pagination;
            p.total = resp.total;
            this.setState({data: resp.data, pagination: p, loading: false,});
         
            }else{
                  const pagination = this.state.pagination;
                   pagination.total = 0;
                    this.setState({data: [],entity: {},loading:false});
            }
        }).fail(err=> {
            this.setState({loading: false});
            message.error('网络访问故障')
        })
    },
     //获取表的详细信息
  
     fetch_xjllbxx(){
        req({
            url:API_URL+'/'+this.state.urls,
            type:'json',
            method:'get',
            headers:{'x-auth-token':auth.getToken()},
            contentType: 'application/json'
        }).then(resp=>{
         
            
            this.setState({entity:resp.data,});
        }).fail(err=>{
            message.error('网络访问故障')
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
        this.fetch_xjllbxx();
    },
    //处理退回
    handleReject(record){
        req({
            url:RJ_URL + record.id,
            method:'get',
            headers: {'x-auth-token': auth.getToken()},
            contentType: 'application/json'
        }).then(resp=>{
            this.handleRefresh()
        }).fail(e=>{
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
            <Export resData={this.state.data} butName="导出" model={model.columns} fileName={'利润表分配表'}
                    getAllApi={this.genAllApi()} all />

            <ButtonGroup>
                <Button type="primary" onClick={this.handleHelper}><Icon type="question"/></Button>
                <Button type="primary" onClick={this.handleRefresh}><Icon type="reload"/></Button>
            </ButtonGroup>

        </ToolBar>;

        let helper = [];
        helper.push(<p key="helper-0">本功能主要提供现金流量表查询</p>);
        helper.push(<p key="helper-1">查询相关事务所现金流量表</p>);

        model.setfunc(this.handleReject);

        return <div className="cwbb-xjllb">
            <div className="wrap">
                {this.state.helper && <Alert message="现金流量表使用帮助"
                                             description={helper}
                                             type="info"
                                             closable
                                             onClose={this.handleHelperClose}/>}

                <Panel title="现金流量表检索" toolbar={toolbar}>
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
              {this.state.detailHide ? null : <Panel title="现金流量表详细信息"
              onClose={this.handleDetailClose}
              closable >
                <Xjllbxx data={this.state.entity} />  
                </Panel>}
            </div>
        </div>
    }
});

module.exports = xjllb;