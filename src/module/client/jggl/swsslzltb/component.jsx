import React from 'react'
import {Modal,Spin } from 'antd'
import CompInputBaseTable from 'component/compInputBaseTable';
import Panel from 'component/compPanel'
import auth from 'common/auth'
import req from 'reqwest';
import Model from './model.js' 
import config from 'common/configuration'

const API_URL = config.HOST + config.URI_API_PROJECT + '/jgsxx/';
const API_URL_S = config.HOST + config.URI_API_PROJECT + '/spapi/spsq/swsslzltb';
const swsfssl = React.createClass({
    getInitialState(){
                return {
                    checked: false,
                    entity:[],
                    onSubmitZT:false,
                    bgLoading:false,
                    sloading:false,
                }
            },
    handleSubmit(value) {
        this.setState({sloading:true});
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
                                       location.reload();
                                    },
                        });
                      this.setState({sloading:false});
            }).fail(err=> {
                Modal.error({
                    title: '数据获取错误',
                    content: (
                        <div>
                            <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                            <p>Status: {err.status}</p>
                        </div>  )
                });
                this.setState({sloading:false});
            })
        },
    componentDidMount(){
         req({
                url: API_URL+auth.getJgid(),
                type: 'json',
                method: 'get',
                headers:{'x-auth-token':auth.getToken()}
            }).then(resp=> {
                if (resp.tgzt==5) {
                            Modal.error({
                                title: '中心审批中',
                                content: '请等待管理中心审核',
                            });
                            this.setState({onSubmitZT: true,});
                };
                this.setState({entity: resp,});
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
    render(){
        return <div className="khd-jggl-swsslzltb">
        <div className="fix-table table-bordered table-striped">
                <Panel title="设立资料填报" >
                        <Spin spinning={this.state.sloading}>
                        <CompInputBaseTable data={this.state.entity}  model={Model.data} bordered striped reset showConfirm
                        onSubmit={this.handleSubmit}  disabled={this.state.onSubmitZT} nbjgsz={Model.nbjgsz} nbTitle="内部机构设置："
                        submitLoading={this.state.bgLoading} title='您是否确认提交以上信息？'   nbsj={this.state.entity.nbjgsz}
                        content='申请提交后将提交中心管理端审批'  />
                         </Spin></Panel>
            </div>
        </div>
    }
});
module.exports = swsfssl;