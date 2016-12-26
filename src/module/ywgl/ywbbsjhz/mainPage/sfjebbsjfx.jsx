import React from 'react'
import {Table, Row, Col, Button, Icon, notification} from 'antd'
import Panel from 'component/compPanel'
import req from 'reqwest';
import {SearchFormJe} from '../searchForm'
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

    //查询
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

    //表格变化
    handleChange(pagination, filters, sorter) {
        const p = pagination;
        const param = {
            page: p.current,
            pagesize: p.pageSize,
            where: this.state.where
        };
        this.fetchData(param);
    },

    //返回
    back() {
        this.setState({ searchToggle: !this.state.searchToggle });
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

    //根据value值获取城市名称
    getCs(value) {
        const cs = Model.cs;
        for (var i = 0; i < cs.length; i++) {
            if (value == cs[i].id) {
                return cs[i].mc;
            }
        }
    },

    render() {
        const {title} = this.props;
        const ywlx = Model.ywlx;
        const titleRs = <div style={{ width: '600px' }}>
            <span>{this.state.where.bbnd == null ? '' : '年度：' + this.state.where.bbnd}</span>
            <span style={{ marginLeft: '10px' }}>{this.state.where.ywlx == null ? '' : '业务类型：' + this.getYwlxMc(this.state.where.ywlx) }</span>
            <span style={{ marginLeft: '10px' }}>{this.state.where.fsd == null ? '' : '城市：' + this.getCs(this.state.where.fsd) }</span>
        </div>;
        const toolbar = <PanelBar>
            <Button onClick={this.back}>
                <Icon type="rollback"/>返回
            </Button>
        </PanelBar>;
        return <div>
            { this.state.searchToggle &&
                <Panel title={title}>
                    <SearchFormJe initialValue={this.props.defaultWhere} value={this.state.where} onSubmit={this.handleSearchSubmit}/>
                </Panel>
            }
            { !this.state.searchToggle &&
                <Panel title={titleRs} toolbar={toolbar}>
                    <Table columns={Model.columnsJe}
                        dataSource={this.state.data}
                        loading={this.state.loading}
                        pagination={this.state.pagination}
                        onChange={this.handleChange} />
                </Panel>
            }
        </div>
    }
})

module.exports = component;