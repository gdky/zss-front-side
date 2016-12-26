import React from 'react'
import {Spin, notification, Icon,Table,Button,Row,Col} from 'antd'
import Panel from 'component/compPanel'
import config from 'common/configuration.js'
import req from 'common/request'

const PanelBar = Panel.ToolBar;

const c = React.createClass({
    getDefaultProps(){
        return {
            title: '报名回执',
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

    componentDidMount(){
        const {initUrl,entity}  = this.props;
        req({
            method: 'get',
            url: initUrl+`/${entity.id}`
        }).then(resp=> {
            this.setState({dataBase: resp.base, dataRy:resp.ry,loading: false})
        }).catch(e=> {
            this.setState({loading: false});
            notification.error({
                duration: 3,
                message: '数据读取失败',
                description: '网络访问故障，请稍后尝试'
            });

        })
    },

    render(){
        const {title,entity} = this.props;
        let {dataBase,dataRy, loading} = this.state;
        const panelBar = <PanelBar>
            <Button onClick={this.back}>
                <Icon type="rollback"/>返回
            </Button>
        </PanelBar>;
        const columns = [{
            title: '姓名',
            dataIndex: 'xming',
            key: 'xh',
            width: 100
        }, {
            title: '性别',
            dataIndex: 'xb',
            key: 'xb',
            width: 100
        }, {
            title: '职务',
            key: 'zw',
            dataIndex: 'zw',
            width: 100
        }, {
            title: '住宿',
            key: 'fjlx',
            dataIndex: 'fjlx',
            render(t, r){
                return t==1?'单人房':'双人房'
            }
        }, {
            title: '用餐',
            key: 'jclx',
            dataIndex: 'jclx',
        }];
        if (dataRy.length > 0) {
            dataRy.map(item=> {
                let jclx = [!item.zaoc ? '_' : '早餐', !item.wuc ? '_' : '午餐', !item.wanc ? '_' : '晚餐'];
                jclx = jclx.join(' / ');
                item.jclx = jclx;
                return item
            })
        }

        return <Panel className="client-wsbm-hz" toolbar={panelBar} title={title}>
            <Spin spinning={loading}>
                <h2>{entity.bt}</h2>
                <h2>报名回执</h2>
                <div className="divide" />
                <Row>
                    <Col offset={1}><h3>详细信息</h3></Col>
                </Row>
                <Row>
                    <Col offset={1}>培 训 时 间：{entity.pxkssj}至{entity.pxjssj}</Col>
                </Row>
                <Row>
                    <Col offset={1}>培 训 地 点：{entity.pxdz}</Col>
                </Row>
                <Row>
                    <Col offset={1}>培训地点电话：{entity.pxdddh}</Col>
                </Row>
                <Row>
                    <Col offset={1}>培训联系人：{entity.pxlxr}</Col>
                </Row>
                <div className="divide" />
                <Row>
                    <Col offset={1}><h3>{dataBase.swsmc}</h3></Col>
                </Row>
                <Row>
                    <Col span="22" offset={1}>
                        <Table dataSource={dataRy}
                                 columns={columns}
                                 pagination={false}
                                 size="small"/>
                    </Col>
                </Row>


                <div className="divide" />
                <Row>
                    <Col offset={1} span="24"><h3>注意事项</h3></Col>
                    <Col offset={1} span="22">
                        <div dangerouslySetInnerHTML={{__html: dataBase.zysx}}></div>
                    </Col>
                </Row>

            </Spin>
        </Panel>

    }
});


module.exports = c;