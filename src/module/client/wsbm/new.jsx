import React from 'react'
import {Spin, notification, Icon, Button, Popconfirm} from 'antd'
import Panel from 'component/compPanel'
import {SelectorYear, SelectorXZ, SelectorSWSXZ, SelectorCS} from 'component/compSelector'
import config from 'common/configuration.js'
import req from 'common/request'
import EditForm from './editForm'
import Success from './successScr'
import FailScr from './failScr'

const PanelBar = Panel.ToolBar;

const c = React.createClass({
    getDefaultProps(){
        return {
            title: '培训课程报名',
            url: config.HOST + config.URI_API_PROJECT + '/pxbm',
            initUrl: config.HOST + config.URI_API_PROJECT + '/pxbminit'
        }
    },
    getInitialState(){
        return {
            loading: true,
            dataBase: {},
            dataRy:[],
            scr: 'normal'
        }
    },
    back(){
        this.props.onBack();
    },

    //提交
    handleCommit(values){
        const {url,entity} = this.props;

        this.setState({loading: true});
        req({
            method: 'post',
            url: url+`/${entity.id}`,
            data: values
        }).then(resp=> {
            this.setState({loading: false, scr: 'success', successType: 'commit'})
        }).catch(e=> {
            this.setState({loading: false});
            if (e.status == 403) {
                let res = JSON.parse(e.response);
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: res.text
                });
            } else {
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: '数据保存失败，请稍后再尝试'
                });
            }
        });
    },

    componentDidMount(){
        const {initUrl,entity}  = this.props;
        req({
            method: 'get',
            url: initUrl+`/${entity.id}`
        }).then(resp=> {
            this.setState({dataBase: resp.base, dataRy:resp.ry,loading: false})
        }).catch(e=> {
            if (e.status == 403) {
                let res = JSON.parse(e.response);
                this.setState({scr: 'fail', loading: false, failtext: res.text})
            } else {
                this.setState({scr: 'fail', loading: false})
            }
        })
    },

    render(){
        const {title,entity} = this.props;
        let {dataBase,dataRy, loading, scr, failtext, successType} = this.state;
        const panelBar = <PanelBar>
            <Button onClick={this.back}>
                <Icon type="rollback"/>返回
            </Button>
        </PanelBar>;

        let content = {
            normal: <EditForm data={dataBase} rylist={dataRy} pxxx={entity}
                              onCommit={this.handleCommit}/>,
            fail: <FailScr text={failtext}/>,
            success: <Success type={successType}/>
        };

        return <Panel className="client-wsbm-new" toolbar={panelBar} title={title}>
            <Spin spinning={loading}>
                {content[scr]}
            </Spin>
        </Panel>

    }
});


module.exports = c;