import React from 'react'
import {Table, Modal, Row, Col, Button, Icon, Alert} from 'antd'
import List from './list'
import Detail from './detail'
import Edit from './edit'
import New from './new'
import model from './model'
import {jsonCopy} from 'common/utils'
import cloneDeep from 'lodash/cloneDeep';
import '../style.css'


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

        //定义列表中的操作列具体方法
        m.columns.push({
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (text, record)=> {
                let actGroup = <span className="act-group">
                    <a onClick={()=> {
                        this.handleViewDetail(record)
                    }}>查看</a>
                    {record.ZTBJ == 0 || record.ZTBJ == 3?
                        <a onClick={()=> {
                            this.handleViewEdit(record)
                        }}>编辑</a> : null}
                </span>;
                return actGroup
            }
        });
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

        /*设置明细信息组件的参数*/
        const detailSetting = {
            //设置数据源
            data: this.state.entity,
            //设置标题
            title: '经营收入情况详细信息',
            //设置返回主视图调用的方法
            onBack: this.backToList,
            printCover: null
        };
        /*设置编辑组件的参数*/
        const editSetting = {
            id: this.state.entity.id,
            //设置返回主视图调用的方法
            onBack: this.backToList,
            refreshList: this.refreshList
        };

        /*设置添加组件的参数*/
        const newSetting = {
            id: this.state.entity.id,
            //设置返回主视图调用的方法
            onBack: this.backToList,
            refreshList: this.refreshList
        };

        /*通过控制state.view的值，实现页面上列表/详细信息等组件的切换*/
        const view = {
            list: <List {...listSetting} ref="list"/>,
            detail: <Detail {...detailSetting}/>,
            edit: <Edit {...editSetting}/>,
            new: <New {...newSetting} />
        };


        return <div className="client-jysrqkb client-sdsb">
            <div className="wrap">
                {view[this.state.view]}
            </div>
        </div>
    }
});

module.exports = c;