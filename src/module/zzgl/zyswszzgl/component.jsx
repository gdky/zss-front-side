import React from 'react'
import {Table, Modal, Row, Col, Button, Icon, Alert, Tabs, Switch} from 'antd'
import Swslist from './swslist'
import Sdjllist from './sdjllist'
import DialogLock from './dialogLock'
import Panel from 'component/compPanel';
import swsmodel from './swsmodel'
import sdjlmodel from './sdjlmodel'
import config from 'common/configuration'
import {jsonCopy} from 'common/utils'
import cloneDeep from 'lodash/cloneDeep';
import '../style.css'

const TabPane = Tabs.TabPane;

const c = React.createClass({
    getInitialState(){
        return {
            listState: {},
            keys: [],
            dialogLock: false,
            sdjlMount: false
        }
    },

    refreshList(){
        this.refs.list1.refreshCurrent();
        if (this.state.sdjlMount) {
            this.refs.list2.refreshCurrent();
        }
    },


    /*计算column里定义的width总和，没有定义width的列宽按100(px)计算*/
    getColWidth(model){
        let w = 0;
        model.columns.map(item=> {
            w = item.width ? w + item.width : w + 100;
        });
        return w;
    },
    //打开锁定操作对话框
    openLock(selectedRowKeys){
        if (selectedRowKeys.length > 0)
            this.setState({dialogLock: true, keys: selectedRowKeys})
    },
    //关闭锁定操作对话框
    closeLock(){
        this.refs.list1.resetSelect();
        this.setState({dialogLock: false, keys: []});
    },
    handleSdjlListMount(){
        this.setState({sdjlMount: true})
    },

    render(){
        //重新复制一个model对象，使修改不会影响原model对象，避免每次组件渲染时给原model对象累积赋值
        const swsm = cloneDeep(swsmodel);
        const sdm = cloneDeep(sdjlmodel);

        /*设置资质锁定对话框的参数*/
        const dialogLockSetting = {
            keys: this.state.keys,
            visible: this.state.dialogLock,
            refreshList: this.refreshList,
            onClose: this.closeLock,
            apiUrl: config.HOST + config.URI_API_PROJECT + '/swszzzt'
        };
        /*设置列表组件的参数 */
        const swsListSetting = {
            //列表可滚动区间的宽度，一般使用getcolwidth计算即可
            scrollx: this.getColWidth(swsm),
            //接收的json数据中用来充当key的字段名
            keyCol: 'id',
            //默认每页显示数量
            pageSize: 10,
            //列表需使用的columns定义
            columns: swsm.columns,
            //记录list组件被切换时状态值的方法
            grabState: this.grabListState,
            //list组件重新挂载时恢复状态用的历史状态数据
            stateShot: this.state.listState,
            //数据来源api
            apiUrl: config.HOST + config.URI_API_PROJECT + '/swszzzt',
            //初始搜索条件
            defaultWhere: {},
            openLock: this.openLock
        };
        const sdjlListSetting = {
            //列表可滚动区间的宽度，一般使用getcolwidth计算即可
            scrollx: this.getColWidth(sdm),
            //接收的json数据中用来充当key的字段名
            keyCol: 'id',
            //默认每页显示数量
            pageSize: 10,
            //列表需使用的columns定义
            columns: sdm.columns,
            //记录list组件被切换时状态值的方法
            grabState: this.grabListState,
            //list组件重新挂载时恢复状态用的历史状态数据
            stateShot: this.state.listState,
            //数据来源api
            apiUrl: config.HOST + config.URI_API_PROJECT + '/swszzsdjl',
            //初始搜索条件
            defaultWhere: {},
            refreshList: this.refreshList,
            onMount: this.handleSdjlListMount
        };

        return <div className="zzgl zyswszzgl">
            <div className="wrap">

                <Alert message="执业税务师资质管理使用帮助"
                       description={<div><p>本功能分为执业税务师列表和被锁定税务师名单两部分。</p>
                           <p>在税务师列表里可以搜索相应的税务师进行锁定操作，已被锁定的人员不能重复锁定。</p>
                           <p>在被锁定名单里可以进行解锁操作。</p></div>}
                       type="info"
                       closable/>
                <DialogLock {...dialogLockSetting} />
                <Panel>
                    <Tabs >
                        <TabPane key="1" tab="执业税务师列表"> <Swslist {...swsListSetting} ref="list1"/></TabPane>
                        <TabPane key="2" tab="税务师资质锁定名单"><Sdjllist {...sdjlListSetting} ref="list2"/></TabPane>
                    </Tabs>

                </Panel>
            </div>
        </div>
    }
});

module.exports = c;