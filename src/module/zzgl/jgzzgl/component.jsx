import React from 'react'
import {Table, Modal, Row, Col, Button, Icon, Alert,Tabs,Switch} from 'antd'
import Sdlist from './sdlist'
import Jslist from './jslist'
import Panel from 'component/compPanel';
import sdmodel from './sdmodel'
import jsmodel from './jsmodel'
import config from 'common/configuration'
import {jsonCopy} from 'common/utils'
import cloneDeep from 'lodash/cloneDeep';
import '../style.css'

const TabPane = Tabs.TabPane;

const c = React.createClass({
    getInitialState(){
        return {
            listState: {},
            entity: {}
        }
    },

    refreshList(){
        this.refs.list.refreshCurrent()
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
        const sdm = cloneDeep(sdmodel);
        const jsm = cloneDeep(jsmodel);
        const actColWidth = 100;

        //定义列表中的操作列具体方法
        sdm.columns.push({
            title: '锁定状态',
            key: 'yxbz',
            dataIndex: 'yxbz',
            width: 100,
            render(text, record){
                return <span style={{fontSize:'16px',color:'#2db7f5'}}><Icon type="lock"/></span>
            }
        });

        jsm.columns.push({
            title: '锁定状态',
            key: 'yxbz',
            dataIndex: 'yxbz',
            width: 100,
            render(text, record){
                return <span style={{fontSize:'16px',color:'#5FBC29'}}><Icon type="unlock"/></span>
            }
        });

        /*设置列表组件的参数 */
        const sdlistSetting = {
            //列表可滚动区间的宽度，一般使用getcolwidth计算即可
            scrollx: this.getColWidth(sdm) - actColWidth,
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
            apiUrl: config.HOST + config.URI_API_PROJECT + '/jgzzsd',
            //初始搜索条件
            defaultWhere: {}
        };
        const jslistSetting = {
            //列表可滚动区间的宽度，一般使用getcolwidth计算即可
            scrollx: this.getColWidth(jsm) - actColWidth,
            //接收的json数据中用来充当key的字段名
            keyCol: 'id',
            //默认每页显示数量
            pageSize: 10,
            //列表需使用的columns定义
            columns: jsm.columns,
            //记录list组件被切换时状态值的方法
            grabState: this.grabListState,
            //list组件重新挂载时恢复状态用的历史状态数据
            stateShot: this.state.listState,
            //数据来源api
            apiUrl: config.HOST + config.URI_API_PROJECT + '/jgzzsdwx',
            //初始搜索条件
            defaultWhere: {}
        };

        return <div className="zzgl jgzzgl">
            <div className="wrap">

                <Alert message="资质管理使用帮助"
                       description={<div><p>本功能分为有效锁定记录和已解锁记录两部分。有效锁定记录显示当前正被锁定的事务所及其原因，解锁记录显示已进行了解锁操作的事务所。</p>
                       <p>在有效锁定记录页面可以对事务所进行解锁操作。在解锁记录页面可以对事务所重新锁定。</p></div>}
                       type="info"
                       closable
                       onClose={this.helperClose}/>
                <Panel>
                    <Tabs >
                        <TabPane key="1" tab="当前有效锁定记录"> <Sdlist {...sdlistSetting} ref="list"/></TabPane>
                        <TabPane key="2" tab="已解锁记录"><Jslist {...jslistSetting} ref="list"/></TabPane>
                    </Tabs>

                </Panel>
            </div>
        </div>
    }
});

module.exports = c;