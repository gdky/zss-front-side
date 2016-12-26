import React from 'react'
import {Table, Modal, Row, Col, Button, Icon, Alert} from 'antd'
import List from './list'
import DiaEdit from './dialogEdit'
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
            diaEdit:false
        }
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
    //打开修改参数对话框
    openEdit(record){
        if(record.id){
            this.setState({diaEdit: true,entity:record})
        }else{
            this.setState({diaEdit: true})
        }
    },
    closeEdit(){
        this.setState({diaEdit:false})
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
        m.columns[1].render =(text, record)=>{
            return <span>{text}&nbsp;&nbsp;<DiaEdit {...editSetting} id={record.id}/></span>
        };

        /*设置启用申请审批对话框的参数*/
        const editSetting = {
            refreshList:this.refreshList,
            apiUrl:config.HOST + config.URI_API_PROJECT + '/settings/'
        };

        /*设置列表组件的参数 */
        const listSetting = {
            //标题
            title: '业务参数设定',
            //帮助提示的标题
            helperTitle: '使用帮助',
            //帮助提示的具体内容
            helperDesc: <div><p>显示业务报备系统中的一般设定参数，点击"编辑"图标进行修改</p></div>,
            //列表可滚动区间的宽度，一般使用getcolwidth计算即可
            scrollx: this.getColWidth(model),
            //接收的json数据中用来充当key的字段名
            keyCol: 'id',
            //默认每页显示数量
            pageSize: 50,
            //列表需使用的columns定义
            columns: m.columns,
            //记录list组件被切换时状态值的方法
            grabState: this.grabListState,
            //list组件重新挂载时恢复状态用的历史状态数据
            stateShot: this.state.listState,
            //初始搜索条件
            defaultWhere:{}
        };



        /*通过控制state.view的值，实现页面上列表/详细信息等组件的切换*/
        const view = {
            list: <List {...listSetting} ref="list" />
         };

        return <div className="ywbbgl setting">
            <div className="wrap">
                {view[this.state.view]}
            </div>
        </div>
    }
});

module.exports = c;