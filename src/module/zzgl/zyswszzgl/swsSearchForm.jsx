import React from 'react'
import {Row, Col, Form, Button, Input} from 'antd'
import {SelectorCS, SelectorYWLX, SelectorYear, SelectorYWZT, SelectorZSFS} from 'component/compSelector'

const FormItem = Form.Item;
const createForm = Form.create;

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
                            label="税务师姓名">
                            <Input placeholder="税务师姓名" {...getFieldProps('xming')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="所属事务所">
                            <Input placeholder="所属事务所" {...getFieldProps('swsmc')}/>
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