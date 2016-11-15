import React from 'react'
import Panel from 'component/compPanel'
import config from 'common/configuration'
import req from 'reqwest'
import auth from 'common/auth'
import Export from 'component/ComExcelExperss';
import {Link} from 'react-router'
import SearchForm from './searchForm'
import { Upload, Input, Table, Icon, Tabs, Button, Row, Col, message,Modal,Spin }from 'antd'
// 标签定义
const API_URL = config.HOST + config.URI_API_PROJECT + '/hyhfjyqk';
const API_URL_TJ = config.HOST + config.URI_API_PROJECT + '/fytj';
const API_URL_SD = config.HOST + config.URI_API_PROJECT + '/jgzzsd';
const ToolBar = Panel.ToolBar;

const jgcx = React.createClass({

    getInitialState() { //初始化State状态，使用传入参数
        return {
            data: [],//用于主查询
            tjData: {},//用于主查询
            pagination: { //分页设置
                page: true, //是否分页
                pageSize: 6, //初始化显示记录条数
                showSizeChanger: true, //是否可以改变每页记录条数
                showQuickJumper: true, //是否可以快速跳转至某页
                size: 'small', //分页样式，当为「small」时，是小尺寸分页
                pageSizeOptions: ['5', '10', '20', '30', '40', '显示全部'], //指定每页可以显示多少条，与showSizeChanger配合使用
                current: 1
            },
            reallyToal: '',
            visible: false,//条件查询框默认状态
            where: {},
            sloading: false,
            selectedRowKeys: []
        };
    },

    handleTableChange(pagination, filters, sorter) {//onChange方法，分页、排序、筛选变化时触发，必须三个参数才能准确获取
        const tablewhere = this.state.where;
        tablewhere.sfield = sorter.field;
        tablewhere.sorder = sorter.order;
        const paper = this.state.pagination;     //把this.state.pagination指向paper，与setState异曲同工，目的是更改单一属性数据
        if (paper.pageSize != pagination.pageSize) {
            if (isNaN(pagination.pageSize)) {
                paper.pageSize = this.state.reallyToal + 1;
            } else {
                switch (pagination.pageSize) {
                    case 5:
                        paper.pageSize = 6;
                        break;
                    case 10:
                        paper.pageSize = 11;
                        break;
                    case 20:
                        paper.pageSize = 21;
                        break;
                    case 30:
                        paper.pageSize = 31;
                        break;
                    case 40:
                        paper.pageSize = 41;
                        break;
                }
            }
            if (paper.current > Math.round(paper.total / paper.pageSize)) {
                paper.current = 1;
            } else {
                paper.current = pagination.current;
            }
        } else {
            paper.current = pagination.current;
        }
        this.fetch_jgcx({//调用主查询
            pagenum: paper.current,
            pagesize: paper.pageSize,
            where: encodeURIComponent(JSON.stringify(tablewhere)),
        })
    },

    fetch_jgcx(params = {pagenum: this.state.pagination.current, pagesize: this.state.pagination.pageSize}) {
        params.pagesize = params.pagesize - 1;
        this.setState({loading: true,});//主查询加载状态
        req({
            url: API_URL,//默认数据查询后台返回JSON
            method: 'get',
            type: 'json',
            data: params,
            success: (result) => {
                if (result.data.length != 0) {
                    const pagination = this.state.pagination;
                    pagination.total = result.page.total;//要求后台返回json写法有属性page，该属性包含pageTotal（总条数值）
                    function showTotal() {
                        return <span>共{result.page.pageTotal}条</span>;
                    }

                    pagination.showTotal = showTotal;//调用总条数返回方法
                    this.setState({
                        reallyToal: result.page.pageTotal,
                        data: result.data,//传入后台获取数据，table组件要求每条查询记录必须拥有字段'key'
                        loading: false,//关闭加载状态
                    });
                } else {//空数据处理
                    const pagination = this.state.pagination;
                    pagination.total = 0;
                    this.setState({data: [], loading: false,});
                }
            },
            error: (err) => {
                alert('api错误');
                const pagination = this.state.pagination;
                pagination.total = 0;
                this.setState({data: [], loading: false,});
            }
        });
    },

    fetch_fytj(params) {
        req({
            url: API_URL_TJ,
            method: 'get',
            type: 'json',
            data: params,
            success: (result) => {
                this.setState({
                    tjData: result
                });
            },
            error: (err) => {
                alert('服务器错误');
            }
        });
    },


    handleSearchToggle() {//点击查询按钮，显示查询form
        this.setState({searchToggle: !this.state.searchToggle});
    },

    handleOk(value) {//点击搜索按钮触发事件
        const valuewhere = this.state.where;
        valuewhere.nd = value.nd;
        valuewhere.dwmc = value.dwmc;
        const paper = this.state.pagination;     //把当前页重置为1
        paper.current = 1;
        this.fetch_jgcx({//调用主查询
            pagenum: 1,
            pagesize: this.state.pagination.pageSize,
            where: encodeURIComponent(JSON.stringify(valuewhere))
        });
        this.fetch_fytj({
            where: encodeURIComponent(JSON.stringify(valuewhere))
        })
    },

    ztRender(text, row, index) {
        if (!row.jyzsr) {
            if (text == '当前页统计：') {
                return text;
            }
            return <span style={{'color':'red'}}>{text}（未上报报表）</span>;
        }
        return <p>{text}</p>;
    },

    onSelectChange(selectedRowKeys) {
        this.setState({selectedRowKeys: selectedRowKeys});
    },

    showConfirm(sdyy) {
        var that = this;
        const sels = this.state.selectedRowKeys.length;
        Modal.confirm({
            title: "已选择：" + sels + " 项，是否锁定？",
            content: sdyy,
            onOk() {
                that.allLocked();
                that.setState({loading: true});
            },
            okText: "锁定"
        });
    },
    allLocked(){
        const rKeys = this.state.selectedRowKeys;
        const sdyy = this.refs.myTextInput.refs.input.value;
        var that = this;
        req({
            url: API_URL_SD,
            type: 'json',
            method: 'post',
            data: JSON.stringify({sdyy: sdyy, jgId: rKeys, lx: 2}),
            contentType: 'application/json',
            headers: {'x-auth-token': auth.getToken()}
        }).then(resp=> {
            Modal.success({
                content: (
                  <div>
                      <p>锁定成功</p>
                  </div>  ),
                onOk() {
                    that.fetch_jgcx();
                    that.allClean();
                }
            });
        }).fail(err=> {
            Modal.error({
                title: '数据提交错误',
                content: (
                  <div>
                      <p>提交失败</p>
                      <p>Status: {err.status}</p>
                  </div>  )
            });
        })
    },
    allClean(){
        this.setState({selectedRowKeys: [] });
    },
    componentDidMount() { //REACT提供懒加载方法，懒加载时使用，且方法名必须为componentDidMount
        this.fetch_jgcx(); //异步调用后台服务器方法fetch_jgcx
        this.fetch_fytj(); //异步调用后台服务器方法fetch_jgcx
    },

    render() {
        const columns = [{ //设定列
            title: '序号', //设定该列名称
            dataIndex: 'key', //设定该列对应后台字段名
            key: 'key', //列key，必须设置，建议与字段名相同
            width: 30
        }, {
            title: '所属年度',
            dataIndex: 'nd',
            key: 'nd'
        },{
            title: '单位名称',
            dataIndex: 'dwmc',
            key: 'dwmc',
            sorter: true,
            render: this.ztRender
        }, {
            title: '营业收入',
            dataIndex: 'jyzsr',
            key: 'jyzsr',
            sorter: true
        }, {
            title: '应缴总费用',
            dataIndex: 'yjz',
            key: 'yjz'
        }, {
            title: '应缴团体会费',
            dataIndex: 'yjtt',
            key: 'yjtt'
        }, {
            title: '已交团体会费',
            dataIndex: 'yftt',
            key: 'yftt'
        }, {
            title: '欠交团体会费',
            dataIndex: 'qjtt',
            key: 'qjtt',
            sorter: true
        }, {
            title: '应缴个人会费',
            dataIndex: 'yjgr',
            key: 'yjgr'
        }, {
            title: '已交个人会费',
            dataIndex: 'yfgr',
            key: 'yfgr'
        }, {
            title: '欠交个人会费',
            dataIndex: 'qjgr',
            key: 'qjgr',
            sorter: true,
        },];
        var that = this;
        const sdyy = <p>锁定原因：<Input type="text" style={{width:"50%"}} ref="myTextInput"/></p>;
        const props = {
            showUploadList: false,
            name: 'file',
            action: '/api/zs/hyhfjn/jfsc',
            headers: {'x-auth-token': auth.getToken()},
            onChange(info) {
                if (info.file.status == 'uploading') {
                    that.setState({sloading: true});
                }
                if (info.file.status == 'done') {
                    that.setState({sloading: false});
                    let ff = false;
                    if (info.file.response.fls.length > 0) {
                        const fls = info.file.response.fls.map((fl, index) =>
                          <li key={index}>{fl}</li>
                        );
                        ff = <div style={{'height':'200px','overflowY':'auto'}}>
                            <ol>{fls}</ol>
                        </div>;
                    }
                    Modal.success({
                        title: '上传完成',
                        width: '50%',
                        content: (<div>
                            <p><b>其中成功：</b>{info.file.response.success}条</p>
                            <p><b>其中失败：</b><span style={{'color':'red'}}>{info.file.response.fail}条</span></p>
                            {!!ff && <p><b>其中失败记录及原因：</b></p>}
                            {ff}
                        </div>),
                        onOk(){
                            that.componentDidMount();
                        }
                    });
                } else if (info.file.status == 'error') {
                    that.setState({sloading: false});
                    Modal.error({
                        title: '上传失败',
                        content: (<p>{info.file.name}上传失败</p>)
                    });
                }
            },
            beforeUpload(file) {
                if (!(file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type == 'application/vnd.ms-excel')) {
                    message.error('只能上传 XLS或XLSX 类型文件');
                    return false;
                }
                return true;
            }
        };
        let toolbar = <ToolBar>
            <div>
                <Button type="ghost" onClick={this.handleSearchToggle}>
                    <Icon type="search"/>查询
                    { this.state.searchToggle ? <Icon className="toggle-tip" type="arrow-up"/> :
                      <Icon className="toggle-tip" type="arrow-down"/>}
                </Button><span className="ant-divider"></span>
                <Upload {...props}><Button type="ghost"><Icon type="upload"/>上传数据</Button></Upload>
                <span className="ant-divider"></span>
                <Link to="hyhf/scgl?zy"><Button type="ghost">上传管理</Button></Link>
                <span className="ant-divider"></span>
                <Link to="hyhf/fpdy"><Button type="ghost">发票打印</Button></Link>
                <span className="ant-divider"></span>
                <Button type="ghost" onClick={this.showConfirm.bind(this,sdyy)}
                        disabled={this.state.selectedRowKeys.length>0?false:true}>批量锁定</Button>
                <span className="ant-divider"></span>
                <Button type="ghost" onClick={this.allClean}
                        disabled={this.state.selectedRowKeys.length<=0}>撤销选择</Button>
                <span className="ant-divider"></span>
                <Export resData={this.state.data} model={columns} fileName ="会员会费缴纳情况"  />
            </div>
        </ToolBar>;
        const rowSelection = {
            selectedRowKeys:this.state.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: !record.issd == false  // 配置无法勾选的列
            })
        };

        return <div className="hyhfjnqk">
            <div className="wrap">
                <Spin spinning={this.state.sloading}><Panel title="会员会费缴纳情况" toolbar={toolbar}>
                    {this.state.searchToggle && <SearchForm
                      onSubmit={this.handleOk}/>}
                    <div className="fix-table table-bordered table-striped">
                        <table>
                            <tbody>
                            <tr>
                                <td style={{'width':'150px'}}><b>缴纳情况统计：</b></td>
                                <td><b>所属年份：</b><p><span style={{'color':'blue'}}>{this.state.tjData.nd}</span></p></td>
                                <td><b>总营业收入：</b><p><span style={{'color':'blue'}}>{this.state.tjData.yyz}</span></p>
                                </td>
                                <td><b>总已交金额：</b><p><span style={{'color':'blue'}}>{this.state.tjData.yfz}</span></p>
                                </td>
                                <td><b>其中已交团体：</b><p><span style={{'color':'blue'}}>{this.state.tjData.yft}</span></p>
                                </td>
                                <td><b>其中已交个人：</b><p><span style={{'color':'blue'}}>{this.state.tjData.yfg}</span></p>
                                </td>
                                <td><b>总欠交金额：</b><p><span style={{'color':'blue'}}>{this.state.tjData.qjz}</span></p>
                                </td>
                                <td><b>其中欠交团体：</b><p><span style={{'color':'blue'}}>{this.state.tjData.qjt}</span></p>
                                </td>
                                <td><b>其中欠交个人：</b><p><span style={{'color':'blue'}}>{this.state.tjData.qjg}</span></p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Table columns={columns}
                           dataSource={this.state.data}
                           pagination={this.state.pagination}
                           onChange={this.handleTableChange}
                           rowSelection={rowSelection}
                           rowKey={record=>record.jgid}
                           loading={this.state.loading} bordered/>
                </Panel></Spin>
            </div>

        </div>

    }
});
module.exports = jgcx;


