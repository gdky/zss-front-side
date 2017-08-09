import React from 'react'
import {Table,Button,Icon,Alert,message} from 'antd'
import Panel from 'component/compPanel'
import model from './model'
import req from 'reqwest';
import auth from 'common/auth'
import SearchForm from './searchForm'
import config from 'common/configuration'
import DetailBox from './detailbox.jsx'

const RJ_URL = config.HOST  + config.URI_API_PROJECT + '/rjb2/';
const API_URL = config.HOST + config.URI_API_PROJECT + '/hyryqk1';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;


const lrb = React.createClass({
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
            pagenum: pager.current,
            pagesize: pager.pageSize,
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
            pagenum: 1,
            pagesize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(value))
        };
        this.setState({pagination: pager, where: value});
        this.fetchData(params)
    },

    //点击某行
    handleRowClick(record){
            this.setState({entity: record,detailHide:false});
    },
    //明细表关闭
    handleDetailClose(){
        this.setState({detailHide: true})
    },

    //通过API获取数据
    fetchData(params = {pagenum: 1, pagesize: this.state.pagination.pageSize}){
        this.setState({loading: true});
        req({
            url: API_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers:{'x-auth-token':auth.getToken()}
        }).then(resp=> {
            const p = this.state.pagination;
            p.total = resp.page.pageTotal > 1000 ? 1000 : resp.page.pageTotal;
            p.showTotal = total => {
                return `共 ${resp.page.pageTotal} 条，显示前 ${total} 条`
            };
            this.setState({
                data: resp.data,
                pagination: p,
                loading: false
            })
        }).fail(err=> {
            this.setState({loading: false});
            message.error('网络访问故障')
        })
    },
    //处理退回
    handleReject(record){
        req({
            url:RJ_URL + record.ID,
            method:'get',
            headers:{'x-auth-token':auth.getToken()},
            type:'json'
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
        //定义工具栏内容
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

        //定义提示内容
        let helper = [];
        helper.push(<p key="helper-0">点击查询结果查看执业税务师行业人员情况统计表明细</p>);
        helper.push(<p key="helper-1">检索功能只显示前1000条记录</p>);
        model.setfunc(this.handleReject);

        return <div className="hyryqktj">
            <div className="wrap">
                {this.state.helper && <Alert message="执业税务师行业人员情况统计表检索查询帮助"
                                             description={helper}
                                             type="info"
                                             closable
                                             onClose={this.handleHelperClose}/>}

                <Panel title="执业税务师行业人员情况统计表" toolbar={toolbar}>
                    {this.state.searchToggle && <SearchForm
                        onSubmit={this.handleSearchSubmit}/>}
                    <div className="h-scroll-table">
                        <Table columns={model.columns}
                               dataSource={this.state.data}
                               pagination={this.state.pagination}
                               loading={this.state.loading}
                               onChange={this.handleChange}
                               onRowClick={this.handleRowClick}/>
                    </div>
                </Panel>
                {this.state.detailHide ? null : <Panel 
                                                       onClose={this.handleDetailClose}
                                                       closable>
                    <DetailBox data={this.state.entity}/>
                </Panel>}
            </div>
        </div>
    }
});

module.exports = lrb;