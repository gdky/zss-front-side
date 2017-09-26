import React from 'react'
import {Table, Modal, Row, Col, Button, Icon, Alert, message} from 'antd'
import CompPageHead from 'component/CompPageHead'
import Panel from 'component/compPanel'
import {handleRowButton, columns, entityModel} from './model'
import req from 'reqwest';
import SearchForm from './searchForm'
import Add from './Add'
import Update from './Update'
import auth from 'common/auth'
import config from 'common/configuration'
import BaseTable from 'component/compBaseTable'
import {entityFormat} from 'common/utils'
import DetailBox from './detailbox.jsx'
import cloneDeep from 'lodash/cloneDeep'


const API_URL = config.HOST + config.URI_API_PROJECT + '/add/zyswsnj';
const URL = config.HOST + config.URI_API_PROJECT + '/addzyswsnjb';

const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;


const zyswsnj = React.createClass({
    //初始化state
    getInitialState() {
        return {
            data: [],
            data1: [],
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: 5,
                showQuickJumper: true,
                pageSizeOptions: ['5', '10', '20'],
                alert: ''

            },
            searchToggle: false,
            where: '',
            helper: false,
            entity: '',
            fileds: {},
            views: 0,
            viewTitle: '执业税务师年检表',
            dataLoading: false,
            btnLoading: false

        }
    },

    //改变页码
    handleChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({pagination: pager, detailHide: true});

        this.fetchData({
            page: pager.current,
            pageSize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(this.state.where))
        })
    },

    //查询按钮
    handleSearchToggle() {
        this.setState({searchToggle: !this.state.searchToggle, detailHide: true,});
    },


    //刷新按钮
    handleRefresh() {
        const pager = this.state.pagination;
        pager.current = 1;
        this.setState({pagination: pager, where: '', detailHide: true, update: true});
        this.fetchData();
    },

    //帮助按钮
    handleHelper() {
        this.setState({helper: !this.state.helper})
    },
    //打开添加表
    handleAdd() {
        this.setState({add: !this.state.add, detailHide: true, update: true})

    },
    //打开修改表
    handleUpdate() {
        this.setState({update: !this.state.update, detailHide: true});

    },


    //手动关闭帮助提示
    handleHelperClose() {
        this.setState({helper: false})
    },
    //添加执业税务师年检表
    fetchHandle1(value) {
        req({
            url: URL + '/' + value.id,
            type: 'json',
            method: 'put',
            data: JSON.stringify(value),
            headers: {'x-auth-token': auth.getToken()},
            contentType: 'application/json',


        }).then(resp => {
            Modal.success({
                title: '操作成功',
                content: (
                    <div>
                        <p>操作成功！</p>
                    </div>)
            });
        }).fail(err => {
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
        this.setState({pagination: pager, where: value});
        this.fetchData(params);
        this.setState({searchToggle: false})
    },

    fetchDetail(record) {
        this.setState({dataLoading: true});
        req({
            url: API_URL + '/' + record.id,
            type: 'json',
            method: 'get',
            headers: {'x-auth-token': auth.getToken()},
            contentType: 'application/json'
        }).then(resp => {
            let entity = cloneDeep(resp);
            entity = entityFormat(entity, entityModel);
            let fs = {};
            for (var key in resp) {
                let num = resp[key];
                if (key == "ND") {
                    num = num + "";
                }
                if (key == "sws_id") {
                    num = num + "";
                }
                fs[key] = num;
            }
            this.setState({entity: entity, fileds: fs, dataLoading: false});
        }).fail(err => {
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


    //明细表关闭
    handleDetailClose() {
        this.setState({detailHide: true})
    },

    handleViewChange(e) {
        let tl = this.state.viewTitle;
        switch (e) {
            case 0:
                tl = "执业税务师年检表";
                this.setState({fileds: {}});
                break;
            case 1:
                tl = "添加执业税务师年检表";
                break;
            case 2:
                tl = "执业税务师年检表修改";
                break;
            case 3:
                tl = "执业税务师年检表查看";
                break;
        }
        this.setState({views: e, viewTitle: tl});
    },


    //点击保存或提交
    handleSubmit(lx, value) {
        if (lx == 'add') {
            this.fetchHandle(value, '', 'post');
        } else if (lx == 'update') {
            this.fetchHandle(value, ("/" + value.id), 'put');
        }
    },

    //修改或新增
    fetchHandle(value, ur, met) {
        this.setState({btnLoading: true});
        req({
            url: URL + ur,
            type: 'json',
            method: met,
            data: JSON.stringify(value),
            headers: {'x-auth-token': auth.getToken()},
            contentType: 'application/json',
        }).then(resp => {
            Modal.success({
                title: '系统消息',
                content: (
                    <div>
                        <p>操作成功</p>
                    </div>),
            });
            this.setState({btnLoading: false});
            this.fetchData();
            this.handleViewChange(0);
        }).fail(err => {
            this.setState({btnLoading: false});
            message.error('Status Code:' + err.status + '  api错误 ')
        })
    },


    //通过API获取数据
    fetchData(params = {page: 1, pageSize: this.state.pagination.pageSize}) {
        this.setState({loading: true});
        req({
            url: API_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers: {'x-auth-token': auth.getToken()},
            contentType: 'application/json',
        }).then(resp => {
            const p = this.state.pagination;
            p.total = resp.total > 1000 ? 1000 : resp.total;
            p.showTotal = total => {
                return `共 ${resp.total} 条，`
            };
            this.setState({
                data: resp.data,
                pagination: p,
                loading: false
            })
        }).fail(err => {
            this.setState({loading: false});
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

    componentDidMount() {
        this.fetchData();
    },

    rowRender(text, record, index) {
        var that = this;

        function showDetail(lx) {
            that.fetchDetail(record);
            that.handleViewChange(lx);
        }

        return (
            <span>
                <Button disabled={(record.ZTDM == "自检" || record.ZTDM == "年检") ? true : false} size="small"
                        onClick={showDetail.bind(this, 2)}><Icon type="edit"/>编辑</Button>
                <Button size="small" onClick={showDetail.bind(this, 3)}><Icon type="book"/>查看</Button>
            </span>
        )
    },
    render() {
        const column1 = [
            {title: '序号', dataIndex: 'key', key: 'key'},
            {title: '年度', dataIndex: 'ND', key: 'ND'},
            {title: '姓名', dataIndex: 'XMING', key: 'XMING'},
            {title: '状态', key: 'ZTDM', dataIndex: 'ZTDM'},
            {
                title: '处理结果', dataIndex: 'NJCL', key: 'NJCL',
                render(text,record){
                    if(text && text.length>15){
                        return text.substr(0,16)+"..."
                    }
                    return text
                }
            }, {
                title: '操作',
                key: 'operation',
                render: this.rowRender,
            }];
        //定义工具栏内容
        let toolbar = <ToolBar>
            {this.state.views == 0 ?
                <Button onClick={this.handleViewChange.bind(this, 1)}>添加<Icon className="toggle-tip"
                                                                              type="plus-square"/></Button>
                :
                <ButtonGroup>
                    <Button onClick={this.handleViewChange.bind(this, 0)}>返回<Icon className="toggle-tip"
                                                                                  type="arrow-left"/></Button>
                    <Button type="primary" onClick={this.handleHelper}><Icon type="question"/></Button>
                </ButtonGroup>
            }
            {this.state.views == 0 &&
            <Button onClick={this.handleSearchToggle}><Icon type="search"/>查询
                {this.state.searchToggle ? <Icon className="toggle-tip" type="circle-o-up"/> :
                    <Icon className="toggle-tip" type="circle-o-down"/>}
            </Button>
            }
            {this.state.views == 0 &&
            <ButtonGroup>
                <Button type="primary" onClick={this.handleHelper}><Icon type="question"/></Button>
                <Button type="primary" onClick={this.handleRefresh}><Icon type="reload"/></Button>
            </ButtonGroup>
            }
        </ToolBar>;

        //定义提示内容
        let helper = [];
        helper.push(<p key="helper-0">点击查询结果查看注册税务师年检表明细</p>);
        helper.push(<p key="helper-1">也可以添加修改和提交注册税务师年检表</p>);
        return <div className="client-swsnjb">
            <div className="wrap">
                {this.state.helper && <Alert message="注册税务师年检表检索查询帮助"
                                             description={helper}
                                             type="info"
                                             closable
                                             onClose={this.handleHelperClose}/>}

                {(this.state.views == 0 || this.state.views == 3) &&
                <Panel title={this.state.viewTitle} toolbar={toolbar}>
                    {this.state.views == 0 && this.state.searchToggle &&
                    <SearchForm onSubmit={this.handleSearchSubmit}/>
                    }
                    {this.state.views == 0 &&
                    <div className="h-scroll-table">
                        <Table columns={column1}
                               dataSource={this.state.data}
                               pagination={this.state.pagination}
                               loading={this.state.loading}
                               onChange={this.handleChange}
                               onRowClick={this.handleRowClick}/>
                    </div>
                    }
                    {this.state.views == 3 &&
                    <DetailBox
                        data={this.state.entity}
                        loading={this.state.dataLoading}/>
                    }
                </Panel>
                }
                {this.state.views == 1 &&
                <Add
                    onSubmit={this.handleSubmit.bind(this, 'add')}
                    data={this.state.data}
                    btnloading={this.state.btnLoading}
                    toback={this.handleViewChange.bind(this, 0)}/>
                }
                {this.state.views == 2 &&
                <Update
                    onSubmit={this.handleSubmit.bind(this, 'update')}
                    data={this.state.fileds}
                    loading={this.state.dataLoading}
                    btnloading={this.state.btnLoading}
                    toback={this.handleViewChange.bind(this, 0)}/>
                }
            </div>
        </div>
    }
});

module.exports = zyswsnj;