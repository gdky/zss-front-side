import React from 'react'
import {Steps,Col,Row,Spin,notification,Modal  } from 'antd'
import Panel from 'component/compPanel'
import auth from 'common/auth.js'
import config from 'common/configuration.js'
import req from 'reqwest'
import Stage0 from './stage0.jsx'
import Stage1 from './stage1.jsx'
import Stage2 from './stage2.jsx'

const Step = Steps.Step;

const jid = auth.getJgid();
const token = auth.getToken();
const YWBBMISC_URL = config.HOST + config.URI_API_PROJECT + '/ywbbmisc/' + jid;
const YWBB_URL = config.HOST + config.URI_API_PROJECT + '/ywbb';

//转换日期至字符串
function date2string(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + '-' + month + '-' + day
}


//获取本机构下属执业税务师列表
const fetchYwbbMisc = function () {
    return req({
        url: YWBBMISC_URL,
        method: 'get',
        type: 'json',
        headers: {'x-auth-token': token}
    })
};
//异步获取数据
const fetchData = async function () {
    let [ywbbMisc] = await Promise.all([fetchYwbbMisc()]);
    return {jgxx: ywbbMisc.jgxx, zysws: ywbbMisc.zysws}
};

const newYwbb = React.createClass({
    getInitialState(){
        return {
            loading: true,
            stage: 0,
            dataXY: {},
            dataYW: {},
            dataJG: {},
            zysws: []
        }
    },
    handleStageChange(value){
        this.setState({stage: value})
    },
    handleStage0Submit(param){
        this.setState({stage: param.stage, dataXY: param.values, customer: param.customer})

    },
    handleStage1Submit(param){
        this.setState({stage: param.stage, dataYW: param.values})

    },
    handleStage2Submit(param){
        this.setState({stage: param.stage, dataJG: param.values})

    },
    //添加新报备信息
    addYwbb(param){
        return req({
            url: YWBB_URL,
            method: 'post',
            type: 'json',
            contentType: 'application/json',
            data: JSON.stringify(param),
            headers: {'x-auth-token': token}
        }).then(resp=> {
            this.setState({loading: false});
            notification.success({
                duration: 3,
                message: '操作成功',
                description: '报备信息已保存'
            })
        }).fail(e=> {
            let r = JSON.parse(e.responseText);
            this.setState({loading: false});
            if (e.status == 403) {
                Modal.error({
                    title: '业务信息提交失败',
                    content: r.text
                });
            } else {
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: '可能网络访问原因，请稍后尝试'
                });
            }
        })
    },

    //保存业务报备
    handleSave(){
        let values = {
            dataXY: this.state.dataXY,
            dataYW: this.state.dataYW,
            dataJG: this.state.dataJG,
            customer: this.state.customer,
            type: 'save'
        };
        this.setState({loading: true});
        this.addYwbb(values)
    },
    //提交业务报备
    handleCommit(){
        let values = {
            dataXY: this.state.dataXY,
            dataYW: this.state.dataYW,
            dataJG: this.state.dataJG,
            customer: this.state.customer,
            type: 'commit'
        };
        console.log(this.state.customer)
        this.setState({loading: true});
        this.addYwbb(values)
    },
    componentDidMount(){
        fetchData().then(resp=> {
            this.setState({dataJG: resp.jgxx, zysws: resp.zysws, loading: false})
        }).catch(e=> {
            let c = <div className="ywbb-new-loadfail"> 数据读取失败</div>;
            this.setState({loading: false, loaded: c})
        })
    },

    render(){
        let {stage,dataXY,dataYW,dataJG,customer} = this.state;
        let stageContent = {
            '0': this.state.loaded || <Stage0 data={dataXY}
                                              customer={customer}
                                              onSubmit={this.handleStage0Submit}/>,
            '1': <Stage1 onStageChange={this.handleStageChange}
                         data={dataYW} zysws={this.state.zysws}
                         ywlx={this.state.dataXY.YWLX_DM}
                         onSubmit={this.handleStage1Submit}/>,
            '2': <Stage2 onStageChange={this.handleStageChange}
                         data={dataJG}
                         onSubmit={this.handleStage2Submit}
                         onSave={this.handleSave}
                         onCommit={this.handleCommit}/>
        };

        return <Panel>
            <Steps current={stage} className="steps">
                <Step title="填写协议"/>
                <Step title="填写业务详细信息"/>
                <Step title="确认事务所基本信息"/>
            </Steps>
            <Spin spinning={this.state.loading}>
                <div>
                    {stageContent[stage]}
                </div>
            </Spin>

        </Panel>

    }
});

module.exports = newYwbb;