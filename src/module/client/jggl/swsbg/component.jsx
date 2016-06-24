import React from 'react'
import {Table,Modal,Row,Col,Button,Icon,Alert,Tooltip,Spin} from 'antd'
import Panel from 'component/compPanel'
import auth from 'common/auth'
import req from 'reqwest';
import config from 'common/configuration'
import DetailBox from './detailbox.jsx'
import DetailBoxPT from './detailboxPT.jsx'


const API_URL = config.HOST + config.URI_API_PROJECT + '/swsbg/swsjgGet1';
const API_URL_P = config.HOST + config.URI_API_PROJECT + '/swsbg/swsjgPut1';
const API_URL_S = config.HOST + config.URI_API_PROJECT + '/swsbg/swsjgPost1';
const ToolBar = Panel.ToolBar;

const lrb = React.createClass({
    //初始化state
    getInitialState(){
            return {
                data: [],
                searchToggle: false,
                helper: false,
                entity: '',
                detailHide: true,
            }
        },

    handleSPSubmit(value){
          this.setState({sPLoading:true});
            var ls = value;
             req({
                url: API_URL_S,
                type: 'json',
                method: 'post',
                data: JSON.stringify(ls),
                contentType: 'application/json',
                headers:{'x-auth-token':auth.getToken()}
            }).then(resp=> {
                        var that=this;
                        Modal.success({
                            title: '提交成功',
                            content: (
                                <div>
                                    <p>提交成功，请等待管理中心审核</p>
                                </div>  ),
                            onOk() {
                                       that.fetchData();
                                    },
                        });
                      this.setState({sPLoading:false});
            }).fail(err=> {
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

    handlePTSubmit(value){
        this.setState({sPLoading:true});
            var ls = value;
             req({
                url: API_URL_P,
                type: 'json',
                method: 'put',
                data: JSON.stringify(ls),
                contentType: 'application/json',
                headers:{'x-auth-token':auth.getToken()}
            }).then(resp=> {
                var that=this;
                Modal.success({
                    title: '提交成功',
                    content: (
                        <div>
                            <p>变更提交成功，数据已更新</p>
                        </div>  ),
                    onOk() {
                             that.fetchData();
                            },
                });
                 this.setState({sPLoading:false});
            }).fail(err=> {
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

        //帮助按钮
    handleHelper(){
        this.setState({helper: !this.state.helper})
    },

    //手动关闭帮助提示
    handleHelperClose(){
        this.setState({helper: false})
    },
    
    //通过API获取数据
    fetchData(){
        req({
            url: API_URL,
            type: 'json',
            method: 'get',
            headers:{'x-auth-token':auth.getToken()}
        }).then(resp=> {
            this.setState({
                entity: resp,
                sloading:false,
            });
        }).fail(err=> {
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
                <Button type="primary" onClick={this.handleHelper}><Icon type="question"/></Button>
        </ToolBar>;

        //定义提示内容
        let helper = [];
        helper.push(<p key="helper-0">1)    变更备案需要审批项：单位名称、所在城市、地址、机构性质、注册资金等</p>);
        helper.push(<p key="helper-1">2)    法人在变更备案页面是无法变更的</p>);

        return <div className="khd-jggl-swsbg">
            <div className="wrap">
                {this.state.helper && <Alert message="变更备案申请帮助" description={helper} type="info" closable onClose={this.handleHelperClose}/>}
                <Spin spinning={this.state.sloading}><Panel title="事务所信息变更" toolbar={toolbar}>
                   {!this.state.entity.checked&&<h3 style={{'padding':'5px','color':'red'}}>事务所变更审批中，无法进行变更操作</h3>}
                    <DetailBox data={this.state.entity} onSubmit={this.handleSPSubmit} submitLoading={this.state.sPLoading}/>
                </Panel></Spin>
                <Panel >
                   <Spin spinning={this.state.sloading}> <DetailBoxPT data={this.state.entity} onSubmit={this.handlePTSubmit} submitLoading={this.state.sPLoading}/></Spin>
                </Panel>
            </div>
        </div>
    }
});

module.exports = lrb;