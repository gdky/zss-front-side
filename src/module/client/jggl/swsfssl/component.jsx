import React from 'react'
import {Modal,Spin } from 'antd'
import CompInputBaseTable from 'component/compInputBaseTable';
import Panel from 'component/compPanel'
import auth from 'common/auth'
import req from 'reqwest';
import Model from './model.js' 
import config from 'common/configuration'


const API_URL_S = config.HOST + config.URI_API_PROJECT + '/spapi/spsq/swsfsslsq';
const API_URL_C = config.HOST + config.URI_API_PROJECT + '/commont/checksping/jgfsssl';
const swsfssl = React.createClass({
    getInitialState(){
                return {
                    checked: false,
                    dataxx:[],
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
                                       window.reload();
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
            })
        },
      componentDidMount(){
        req({
                url: API_URL_C,
                type: 'json',
                method: 'get',
                headers:{'x-auth-token':auth.getToken()}
            }).then(resp=> {
                       if (!resp) {
                        Modal.error({
                            title: '数据获取错误',
                            content: '当前事务所不符合设立分所条件'
                        });
                      this.setState({onSubmitZT:true});
                  };
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

    render(){
        return <div className="khd-jggl-swsfssl">
        <div className="fix-table table-bordered table-striped">
                <Panel title="分所设立" >
                        <Spin spinning={this.state.sloading}>
                        <CompInputBaseTable data={this.state.dataxx}  model={Model.data} bordered striped reset showConfirm
                        onSubmit={this.handleSubmit}  disabled={this.state.onSubmitZT} nbjgsz={Model.nbjgsz} nbTitle="内部机构设置："
                        submitLoading={this.state.bgLoading} title='您是否确认提交以上信息？'  
                        content='申请提交后将提交中心管理端审批'  />
                         </Spin></Panel>
            </div>
        </div>
    }
});
module.exports = swsfssl;