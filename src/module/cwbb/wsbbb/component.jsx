import React from 'react'
import {Table,Modal,Row,Col,Button,Icon,Alert,Spin} from 'antd'
import Panel from 'component/compPanel'
import {columns} from './model'
import req from 'reqwest';
import auth from 'common/auth'
import SearchForm from './searchForm'
import config from 'common/configuration'


const API_URL = config.HOST + config.URI_API_PROJECT + '/wsbbb';
const API_URL_SD = config.HOST + config.URI_API_PROJECT + '/jgzzsd';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;


const wsbbb = React.createClass({
    //初始化state
    getInitialState(){
        return {
            data: [],
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: 5,
                showQuickJumper: true,
                pageSizeOptions: ['5', '10', '20']
                 },
            searchToggle: true,
            where: '',
            helper: true,
            entity: '',
            detailHide: true,
            tables:false,
            selectedRowKeys: [],
            sloading: false,
        }
    },

    //改变页码
    handleChange(pagination, filters, sorter){
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({pagination: pager});
        this.fetchData({
            page: pager.current,
            pageSize: pager.pageSize,
            where: this.state.where
        })
    },


    //帮助按钮
    handleHelper(){
        this.setState({helper: !this.state.helper})
    },
    //手动关闭帮助提示
    handleHelperClose(){
        this.setState({helper: false})
    },

    //提交条件查询
    handleSearchSubmit(value){
        const pager = this.state.pagination;
        const where =encodeURIComponent(JSON.stringify(value));
        pager.current = 1;
        const params = {
            page: 1,
            pageSize: pager.pageSize,
            where: where
        };
        this.setState({pagination: pager, where: where,bblx:value.bblx,sloading:true});
        this.fetchData(params)
    },


    //通过API获取数据
    fetchData(params = {page: 1, pageSize: this.state.pagination.pageSize,where:this.state.where}){
        this.setState({loading: true});
        req({
            url: API_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers:{'x-auth-token':auth.getToken()},
            contentType: 'application/json'
        }).then(resp=> {
            const p = this.state.pagination;
            p.total = resp.total;
            p.showTotal = total => {
                return `共 ${resp.total} 条`
            };
            this.setState({
                data: resp.data,
                pagination: p,
                loading: false,
                tables:true,sloading:false
            })
        }).fail(err=> {
            this.setState({
                tables:false,sloading:false
            })
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                        <p>Status: {err.status}</p>
                    </div>  )
            });
        })
    },
    onSelectChange(selectedRowKeys) {
        this.setState({selectedRowKeys: selectedRowKeys });
      },

      allLocked(sdyy){
                this.setState({sloading: true });
                const rKeys=this.state.selectedRowKeys;
                var that=this;
                req({
                        url: API_URL_SD,
                        type: 'json',
                        method: 'post',
                        data: JSON.stringify({sdyy:sdyy,jgId:rKeys,lx:3}),
                        contentType: 'application/json',
                        headers:{'x-auth-token':auth.getToken()},
                    }).then(resp=> {
                            Modal.success({
                                    content: (
                                        <div>
                                            <p>锁定成功</p>
                                        </div>  ),
                                    onOk() {
                                        that.fetchData();
                                        that.allClean();
                                            },
                            });
                    }).fail(err=> {
                        this.setState({sloading: false });
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

    render(){
        var that=this
           const columns= [
                    {title: '序号', dataIndex: 'key', key: 'key'},
                    {title: '报表年度', dataIndex: 'nd', key: 'nd'},
                    {title: '事务所名称', dataIndex: 'dwmc', key: 'dwmc'},
                    {title: '证书编号', key: 'zsbh', dataIndex: 'zsbh'},
                    {title: '城市', key: 'cs', dataIndex: 'cs'},
                    {title: '联系电话', key: 'dhhm', dataIndex: 'dhhm'},
                    {title: '通讯员姓名', key: 'txyxm', dataIndex: 'txyxm'},
                    {title: '通讯员联系电话', key: 'txyyddh', dataIndex: 'txyyddh'},
                    {title: '上报状态', key: 'sbzt', dataIndex: 'sbzt'},
                    {title: '报表类型',
                        key: 'operation',
                          render(text, row, index) {
                            switch(that.state.bblx){
                                case "0":
                                    return <p>利润表</p>;
                                case "1":
                                    return <p>资产负债表</p>;
                                case "2":
                                    return <p>利润分配表</p>;
                                case "3":
                                    return <p>现金流量表</p>;
                                case "4":
                                    return <p>支出明细表</p>;
                            }
                          }}
            ];
        //定义工具栏内容
        let toolbar = <ToolBar>

            <ButtonGroup>
                <Button type="primary" onClick={this.handleHelper}><Icon type="question"/></Button>
            </ButtonGroup>
        </ToolBar>;

        //定义提示内容
        let helper = [];
        helper.push(<p key="helper-0">选择报表类型和年度，<b>点击查询按钮</b>，查看该类报表当年度未上报报表事务所及其信息</p>);
        helper.push(<p key="helper-1">系统默认选择当前时间应上报报表年度，默认类型为利润表</p>);
        const rowSelection = {
            selectedRowKeys:this.state.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                    disabled: !record.issd == false,    // 配置无法勾选的列
                }),
          };
        return <div className="cwbb-wsbbb">
            <div className="wrap">
                {this.state.helper && <Alert message="未上报报表查询帮助"
                                             description={helper}
                                             type="info"
                                             closable
                                             onClose={this.handleHelperClose}/>}

                <Panel title="事务所基本情况表" toolbar={toolbar}>
                    {this.state.searchToggle && <Spin spinning={this.state.sloading}><SearchForm
                        onSubmit={this.handleSearchSubmit} loading={this.state.sloading} 
                        allClean={this.allClean} allLocked={this.allLocked}
                        selected={this.state.selectedRowKeys}/></Spin>}
                    <div className="h-scroll-table">
                      {this.state.tables && <Table columns={columns}
                               dataSource={this.state.data}
                               pagination={this.state.pagination}
                                rowSelection={rowSelection}
                               rowKey={record=>record.jgid}
                               loading={this.state.loading}
                               onChange={this.handleChange} />}
                    </div>
                </Panel>
            </div>
        </div>
    }
});

module.exports = wsbbb;
  