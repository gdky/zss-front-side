import React from 'react'
import {Spin, notification, Modal, Icon, Alert,Button,Row,Col} from 'antd'
import Panel from 'component/compPanel'
import config from 'common/configuration.js'
import req from 'common/request'
import Stage from './stage.jsx'
import AddSuccess from './commitSuccessScr';
import LockedScr from './lockedScr'


const newYwbb = React.createClass({
    getDefaultProps(){
        return {
            ywbbUrl: config.HOST + config.URI_API_PROJECT + '/ywbb',
            miscUrl: config.HOST + config.URI_API_PROJECT + '/ywbbmisc/'
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
    }
    ,
    //添加新报备信息
    addYwbb(param){
        const {ywbbUrl,refreshList} = this.props;
        return req({
            url: ywbbUrl,
            method: 'post',
            data: param
        }).then(resp=> {
            this.setState({loading: false, view: 'success', successResp: resp});
            refreshList();
        }).catch(e=> {
            let r = JSON.parse(e.responseText);
            this.setState({loading: false});
            if (e.status == 403) {
                Modal.error({
                    title: '新建业务失败',
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
            formValue:param,
            dataJG: this.state.dataJG,
            type: 'save'
        };
        this.setState({loading: true});
        this.addYwbb(values)
    },
    //提交业务报备
    handleCommit(param){
        let values = {
            formValue:param,
            dataJG: this.state.dataJG,
            type: 'commit'
        };
        this.setState({loading: true});
        this.addYwbb(values)
    },
    //获取添加报备的初始化信息：旗下执业人员/资质锁定/机构信息
    fetchYwbbMisc () {
        const {miscUrl} = this.props;
        return req({
            url: miscUrl,
            method: 'get'
        })
    },
    componentDidMount(){
        this.fetchYwbbMisc().then(resp=> {
            if (!!resp.locked && !!resp.locked.length) {
                this.setState({locked: resp.locked,view:'locked'})
            }
            this.setState({dataJG: resp.jgxx, zysws: resp.zysws, loading: false})
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
        let {data, zysws, successResp, locked} = this.state;
        let view ={
            'locked' : <LockedScr data={locked}/>,
            'fail' : <div className="ywbb-new-loadfail"> 初始数据读取失败，请重新刷新页面</div>,
            'success':<div>
                <AddSuccess data={successResp} type="add"/>
                <Row><Col span="4" offset={10}><Button onClick={this.resetNew}>继续录入</Button></Col></Row>
            </div>,
            'form':<Stage data={data}
                          zysws={zysws}
                          onSave={this.handleSave}
                          onCommit={this.handleCommit}
                          onFieldChange={this.handleFieldChange}/>
        };

        return <Panel className="new-ywbb">
            <Spin spinning={this.state.loading}>
                {view[this.state.view]}
            </Spin>
        </Panel>

    }
});

module.exports = newYwbb;