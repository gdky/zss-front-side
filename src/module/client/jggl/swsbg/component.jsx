import React from 'react'
import {Table,Modal,Row,Col,Button,Icon,Alert,Tooltip,Spin} from 'antd'
import Panel from 'component/compPanel'
import auth from 'common/auth'
import req from 'reqwest';
import config from 'common/configuration'
import DetailBox from './detailbox.jsx'
import DetailBoxPT from './detailboxPT.jsx'
import Model from './model.js' 


const API_URL = config.HOST + config.URI_API_PROJECT + '/jgsxx/';
const API_URL_C = config.HOST + config.URI_API_PROJECT + '/commont/checksping/checkSWSSP';
const API_URL_P = config.HOST + config.URI_API_PROJECT + '/spapi/fspsq/jgbgsq';
const API_URL_S = config.HOST + config.URI_API_PROJECT + '/spapi/spsq/jgbgsq';
const ToolBar = Panel.ToolBar;

const swsbgsq = React.createClass({
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
        fetchSWSXX(){
        return req({
            url: API_URL+auth.getJgid(),
            type: 'json',
            method: 'get',
            headers:{'x-auth-token':auth.getToken()}
        })
    },
        fetchSPing(){
        return req({
            url: API_URL_C,
            type: 'json',
            method: 'get',
            headers:{'x-auth-token':auth.getToken()}
        })
    },
    async fetchAll(){
        let [data, checked] = await Promise.all([this.fetchSWSXX(), this.fetchSPing()]);
        return {data: data, checked: checked}
    },

    fetchData(){
           this.fetchAll().then(resp=> {
            this.setState({
                sloading: false,
                checked: resp.checked,
                entity: resp.data,
            })
        }).catch(e=> {
            this.setState({sloading: false});
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                        <p>Status: {e.status}</p>
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
                <Spin spinning={this.state.sloading}>
                    <Panel title="事务所信息变更" toolbar={toolbar}>
                       {!this.state.checked&&<h3 style={{'padding':'5px','color':'red'}}>事务所存在审批中事项，请等待中心完成审核后再进行操作</h3>}
                           <DetailBoxPT data={this.state.entity} nbjgsz={Model.nbjgsz} nbTitle="内部机构设置：" 
                                nbsj={this.state.entity.nbjgsz} check={!this.state.checked} onSubmit={this.handlePTSubmit} 
                                submitLoading={this.state.sPLoading}/>
                    </Panel>
                </Spin>
                <Panel >
                   <Spin spinning={this.state.sloading}> 
                        <DetailBox data={this.state.entity} onSubmit={this.handleSPSubmit} submitLoading={this.state.sPLoading}
                         check={!this.state.checked}/>
                    </Spin>
                </Panel>
            </div>
        </div>
    }
});

module.exports = swsbgsq;