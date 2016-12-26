import React from 'react'
import {Table,Modal,Row,Col,Button,Icon,Alert,message} from 'antd'
import Panel from 'component/compPanel'
import {columns} from './model'
import req from 'reqwest';
import auth from 'common/auth'
import SearchForm from './searchForm'
import Login from './login'
import config from 'common/configuration'


const API_URL = config.HOST + config.URI_API_PROJECT + '/jgs/swsslspcx';
const API_URL_TJ = config.HOST + config.URI_API_PROJECT + '/jggl/swsslsp';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;


const swsslsp = React.createClass({
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
            searchToggle: false,
            where: {},
            helper: true,
            modelvisible: false,
            re:true,
        }
    },

    //改变页码
    handleChange(pagination, filters, sorter){
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
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

    //刷新按钮
    handleRefresh(){
        const pager = this.state.pagination;
        pager.current = 1;
        this.setState({pagination: pager, where: ''});
        this.fetchData();
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
        pager.current = 1;
        this.setState({pagination: pager, where: value});
        this.fetchData({
            pagenum: 1,
            pagesize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(value))
        });
    },
    showModal() {
        this.setState({
          modelvisible: true,
        });
      },
      modelOk(value) {
        this.setState({ mloading: true, });
        req({
                url: API_URL_TJ,
                type: 'json',
                method: 'post',
                data: JSON.stringify(value),
                contentType: 'application/json',
                headers:{'x-auth-token':auth.getToken()}
            }).then(resp=> {
                      this.fetchData({//调用主查询
                        pagenum: this.state.pagination.current,
                        pagesize: this.state.pagination.pageSize,
                        where: encodeURIComponent(JSON.stringify(this.state.where)),
                      })
                  message.destroy();
                this.setState({mloading:false,modelvisible: false,re:!this.state.re});
            }).fail(err=> {
              this.setState({mloading:false});
              let rop=JSON.parse(err.responseText);
                Modal.error({
                    title: '提交失败',
                    content: (
                        <div>
                            <p>错误原因：</p>
                            <p>{rop.text}</p>
                        </div>  )
                });
            })
      },
      modelCancel(e) {
        if (this.state.mloading) {
            message.loading('正在执行...', 0);
        }else{
        this.setState({
          modelvisible: false,
          re:!this.state.re
        });
        };
      },

    //通过API获取数据
    fetchData(params = {pagenum: this.state.pagination.current, pagesize: this.state.pagination.pageSize}){
        this.setState({loading: true});
        req({
            url: API_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers:{'x-auth-token':auth.getToken()}
        }).then(resp=> {
            const p = this.state.pagination;
            p.total = resp.page.pageTotal;
            p.showTotal = total => {
                return `共 ${resp.page.pageTotal} 条`
            };
            this.setState({
                data: resp.data,
                loading: false
            })
        }).fail(err=> {
            this.setState({loading: false});
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

    componentDidMount(){
        this.fetchData();
    },

    render(){
        //定义工具栏内容
        let toolbar = <ToolBar>
        <Button  onClick={this.showModal}>添加机构</Button>

            <Button onClick={this.handleSearchToggle}>
                <Icon type="search"/>查询
                { this.state.searchToggle ? <Icon className="toggle-tip" type="circle-o-up"/> :
                    <Icon className="toggle-tip" type="circle-o-down"/>}
            </Button>

            <ButtonGroup>
                <Button type="primary" onClick={this.handleHelper}><Icon type="question"/></Button>
                <Button type="primary" onClick={this.handleRefresh}><Icon type="reload"/></Button>
            </ButtonGroup>
        </ToolBar>;

        //定义提示内容
        let helper = [];
        helper.push(<p key="helper-0">1、省级注册税务师管理机构收到《申请报告》后，点击设立按钮进入提交设立资料前的登录权限设罝，亊务所格根据己设罝的权限</p>);
        helper.push(<p key="helper-1">  登录，填报设立亊务所的相关资料，打印经省级管理机构审核的电子表格文档和上传的附件资料；</p>);
        helper.push(<p key="helper-2">2、省级注册税务师管理机构根据下列表中的“当前状态”点击进入审核亊务所上报信息；</p>);
        helper.push(<p key="helper-3">3、省级注册税务师営理机构根据上报的资料审核是否符合政策要求确定是否通过。</p>);

        return <div className="jggl-swsslsp">
            <div className="wrap">
                {this.state.helper && <Alert message="机构设立审批帮助"
                                             description={helper}
                                             type="info"
                                             closable
                                             onClose={this.handleHelperClose}/>}

                <Panel title="机构设立审批列表" toolbar={toolbar}>
                    {this.state.searchToggle && <SearchForm
                        onSubmit={this.handleSearchSubmit}/>}
                    <div className="h-scroll-table">
                        <Table columns={columns}
                               dataSource={this.state.data}
                               pagination={this.state.pagination}
                               loading={this.state.loading}
                               onChange={this.handleChange} />
                        <Modal ref="modal"  visible={this.state.modelvisible} maskClosable={false}  
                          title="新增机构"  onCancel={this.modelCancel} 
                           footer={[
                          ]} ><Login onSubmit={this.modelOk} loading={this.state.mloading} rest={this.state.re} />
                        </Modal>
                    </div>
                </Panel>
            </div>
        </div>
    }
});

module.exports = swsslsp;