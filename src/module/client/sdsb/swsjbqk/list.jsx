import React from 'react'
import {Table, Row, Col, Button, Icon, notification, Alert} from 'antd'
import Panel from 'component/compPanel'
import req from 'reqwest';
import SearchForm from './searchForm'
import merge from 'lodash/merge';
import config from 'common/configuration'
import {isEmptyObject,jsonCopy} from 'common/utils'
import auth from 'common/auth'

const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;

const list = React.createClass({
    //初始化默认参数
    getDefaultProps(){
        let jgId = auth.getJgid();
        return {
            //接收的json数据中用来充当key的字段名
            keyCol: 'id',
            //默认每页显示数量
            pageSize: 10,
            //数据来源api
            apiUrl: config.HOST + config.URI_API_PROJECT + `/client/swsjbqk`,
            //初始搜索条件
            defaultWhere:{},
            //栏目名称
            title:'事务所基本情况表填报',
            //帮助信息title
            helperTitle:'使用说明',
            //帮助信息详细
            helperDesc:<div>
                <p>1.本表统计数据截至为统计年度的12月31日，上报截止期为次年3月31日。</p>
                <p>2.机构所在栏填写xx地区（市）xx县（市、区）。</p>
                <p>3.分所按所属地管理的原则填报。</p>
                <p>4.异地分所是指跨省、自治区、直辖市和计划单列市设立的分所。</p>
                <p>5.法定代表人栏、异地分所填写负责人的姓名</p>
                <p>6.所有项目均为必填项*。</p>
            </div>
        }
    },
    //初始化state
    getInitialState(){
        return {
            loading: false,
            data: [],
            entity: {},
            where: this.props.defaultWhere,
            searchToggle: false,
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: this.props.pageSize,
                showQuickJumper: true,
                pageSizeOptions: ['10', '20', '40'],
                showTotal (total) {
                    return `共 ${total} 条`
                }
            }
        }
    },
    //通过API获取数据
    fetchData(params = {page: 1, pagesize: this.props.pageSize}){
        this.setState({loading: true});
        const token = auth.getToken();
        const {apiUrl,defaultWhere} = this.props;
        let where = merge(jsonCopy(defaultWhere),params.where);
        if(!isEmptyObject(where)){
            params.where = encodeURIComponent(JSON.stringify(where))
        }
        req({
            url: apiUrl,
            type: 'json',
            method: 'get',
            data: params,
            headers: {'x-auth-token': token}
        }).then(resp=> {
            const p = this.state.pagination;
            p.current = params.page;
            p.pageSize = params.pagesize;
            p.total = resp.total > 1000 ? 1000 : resp.total;
            p.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
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
    handleChange(pagination, filters, sorter){
        let param = {
            page: pagination.current,
            pagesize: pagination.pageSize,
            where:this.state.where
        };
        this.fetchData(param)
    },

    //查询按钮开关
    handleSearchToggle(){
        this.setState({searchToggle: !this.state.searchToggle});
    },
    //查询提交
    handleSearchSubmit(values){
        const p = this.state.pagination;
        const param = {
            page: 1,
            pagesize: p.pageSize,
            where: values
        };
        this.fetchData(param);
    },
    //添加
    handleNew(){
        this.props.onNew();
    },

    //刷新按钮
    handleRefresh(){
        const p = this.state.pagination;
        this.fetchData({page:1, pagesize: p.pageSize});
    },
    //刷新当前页
    refreshCurrent(){
        const p = this.state.pagination;
        this.fetchData({page: p.current, pagesize: p.pageSize});
    },

    //帮助按钮开关
    helperToggle(){
        this.setState({helper: !this.state.helper})
    },
    //手动关闭帮助提示
    helperClose(){
        this.setState({helper: false})
    },
    //组件加载时读取数据
    componentDidMount(){
        if(isEmptyObject(this.props.stateShot)){
            this.fetchData();
        }else{
            this.setState({...this.props.stateShot})
        }
    },
    //unmount时记录目前状态
    componentWillUnmount(){
        this.props.grabState(this.state)
    },
    //行点击处理
    handleRowClick(record){
        this.state.entity = record;
        this.setState({entity:record})
    },
    render(){
        const {title, helperTitle, helperDesc, scrollx,keyCol,columns} = this.props;
        let toolbar = <ToolBar>
            <Button onClick={this.handleSearchToggle}>
                <Icon type="search"/>查询
                { this.state.searchToggle ? <Icon className="toggle-tip" type="circle-o-up"/> :
                    <Icon className="toggle-tip" type="circle-o-down"/>}
            </Button>

            <ButtonGroup>
                <Button  onClick={this.helperToggle}><Icon type="question"/></Button>
                <Button  onClick={this.handleRefresh}><Icon type="reload"/></Button>
            </ButtonGroup>

            <ButtonGroup>
                <Button type="primary" onClick={this.handleNew}><Icon type="file-text" /> 添加</Button>
            </ButtonGroup>
        </ToolBar>;
        return <div>
            {this.state.helper && <Alert message={helperTitle}
                                         description={helperDesc}
                                         type="info"
                                         closable
                                         onClose={this.helperClose}/>}
            <Panel title={title} toolbar={toolbar}>
                {this.state.searchToggle && <SearchForm
                    onSubmit={this.handleSearchSubmit}/>}
                <Table columns={columns}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleChange}
                       rowKey={record => record[keyCol]}
                       rowClassName={(record)=>{return record.id==this.state.entity.id?'row-selected':''}}
                       onRowClick={this.handleRowClick} scroll={{x: scrollx}}/>
            </Panel>
        </div>

    }
});

module.exports = list;