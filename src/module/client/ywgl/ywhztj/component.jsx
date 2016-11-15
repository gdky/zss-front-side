import React from 'react'
import {Table, Modal, Row, Col, Button, Icon, Alert} from 'antd'
import List from './list'
import model from './model'
import {jsonCopy} from 'common/utils'
import cloneDeep from 'lodash/cloneDeep';



const c = React.createClass({
    getInitialState(){
        return {
            view: 'list',
            listState: {},
            entity: {}
        }
    },

    //打开明细信息视图
    handleViewDetail(record){
        this.setState({view: 'detail', entity: record})
    },
    //打开编辑视图
    handleViewEdit(record){
        this.setState({view: 'edit', entity: record})
    },
    //打开添加视图
    handleViewNew(record){
        this.setState({view: 'new'})
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

    formatDate(str){
        let date = new Date(str);
        return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
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
        const fixColWidth = 120;

        /*设置列表组件的参数 */
        const listSetting = {
            //列表可滚动区间的宽度，一般使用getcolwidth计算即可
            scrollx: this.getColWidth(model) + fixColWidth,
            //列表需使用的columns定义
            columns: m.columns,
            //记录list组件被切换时状态值的方法
            grabState: this.grabListState,
            //添加新记录的方法
            onNew:this.handleViewNew,
            //list组件重新挂载时恢复状态用的历史状态数据
            stateShot: this.state.listState,

        };

        /*通过控制state.view的值，实现页面上列表/详细信息等组件的切换*/
        const view = {
            list: <List {...listSetting} ref="list"/>
        };


        return <div className="client-ywhztj">
            <div className="wrap">
                {view[this.state.view]}
            </div>
        </div>
    }
});

module.exports = c;