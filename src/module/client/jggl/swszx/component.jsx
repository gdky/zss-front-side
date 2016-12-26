import React from 'react'
import {Table,Modal,Row,Col,Button,Icon,Alert,Tooltip,Spin,Form,Input,Select,Upload,message } from 'antd'
import Panel from 'component/compPanel'
import auth from 'common/auth'
import req from 'reqwest';
import config from 'common/configuration'


const API_URL = config.HOST + config.URI_API_PROJECT + '/spapi/spsq/jgzxsq';
const API_URL_C = config.HOST + config.URI_API_PROJECT + '/commont/checksping/jgzx/';
const createForm = Form.create;
const Option = Select.Option;
let swszxP = React.createClass({
getInitialState(){
            return {
                checked: false,
            }
        },
    handleSubmit(value){
          this.setState({sqLoading:true});
            var ls = value;
             req({
                url: API_URL,
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
                                      that.setState({checked: false, })
                                    },
                        });
                      this.setState({sqLoading:false});
            }).fail(err=> {
                this.setState({sqLoading:false});
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

    showConfirm(e) {
        e.preventDefault();
        let value = this.props.form.getFieldsValue();
        var that=this;
          Modal.confirm({
            title: '您是否确认要提交注销申请？',
            content: '省管理中心审核通过后，事务所将不存在，并无法登录系统',
            onOk() {
              that.handleSubmit(value);
            },
          });
        },
      componentDidMount(){
     req({
            url: API_URL_C+auth.getJgid(),
            type: 'json',
            method: 'get',
            headers:{'x-auth-token':auth.getToken()}
        }).then(resp=> {
            this.setState({checked: !resp, })
        }).catch(e=> {
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
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const props = {
              name: 'file',
              action: '/api/zs/swszx/swszxfjPost1',
              headers:{'x-auth-token':auth.getToken()},
              onChange(info) {
                if (info.file.status !== 'uploading') {
                }
                if (info.file.status === 'done') {
                  message.success(`${info.file.name} 上传成功。`);
                } else if (info.file.status === 'error') {
                  message.error(`${info.file.name} 上传失败。`);
                }
              },
            };
        return <div className="khd-jggl-swszx">
        <div className="fix-table table-bordered table-striped">
                <Panel title="事务所注销申请" >
                               <Form horizontal onSubmit={this.showConfirm} form={this.props.form}>
                                  {!!this.state.checked&&<h3 style={{'padding':'5px','color':'red'}}>事务所注销审批中，无需重复操作</h3>}
                                <table >
                                            <tbody>
                                                    <tr>
                                                            <td ><b>注销原因说明：</b></td>
                                                            <td colSpan="3" ><Col span="20"><Input type="textarea" rows="3" { ...getFieldProps('zxsm')}></Input></Col></td>
                                                    </tr>
                                                    <tr>
                                                            <td ><b>注销类别：</b></td>
                                                            <td colSpan="3" >  
                                                                        <Select  id="cx-swsxz"  style={{ width: 200 }}  { ...getFieldProps('zxyy', {initialValue:4})}  >
                                                                                <Option value={4} >发起人解散</Option>
                                                                                <Option value={5} >其他</Option>
                                                                       </Select>
                                                           </td>
                                                    </tr>
                                                    <tr>
                                                            <td ><b>附 件：</b></td>
                                                            <td colSpan="3" > 
                                                                    <Upload  {...props} {...getFieldProps('zxupload', {valuePropName: 'file',})}>
                                                                                <Button type="ghost"><Icon type="upload" /> 点击上传</Button>
                                                                      </Upload>
                                                           </td>
                                                    </tr>
                                                    <tr >
                                                            <td ></td>
                                                            <td ><p style={{'color':'red'}}>*省管理中心审核通过后，事务所将不存在，不能再登录系统</p>
                                                                    <Button style={{float:'right'}} type="primary" disabled={this.state.checked} oading={this.state.sqLoading} htmlType="submit" >提交</Button>
                                                            </td>
                                                    </tr>
                                            </tbody>
                                </table>
                          </Form>
                </Panel>
            </div>
        </div>
    }
});
swszxP = createForm()(swszxP);
module.exports = swszxP;