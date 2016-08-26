/**
 * 城市下拉选择器
 */
import React from 'react'
import {Select} from 'antd'
import data from './model.js'

const Option = Select.Option;

const selectorCS = React.createClass({
    render(){
        const options = data.map(item=><Option key={item.id}>{item.mc}</Option>);
        return <Select {...this.props}
                       placeholder="选择城市"
                       showSearch optionFilterProp="children"
                       notFoundContent="无法找到"
                       disabled={this.props.disabled}>
            {options}
        </Select>
    }
});

module.exports = selectorCS;