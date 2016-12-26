import React from 'react'
import {Table, Row, Col, Button, Icon, notification, Alert,Popconfirm } from 'antd'
import Panel from 'component/compPanel'
import req from 'common/request';
import merge from 'lodash/merge';
import {isEmptyObject,jsonCopy} from 'common/utils'
import config from 'common/configuration'

const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;

const list = React.createClass({
    getDefaultProps(){
        return {
            //数据来源api
            apiUrl: config.HOST + config.URI_API_PROJECT + '/ywsettings',
            reGenUrl:config.HOST + config.URI_API_PROJECT + '/rebarcode'
        }
    },
    getInitialState(){
        return {
            loading: false,
            data: [],
            entity: {},
            where: this.props.defaultWhere,
            searchToggle: false,
            helper: true,
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: this.props.pageSize,
                showQuickJumper: true,
                pageSizeOptions: ['10', '20', '40'],
                showTotal (total) {
                    return `共 ${total} 条`
                }
            }
        }
    },
    //通过API获取数据
    fetchData(params = {page: 1, pagesize: this.props.pageSize}){
        this.setState({loading: true});
        const {apiUrl,defaultWhere} = this.props;
        let where = merge(jsonCopy(defaultWhere),params.where);
        if(!isEmptyObject(where)){
            params.where = encodeURIComponent(JSON.stringify(where))
        }
        req({
            url: apiUrl,
            method: 'get',
            data: params
        }).then(resp=> {
            const p = this.state.pagination;
            p.current = params.page;
            p.pageSize = params.pagesize;
            p.total = resp.total > 1000 ? 1000 : resp.total;
            p.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            this.setState({data: resp.data, pagination: p, loading: false,where:where})
        }).catch(e=> {
            this.setState({loading: false});
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '网络访问故障，请刷新重试'
            });
        })
    },


    //刷新按钮
    handleRefresh(){
        const p = this.state.pagination;
        this.fetchData({page:1, pagesize: p.pageSize});
    },
    //刷新当前页
    refreshCurrent(){
        const p = this.state.pagination;
        this.fetchData({page: p.current, pagesize: p.pageSize});
    },

    //帮助按钮开关
    helperToggle(){
        this.setState({helper: !this.state.helper})
    },
    //手动关闭帮助提示
    helperClose(){
        this.setState({helper: false})
    },
    //组件加载时读取数据
    componentDidMount(){
        if(isEmptyObject(this.props.stateShot)){
            this.fetchData();
        }else{
            this.setState({...this.props.stateShot})
        }
    },
    //unmount时记录目前状态
    componentWillUnmount(){
        this.props.grabState(this.state)
    },
    //行点击处理
    handleRowClick(record){
        this.state.entity = record;
        this.setState({entity:record})
    },
    reGen(){
        req({
            url:this.props.reGenUrl,
            method:'get'
        }).then(resp=>{
            notification.success({
                duration: 5,
                message: '重建条形码成功'
            });
        })
    },

    render(){
        const {title, helperTitle, helperDesc, scrollx,keyCol,columns} = this.props;
        let toolbar = <ToolBar>
            <ButtonGroup>
                <Popconfirm placement="top" title="确定？" onConfirm={this.reGen}>
                    <Button>重新生成条形码</Button>
                </Popconfirm>
            </ButtonGroup>
            <ButtonGroup>
                <Button type="primary" onClick={this.helperToggle}><Icon type="question"/></Button>
            </ButtonGroup>

        </ToolBar>;
        return <div>
            {this.state.helper && <Alert message={helperTitle}
                                         description={helperDesc}
                                         type="info"
                                         closable
                                         onClose={this.helperClose}/>}
            <Panel title={title} toolbar={toolbar}>
                <Table columns={columns}
                       dataSource={this.state.data}
                       pagination={false}
                       loading={this.state.loading}
                       onChange={this.handleChange}
                       rowKey={record => record[keyCol]}
                       rowClassName={(record)=>{return record.id==this.state.entity.id?'row-selected':''}}
                       onRowClick={this.handleRowClick} scroll={{x: scrollx}}/>
            </Panel>
        </div>

    }
});

module.exports = list;