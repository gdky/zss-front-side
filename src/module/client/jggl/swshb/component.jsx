import React from 'react'
import {Table,Modal,Row,Col,Button,Icon,Alert,Tooltip,Spin,Form,Input,Select,Upload,message,DatePicker } from 'antd'
import Panel from 'component/compPanel'
import auth from 'common/auth'
import req from 'reqwest';
import config from 'common/configuration'
import './untils.js'


const API_URL = config.HOST + config.URI_API_PROJECT + '/spapi/spsq/jghbsq';
const API_URL_C = config.HOST + config.URI_API_PROJECT + '/commont/checksping/jghb/';
const createForm = Form.create;
const Option = Select.Option;
let swszxP = React.createClass({
getInitialState(){
            return {
                checked: false,
            }
        },
    handleSubmit(value){
        for(var key in value){
                    if(Object.prototype.toString.call(value[key])=="[object Date]"){//时间格式化
                        var dd = value[key].Format("yyyy-MM-dd");
                        value[key]=dd;
                    };};
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
                                      that.setState({checked: true, })
                                    },
                        });
                      this.setState({sqLoading:false});
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

    showConfirm(e) {
        e.preventDefault();
        let value = this.props.form.getFieldsValue();
        var that=this;
          Modal.confirm({
            title: '您是否确认要提交合并申请？',
            content: '请确认合并双方无诉讼争议事项和未完成事项，确认无误后点击确定提交，提交后将交付中心端审批',
            onOk() {
              that.handleSubmit(value);
            },
          });
        },
      componentDidMount(){
            this.setState({loading: true, })
     req({
            url: API_URL_C+auth.getJgid(),
            type: 'json',
            method: 'get',
            headers:{'x-auth-token':auth.getToken()}
        }).then(resp=> {
            this.setState({checked: !resp,loading:false })
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
        const { getFieldProps } = this.props.form;
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
        return <div className="khd-jggl-swshb">
        <div className="fix-table table-bordered table-striped">
                <Spin spinning={this.state.loading}><Panel title="事务所合并申请" >
                               <Form horizontal onSubmit={this.showConfirm} form={this.props.form}>
                                  {!!this.state.checked&&<h3 style={{'padding':'5px','color':'red'}}>事务所注销审批中，无需重复操作</h3>}
                                <table >
                                            <tbody>
                                                    <tr>
                                                            <td ><b>申请合并事务所双方名称：</b></td>
                                                            <td colSpan="3" ><Col span="10"><Input  { ...getFieldProps('SFMC')} /></Col><Col offspan="12"><span >（以半角的,分隔）</span></Col></td>
                                                    </tr>
                                                    <tr>
                                                            <td ><b>双方证书编号：</b></td>
                                                            <td colSpan="3" ><Col span="10"><Input  { ...getFieldProps('SFZSBH')} /></Col><Col offspan="12"><span >（以半角的,分隔）</span></Col></td>
                                                    </tr>
                                                    <tr>
                                                            <td ><b>新事务所单位名称：</b></td>
                                                            <td colSpan="3" ><Col span="10"><Input  { ...getFieldProps('XSWSMC')} /></Col></td>
                                                    </tr>
                                                    <tr>
                                                            <td ><b>工商名称预核编号：</b></td>
                                                            <td colSpan="3" ><Col span="10"><Input  { ...getFieldProps('GSMCYHBH')} /></Col></td>
                                                    </tr>
                                                    <tr>
                                                            <td ><b>合并时间：</b></td>
                                                            <td colSpan="3" ><DatePicker  { ...getFieldProps('HBSJ')}></DatePicker></td>
                                                    </tr>
                                                    <tr>
                                                            <td ><b>申请人：</b></td>
                                                            <td colSpan="3" ><Col span="5"><Input  { ...getFieldProps('SQR')} /></Col></td>
                                                    </tr>
                                                    <tr>
                                                            <td ><b>附 件：</b></td>
                                                            <td colSpan="3" > 
                                                                    <Upload  {...props} {...getFieldProps('FJ', {valuePropName: 'file',})}>
                                                                                <Button type="ghost"><Icon type="upload" /> 点击上传</Button>
                                                                      </Upload>
                                                           </td>
                                                    </tr>
                                                    <tr>
                                                            <td ><b>说明：</b></td>
                                                            <td colSpan="3" ><p>1、机构合并后，双方的系统用户将无效；</p>
                                                            <p>2、机构合并后，双方的执业税务师与从业人员将放入人才库中，在新设立事务所时可进行调入操作，将原事务所的人员调入新事务所。</p></td>
                                                    </tr>
                                                    <tr >
                                                            <td ></td>
                                                            <td ><p style={{'color':'red'}}>*请确定合并双方无诉讼争议事项和未完成事项</p>
                                                                    <Button style={{float:'right'}} type="primary" disabled={this.state.checked} loading={this.state.sqLoading} htmlType="submit" >提交</Button>
                                                            </td>
                                                    </tr>
                                            </tbody>
                                </table>
                          </Form>
                </Panel></Spin>
            </div>
        </div>
    }
});
swszxP = createForm()(swszxP);
module.exports = swszxP;