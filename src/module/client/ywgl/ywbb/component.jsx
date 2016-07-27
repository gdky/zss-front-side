import React from 'react'
import {Tabs,Icon} from 'antd'
import QueueAnim from 'rc-queue-anim'
import './style.css'
import config from 'common/configuration'
import req from 'reqwest'
import auth from 'common/auth.js'
import List from './list'
import NewYwbb from './newYwbb.jsx'
import model from './model.jsx'

const TabPane = Tabs.TabPane;

const jid = auth.getJgid();
const token = auth.getToken();
const LIST_URL = config.HOST + config.URI_API_PROJECT + '/jg/'+jid+'/yw' ;

const fetchYwbb =function (param = {page: 1, pageSize: 10,jid:jid}) {
    return req({
        url: LIST_URL,
        method: 'get',
        type: 'json',
        data: param,
        headers:{'x-auth-token':token}
    })
};

const ywbb = React.createClass({
    getInitialState(){
        return {
            data:[],
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: 10,
                showQuickJumper: true,
                pageSizeOptions: ['5', '10', '20']

            }
        }
    },
    //列表页面改变
    handlePageChange(){

    },
    //列表数据刷新
    handleListRefresh(){

    },
    //搜索
    handleSearchSubmit(){

    },

    render(){
        return <div className="client-ywbb">
            <div className="wrap">
                <Tabs type="card">
                    <TabPane tab="业务报备" key="1">
                        <List datasource={this.state.data}
                              columns={model.columns}
                              pagination={this.state.pagination}
                              onChange={this.handlePageChange}
                              onRefresh={this.handleListRefresh}
                              onSubmit={this.handleSearchSubmit}
                        />
                    </TabPane>
                    <TabPane tab= {<span><Icon type="plus-circle-o" />添加</span>} key="2">
                        <NewYwbb />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    }
});

module.exports = ywbb;