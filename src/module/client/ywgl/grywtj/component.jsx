import React from 'react'
import config from 'common/configuration'
import {Table, Row, Col, Button, Icon, notification, Alert} from 'antd'
import Panel from 'component/compPanel'
import req from 'reqwest';
import SearchForm from './searchForm'
import Model from './model'
import merge from 'lodash/merge'
import {isEmptyObject, jsonCopy} from 'common/utils'
import auth from 'common/auth'


const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;
const component = React.createClass({
    //初始化state
    getInitialState() {
        return {
            searchToggle: true,
            tables: false,
            loading: false,
            data: [],
            where: {},
        }
    },
    //通过API获取数据
    fetchData(params) {
        this.setState({ loading: true });
        const token = auth.getToken();
        const apiUrl = config.HOST + config.URI_API_PROJECT + "/ywgl/grywtj";
        let where = params.where;
        if (!isEmptyObject(where)) {
            params.where = encodeURIComponent(JSON.stringify(where))
        }
        req({
            url: apiUrl,
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': token }
        }).then(resp => {
            this.setState({ data: resp.data, loading: false, where: where, tables: true })
        }).fail(e => {
            this.setState({ loading: false });
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '可能网络访问原因，请稍后尝试'
            });
        })
    },

    //查询提交
    handleSearchSubmit(values) {
        const param = {
            where: values
        };
        this.fetchData(param);
    },

    render() {
        return <div className="grywtj">
            <div className="wrap">
                <div className="dataGird">
                    <Panel title="个人业务统计">
                        {this.state.searchToggle &&
                            <SearchForm onSubmit={this.handleSearchSubmit}/> }
                            {this.state.tables && <Table columns={Model.columnsHz}
                                dataSource={this.state.data}
                                pagination={false}
                                loading={this.state.loading}
                                rowKey={record => record["id"]}/>}
                    </Panel>
                </div>
            </div>
        </div>
    }
});

module.exports = component;