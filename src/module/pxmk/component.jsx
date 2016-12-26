import React from 'react'
import {Table, Modal, Row, Col, Button, Icon, Alert, Spin, Input, Popconfirm} from 'antd'
import CompInputBaseTable from 'component/compInputBaseTable';
import Panel from 'component/compPanel'
import req from 'common/request';
import Model from './model.js'
import TJVeiw from './tjIndex.jsx'
import auth from 'common/auth'
import SearchForm from './searchForm'
import config from 'common/configuration'
import Detail from 'component/pxnr'

const API_URL = config.HOST + config.URI_API_PROJECT + '/pxfbList';
const API_URL_FB = config.HOST + config.URI_API_PROJECT + '/pxxxapi';
const ToolBar = Panel.ToolBar;
let cur=new Date();
const now = new Date(cur.getFullYear(),cur.getMonth(),cur.getDate(),23,59,59).getTime();

const lrb = React.createClass({

    //初始化state
    getInitialState(){
        return {
            data: [],
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: 5,
                showQuickJumper: true,
                pageSizeOptions: ['5', '10', '20', '30', '40']
            },
            searchToggle: false,
            where: '',
            view: 0,
            letValues: {},
            sloading: false,
            pxid: "",
            dialogDetail: false,
            dialogTJ: false,
            entity: {},
        }
    },

    //改变页码
    handleChange(pagination, filters, sorter){
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({pagination: pager});
        this.fetchData({
            pagenum: pager.current,
            pagesize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(this.state.where))
        })
    },

    //查询按钮
    handleSearchToggle(){
        this.setState({searchToggle: !this.state.searchToggle});
    },


    //提交条件查询
    handleSearchSubmit(value){
        const pager = this.state.pagination;
        pager.current = 1;
        const params = {
            pagenum: 1,
            pagesize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(value))
        };
        this.setState({pagination: pager, where: value});
        this.fetchData(params)
    },


    //通过API获取数据
    fetchData(params = {pagenum: this.state.pagination.current, pagesize: this.state.pagination.pageSize}){
        this.setState({loading: true});
        req({
            url: API_URL,
            type: 'json',
            method: 'get',
            data: params
        }).then(resp=> {
            const p = this.state.pagination;
            p.total = resp.page.pageTotal;
            p.showTotal = total => {
                return `共 ${resp.page.pageTotal} 条`
            };
            this.setState({
                data: resp.data,
                pagination: p,
                loading: false
            })
        }).catch(err=> {
            this.setState({loading: false});
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>网络访问故障，请刷新重试</p>
                        <p>Status: {err.status}</p>
                    </div>  )
            });
        })
    },
    onSelect(record){//主查询记录被选中方法

        if (this.state.pxid != record.pxid) {
            this.setState({pxid: record.pxid, dataxx: record});
        }
    },

    xxfb(lx){
        this.setState({view: lx, letValues: {}});
    },

    handleReturn(lx){
        this.setState({view: 0, letValues: {}})
    },

    valueReset(){
        this.setState({letValues: this.state.dataxx});
    },

    openDetail(record){
        this.setState({dialogDetail: true, entity: record})
    },

    //关闭详情视图
    closeDetail(){
        this.setState({dialogDetail: false})
    },

    openTJ(){
        this.setState({dialogTJ: true})
    },

    //关闭详情视图
    closeTJ(){
        this.setState({dialogTJ: false})
    },

    handleBGSubmit(value){
        this.setState({bgLoading: true});
        var ls = value;
        ls.pxid = this.state.pxid;
        let metd = "";
        switch (this.state.view) {
            case 1:
                metd = 'post';
                break;
            case 4:
                metd = 'put';
                break;
        }
        req({
            url: API_URL_FB,
            type: 'json',
            method: metd,
            data: ls,
            contentType: 'application/json',
            headers: {'x-auth-token': auth.getToken()},
        }).then(resp=> {
            var that = this;
            Modal.success({
                title: '提交成功',
                content: (
                    <div>
                        <p>提交成功</p>
                    </div>  ),
                onOk() {
                    that.fetchData();
                },
            });
            this.setState({bgLoading: false, view: 0, letValues: {}, pxid: ''});
        }).catch(err=> {
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>网络访问故障，请刷新重试</p>
                        <p>Status: {err.status}</p>
                    </div>  )
            });
            this.setState({bgLoading: false, letValues: this.refs.addValues.getFieldsValue()});
        })
    },

    delRow(metd){
        this.setState({loading: true});
        req({
            url: API_URL_FB + '/' + this.state.pxid,
            type: 'json',
            method: metd,
            contentType: 'application/json',
            headers: {'x-auth-token': auth.getToken()},
        }).then(resp=> {
            var that = this;
            Modal.success({
                title: '提交成功',
                content: (
                    <div>
                        <p>提交成功</p>
                    </div>  ),
                onOk() {
                    that.fetchData();
                },
            });
            this.setState({view: 0, letValues: {}});
        }).catch(err=> {
            this.setState({loading: false});
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>网络访问故障，请刷新重试</p>
                        <p>Status: {err.status}</p>
                    </div>  )
            });
        })
    },

    componentDidMount(){
        this.fetchData();

    },

    ztRender(text, row, index) {
        var that = this;
        const sj = new Date(row.BMJZSJ);
        let cmp = false;
        if (row.fbzt == 0 && now > sj.getTime()) {
            console.log(row);
            req({
                url: API_URL_FB + '/' + row.pxid,
                type: 'json',
                method: 'put',
                contentType: 'application/json',
                headers: {'x-auth-token': auth.getToken()},
            });
            cmp = true;
        } else if (row.fbzt == 1) {
            cmp = true;
        }
        return (
            <span>
                      <a onClick={that.openDetail.bind(this, {id: row.pxid})}>查看</a>
                {cmp ? null : <span><span className="ant-divider"></span>
                                                <Popconfirm title="是否确认停止报名？" onConfirm={that.delRow.bind(this, 'put')}>
                                                <a >停止报名</a></Popconfirm></span>}
                <span className="ant-divider"></span>
                        <a onClick={that.openTJ}>统计</a>
                        <span className="ant-divider"></span>
                        <a onClick={that.xxfb.bind(this, 4)}>修改</a>
                        <span className="ant-divider"></span>
                        <Popconfirm title="是否确认删除？" onConfirm={that.delRow.bind(this, 'delete')}>
                        <a >删除</a></Popconfirm>
                    </span>
        );
    },
    render(){
        const columns = [{ //设定列
            title: '序号', //设定该列名称
            dataIndex: 'key', //设定该列对应后台字段名
            key: 'key', //列key，必须设置，建议与字段名相同
        }, {
            title: '标题',
            dataIndex: 'BT',
            key: 'BT',
        }, {
            title: '开始时间',
            dataIndex: 'PXKSSJ',
            key: 'PXKSSJ',
        }, {
            title: '结束时间',
            dataIndex: 'PXJSSJ',
            key: 'PXJSSJ',
        }, {
            title: '截止时间',
            dataIndex: 'BMJZSJ',
            key: 'BMJZSJ',
        }, {
            title: '联系人',
            dataIndex: 'PXLXR',
            key: 'PXLXR',
        }, {
            title: '状态',
            dataIndex: 'fbzt',
            key: 'fbzt',
            render(text, row, index){
                const sj = new Date(row.BMJZSJ);
                if (now > sj.getTime()) {
                    return <p>活动结束</p>
                } else if (text == 0) {
                    return <p>进行中</p>
                } else if (text == 1) {
                    return <p>活动结束</p>
                }
                ;
            }
        }, {
            title: '报名人数',
            dataIndex: 'bmrs',
            key: 'bmrs',
        }, {
            title: '订房情况（单/双）',
            dataIndex: 'dfs',
            key: 'dfs',
        }, {
            title: '订餐情况（早/午/晚）',
            dataIndex: 'dcs',
            key: 'dcs',
        },
            {
                title: '操作',
                dataIndex: 'dy',
                key: 'dy',
                render: this.ztRender
            },
        ];
        let toolbar = <ToolBar>
            <div>
                <Button type="ghost" onClick={this.handleSearchToggle}>
                    <Icon type="search"/>查询
                    { this.state.searchToggle ? <Icon className="toggle-tip" type="circle-o-up"/> :
                        <Icon className="toggle-tip" type="circle-o-down"/>}
                </Button>
                <span className="ant-divider"></span>
                <Button type="ghost" onClick={this.xxfb.bind(this, 1)}>培训信息发布</Button>
            </div>
        </ToolBar>;
        let toolbar2 = <ToolBar>
            <Button type="ghost" onClick={this.handleReturn}>返回</Button>
        </ToolBar>;
        /*设置明细信息组件的参数*/
        const detailSetting = {
            //设置数据源
            id: this.state.entity.id,
            visible: this.state.dialogDetail,
            //设置返回主视图调用的方法
            onClose: this.closeDetail
        };
        const tjSetting = {
            //设置数据源
            data: this.state.dataxx,
            visible: this.state.dialogTJ,
            //设置返回主视图调用的方法
            onClose: this.closeTJ
        };
        return <div className="zxdpxmk">
            <Detail {...detailSetting}/>
            <TJVeiw {...tjSetting}/>
            <div className="wrap">
                {this.state.view == 0 && <Panel title="培训信息管理" toolbar={toolbar}>
                    {this.state.searchToggle && <SearchForm
                        onSubmit={this.handleSearchSubmit}/>}
                    <div className="h-scroll-table">
                        <Table columns={columns}
                               dataSource={this.state.data}
                               pagination={this.state.pagination}
                               loading={this.state.loading}
                               onRowClick={this.onSelect}
                               onChange={this.handleChange}
                        />
                    </div>
                </Panel>}
                {this.state.view == 1 && <Panel title="培训信息发布" toolbar={toolbar2}>
                    <Spin spinning={this.state.sloading}>
                        <CompInputBaseTable data={this.state.letValues} model={Model.autoformba} bordered striped
                                            showConfirm
                                            onSubmit={this.handleBGSubmit} ref="addValues"
                                            submitLoading={this.state.bgLoading} title='您是否确定提交？'
                                            content='提交后将发布该信息'/>
                    </Spin></Panel>}
                {this.state.view == 4 && <Panel title="培训信息修改" toolbar={toolbar2}>
                    <Spin spinning={this.state.sloading}>
                        <CompInputBaseTable
                            data={typeof(this.state.letValues.BT) === 'undefined' ? this.state.dataxx : this.state.letValues}
                            model={Model.autoformba} bordered striped showConfirm
                            onSubmit={this.handleBGSubmit} ref="addValues" valueReset={this.valueReset}
                            submitLoading={this.state.bgLoading} title='您是否确定提交？'
                            content='提交后将发布该信息'/>
                    </Spin></Panel>}

            </div>
        </div>
    }
});

module.exports = lrb;