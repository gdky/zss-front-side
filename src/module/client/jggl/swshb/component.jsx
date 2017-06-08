import React from 'react'
import {Table,Modal,Row,Col,Button,Icon,Alert,Tooltip,Spin,Form,Input,Select,message,DatePicker } from 'antd'
import Panel from 'component/compPanel'
import auth from 'common/auth'
import req from 'reqwest';
import config from 'common/configuration'
import './untils.js'
import Upload from 'component/uploadFile'


const API_URL = config.HOST + config.URI_API_PROJECT + '/spapi/spsq/jghbsq';
const API_URL_C = config.HOST + config.URI_API_PROJECT + '/commont/checksping/checkSWSSP';
const API_URL_D = config.HOST + config.URI_API_PROJECT + '/commont/checksping/doFix';
const createForm = Form.create;
const Option = Select.Option;
let swszxP = React.createClass({
getInitialState(){
            return {
                checked: false,
                confirmLoading:false
            }
        },
    handleSubmit(value){
        this.setState({sqLoading:true});
        var that=this;
        for(let key in value){
                    if(Object.prototype.toString.call(value[key])=="[object Date]"){//时间格式化
                        let dd = value[key].Format("yyyy-MM-dd");
                        value[key]=dd;
                    };
                    if(key=="SFMC"){//名称数组化
                        try{
                            let mcList=value[key].split(",");
                            for(let i = 0 ;i<mcList.length;i++){
                                if(mcList[i] == "" || typeof(mcList[i]) == "undefined"){
                                        mcList.splice(i,1);
                                        i= i-1;
                                }
                            }
                            value["SFMCLIST"]=mcList;

                        }catch(e){
                            Modal.error({
                                title: '请按格式填写双方事务所名称',
                            });
                            that.setState({sqLoading: false,confirmLoading:false });
                            return;
                        }
                    };
                    if(key=="SFZSBH"){//证书编号数组化
                        try{
                            let zsList=value[key].split(",");
                            for(let i = 0 ;i<zsList.length;i++){
                                if(zsList[i] == "" || typeof(zsList[i]) == "undefined"){
                                        zsList.splice(i,1);
                                        i= i-1;
                                }
                            }
                            value["SFZSBHLIST"]=zsList;
                        }catch(e){
                            Modal.error({
                                title: '请按格式填写双方证书编号',
                            });
                            that.setState({sqLoading: false,confirmLoading:false });
                            return;
                        }
                        
                    };
                    if(key=="XSWSMC"&&(value[key]==""||typeof(value[key]) == "undefined"||value[key]==null)){
                        Modal.error({
                            title: '请填写新事务所单位名称',
                        });
                        return;
                    };
                    if(key=="GSMCYHBH"&&(value[key]==""||typeof(value[key]) == "undefined"||value[key]==null)){
                        Modal.error({
                            title: '请填写工商名称预核编号',
                        });
                        return;
                    };
                    if(key=="SQR"&&(value[key]==""||typeof(value[key]) == "undefined"||value[key]==null)){
                        Modal.error({
                            title: '请填写申请人名称',
                        });
                        return;
                    };
            };
            let ls = value;
            req({
                url: API_URL_D,
                type: 'json',
                method: 'get',
                data: {sumbitValue:encodeURIComponent(JSON.stringify(ls))},
                contentType: 'application/json',
                headers:{'x-auth-token':auth.getToken()}
            }).then(resp=> {
                    if(resp.re=="A"){
                        Modal.error({
                            title: '请检查事务所名称，证书编号和填写格式',
                        });
                    }else if(resp.re=="B"){
                        Modal.error({
                            title: '所选合并事务所存在审批中事项',
                        });
                    }else if(resp.re=="C"){
                        Modal.error({
                            title: '所选合并事务所需包含本所',
                        });
                    }else if(resp.re=="D"){
                        Modal.error({
                            title: '所选合并事务所不能重复',
                        });
                    }else if(resp.re=="E"){
                        Modal.error({
                            title: '新机构名称已存在',
                        });
                    }else{
                        ls.fjURL=this.refs.uploadFile.getURL();
                        ls.fjName=this.refs.uploadFile.getFileName();
                        req({
                            url: API_URL,
                            type: 'json',
                            method: 'post',
                            data: JSON.stringify(ls),
                            contentType: 'application/json',
                            headers:{'x-auth-token':auth.getToken()}
                        }).then(resp=> {
                                    
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
                    }
                 that.setState({sqLoading:false,confirmLoading:false});
            }).fail(err=> {
                Modal.error({
                    title: '数据获取错误',
                    content: (
                        <div>
                            <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                            <p>Status: {err.status}</p>
                        </div>  )
                });
                that.setState({sqLoading:false,confirmLoading:false});
            })
             
        },

    showConfirm(e) {
        e.preventDefault();
        let value = this.props.form.getFieldsValue();
        var that=this;
          Modal.confirm({
            title: '您是否确认要提交合并申请？',
            content: '请确认合并双方无诉讼争议事项和未完成事项，确认无误后点击确定提交，提交后将交付中心端审批',
            confirmLoading:that.state.confirmLoading,
            onOk() {
                that.setState({confirmLoading:true});
              that.handleSubmit(value);
            },
          });
        },
      componentDidMount(){
            this.setState({loading: true, })
     req({
            url: API_URL_C,
            type: 'json',
            method: 'get',
            headers:{'x-auth-token':auth.getToken()}
        }).then(resp=> {
            this.setState({checked: !resp,loading:false })
        }).catch(e=> {
            this.setState({loading:false})
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
        
        return <div className="khd-jggl-swshb">
        <div className="fix-table table-bordered table-striped">
                <Spin spinning={this.state.loading}><Panel title="事务所合并申请" >
                               <Form horizontal onSubmit={this.showConfirm} form={this.props.form}>
                                  {!!this.state.checked&&<h3 style={{'padding':'5px','color':'red'}}>事务所存在审批中事项，请等待中心完成审核后再进行操作</h3>}
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
                                                                    <Upload ref="uploadFile" />
                                                           </td>
                                                    </tr>
                                                    <tr>
                                                            <td ><b>说明：</b></td>
                                                            <td colSpan="3" >
                                                            <p>1、请确保合并事务所各所名称与证书编号一一对应，顺序相同；</p>
                                                            <p>2、请确保合并事务所各所无事务所审批申请进行中，如需审批的事务所信息变更，注销申请等；</p>
                                                            <p>3、申请人请填写新机构法人代表；</p>
                                                            <p>4、机构合并后，双方的系统用户将无效，即无法使用原账户登录系统；</p>
                                                            <p>5、机构合并后，双方的执业税务师与从业人员将放入人才库中，在新设立事务所时可进行调入操作，将原事务所的人员调入新事务所。</p></td>
                                                    </tr>
                                                    <tr >
                                                            <td ></td>
                                                            <td ><p style={{'color':'red'}}>*请确定合并双方无诉讼争议事项和未完成事项</p>
                                                            <p style={{'color':'red'}}>*机构合并后新账户默认密码为666666</p>
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