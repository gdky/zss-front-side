import React from 'react'
import {Spin, notification, Modal, Icon, Alert,Button,Row,Col} from 'antd'
import Panel from 'component/compPanel'
import config from 'common/configuration.js'
import req from 'common/request'
import Stage from './stage.jsx'
import AddSuccess from './commitSuccessScr';

const PanelBar = Panel.ToolBar;

const c = React.createClass({
    getDefaultProps(){
        return {
            ywbbUrl: config.HOST + config.URI_API_PROJECT + '/ywbb',
            miscUrl: config.HOST + config.URI_API_PROJECT + '/ywbbmisc'
        }
    },
    getInitialState(){
        return {
            loading: true,
            successResp: {},
            dataJG: {},
            data: {},
            customer: {},
            zysws: [],
            locked: [],
            view:'form'
        }
    },

    resetNew(){
        this.setState({view:'form'})
    },
    //退回用户管理界面
    back(){
        this.props.onBack();
    },
    //修改报备信息,type为反馈信息组件类型，分别是edit和add
    updateYwbb(param,type){
        const {ywbbUrl,id} = this.props;
        return req({
            url: ywbbUrl + `/${id}`,
            method: 'put',
            data: param
        }).then(resp=> {
            this.setState({loading: false, view: 'success', successResp: resp.data,type:type});
        }).catch(e=> {
            let r = JSON.parse(e.responseText);
            this.setState({loading: false});
            if (e.status == 403) {
                Modal.error({
                    title: '更新业务信息失败',
                    content: r.text
                });
            } else {
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: '网络故障，信息无法提交'
                });
            }
        })
    },

    //保存业务报备
    handleSave(param){

        let values = {
            data:{
                formValue:param,
                dataJG: this.state.dataJG,
            },
            //类型1为保存修改信息操作
            lx:1
        };
        this.setState({loading: true});
        this.updateYwbb(values,'edit')
    },
    //提交业务报备
    handleCommit(param){
        let values = {
            data:{
                formValue:param,
                dataJG: this.state.dataJG
            },
            //类型3为报备操作
            lx:3
        };
        this.setState({loading: true});
        this.updateYwbb(values,'add')
    },
    //获取修改报备的初始化信息：旗下执业人员/机构信息/报备明细
    async fetchData () {
        const {miscUrl,ywbbUrl,id} = this.props;
        let fetchmisc =  req({
            url: miscUrl,
            method: 'get'
        });
        let fetchmx =  req({
            url:ywbbUrl+`/${id}`,
            method:'get'
        });
        let [misc, mx] = await Promise.all([fetchmisc, fetchmx]);
        return {misc: misc, mx: mx}
    },

    formatData(data){
        data.DQ = [data.CS_DM,data.QX_DM];
        data.DQ = data.DQ.filter(t=> t!=undefined && t!==null );
        data.DQ = data.DQ.length > 0 ? data.DQ : null;
        data.QGSS = [];
        data.SSSQ = !!data.SSTARTTIME ? [new Date(data.SSTARTTIME),new Date(data.SENDTIME)] : null;
        data.BGRQ = !!data.BGRQ ? new Date(data.BGRQ) : null;
        let qmsws = !!data.QMSWSID?data.QMSWSID.split(','):[];
        data.QMSWS = qmsws.length ? qmsws.map(t=>({key:t})) : [];
        data.YWLX_DM = data.YWLX_DM != null ? ''+data.YWLX_DM : null;
        data.SB_DM = ''+data.SB_DM;
        data.ZSFS_DM = ''+data.ZSFS_DM;
        data.HY_ID = ''+data.HY_ID;
        data.NSRXZ =''+data.NSRXZ;
        data.WTDWXZ_DM = ''+data.WTDWXZ_DM;
        data.NSRSBH = data.WTDWNSRSBH;
        data.NSRSBHDF = data.WTDWNSRSBHDF;
        data.LXR = data.WTDWLXR;
        data.LXDH = data.WTDWLXDH;
        data.LXDZ = data.WTDXLXDZ;
    },

    componentDidMount(){
        this.fetchData().then(resp=> {
            let result = {};
            this.formatData(resp.mx);
            for (let prop in resp.mx) {
                if(resp.mx[prop] != null){
                    result[prop] = {value: resp.mx[prop]}
                }
            }
            this.setState({dataJG: resp.misc.jgxx, zysws: resp.misc.zysws, data:result,loading: false})
        }).catch(e=> {
            this.setState({loading: false, view:'fail'})
        })
    },
    handleFieldChange(field){
        const {data} = this.state;
        for (let prop in field) {
            data[prop] = field[prop];
            if (prop == 'YWLX_DM'){
                this.setState({data:data})
            }
            if(prop == 'ISWS'){
                this.setState({data:data})
            }
        }
    },

    render(){
        const {title} = this.props;
        let {data, zysws, successResp,type} = this.state;
        const panelBar = <PanelBar>
            <Button onClick={this.back}>
                <Icon type="rollback"/>返回
            </Button>
        </PanelBar>;

        let view ={
            'fail' : <div className="ywbb-new-loadfail"> 初始数据读取失败，请重新刷新页面</div>,
            'success':<div>
                <AddSuccess data={successResp} type={type}/>
            </div>,
            'form':<Stage data={data}
                          zysws={zysws}
                          onSave={this.handleSave}
                          onCommit={this.handleCommit}
                          onFieldChange={this.handleFieldChange}/>
        };

        return <Panel className="client-ywbb edit" toolbar={panelBar} title={title} >
            <Spin spinning={this.state.loading}>
                {view[this.state.view]}
            </Spin>
        </Panel>

    }
});

module.exports = c;