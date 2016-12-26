import React from 'react'
import { Table, Modal, Button, Icon, Alert, notification, message } from 'antd'
import CompPageHead from 'component/CompPageHead'
import Panel from 'component/compPanel'
import { entityModel } from './model'
import req from 'reqwest';
import SearchForm from './searchForm'
import Add from './Add'
import Update from './Update'
import auth from 'common/auth'
import config from 'common/configuration'
import cloneDeep from 'lodash/cloneDeep'
import BaseTable from 'component/compBaseTable'
import { entityFormat } from 'common/utils'
import DetailBox from './detailbox.jsx'

const API_URL = config.HOST + config.URI_API_PROJECT + '/add/xjllb';
const URL = config.HOST + config.URI_API_PROJECT + '/addxjllb';
const token = auth.getToken();
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;

const xjllb = React.createClass({
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
            },
            searchToggle: false,
            where: '',
            helper: false,
            entity: '',
            fileds: {},
            views: 0,
            viewTitle: '现金流量表',
            dataLoading: false,
            btnLoading: false
        }
    },

    componentDidMount() {
        this.fetchData();
    },

    //改变页码
    handleChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({ pagination: pager });
        this.fetchData({
            page: pager.current,
            pageSize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(this.state.where))
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
        this.setState({ searchToggle: false })
    },

    //查询按钮
    handleSearchToggle() {
        this.setState({ searchToggle: !this.state.searchToggle });
    },

    //刷新按钮
    handleRefresh() {
        const pager = this.state.pagination;
        pager.current = 1;
        this.setState({ pagination: pager, where: '' });
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


    //点击保存或提交
    handleSubmit(lx, value) {
        if (lx == 'add') {
            this.fetchHandle(value, '', 'post');
        } else if (lx == 'update') {
            this.fetchHandle(value, ("/" + value.id), 'put');
        };
    },

    //修改或新增现金流量表记录
    fetchHandle(value, ur, met) {
        this.setState({ btnLoading: true });
        req({
            url: URL + ur,
            type: 'json',
            method: met,
            data: JSON.stringify(value),
            headers: { 'x-auth-token': auth.getToken() },
            contentType: 'application/json',
        }).then(resp => {
            Modal.success({
                title: '系统消息',
                content: (
                    <div>
                        <p>操作成功</p>
                    </div>),
            });
            this.setState({ btnLoading: false });
            this.fetchData();
            this.handleViewChange(0);
        }).fail(err => {
            this.setState({ btnLoading: false });
            message.error('Status Code:' + err.status + '  api错误 ')
        })
    },

    //获取当前事务所的现金流量表记录
    fetchData(params = { page: 1, pageSize: this.state.pagination.pageSize }) {
        this.setState({ loading: true });
        req({
            url: API_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': auth.getToken() },
            contentType: 'application/json',
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

 
    //根据表id获取现金流量表明细
    fetchDetail(record) {
        this.setState({ dataLoading: true });
        req({
            url: API_URL + '/' + record.id,
            
            method: 'get',
            headers: { 'x-auth-token': token },
            
        }).then(resp => {
            let entity=cloneDeep(resp);
            entity = entityFormat(entity, entityModel);
            let fs = {};
            for (var key in resp) {
                let newkey = key.toLowerCase();
                let num = resp[key];
                if(key=="ND"){
                    num=num+"";
                } 
                fs[newkey] = num;
            }
            this.setState({ dataLoading: false, entity: entity, fileds: fs });
        }).fail(e => {
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '可能网络访问原因，请稍后尝试'
            });
        })
    },

    dealWithChanged(key, value) {
        let f = this.state.fileds;
        f[key] = value;
        //【1行+2行+3行=4行】
        f.jyhd_xjlr_xj = Number(f.jyhd_xjlr_xslw ? f.jyhd_xjlr_xslw : 0)
            + Number(f.jyhd_xjlr_skfh ? f.jyhd_xjlr_skfh : 0)
            + Number(f.jyhd_xjlr_qtjy ? f.jyhd_xjlr_qtjy : 0);
        //【5行+6行+7行+8行=9行】
        f.jyhd_xjlc_xj = Number(f.jyhd_xjlc_gmlw ? f.jyhd_xjlc_gmlw : 0)
            + Number(f.jyhd_xjlc_zfzg ? f.jyhd_xjlc_zfzg : 0)
            + Number(f.jyhd_xjlc_sf ? f.jyhd_xjlc_sf : 0)
            + Number(f.jyhd_xjlc_qtjy ? f.jyhd_xjlc_qtjy : 0);
        //【4行-9行=10行】
        f.jyhd_je = Number(f.jyhd_xjlr_xj ? f.jyhd_xjlr_xj : 0)
            - Number(f.jyhd_xjlc_xj ? f.jyhd_xjlc_xj : 0);
        //【11行+12行+13行+14行=15行】
        f.tzhd_xjlr_xj = Number(f.tzhd_xjlr_shtz ? f.tzhd_xjlr_shtz : 0)
            + Number(f.tzhd_xjlr_tzsy ? f.tzhd_xjlr_tzsy : 0)
            + Number(f.tzhd_xjlr_czzc ? f.tzhd_xjlr_czzc : 0)
            + Number(f.tzhd_xjlr_qttz ? f.tzhd_xjlr_qttz : 0);
        //【16行+17行+18行=19行】
        f.tzhd_xjlc_xj = Number(f.tzhd_xjlc_gjzc ? f.tzhd_xjlc_gjzc : 0)
            + Number(f.tzhd_xjlc_tz ? f.tzhd_xjlc_tz : 0)
            + Number(f.tzhd_xjlc_qttz ? f.tzhd_xjlc_qttz : 0);
        //【15行-19行=20行】
        f.tzhd_je = Number(f.tzhd_xjlr_xj ? f.tzhd_xjlr_xj : 0)
            - Number(f.tzhd_xjlc_xj ? f.tzhd_xjlc_xj : 0);
        //【21行+22行+23行=24行】
        f.czhd_xjlr_xj = Number(f.czhd_xjlr_xstz ? f.czhd_xjlr_xstz : 0)
            + Number(f.czhd_xjlr_jk ? f.czhd_xjlr_jk : 0)
            + Number(f.czhd_xjlr_qtcz ? f.czhd_xjlr_qtcz : 0);
        //【25行+26行+27行=28行】
        f.czhd_xjlc_xj = Number(f.czhd_xjlc_chzw ? f.czhd_xjlc_chzw : 0)
            + Number(f.czhd_xjlc_fplr ? f.czhd_xjlc_fplr : 0)
            + Number(f.czhd_xjlc_qtcz ? f.czhd_xjlc_qtcz : 0);
        //【24行-28行=29行】
        f.czhd_je = Number(f.czhd_xjlr_xj ? f.czhd_xjlr_xj : 0)
            - Number(f.czhd_xjlc_xj ? f.czhd_xjlc_xj : 0);
        //【10行+20行+29行+30行=31行】
        f.xjjzzj = Number(f.jyhd_je ? f.jyhd_je : 0)
            + Number(f.tzhd_je ? f.tzhd_je : 0)
            + Number(f.czhd_je ? f.czhd_je : 0)
            + Number(f.hlbdyx ? f.hlbdyx : 0);
        this.setState({ fileds: f });
    },

    rowRender(text, record, index) {
        var that = this;
        function showDetail(lx) {
            that.fetchDetail(record);
            that.handleViewChange(lx);
        }
        return (
            <span>
                <Button disabled={record.ZTBJ == "提交" ? true : false} size="small" onClick={showDetail.bind(this, 2)} ><Icon type="edit" />编辑</Button>
                <Button size="small" onClick={showDetail.bind(this, 3)} ><Icon type="book" />查看</Button>
            </span>
        )
    },

    handleViewChange(e) {
        let tl = this.state.viewTitle;
        switch (e) {
            case 0: tl = "现金流量表"; this.setState({ fileds: {} }); break;
            case 1: tl = "添加现金流量表"; break;
            case 2: tl = "现金流量表修改"; break;
            case 3: tl = "现金流量表查看"; break;
        }
        this.setState({ views: e, viewTitle: tl });
    },

    resetFields(lx) {
        if (lx == "add") {
            const year = new Date().getFullYear() + "";
            let fs = { nd: year };
            this.setState({ fileds: fs });
        } else if (lx == "update") {
            let fs = {};
            let record = this.state.entity;
            for (var key in record) {
                let newkey = key.toLowerCase();
                fs[newkey] = record[key];
            }
            this.setState({ fileds: fs });
        }
    },

    render() {
        const columns = [
            { title: '序号', dataIndex: 'key', key: 'key' },
            { title: '事务所名称', dataIndex: 'DWMC', key: 'DWMC' },
            { title: '提交日期', dataIndex: 'TJRQ', key: 'TJRQ' },
            { title: '年度', dataIndex: 'nd', key: 'nd' },
            { title: '状态', key: 'ZTBJ', dataIndex: 'ZTBJ' },
            {
                title: '操作',
                key: 'operation',
                render: this.rowRender,
            }];
        //定义工具栏内容
        let toolbar = <ToolBar>
            {this.state.views == 0 ?
                <Button onClick={this.handleViewChange.bind(this, 1)}>添加<Icon className="toggle-tip" type="plus-square" /></Button>
                :
                <ButtonGroup>
                    <Button onClick={this.handleViewChange.bind(this, 0)}>返回<Icon className="toggle-tip" type="arrow-left" /></Button>
                    <Button type="primary" onClick={this.handleHelper}><Icon type="question" /></Button>
                </ButtonGroup>
            }
            {this.state.views == 0 &&
                <Button onClick={this.handleSearchToggle}><Icon type="search" />查询
                 {this.state.searchToggle ? <Icon className="toggle-tip" type="circle-o-up" /> : <Icon className="toggle-tip" type="circle-o-down" />}
                </Button>
            }
            {this.state.views == 0 &&
                <ButtonGroup>
                    <Button type="primary" onClick={this.handleHelper}><Icon type="question" /></Button>
                    <Button type="primary" onClick={this.handleRefresh}><Icon type="reload" /></Button>
                </ButtonGroup>
            }
        </ToolBar>;

        //定义提示内容
        let helper = [];
        helper.push(<p key="helper-0">1、《现金流量表》反映一定会计期间内有关现金和现金等价物的流入和流出信息。</p>);
        helper.push(<p key="helper-1">2、《现金流量表》上报选定时间的年初至上报期月末的本年累计结果值。</p>);
        helper.push(<p key="helper-2">各栏关系：</p>);
        helper.push(<p key="helper-3">【1行+2行+3行=4行 5行+6行+7行+8行=9行】【11行+12行+13行+14行=15行】【16行+17行+18行=19行】【4行-9行=10行 15行-19行=20行】</p>);
        helper.push(<p key="helper-4">【21行+22行+23行=24行】【25行+26行+27行=28行】【24行-28行=29行】【10行+20行+29行+30行=31行】</p>);

        return <div className="cwbb-lrb">
            <div className="wrap">
                {this.state.helper && <Alert message="现金流量表检索查询帮助"
                    description={helper}
                    type="info"
                    closable
                    onClose={this.handleHelperClose} />}
                <Panel title={this.state.viewTitle} toolbar={toolbar}>
                    {this.state.views == 0 && this.state.searchToggle &&
                        <SearchForm onSubmit={this.handleSearchSubmit} />}
                    {this.state.views == 0 &&
                        <div className="h-scroll-table">
                            <Table columns={columns}
                                dataSource={this.state.data}
                                pagination={this.state.pagination}
                                loading={this.state.loading}
                                onChange={this.handleChange} />
                        </div>}
                    {this.state.views == 1 &&
                        <Add onSubmit={this.handleSubmit.bind(this, 'add')}
                            data={this.state.fileds}
                            changed={this.dealWithChanged}
                            btnloading={this.state.btnLoading}
                            resetFields={this.resetFields} />}
                    {this.state.views == 2 &&
                        <Update
                            onSubmit={this.handleSubmit.bind(this, 'update')}
                            data={this.state.fileds}
                            changed={this.dealWithChanged}
                            loading={this.state.dataLoading}
                            btnloading={this.state.btnLoading}
                            resetFields={this.resetFields} />
                    }
                    {this.state.views == 3 &&
                        <DetailBox data={this.state.entity} loading={this.state.dataLoading} />
                    }
                </Panel>
            </div>
        </div>
    }
});

module.exports = xjllb;