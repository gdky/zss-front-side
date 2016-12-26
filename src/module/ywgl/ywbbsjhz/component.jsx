import React from 'react'
import {Tabs, Card} from 'antd';
import Panel from 'component/compPanel'
import {Jgrybbsjfx, Kjsbbsjfx, Wsywbbsjfx, Sfjebbsjfx} from './mainPage'
import Detail from './detail'
import model from './model'
import config from 'common/configuration'
import cloneDeep from 'lodash/cloneDeep'
import '../style.css'
import './style.css'

const TabPane = Tabs.TabPane;

const component = React.createClass({
    getInitialState() {
        return {
            activeKey: "1",
            view: 'list',
            listState: {},
            entity: {},
        }
    },

    //抓取当前list分页状态
    grabListState(state) {
        this.setState({ listState: state })
    },

    //Tab标签页变化时
    onTabsChange(activeKey) {
        this.setState({ activeKey: activeKey });
    },

    //打开明细信息视图
    handleViewDetail(record) {
        this.setState({ view: 'detail', entity: record })
    },

    //返回list视图
    backToList(){
        this.setState({view: 'list'})
    },

    /*计算column里定义的width总和，没有定义width的列宽按100(px)计算*/
    getColWidth(columns){
        let w = 0;
        columns.map(item=> {
            w = item.width ? w + parseInt(item.width) : w + 100;
        });
        return w;
    },


    render() {
        const bbnd=new Date().getFullYear()-1;
        const ywlx="1";
        const fsd="1";
        const fixColWidth = 120;

        /*设置明细信息组件的参数*/
        const detailSetting = {
            //设置查询明细的数据
            data: this.state.entity,
            //设置标题
            title: '业务报备详细信息',
            //设置返回主视图调用的方法
            onBack: this.backToList, 
            //数据来源api
            apiUrl: config.HOST + config.URI_API_PROJECT + '/ywgl/ywbbsjhz/ry',
        };

        const JgrybbsjfxSetting = {
            //标题
            title: '机构人员报备数据分析',
            //每页的记录数
            pageSize: 10,
            //抓取当前list的状态
            grabState: this.grabListState,
            //list组件重新挂载时恢复状态用的历史状态数据
            stateShot: this.state.listState,
            //打开明细view
            handleViewDetail:this.handleViewDetail,
            //数据来源api
            apiUrl: config.HOST + config.URI_API_PROJECT + '/ywgl/ywbbsjhz/ry',
            //初始搜索条件
            defaultWhere: { bbnd:bbnd }
        };

        const KjsbbsjfxSetting = {
            title: "会计所报备数据分析",
            apiUrl: config.HOST + config.URI_API_PROJECT + '/ywgl/ywbbsjhz/sws',
            defaultWhere:{bbnd:bbnd,ywlx:ywlx},
            pageSize:10,
            scrollx: this.getColWidth(model.columnsSws)
        };

        const WsywbbsjfxSetting = {
            title: "外省业务报备数据分析",
            apiUrl: config.HOST + config.URI_API_PROJECT + '/ywgl/ywbbsjhz/ws',
            defaultWhere:{bbnd:bbnd,ywlx:ywlx},
            pageSize:10,
            scrollx: this.getColWidth(model.columnsWs)
        };

        const SfjebbsjfxSetting = {
            title: "业务报备总收费金额数据分析",
            apiUrl: config.HOST + config.URI_API_PROJECT + '/ywgl/ywbbsjhz/je',
            defaultWhere:{bbnd:bbnd,ywlx:ywlx,fsd:fsd},
            pageSize:10
        };

        const view = {
            list: <Jgrybbsjfx {...JgrybbsjfxSetting} ref="list" />,
            detail: <Detail {...detailSetting}/>
        };

        return <div className="ywbbsjhz ywbbgl">
            <div className="wrap">
                <div className="card-container">
                    <Tabs size="small" activeKey={this.state.activeKey} onChange={this.onTabsChange}>
                        <TabPane tab="机构人员报备数据分析" key="1">
                            {view[this.state.view]}
                        </TabPane>
                        <TabPane tab="会计所报备数据分析" key="2">
                            <Kjsbbsjfx {...KjsbbsjfxSetting}/>
                        </TabPane>
                        <TabPane tab="外省业务报备数据分析" key="3">
                            <Wsywbbsjfx {...WsywbbsjfxSetting}/>
                        </TabPane>
                        <TabPane tab="业务报备总收费金额数据分析" key="4">
                            <Sfjebbsjfx {...SfjebbsjfxSetting}/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    }
});

module.exports = component;