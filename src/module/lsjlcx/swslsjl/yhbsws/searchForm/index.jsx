import React from 'react'
import {Row,Col,Form,Button,Input,Modal,DatePicker,Select} from 'antd'

import './style.css'

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
        this.handleSubmit(e);
    },
 handleSubmit(e){
        e.preventDefault();
        let value = this.props.form.getFieldsValue();
        this.props.onSubmit(value);
    },
    render(){
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16}
        };
        return <div className="search-form">
            <Form horizontal onSubmit={this.handleSubmit} >
                <Row>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="事务所名称：">
                            <Input placeholder="新事务所名称" {...getFieldProps('dwmc')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="状态：">
                            <Select { ...getFieldProps('spzt')} placeholder="选择状态"   >
                            <Option key="1">审批中</Option>
                            <Option key="3">不通过</Option>
                            <Option key="8">已变更</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    </Row>
                <Row>
                    <Col span="2" offset="20"><Button type="primary" htmlType="submit">查询</Button></Col>
                    <Col span="2"><Button type="ghost" onClick={this.handleReset}>重置</Button></Col>
                </Row>
            </Form>
        </div>
    }
});
searchForm = createForm()(searchForm);

module.exports = searchForm;