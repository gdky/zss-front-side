import React from 'react'
import {Table, Modal, Row, Col, Button, Icon, Alert, message} from 'antd'
import Panel from 'component/compPanel'
import {handleRowButton, columns, entityModel} from './model'
import req from 'reqwest';
import SearchForm from './searchForm'
import Add from './Add'
import Update from './Update'
import auth from 'common/auth'
import config from 'common/configuration'
import {entityFormat} from 'common/utils'
import DetailBox from './detailbox.jsx'
import cloneDeep from 'lodash/cloneDeep'


const API_URL = config.HOST + config.URI_API_PROJECT + '/add/zcfzb';
const URL = config.HOST + config.URI_API_PROJECT + '/addzcfzb';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;


const zcfzb = React.createClass({
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
            viewTitle: '资产表',
            dataLoading: false,
            btnLoading: false
        }
    },

    componentDidMount() {
        this.fetchData();
    },

    handleViewChange(e) {
        let tl = this.state.viewTitle;
        switch (e) {
            case 0:
                tl = "资产负债表";
                this.setState({fileds: {}});
                break;
            case 1:
                tl = "添加资产负债表";
                break;
            case 2:
                tl = "资产负债表修改";
                break;
            case 3:
                tl = "资产负债表查看";
                break;
        }
        this.setState({views: e, viewTitle: tl});
    },

    //改变页码
    handleChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({pagination: pager});
        this.fetchData({
            page: pager.current,
            pageSize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(this.state.where))
        })
    },

    //查询按钮
    handleSearchToggle() {
        this.setState({searchToggle: !this.state.searchToggle});
    },

    //刷新按钮
    handleRefresh() {
        const pager = this.state.pagination;
        pager.current = 1;
        this.setState({pagination: pager, where: ''});
        this.fetchData();
    },

    //帮助按钮
    handleHelper() {
        this.setState({helper: !this.state.helper})
    },

    //手动关闭帮助提示
    handleHelperClose() {
        this.setState({helper: false})
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

    //点击保存或提交
    handleSubmit(lx, value) {
        if (lx == 'add') {
            this.fetchHandle(value, '', 'post');
        } else if (lx == 'update') {
            this.fetchHandle(value, ("/" + value.id), 'put');
        }
        ;
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
//明细表中的entity,编辑表中的fileds(在component里面已经指定update表中的data就是field，所以在update通过data=this.props.data即可拿到field)
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
            for (let prop in resp) {
                if (prop == 'ND') {
                    resp[prop] = resp[prop] + ''
                }
                fs[prop.toLowerCase()] = {value: resp[prop]}
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

    rowRender(text, record, index) {
        var that = this;

        function showDetail(lx) {
            that.fetchDetail(record);
            that.handleViewChange(lx);
        }

        return (
            <span>
                <Button disabled={record.ZTBJ == "提交" } size="small" onClick={showDetail.bind(this, 2)}><Icon
                    type="edit"/>编辑</Button>
                <Button size="small" onClick={showDetail.bind(this, 3)}><Icon type="book"/>查看</Button>
            </span>
        )
    },
    getFormEntity(entity){
        this.setState({fileds: entity});
    },
    toNum(param) {
        return typeof param == 'number' ? param : 0
    },
    dealWithChanged(field, lx) {
        let f = this.state.fileds;
        for (let prop in field) {
            f[prop] = field[prop]
        }
        //【14行+17行+26行+30行+31行=32行】
        f.zczj_nc.value = this.toNum(f.ldzc_hj_nc.value)
            + this.toNum(f.cqtz_hj_nc.value)
            + this.toNum(f.gdzc_hj_nc.value)
            + this.toNum(f.wxqt_hj_nc.value)
            + this.toNum(f.ydsx_skjx_nc.value);
        f.zczj.value = this.toNum(f.ldzc_hj.value)
            + this.toNum(f.cqtz_hj.value)
            + this.toNum(f.gdzc_hj.value)
            + this.toNum(f.wxqt_hj.value)
            + this.toNum(f.ydsx_skjx.value);

        //【1行+...+13行=14行】
        f.ldzc_hj_nc.value = this.toNum(f.ldzc_hbzj_nc.value)
            + this.toNum(f.ldzc_dqtz_nc.value)
            + this.toNum(f.ldzc_yspj_nc.value)
            + this.toNum(f.ldzc_ysgl_nc.value)
            + this.toNum(f.ldzc_yslx_nc.value)
            + this.toNum(f.ldzc_yszk_nc.value)
            + this.toNum(f.ldzc_qtys_nc.value)
            + this.toNum(f.ldzc_yfzk_nc.value)
            + this.toNum(f.ldzc_ysbt_nc.value)
            + this.toNum(f.ldzc_ch_nc.value)
            + this.toNum(f.ldzc_dtfy_nc.value)
            + this.toNum(f.ldzc_dqzj_nc.value)
            + this.toNum(f.ldzc_qtldzc_nc.value);
        f.ldzc_hj.value = this.toNum(f.ldzc_hbzj.value)
            + this.toNum(f.ldzc_dqtz.value)
            + this.toNum(f.ldzc_yspj.value)
            + this.toNum(f.ldzc_ysgl.value)
            + this.toNum(f.ldzc_yslx.value)
            + this.toNum(f.ldzc_yszk.value)
            + this.toNum(f.ldzc_qtys.value)
            + this.toNum(f.ldzc_yfzk.value)
            + this.toNum(f.ldzc_ysbt.value)
            + this.toNum(f.ldzc_ch.value)
            + this.toNum(f.ldzc_dtfy.value)
            + this.toNum(f.ldzc_dqzj.value)
            + this.toNum(f.ldzc_qtldzc.value);

        //【15行+16行=17行】
        f.cqtz_hj_nc.value = this.toNum(f.cqtz_gq_nc.value)
            + this.toNum(f.cqtz_zq_nc.value);
        f.cqtz_hj.value = this.toNum(f.cqtz_gq.value)
            + this.toNum(f.cqtz_zq.value);

        //【18行-19行=20行】
        f.gdzc_jz_nc.value = this.toNum(f.gdzc_yj_nc.value)
            - this.toNum(f.gdzc_ljzj_nc.value);
        f.gdzc_jz.value = this.toNum(f.gdzc_yj.value)
            - this.toNum(f.gdzc_ljzj.value);

        //【20行-21行=22行】
        f.gdzc_je_nc.value = this.toNum(f.gdzc_jz_nc.value)
            - this.toNum(f.gdzc_jzzb_nc.value);
        f.gdzc_je.value = this.toNum(f.gdzc_jz.value)
            - this.toNum(f.gdzc_jzzb.value);

        //【22行+23行+24行+25行=26行】
        f.gdzc_hj_nc.value = this.toNum(f.gdzc_je_nc.value)
            + this.toNum(f.gdzc_gcwz_nc.value)
            + this.toNum(f.gdzc_zjgc_nc.value)
            + this.toNum(f.gdzc_ql_nc.value);
        f.gdzc_hj.value = this.toNum(f.gdzc_je.value)
            + this.toNum(f.gdzc_gcwz.value)
            + this.toNum(f.gdzc_zjgc.value)
            + this.toNum(f.gdzc_ql.value);

        //【27行+28行+29行=30行】
        f.wxqt_hj_nc.value = this.toNum(f.wxqt_wxzc_nc.value)
            + this.toNum(f.wxqt_cqdt_nc.value)
            + this.toNum(f.wxqt_qtcq_nc.value);
        f.wxqt_hj.value = this.toNum(f.wxqt_wxzc.value)
            + this.toNum(f.wxqt_cqdt.value)
            + this.toNum(f.wxqt_qtcq.value);

        //【47行+54行+55行=56行】
        f.dysx_fzhj_nc.value = this.toNum(f.ldfz_hj_nc.value)
            + this.toNum(f.cqfz_hj_nc.value)
            + this.toNum(f.dysx_dyskdx_nc.value);
        f.dysx_fzhj.value = this.toNum(f.ldfz_hj.value)
            + this.toNum(f.cqfz_hj.value)
            + this.toNum(f.dysx_dyskdx.value);

        //【56行+63行=64行】
        f.fzsyzqy_hj_nc.value = this.toNum(f.dysx_fzhj_nc.value)
            + this.toNum(f.syzqy_hj_nc.value);
        f.fzsyzqy_hj.value = this.toNum(f.dysx_fzhj.value)
            + this.toNum(f.syzqy_hj.value);

        //【33行+...+46行=47行】
        f.ldfz_hj_nc.value = this.toNum(f.ldfz_dqjk_nc.value)
            + this.toNum(f.ldfz_yfpj_nc.value)
            + this.toNum(f.ldfz_yfzk_nc.value)
            + this.toNum(f.ldfz_yszk_nc.value)
            + this.toNum(f.ldfz_yfgz_nc.value)
            + this.toNum(f.ldfz_yffl_nc.value)
            + this.toNum(f.ldfz_yfgl_nc.value)
            + this.toNum(f.ldfz_yjsj_nc.value)
            + this.toNum(f.ldfz_qtyj_nc.value)
            + this.toNum(f.ldfz_qtyf_nc.value)
            + this.toNum(f.ldfz_ytfy_nc.value)
            + this.toNum(f.ldfz_yjfz_nc.value)
            + this.toNum(f.ldfz_dqfz_nc.value)
            + this.toNum(f.ldfz_qtfz_nc.value);
        f.ldfz_hj.value = this.toNum(f.ldfz_dqjk.value)
            + this.toNum(f.ldfz_yfpj.value)
            + this.toNum(f.ldfz_yfzk.value)
            + this.toNum(f.ldfz_yszk.value)
            + this.toNum(f.ldfz_yfgz.value)
            + this.toNum(f.ldfz_yffl.value)
            + this.toNum(f.ldfz_yfgl.value)
            + this.toNum(f.ldfz_yjsj.value)
            + this.toNum(f.ldfz_qtyj.value)
            + this.toNum(f.ldfz_qtyf.value)
            + this.toNum(f.ldfz_ytfy.value)
            + this.toNum(f.ldfz_yjfz.value)
            + this.toNum(f.ldfz_dqfz.value)
            + this.toNum(f.ldfz_qtfz.value);

        //【57行-58行=59行】
        f.syzqy_sszbje_nc.value = this.toNum(f.syzqy_sszb_nc.value) - this.toNum(f.syzqy_yhtz_nc.value);
        f.syzqy_sszbje.value = this.toNum(f.syzqy_sszb.value) - this.toNum(f.syzqy_yhtz.value);

        //【48行+...+53行=54行】
        f.cqfz_hj_nc.value = this.toNum(f.cqfz_cqjk_nc.value)
            + this.toNum(f.cqfz_yfzq_nc.value)
            + this.toNum(f.cqfz_cqyf_nc.value)
            + this.toNum(f.cqfz_zxyf_nc.value)
            + this.toNum(f.cqfz_zyfxjj_nc.value)
            + this.toNum(f.cqfz_qtfz_nc.value);
        f.cqfz_hj.value = this.toNum(f.cqfz_cqjk.value)
            + this.toNum(f.cqfz_yfzq.value)
            + this.toNum(f.cqfz_cqyf.value)
            + this.toNum(f.cqfz_zxyf.value)
            + this.toNum(f.cqfz_zyfxjj.value)
            + this.toNum(f.cqfz_qtfz.value);

        //【59行+...+62行=63行】
        f.syzqy_hj_nc.value = this.toNum(f.syzqy_sszbje_nc.value)
            + this.toNum(f.syzqy_zbgj_nc.value)
            + this.toNum(f.syzqy_yygj_nc.value)
            + this.toNum(f.syzqy_wfplr_nc.value);
        f.syzqy_hj.value = this.toNum(f.syzqy_sszbje.value)
            + this.toNum(f.syzqy_zbgj.value)
            + this.toNum(f.syzqy_yygj.value)
            + this.toNum(f.syzqy_wfplr.value);

        //【64行=32行】
        f.fzsyzqy_hj_nc.value = f.zczj_nc.value;
        f.fzsyzqy_hj.value = f.zczj.value;

        this.setState({fileds: f});
    },

    render() {
        const column1 = [
            {title: '序号', dataIndex: 'key', key: 'key'},
            {title: '事务所名称', dataIndex: 'DWMC', key: 'DWMC'},
            {title: '性质', dataIndex: 'TIMEVALUE', key: 'TIMEVALUE'},
            {title: '年度', dataIndex: 'nd', key: 'nd'},
            {title: '状态', key: 'ZTBJ', dataIndex: 'ZTBJ'},

            {
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
        helper.push(<p key="helper-0">点击查询结果查看资产负债表明细</p>);
        helper.push(<p key="helper-1">也可以添加修改和提交资产负债表</p>);
        return <div className="cwbb-zcfzb">
            <div className="wrap">
                {this.state.helper && <Alert message="资产负债表检索查询帮助"
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
                    getFormEntity={this.getFormEntity}
                    data={this.state.fileds}
                    btnloading={this.state.btnLoading}
                    changed={this.dealWithChanged}
                    toback={this.handleViewChange.bind(this, 0)}/>
                }
                {this.state.views == 2 &&
                <Update
                    onSubmit={this.handleSubmit.bind(this, 'update')}
                    data={this.state.fileds}
                    loading={this.state.dataLoading}
                    btnloading={this.state.btnLoading}
                    changed={this.dealWithChanged}
                    toback={this.handleViewChange.bind(this, 0)}/>
                }
            </div>
        </div>
    }
});

module.exports = zcfzb;