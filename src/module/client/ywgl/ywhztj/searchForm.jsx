import React from 'react'
import {Row, Col, Form, Button, Select,Input,DatePicker} from 'antd'
import {SelectorYear, SelectorSB,SelectorYWLX} from 'component/compSelector'

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

let searchForm = React.createClass({
    getDefaultProps(){
        return {
            onSubmit: {}
        }
    },
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },

    handleSubmit(e){
        e.preventDefault();
        let commitValues = this.props.form.getFieldsValue();
        console.log(commitValues)
        //首先处理搜索表单提交的信息，将字符串去首尾空格，将空值的搜索条件丢弃
        const values = {};
        for (let prop in commitValues) {
            if (commitValues[prop]) {
                if (typeof commitValues[prop] == 'string' && !!commitValues[prop].trim()) {
                    values[prop] = commitValues[prop].trim()
                } else {
                    values[prop] = commitValues[prop]
                }
            }
        }
        //加工各提交字段的值
        if (values.bbrq && !values.bbrq[0]) {
            delete values.bbrq
        }
        if (values.bgrq && !values.bgrq[0]) {
            delete values.bgrq
        }
        if (values.ywlx){
            values.ywlx_dm = values.ywlx.key
        }
        this.props.onSubmit(values);
        this.props.onYwlxChange(values.ywlx)
    },
    render(){
        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16}
        };

        return <div className="search-form">
            <Form horizontal onSubmit={this.handleSubmit}>
                <Row>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="客户名称">
                            <Input  {...getFieldProps('wtdw')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="报备日期：">
                            <RangePicker format="yyyy/MM/dd" { ...getFieldProps('bbrq',
                                {getValueFromEvent: (date, dateString)=> dateString})}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="报告日期">
                            <RangePicker format="yyyy/MM/dd" { ...getFieldProps('bgrq',
                                {getValueFromEvent: (date, dateString)=> dateString})}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="业务类型">
                            <SelectorYWLX labelInValue  {...getFieldProps('ywlx')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem {...formItemLayout} label="税别">
                            <SelectorSB {...getFieldProps('sb_dm')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem {...formItemLayout} label="报备年度">
                            <SelectorYear {...getFieldProps('nd')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="4" offset="20">
                        <Button type="primary" htmlType="submit" className="query">查询</Button>
                        <Button type="ghost" onClick={this.handleReset}>重置</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    }
});
searchForm = createForm()(searchForm);

module.exports = searchForm;