import React from 'react'
import {Table,Col,Row,Tree,Tabs,Modal,Button,Spin,notification,Icon} from 'antd'
import {Link} from 'react-router'
import Panel from 'component/compPanel'
import config from 'common/configuration'
import {SelectorDQ,SelectorCS,SelectorYear} from 'component/compSelector'
import model from './model.jsx'
import req from 'reqwest'
import auth from 'common/auth.js'
import {jsonCopy} from 'common/utils.js'

const PanelBar = Panel.ToolBar;
const ButtonGroup = Button.Group;
const CUSTOMER_URL = config.HOST + config.URI_API_PROJECT + '/jgsjfx/hynlsjfx';
const token = auth.getToken();

//获取客户信息列表
const fetchCustomers = function (param = {page: 1, pageSize: 10}) {
    return req({
        url: CUSTOMER_URL,
        method: 'get',
        type: 'json',
        data: param,
        headers:{'x-auth-token':token}
    })
};

//异步获取数据
const fetchData = async function () {
    let [customers] = await Promise.all([fetchCustomers()]);
    return {customers: customers}
};


//客户信息
const khxxList = React.createClass({
    getInitialState(){
        return {
            pageLoading: true,
            searchToggle:false,
            helper:false,
            customers: [],
            select: '',
            where: {},
            selectedRowKeys: [],
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: 10,
                showQuickJumper: true,
                pageSizeOptions: ['5', '10', '20']

            }
            
        }
    },

    componentDidMount(){
        
        fetchCustomers()
        .then(resp=> {
            const p = this.state.pagination;
            p.total = resp.total > 1000 ? 1000 : resp.total;
            p.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            
            this.setState({
                pageLoading: false,
                data: resp.data,
                pagination: p
            })
            })
        .fail(err=>{
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
        
        
        /*
        fetchData().then(resp=> {
            const p = this.state.pagination;
            p.total = resp.customers.total > 1000 ? 1000 : resp.customers.total;
            p.showTotal = total => {
                return `共 ${resp.customers.total} 条，显示前 ${total} 条`
            };
            
            this.setState({
                pageLoading: false,
                customers: resp.customers.data,
                pagination: p
            })
        }).catch(e=> {
            this.setState({pageLoading: false});
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                        <p>Status: {e.status}</p>
                    </div>  )
            });
        })
        */
    },

    //数据表换页
    handlePageChange(pager){
        fetchCustomers({
            page: pager.current,
            pageSize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(this.state.where))
        }).then(resp=> {
            pager.total = resp.total > 1000 ? 1000 : resp.total;
            pager.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            this.setState({pagination: pager, customers: resp.data});
        })
    },

    //打开关闭查询框
    handleSearchToggle(){
        this.setState({searchToggle: !this.state.searchToggle})
    },
    //刷新数据
    handleRefresh(){
        const pager = this.state.pagination;
        this.setState({pagination: pager, where: '',pageLoading:true});
        fetchCustomers().then(resp=> {
            pager.total = resp.total > 1000 ? 1000 : resp.total;
            pager.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            pager.current = 1;
            this.setState({customers: resp.data, where:'', pagination: pager,pageLoading:false});
        });
    },

    //帮助信息
    handleHelper(){
        this.setState({helper: !this.state.helper})
    },
    //查询提交
    handleSearchSubmit(commitValues){
        const values = new Object();
        for (let prop in commitValues) {
            if (commitValues[prop]){
                values[prop] = commitValues[prop].trim();
            }
        }
        this.setState({pageLoading:true});
        const pager = this.state.pagination;
        const param = {
            page:1,
            pageSize:pager.pageSize,
            where: encodeURIComponent(JSON.stringify(values))
        };
        fetchCustomers(param).then(resp=>{
            pager.total = resp.total > 1000 ? 1000 : resp.total;
            pager.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            pager.current = 1;
            this.setState({customers:resp.data,where:values, pagination: pager,pageLoading:false})
        })
    },
    
    //测试.....
    yearChange(year){
        this.setState({pageLoading:true});
        const pager = this.state.pagination;
        const param = {
            page:1,
            pageSize:pager.pageSize,
            where: encodeURIComponent(JSON.stringify({"year":year}))
        }
        fetchCustomers(param).then(resp=>{
            pager.total = resp.total > 1000 ? 1000 : resp.total;
            pager.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            pager.current = 1;
            this.setState({customers:resp.data,where:year, pagination: pager,pageLoading:false})
        })
    },
    
    //增加客户信息
    pageJump(){
       this.props.onPageJump('new')
    },
    //删除用户信息
    handleDel(record){
        req({
            url:CUSTOMER_URL + '/' +record.ID,
            method:'delete',
            type:'json',
            data: JSON.stringify(record),
            headers:{'x-auth-token':token}
        }).then(resp=>{
            notification.success({
                duration: 2,
                message: '操作成功',
                description: '客户信息已更新'
            });
            this.handleRefresh();
        }).fail(e=>{
            notification.error({
                duration: 2,
                message: '操作失败',
                description: '可能网络访问原因，请稍后尝试'
            });
        })
    },

    render(){
        /*
        const panelBar = <PanelBar>
            <Button onClick={this.handleSearchToggle}>
                <Icon type="search"/>查询
                { this.state.searchToggle ? <Icon className="toggle-tip" type="circle-o-up"/> :
                    <Icon className="toggle-tip" type="circle-o-down"/>}
            </Button>

            <ButtonGroup>
                <Button type="primary" onClick={this.handleHelper}><Icon type="question"/></Button>
                <Button type="primary" onClick={this.handleRefresh}><Icon type="reload"/></Button>
            </ButtonGroup>

        </PanelBar>;
        
        return <Spin spinning={this.state.pageLoading}>
                   <Panel title="已有客户列表"  toolbar={panelBar}>
                   {this.state.searchToggle && <SearchForm
                            onSubmit={this.handleSearchSubmit}/>}
                        <Table className="outer-border"
                               columns={model.columns}
                               dataSource={this.state.customers}
                               pagination={this.state.pagination}
                               onChange={this.handlePageChange}
                               
                               onRowClick={this.handleRowClick}
                        />
                   </Panel>
                </Spin>
                */
                /*
                return <Spin spinning={this.state.pageLoading}>
                    <Panel title="已有客户列表">
                        <Detail data={this.state.customers}/>
                    </Panel>
                   </Spin>
                */
                return <Spin spinning={this.state.pageLoading}>
                   <Panel title="已有客户列表" >
                        <Table className="outer-border"
                               columns={model.columns}
                               dataSource={this.state.data}
                               pagination={this.state.pagination}
                               rowKey={resp=>resp.ID}
                        />
                   </Panel>
                </Spin>
    }
});

module.exports = khxxList;