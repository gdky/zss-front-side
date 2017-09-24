/**
 * 业务类型下拉选择器
 */
import React from 'react'
import {Select} from 'antd'
import config from 'common/configuration'
import req from 'common/request'

const Option = Select.Option;

const selectorYWLX = React.createClass({
    getDefaultProps(){
        return {
            url:config.HOST + config.URI_API_PROJECT + '/selector/ywlx',
            isqy:''
        }
    },
    getInitialState(){
        return {
            data:[]
        }
    },
    componentDidMount(){
        const {url,isqy} = this.props
        req({
            url:url,
            method:'get',
            data:!isqy?'':{isqy:'Y'}
        }).then(resp=>{
            this.setState({
                data:resp
            })
        })
    },
    render(){
        return <Select {...this.props} placeholder="选择业务类型" allowClear>
            {this.state.data.map(item=><Option key={''+item.id}>{item.mc}</Option>)}
        </Select>
    }
});

module.exports = selectorYWLX;