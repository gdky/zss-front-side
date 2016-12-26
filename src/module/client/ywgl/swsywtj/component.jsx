import React from 'react'
import config from 'common/configuration'
import {Table, Row, Col, Button, Icon, notification, Alert, Modal} from 'antd'
import Panel from 'component/compPanel'
import req from 'reqwest';
import Model from './model'
import merge from 'lodash/merge'
import {isEmptyObject, jsonCopy} from 'common/utils'
import auth from 'common/auth'
import './style.css'

const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;

const component = React.createClass({
    //初始化state
    getInitialState() {
        return {
            searchToggle: true,
            loading: false,
            loadingDetail: false,
            visible: false,
            data: [],
            detail: [],
            dqswsmc: "",
            dqywlx: "",
            entity: {},
            where: {},
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: '10',
                showQuickJumper: true,
                pageSizeOptions: ['10', '20', '40'],
                showTotal(total) {
                    return `共 ${total} 条`
                }
            }
        }
    },
    //通过API获取数据
    fetchData(params = { page: 1, pagesize: 10 }) {
        this.setState({ loading: true });
        const token = auth.getToken();
        const apiUrl = config.HOST + config.URI_API_PROJECT + "/ywgl/swsywtj";
        let where = params.where;
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
            this.setState({ data: resp.data, loading: false, where: where })
        }).fail(e => {
            this.setState({ loading: false });
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '可能网络访问原因，请稍后尝试'
            });
        })
    },

    //通过数据明细
    fetchDetail(record, ywlx) {
        this.setState({ loadingDetail: true });
        const token = auth.getToken();
        const apiUrl = config.HOST + config.URI_API_PROJECT + "/ywgl/swsywtj/" + ywlx;
        const params = { bbnd: record.nd };
        req({
            url: apiUrl,
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': token }
        }).then(resp => {
            this.setState({ detail: resp.data, dqswsmc: resp.swsmc, dqywlx: ywlx, loadingDetail: false })
        }).fail(e => {
            this.setState({ loadingDetail: false });
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


    //行点击处理
    handleRowClick(record) {
        this.setState({ entity: record })
    },


    //组件加载时读取数据
    componentDidMount() {
        this.fetchData();
    },

    handleViewDetail(record, ywlx) {
        this.setState({ visible: true, dqswsmc: null, dqywlx: null });
        this.fetchDetail(record, ywlx);
    },

    //关闭明细对话框
    closeDialog() {
        this.setState({ visible: false });
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

    /*计算column里定义的width总和，没有定义width的列宽按100(px)计算*/
    getColWidth(columns){
        let w = 0;
        columns.map(item=> {
            w = item.width ? w + parseInt(item.width) : w + 100;
        });
        return w;
    },

    render() {
        const columnsHz = [
            { title: '序号', dataIndex: 'xh', key: 'xh' },
            { title: '报备年度', dataIndex: 'nd', key: 'nd',width:"80" },
            {
                title: '企业技术开发费加计扣除鉴证', dataIndex: 'jskf', key: 'jskf',
                render: (text, record, index) => {
                    if (text == "0") {
                        return text;
                    } else {
                        let actGroup = <span className="act-group">
                            <a onClick={() => { this.handleViewDetail(record, 1) } }>{text}</a>
                        </span>;
                        return actGroup;
                    }
                }
            },
            {
                title: '企业所得税税前扣除鉴证', dataIndex: 'sqkc', key: 'sqkc',
                render: (text, record, index) => {
                    if (text == "0") {
                        return text;
                    } else {
                        let actGroup = <span className="act-group">
                            <a onClick={() => { this.handleViewDetail(record, 2) } }>{text}</a>
                        </span>;
                        return actGroup;
                    }
                }
            },
            {
                title: '企业所得税汇算清缴鉴证', dataIndex: 'qyhsqj', key: 'qyhsqj',
                render: (text, record, index) => {
                    if (text == "0") {
                        return text;
                    } else {
                        let actGroup = <span className="act-group">
                            <a onClick={() => { this.handleViewDetail(record, 3) } }>{text}</a>
                        </span>;
                        return actGroup;
                    }
                }
            },
            {
                title: '土地增值税鉴证', dataIndex: 'td', key: 'td',
                render: (text, record, index) => {
                    if (text == "0") {
                        return text;
                    } else {
                        let actGroup = <span className="act-group">
                            <a onClick={() => { this.handleViewDetail(record, 4) } }>{text}</a>
                        </span>;
                        return actGroup;
                    }
                }
            },
            {
                title: '房地产涉税调整鉴证', dataIndex: 'fdc', key: 'fdc',
                render: (text, record, index) => {
                    if (text == "0") {
                        return text;
                    } else {
                        let actGroup = <span className="act-group">
                            <a onClick={() => { this.handleViewDetail(record, 5) } }>{text}</a>
                        </span>;
                        return actGroup;
                    }
                }
            },
            {
                title: '其它鉴证', dataIndex: 'qt', key: 'qt',
                render: (text, record, index) => {
                    if (text == "0") {
                        return text;
                    } else {
                        let actGroup = <span className="act-group">
                            <a onClick={() => { this.handleViewDetail(record, 6) } }>{text}</a>
                        </span>;
                        return actGroup;
                    }
                }
            },
            {
                title: '高新技术企业认定专项鉴证', dataIndex: 'gxjs', key: 'gxjs',
                render: (text, record, index) => {
                    if (text == "0") {
                        return text;
                    } else {
                        let actGroup = <span className="act-group">
                            <a onClick={() => { this.handleViewDetail(record, 7) } }>{text}</a>
                        </span>;
                        return actGroup;
                    }
                }
            },
            {
                title: '企业注销税务登记税款清算鉴证', dataIndex: 'zx', key: 'zx',
                render: (text, record, index) => {
                    if (text == "0") {
                        return text;
                    } else {
                        let actGroup = <span className="act-group">
                            <a onClick={() => { this.handleViewDetail(record, 8) } }>{text}</a>
                        </span>;
                        return actGroup;
                    }
                }
            },
            {
                title: '企业变更税务登记税款清算鉴证', dataIndex: 'bg', key: 'bg',
                render: (text, record, index) => {
                    if (text == "0") {
                        return text;
                    } else {
                        let actGroup = <span className="act-group">
                            <a onClick={() => { this.handleViewDetail(record, 9) } }>{text}</a>
                        </span>;
                        return actGroup;
                    }
                }
            },
            {
                title: '个人所得税汇算清缴鉴证', dataIndex: 'grhsqj', key: 'grhsqj',
                render: (text, record, index) => {
                    if (text == "0") {
                        return text;
                    } else {
                        let actGroup = <span className="act-group">
                            <a onClick={() => { this.handleViewDetail(record, 10) } }>{text}</a>
                        </span>;
                        return actGroup;
                    }
                }
            }
        ];


        const title = <div style={{ width: '610px' }}>
            <span>{this.state.dqswsmc ? '统计对象：' + this.state.dqswsmc : ""}</span>
            <span style={{ marginLeft: '15px' }}>{this.state.dqywlx ? '业务类型：' + this.getYwlxMc(this.state.dqywlx) : ""}</span>
        </div>;

        const scrollx=this.getColWidth(Model.columnsDetail);

        return <div className="swsywtj">
            <div className="wrap">
                <div className="dataGird">
                    <Panel title="事务所业务统计">
                            <Table columns={columnsHz}
                                dataSource={this.state.data}
                                pagination={this.state.pagination}
                                loading={this.state.loading}
                                onChange={this.handleChange}
                                rowKey={record => record["xh"]}
                                rowClassName={(record) => { return record.xh == this.state.entity.xh ? 'row-selected' : '' } }
                                onRowClick={this.handleRowClick}/>
                        <Modal title={title} width="80%"
                            wrapClassName="vertical-center-modal"
                            visible={this.state.visible}
                            footer={null}
                            onCancel={this.closeDialog}>
                            <Table columns={Model.columnsDetail}
                                dataSource={this.state.detail}
                                loading={this.state.loadingDetail}
                                rowKey={record => record["xh"]}
                                pagination={false}
                                scroll={{x:scrollx}}/>
                        </Modal>
                    </Panel>
                </div>
            </div>
        </div>
    }
});

module.exports = component;