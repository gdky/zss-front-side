import React from 'react'
import {Table,Modal,Row,Col,Button,Icon,Alert,Input,Form,Spin,Tabs} from 'antd'
import Panel from 'component/compPanel'
import req from 'reqwest';
import config from 'common/configuration'
import auth from 'common/auth'

const API_URL = config.HOST+config.URI_API_PROJECT + '/swsrycx/zyglscdy/';
const API_URL_CYDR = config.HOST+config.URI_API_PROJECT + '/spapi/fspsq/cydrsq';
const API_URL_ZYDR = config.HOST+config.URI_API_PROJECT + '/spapi/spsq/zydrsq';
const API_URL_FZYZZY = config.HOST+config.URI_API_PROJECT + '/spapi/spsq/fzyzzysq';
const createForm = Form.create;
const TabPane = Tabs.TabPane;

let rydr = React.createClass({
    //初始化state
    getInitialState(){
        return {
            tabKey: 1,
            sloading:false
        }
    },


handleSubmit(ry){
        this.props.form.validateFieldsAndScroll((errors, values) => {//条件校验处理
              if (!!errors) {
                    Modal.info({ title: '提示', content: (<div><p><b>请填写所有必填项</b></p> </div>)});
                return;
            }
            this.setState({sloading:true});
            let value = this.props.form.getFieldsValue();
            req({
            url: API_URL + ry,
            method: 'get',
            type: 'json',
            data: {where:encodeURIComponent(JSON.stringify(value))},
            contentType: 'application/json',
            headers:{'x-auth-token':auth.getToken()},
            }).then(resp=> {
                if (resp.length!=0) {
                    let bls = [];
                    for (let zdm in resp[0]) {
                        if(zdm=="id"){
                            continue;
                        }
                         bls.push(<tr key={zdm}><td><b>{zdm}</b></td><td>{resp[0][zdm]}</td></tr>);
                    };
                    var that=this;
                Modal.confirm({
                    title: '是否调入以下人员',
                    content: (
                        <div className="fix-table table-bordered table-striped">
                            <table >
                                    <tbody>
                                        {bls}
                                    </tbody>
                             </table> 
                        </div>  ),
                    onOk() {
                                let squrls="";
                                let ls = {ryid:resp[0].id};
                                let med="put";
                                switch(ry){
                                    case 1: squrls=API_URL_ZYDR;med="post";break;
                                    case 2: squrls=API_URL_CYDR;break;
                                    case 5: squrls=API_URL_FZYZZY;ls.ydw=resp[0].ZZDW;med="post";break;
                                }
                                  req({
                                        url: squrls,
                                        type: 'json',
                                        method: med,
                                        data: JSON.stringify(ls),
                                        contentType: 'application/json',
                                        headers:{'x-auth-token':auth.getToken()},
                                    }).then(resp=> {
                                            Modal.success({
                                                    title: '提交成功',
                                                    content: (
                                                        <div>
                                                            <p>提交成功</p>
                                                        </div>  ),
                                                    onOk() {
                                                        that.props.form.resetFields();
                                                            },
                                            });
                                             that.setState({sloading:false});
                                    }).fail(err=> {
                                            Modal.error({
                                                title: '数据获取错误',
                                                content: (
                                                    <div>
                                                        <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                                                        <p>Status: {err.status}</p>
                                                    </div>  )
                                            });
                                            that.setState({sloading:false});
                                    })
                            },
                        onCancel(){
                            that.setState({sloading:false});
                        },
                });
            }else{
                Modal.info({ title: '提示', content: (<div><p><b>储备库中无此记录，请检查人员姓名与身份证</b></p> </div>)});
                this.setState({sloading:false});
            };
            })
         });
    },

    callback(key) {
          this.setState({tabKey:key});
          this.props.form.resetFields();
        },

    componentDidMount(){
        // req({
        //     url: config.HOST+config.URI_API_PROJECT + '/jg/jgchild',//默认数据查询后台返回JSON
        //     method: 'get',
        //     type: 'json',
        //     contentType: 'application/json',
        //     headers:{'x-auth-token':auth.getToken()},
        // }).then(resp=> {
        //   if (resp.length>0) {
        //   this.setState({isZS:true});
        //   }else{
        //     this.setState({isZS:false});
        //   };
        // })
    },

    render(){
        const { getFieldProps } = this.props.form;
        const tabk=this.state.tabKey;
        let tabConst = <div style={{textAlign:'center'}}>
                    <p className="nbjgsz">
                        <span style={{'color':'red',fontSize:'large'}}>*</span>
                        {tabk==1||tabk==3?"证书编号：":tabk==5?"非执业注册编号：":"姓名："}<Input style={{width:'215px'}} { ...getFieldProps("xming", { rules: [{ required: true}]})}/>
                    </p>
                    <p style={{padding:'20px'}}>
                        <span style={{'color':'red',fontSize:'large'}}>*</span>
                        <b>身份证号：</b><Input style={{width:'200px'}} { ...getFieldProps("sfzh", { rules: [{ required: true}]})}/>
                    </p>
                    <p className="nbjgsz">
                        <Button type="primary" onClick={this.handleSubmit.bind(this,tabk)}>确定</Button>
                    </p>
                </div>
        return <div className="yzxsws">
            <div className="wrap">
                <Alert message="人员调转操作提示"
                 description={"请填写被调入人员姓名和身份证号，被调入人员必须已在本系统备案"}
                 type="info" />
                <Panel title="人员调转" >
                <Spin spinning={this.state.sloading}>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="执业税务师调入" key="1">{tabConst}</TabPane>
                        <TabPane tab="从业人员调入" key="2">{tabConst}</TabPane>
                        <TabPane tab="非执业税务师转执业" key="5">{tabConst}</TabPane>
                  </Tabs>
                
                </Spin>
                </Panel>
                
            </div>
        </div>
    }
});
rydr = createForm()(rydr);
module.exports = rydr;