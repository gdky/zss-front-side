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
const CUSTOMER_URL = config.HOST + config.URI_API_PROJECT + '/rynjsjfxb';
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
            selectedRowKeys: []
        }
    },

    componentDidMount(){
        fetchData().then(resp=>{ 
            this.setState({
                pageLoading: false,
                customers: resp.customers.data
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
    },

    //年度下拉框
    yearChange(year){
        this.setState({pageLoading:true});
        const param = {
            page:1,
            pageSize:10,
            where: encodeURIComponent(JSON.stringify({"year":year}))
        }
        fetchCustomers(param).then(resp=>{
            this.setState({customers:resp.data,where:year,pageLoading:false})
        })
    },

    render(){  
         return <Panel title="人员年检数据分析">
                    年度：<SelectorYear onChange={this.yearChange} style={{"width":"100px"}}/>             
                    <Table className="outer-border"
                           columns={model.columns}
                           dataSource={this.state.customers}
                           rowKey={record=>record.mc}
                           pagination={false}/>
                 </Panel>
    }
});

module.exports = khxxList;