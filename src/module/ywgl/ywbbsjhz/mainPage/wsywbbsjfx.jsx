import React from 'react'
import {Table, Row, Col, Button, Icon, notification, Alert} from 'antd'
import Panel from 'component/compPanel'
import req from 'reqwest';
import {SearchFormWs} from '../searchForm'
import Model from '../model'
import merge from 'lodash/merge'
import {isEmptyObject, jsonCopy} from 'common/utils'
import auth from 'common/auth'

const PanelBar = Panel.ToolBar;

const component = React.createClass({
    //初始化state
    getInitialState() {
        return {
            searchToggle: true,
            loading: false,
            data: [],
            where: this.props.defaultWhere,
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: this.props.pageSize,
                showQuickJumper: true,
                pageSizeOptions: ['10', '20', '40'],
                showTotal(total) {
                    return `共 ${total} 条`
                }
            }
        }
    },

    //通过API获取数据
    fetchData(params = { page: 1, pagesize: this.props.pageSize }) {
        this.setState({ loading: true });
        const token = auth.getToken();
        const {apiUrl, defaultWhere} = this.props;
        let where = merge(jsonCopy(defaultWhere), params.where);
        if (!isEmptyObject(where)) {
            params.where = encodeURIComponent(JSON.stringify(where))
        }
        req({
            url: apiUrl,
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': token }
        }).then(resp => {
            const p = this.state.pagination;
            p.current = params.page;
            p.pageSize = params.pagesize;
            p.total = resp.total > 1000 ? 1000 : resp.total;
            p.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            this.setState({ data: resp.data, pagination: p, loading: false, where: where })
        }).fail(e => {
            this.setState({ loading: false });
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '可能网络访问原因，请稍后尝试'
            });
        })
    },

    handleSearchSubmit(values) {
        this.setState({ searchToggle: !this.state.searchToggle, where: values });
        const p = this.state.pagination;
        const param = {
            page: 1,
            pagesize: p.pageSize,
            where: values
        };
        this.fetchData(param);
    },

    handleChange(pagination, filters, sorter){
        const p=pagination;
        const param={
            page:p.current,
            pagesize:p.pageSize,
            where:this.state.where
        };
        this.fetchData(param);
    },

    back(){
        this.setState({searchToggle: !this.state.searchToggle});
    },

    //根据value值获取业务类型名称
    getYwlxMc(value) {
        const ywlxs = Model.ywlx;
        for (var i = 0; i < ywlxs.length; i++) {
            if (value == ywlxs[i].id) {
                return ywlxs[i].mc;
            }
        }
    },

    render() {
        const {title} = this.props;
        const ywlx=Model.ywlx;
        const scroll={};
        if(this.props.scrollx){
            scroll.x=this.props.scrollx;
        }
        const titleRs=<div>
        <span>业务类型：{this.getYwlxMc(this.state.where.ywlx)}</span></div>;
        const toolbar = <PanelBar>
            <Button onClick={this.back}>
                <Icon type="rollback"/>返回
            </Button>
        </PanelBar>;
        return <div>
            { this.state.searchToggle &&
                <Panel title={title}>
                    <SearchFormWs initialValue={this.props.defaultWhere} value={this.state.where} onSubmit={this.handleSearchSubmit}/>
                </Panel>
            }
            { !this.state.searchToggle &&
                <Panel title={titleRs} toolbar={toolbar}>
                <Table columns={Model.columnsWs}
                    dataSource={this.state.data}
                    loading={this.state.loading}
                    pagination={this.state.pagination}
                    onChange={this.handleChange}
                    scroll={scroll} />
                </Panel>
            }
        </div>
    }
})

module.exports = component;