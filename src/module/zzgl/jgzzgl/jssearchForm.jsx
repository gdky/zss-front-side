import React from 'react'
import {Row, Col, Form, Button, Input, DatePicker, InputNumber, Checkbox} from 'antd'
import {SelectorCS, SelectorYWLX, SelectorYear, SelectorYWZT, SelectorZSFS} from 'component/compSelector'

const FormItem = Form.Item;
const createForm = Form.create;
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
        if (values.sdtime && !values.sdtime[0]) {
            delete values.sdtime
        }
        if (values.jstime && !values.jstime[0]) {
            delete values.jstime
        }

        this.props.onSubmit(values);
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
                            label="事务所名称">
                            <Input placeholder="事务所名称" {...getFieldProps('swsmc')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="锁定原因">
                            <Input placeholder="锁定原因" {...getFieldProps('sdyy')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="锁定操作时间：">
                            <RangePicker format="yyyy/MM/dd" { ...getFieldProps('sdtime',
                                {getValueFromEvent: (date, dateString)=> dateString})}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="锁定人名称">
                            <Input placeholder="锁定人名称" {...getFieldProps('sdr')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="锁定人角色组">
                            <Input placeholder="锁定人角色组" {...getFieldProps('sdr_role')}/>
                        </FormItem>
                    </Col>

                </Row>
                <Row>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="解锁人名称">
                            <Input placeholder="锁定人名称" {...getFieldProps('jsr')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="解锁人角色组">
                            <Input placeholder="锁定人角色组" {...getFieldProps('jsr_role')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="解锁操作时间：">
                            <RangePicker format="yyyy/MM/dd" { ...getFieldProps('jstime',
                              {getValueFromEvent: (date, dateString)=> dateString})}/>
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