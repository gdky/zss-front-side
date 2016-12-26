import React from 'react'
import {Table, Row, Col, Button, Icon, notification, Alert} from 'antd'
import Panel from 'component/compPanel'
import req from 'reqwest';
import {SearchFormRy} from '../searchForm'
import Model from '../model'
import merge from 'lodash/merge'
import {isEmptyObject, jsonCopy} from 'common/utils'
import auth from 'common/auth'


const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;

const component = React.createClass({
    //初始化state
    getInitialState() {
        return {
            searchToggle: true,
            loading: false,
            dataHz: [],
            dataSj: [],
            entity: {}, 
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
            this.setState({ dataHz: resp.dataHz, dataSj: resp.dataSj, pagination: p, loading: false, where: where })
        }).fail(e => {
            this.setState({ loading: false });
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '可能网络访问原因，请稍后尝试'
            });
        })
    },



    //改变页码
    handleChange(pagination, filters, sorter) {
        let param = {
            page: pagination.current,
            pagesize: pagination.pageSize,
            where: this.state.where
        };
        this.fetchData(param)
    },


    //查询提交
    handleSearchSubmit(values) {
        const p = this.state.pagination;
        const param = {
            page: 1,
            pagesize: p.pageSize,
            where: values
        };
        this.fetchData(param);
    },

    //行点击处理
    handleRowClick(record) {
        this.state.entity = record;
        this.setState({ entity: record })
    },

    /*计算column里定义的width总和，没有定义width的列宽按100(px)计算*/
    getColWidth(model) {
        let w = 0;
        model.columnsHz.map(item => {
            w = item.width ? w + item.width : w + 100;
        });
        return w;
    },

    //unmount时记录目前状态
    componentWillUnmount() {
        this.props.grabState(this.state)
    },

    //组件加载时读取数据
    componentDidMount() {
        if (isEmptyObject(this.props.stateShot)) {
            this.fetchData();
        } else {
            this.setState(this.props.stateShot)
        }
    },

    handleViewDetail(record) {
        this.props.handleViewDetail(record);
    },
    
    render() {
        //行业人员报备数据分析查询结果列定义
        const columnsSj = [
            {
                title: '查看明细', dataIndex: 'action', key: 'action', fixed: 'left', width: 120,
                render: (text, record, index) => {
                    let actGroup = <span className="act-group">
                        <a onClick={() => { this.handleViewDetail(record) } }>查看</a>
                    </span>;
                    return actGroup;
                }
            },
            { title: '签名注册税务师', dataIndex: 'qzsws', key: 'qzsws' },
            { title: '委托单位', dataIndex: 'wtdw', key: 'wtdw' },
            { title: '报告文号', dataIndex: 'bgwh', key: 'bgwh' },
            { title: '业务类型', dataIndex: 'ywlx', key: 'ywlx' },
            { title: '协议收费金额', dataIndex: 'xyje', key: 'xyje' },
            { title: '实际收费金额', dataIndex: 'sjsqje', key: 'sjsqje' },
            { title: '报备日期', dataIndex: 'bbrq', key: 'bbrq' },
        ];
        const {title} = this.props;
        const fixColWidth = 120;
        const scrollx = this.getColWidth(Model) + fixColWidth;
        return <div>
            <Panel>
                {this.state.searchToggle && 
                    <SearchFormRy onSubmit={this.handleSearchSubmit} initialValue={this.state.where} apiUrl={this.props.apiUrl}/> }
                <div className="wrap">
                    <Table columns={Model.columnsHz}
                        dataSource={this.state.dataHz}
                        pagination={false}
                        loading={this.state.loading}
                        rowKey={record => record["id"]}/>
                </div>
                <div className="wrap">
                    <Table columns={columnsSj}
                        dataSource={this.state.dataSj}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleChange}
                        rowKey={record => record["id"]}
                        rowClassName={(record) => { return record.id == this.state.entity.id ? 'row-selected' : '' } }
                        onRowClick={this.handleRowClick}/>
                </div>
            </Panel>
        </div>
    }
});

module.exports = component;