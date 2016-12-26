import React from 'react'
import {Table, Modal, Row, Col, Button, Icon, Alert,message} from 'antd'
import CompPageHead from 'component/CompPageHead'
import Panel from 'component/compPanel'
import {entityModel} from './model'
import req from 'reqwest';
import SearchForm from './searchForm'
import Add from './Add'
import Update from './Update'
import auth from 'common/auth'
import config from 'common/configuration'
import DetailBox from './detailbox.jsx'

const API_URL = config.HOST + config.URI_API_PROJECT + '/add/zcmxb';
const URL = config.HOST + config.URI_API_PROJECT + '/addzcmxb';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;

const zcmxb = React.createClass({
    //初始化state
    getInitialState() {
        return {
            data: [],
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: 5,
                showQuickJumper: true,
                pageSizeOptions: ['5', '10', '20'],
                alert: ''

            },
            searchToggle: false,
            detailViewToggle: false,
            where: '',
            helper: false,
            entity: '',
           fileds:{},
            views:0,
            viewTitle:'支出明细表',
        }
    },

    //改变页码
    handleChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({ pagination: pager});

        this.fetchData({
            page: pager.current,
            pageSize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(this.state.where))
        })
    },

    //查询按钮
    handleSearchToggle() {
        this.setState({ searchToggle: !this.state.searchToggle,});
    },

    //刷新按钮
    handleRefresh() {
        const pager = this.state.pagination;
        pager.current = 1;
        this.setState({ pagination: pager, where: '',});
        this.fetchData();
    },

    //帮助按钮
    handleHelper() {
        this.setState({ helper: !this.state.helper })
    },
        //手动关闭帮助提示
    handleHelperClose() {
        this.setState({ helper: false })
    },

    handleViewChange(e) {
        let tl=this.state.viewTitle;
        switch(e){
            case 0 :tl="支出明细表";this.setState({fileds:{}}); break;
            case 1 :tl="添加支出明细表";break;
            case 2 :tl="支出明细表修改";break;
            case 3 :tl="支出明细表查看";break;
        }
        this.setState({  views: e,viewTitle:tl});
       
    },

    handleRowClick(record, index){
        let fs ={};
        for(var key in record){
            let newkey = key.toLowerCase();
            fs[newkey] = record[key];
        }
        this.setState({ fileds: fs,entity:record});
    },

        //点击保存
    handleSubmit(lx,value) {
        if (lx=='a') {
            this.fetchHandle(value,'','post'); 
        }else if (lx=='b') {
            this.fetchHandle(value,("/"+value.id),'put'); 
        };
    },
    fetchHandle(value,ur,met) {
        req({
            url: URL+ur,
            type: 'json',
            method: met,
            data: JSON.stringify(value),
            headers:{'x-auth-token':auth.getToken()},
            contentType:'application/json',            
        }).then(resp => {
            Modal.success({
                title: '系统消息',
                content: (
                    <div>
                        <p>操作成功</p>
                    </div>),       
            });
            this.setState({bloading:!this.state.bloading})
            this.fetchData();
        }).fail(err => {
            this.setState({bloading:!this.state.bloading})
            message.error('Status Code:' + err.status + '  api错误 ')
        })
    },
 
    //提交条件查询
    handleSearchSubmit(value) {
        const pager = this.state.pagination;
        pager.current = 1;
        const params = {
            page: 1,
            pageSize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(value))
        };
        this.setState({ pagination: pager, where: value });
        this.fetchData(params);
    },

    //通过API获取数据
    fetchData(params = { page: 1, pageSize: this.state.pagination.pageSize }) {
        this.setState({ loading: true });
        req({
            url: API_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers:{'x-auth-token':auth.getToken()},
            contentType:'application/json',
        }).then(resp => {
            const p = this.state.pagination;
            p.total = resp.total > 1000 ? 1000 : resp.total;
            p.showTotal = total => {
                return `共 ${resp.total} 条`
            };
            this.setState({
                data: resp.data,
                pagination: p,
                loading: false
            })
            this.handleViewChange(0);
        }).fail(err => {
            this.setState({ loading: false });
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                        <p>Status: {err.status}</p>
                    </div>)
            });
        })
    },

    dealWithChanged(key,value){
        let fs=this.state.fileds;
        fs[key]=value;
        fs.zyywcb1=Number(!fs.gzfy1?0:fs.gzfy1)+Number(!fs.flf1?0:fs.flf1)+Number(!fs.jyf1?0:fs.jyf1)
                            +Number(!fs.ghjf1?0:fs.ghjf1)+Number(!fs.shtc1?0:fs.shtc1)+Number(!fs.bgf1?0:fs.bgf1)
                            +Number(!fs.clf1?0:fs.clf1)+Number(!fs.hf1?0:fs.hf1)+Number(!fs.pxzlf1?0:fs.pxzlf1)
                            +Number(!fs.hwf1?0:fs.hwf1)+Number(!fs.zpf1?0:fs.zpf1)+Number(!fs.zj1?0:fs.zj1)
                            +Number(!fs.zfgjj1?0:fs.zfgjj1)+Number(!fs.gwzxf1?0:fs.gwzxf1)+Number(!fs.qt1?0:fs.qt1);
        fs.zyywcb=Number(!fs.gzfy?0:fs.gzfy)+Number(!fs.flf?0:fs.flf)+Number(!fs.jyf?0:fs.jyf)
                            +Number(!fs.ghjf?0:fs.ghjf)+Number(!fs.shtc?0:fs.shtc)+Number(!fs.bgf?0:fs.bgf)
                            +Number(!fs.clf?0:fs.clf)+Number(!fs.hf?0:fs.hf)+Number(!fs.pxzlf?0:fs.pxzlf)
                            +Number(!fs.hwf?0:fs.hwf)+Number(!fs.zpf?0:fs.zpf)+Number(!fs.zj?0:fs.zj)
                            +Number(!fs.zfgjj?0:fs.zfgjj)+Number(!fs.gwzxf?0:fs.gwzxf)+Number(!fs.qt?0:fs.qt);
        fs.glfy1=Number(!fs.glfy_gzfy1?0:fs.glfy_gzfy1)+Number(!fs.glfy_flf1?0:fs.glfy_flf1)+Number(!fs.glfy_ywzdf1?0:fs.glfy_ywzdf1)
                            +Number(!fs.glfy_bgf1?0:fs.glfy_bgf1)+Number(!fs.glfy_qtsj1?0:fs.glfy_qtsj1)+Number(!fs.glfy_qcfy1?0:fs.glfy_qcfy1)
                            +Number(!fs.glfy_zyfxjj1?0:fs.glfy_zyfxjj1)+Number(!fs.glfy_zyzrbx1?0:fs.glfy_zyzrbx1)
                            +Number(!fs.glfy_clf1?0:fs.glfy_clf1)+Number(!fs.glfy_qtfy1?0:fs.glfy_qtfy1);
        fs.glfy=Number(!fs.glfy_gzfy?0:fs.glfy_gzfy)+Number(!fs.glfy_flf?0:fs.glfy_flf)+Number(!fs.glfy_ywzdf?0:fs.glfy_ywzdf)
                            +Number(!fs.glfy_bgf?0:fs.glfy_bgf)+Number(!fs.glfy_qtsj?0:fs.glfy_qtsj)+Number(!fs.glfy_qcfy?0:fs.glfy_qcfy)
                            +Number(!fs.glfy_zyfxjj?0:fs.glfy_zyfxjj)+Number(!fs.glfy_zyzrbx?0:fs.glfy_zyzrbx)
                            +Number(!fs.glfy_clf?0:fs.glfy_clf)+Number(!fs.glfy_qtfy?0:fs.glfy_qtfy);
        fs.zczj1=Number(!fs.zyywsjfj1?0:fs.zyywsjfj1)+Number(!fs.qtywzc1?0:fs.qtywzc1)+Number(!fs.cwfy1?0:fs.cwfy1)
                            +Number(!fs.yywzc1?0:fs.yywzc1)+Number(fs.zyywcb1)+Number(fs.glfy1);
        fs.zczj=Number(!fs.zyywsjfj?0:fs.zyywsjfj)+Number(!fs.qtywzc?0:fs.qtywzc)+Number(!fs.cwfy?0:fs.cwfy)
                            +Number(!fs.yywzc?0:fs.yywzc)+Number(fs.zyywcb)+Number(fs.glfy);
        this.setState({fileds:fs});
    },

    onReset(){
        let fs ={};
        let record=this.state.entity;
        for(var key in record){
            let newkey = key.toLowerCase();
            fs[newkey] = record[key];
        }
        this.setState({ fileds: fs});
    },

    componentDidMount() {
        this.fetchData();
    },
    
    rowRender(text,record,index){
            var that = this;
             return ( 
                        <span> 
                            <Button disabled={record.zt=="提交"?true:false} size="small" onClick={that.handleViewChange.bind(this,2)} ><Icon type="edit" />编辑</Button>
                            <Button size="small" onClick={that.handleViewChange.bind(this,3)} ><Icon type="book" />查看</Button>
                      </span> 
          )
    },

    render() {
        const column=[
                {title: '序号', dataIndex: 'key', key: 'key'},       
                {title: '事务所名称', dataIndex: 'DWMC', key: 'DWMC'},
                {title: '主营业务成本（单位：元）', dataIndex: 'ZYYWCB', key: 'ZYYWCB'},
                {title: '年度', dataIndex: 'ND', key: 'ND'},
                {title: '统计时间', dataIndex: 'tjsj', key: 'tjsj',
                    render(text,record,index){
                         return <span>{!record.A?null:record.A+" 至 "+record.B}</span>
                        }},
                {title: '状态', key: 'zt', dataIndex: 'zt'},
                {title: '操作', key: 'operation', render:this.rowRender,}
                ];
        //定义工具栏内容
        let toolbar = <ToolBar>
                {this.state.views==0 ? <Button onClick={this.handleViewChange.bind(this,1)}>添加<Icon className="toggle-tip" type="plus-square"/></Button>
                                                             :<Button onClick={this.handleViewChange.bind(this,0)}>返回<Icon className="toggle-tip" type="arrow-left"/></Button>}
                { this.state.views==0 && <Button onClick={this.handleSearchToggle}>
                                                            <Icon type="search"/>查询
                                                            { this.state.searchToggle ? <Icon className="toggle-tip" type="circle-o-up"/> :
                                                                <Icon className="toggle-tip" type="circle-o-down"/>}
                                                            </Button>}
                {this.state.views==0 && <ButtonGroup>
                                                            <Button type="primary" onClick={this.handleHelper}><Icon type="question"/></Button>
                                                            <Button type="primary" onClick={this.handleRefresh}><Icon type="reload"/></Button>
                                                            </ButtonGroup>}
                            </ToolBar>;
        let helper = [];
        helper.push(<p key="helper-0">点击查询结果查看支出明细表明细</p>);
        helper.push(<p key="helper-1">也可以添加修改和提交支出明细表</p>);
        return <div className="cwbb-zcmx">
            <div className="wrap">
                {this.state.helper && <Alert message="支出明细表检索查询帮助"
                    description={helper} type="info" closable onClose={this.handleHelperClose}/>}
                <Panel title={this.state.viewTitle} toolbar={toolbar}>
                    {this.state.searchToggle && <SearchForm
                        onSubmit={this.handleSearchSubmit}/>}
                    { this.state.views==0 &&  <div className="h-scroll-table">
                                                        <Table columns={column}
                                                            dataSource={this.state.data}
                                                            pagination={this.state.pagination}
                                                            loading={this.state.loading}
                                                            onChange={this.handleChange}
                                                            onRowClick={this.handleRowClick}/>
                                                        </div>}
                    {this.state.views==1 && <Add onSubmit={this.handleSubmit.bind(this,'a')}  changed={this.dealWithChanged} 
                                                                    data={this.state.fileds} loading={this.state.bloading}  />}
                    {this.state.views==2 && <Update onSubmit={this.handleSubmit.bind(this,'b')} data={this.state.fileds} 
                                                                    changed={this.dealWithChanged} loading={this.state.bloading} onReset={this.onReset} />}
                    {this.state.views==3&&<DetailBox data={this.state.entity}/>}
                </Panel>
            </div>
        </div>
    }
});

module.exports = zcmxb;