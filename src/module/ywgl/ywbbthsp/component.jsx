import React from 'react'
import {Table, Modal, Row, Col, Button, Icon, Alert} from 'antd'
import List from './list'
import Detail from './detail'
import DiaSentBack from './dialogSentBack'
import DiaSpQY from './dialogSpQY.jsx'
import DiaSpCX from './dialogSpCX.jsx'
import DiaSpTH from './dialogSpTH.jsx'
import model from './model'
import config from 'common/configuration'
import {jsonCopy} from 'common/utils'
import cloneDeep from 'lodash/cloneDeep';
import '../style.css'

const c = React.createClass({
    getInitialState(){
        return {
            view: 'list',
            listState: {},
            entity: {},
            dialogSentBack: false,
            dialogSpQY:false,
            dialogSpCX:false,
            dialogSpTH:false
        }
    },

    //打开明细信息视图
    handleViewDetail(record){
        this.setState({view: 'detail', entity: record})
    },
    //返回list视图
    backToList(){
        this.setState({view: 'list'})
    },
    //抓取当前list分页状态
    grabListState(state){
        this.setState({listState: state})
    },
    refreshList(){
        this.refs.list.refreshCurrent()
    },
    //打开强制退回操作对话框
    openSentBack(record){
        if(record.id){
            this.setState({dialogSentBack: true,entity:record})
        }else{
            this.setState({dialogSentBack: true})
        }
    },
    //关闭强制退回操作对话框
    closeSentBack(){
        this.setState({dialogSentBack: false});
    },
    //打开申请撤销审批
    openSpCX(record){
        if(record.id){
            this.setState({dialogSpCX: true,entity:record})
        }else{
            this.setState({dialogSpCX: true})
        }
    },
    closeSpCX(){
        this.setState({dialogSpCX:false})
    },
    //打开申请启用审批
    openSpQY(record){
        if(record.id){
            this.setState({dialogSpQY: true,entity:record})
        }else{
            this.setState({dialogSpQY: true})
        }
    },
    closeSpQY(){
        this.setState({dialogSpQY:false})
    },
    //打开申请退回审批
    openSpTH(record){
        if(record.id){
            this.setState({dialogSpTH: true,entity:record})
        }else{
            this.setState({dialogSpTH: true})
        }
    },
    closeSpTH(){
        this.setState({dialogSpTH:false})
    },

    /*计算column里定义的width总和，没有定义width的列宽按100(px)计算*/
    getColWidth(model){
        let w = 0;
        model.columns.map(item=> {
            w = item.width ? w + item.width : w + 100;
        });
        return w;
    },

    render(){
        //重新复制一个model对象，使修改不会影响原model对象，避免每次组件渲染时给原model对象累积赋值
        const m = cloneDeep(model);

        //定义列表中的操作列具体方法
        m.columns.push({
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (text, record)=> {
                let actGroup = <span className="act-group">
                    <a onClick={()=>{this.handleViewDetail(record)}}>明细</a>
                    {record.ywzt_dm == 1 ?
                    <a onClick={()=>{this.openSentBack(record)}}>强制退回</a>:null}
                    {record.ywzt_dm == 7 ?
                      <a onClick={()=>{this.openSpCX(record)}}>撤销审批</a>:null}
                    {record.ywzt_dm == 8 ?
                      <a onClick={()=>{this.openSpQY(record)}}>启用审批</a>:null}
                    {record.ywzt_dm == 6 ?
                      <a onClick={()=>{this.openSpTH(record)}}>退回审批</a>:null}
                </span>;
                return actGroup
            }
        });
        const fixColWidth = 120;
        /*设置列表组件的参数 */
        const listSetting = {
            //标题
            title: '待审批业务退回申请',
            //帮助提示的标题
            helperTitle: '业务报备使用帮助',
            //帮助提示的具体内容
            helperDesc: <div><p>本功能是将所有待审批的退回业务申请集中管理</p></div>,
            //列表可滚动区间的宽度，一般使用getcolwidth计算即可
            scrollx: this.getColWidth(model)+fixColWidth,
            //接收的json数据中用来充当key的字段名
            keyCol: 'id',
            //默认每页显示数量
            pageSize: 10,
            //列表需使用的columns定义
            columns: m.columns,
            //记录list组件被切换时状态值的方法
            grabState: this.grabListState,
            //list组件重新挂载时恢复状态用的历史状态数据
            stateShot: this.state.listState,
            //数据来源api
            apiUrl: config.HOST + config.URI_API_PROJECT + '/ywbb',
            //初始搜索条件
            defaultWhere:{zt:6}
        };

        /*设置明细信息组件的参数*/
        const detailSetting = {
            //设置数据源
            data: this.state.entity,
            //设置标题
            title: '业务报备详细信息',
            //设置返回主视图调用的方法
            onBack: this.backToList,
            sentBack: this.openSentBack,
            printCover:null,
            spCX:null,
            spQY:null,
            spTH:null
        };

        /*设置强制退回对话框的参数*/
        const sentBackSetting = {
            data: this.state.entity,
            visible:this.state.dialogSentBack,
            refreshList:this.refreshList,
            onClose:this.closeSentBack,
            apiUrl:config.HOST + config.URI_API_PROJECT + '/ywbb/'
        };

        /*设置启用申请审批对话框的参数*/
        const spQYSetting = {
            data: this.state.entity,
            visible:this.state.dialogSpQY,
            refreshList:this.refreshList,
            onClose:this.closeSpQY,
            apiUrl:config.HOST + config.URI_API_PROJECT + '/ywbb/'
        };

        /*设置撤销申请审批对话框的参数*/
        const spCXSetting = {
            data: this.state.entity,
            visible:this.state.dialogSpCX,
            refreshList:this.refreshList,
            onClose:this.closeSpCX,
            apiUrl:config.HOST + config.URI_API_PROJECT + '/ywbb/'
        };

        /*设置退回申请审批对话框的参数*/
        const spTHSetting = {
            data: this.state.entity,
            visible:this.state.dialogSpTH,
            refreshList:this.refreshList,
            onClose:this.closeSpTH,
            apiUrl:config.HOST + config.URI_API_PROJECT + '/ywbb/'
        };


        /*通过控制state.view的值，实现页面上列表/详细信息等组件的切换*/
        const view = {
            list: <List {...listSetting} ref="list" />,
            detail: <Detail {...detailSetting}/>
        };


        return <div className="ywbbgl ywbbthsp">
            <div className="wrap">
                <DiaSentBack {...sentBackSetting}  />
                <DiaSpQY {...spQYSetting}  />
                <DiaSpCX {...spCXSetting}  />
                <DiaSpTH {...spTHSetting}  />
                {view[this.state.view]}
            </div>
        </div>
    }
});

module.exports = c;