import React from 'react'
import {  DatePicker,Modal,Form, Input, Select,Table, Icon,Tabs,Button,Row,Col,message }from 'antd'

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
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
        const formItemLayout = {//表单样式
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };  
    const { getFieldProps } = this.props.form;//获取表单输入组件值的特定写法
        return <div className="search-form">
                <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
                    <Row>
                            <Col span="10">
                                    <FormItem label="所属年份：" {...formItemLayout}>
                                            <DatePicker  { ...getFieldProps('nd')} >
                                            </DatePicker>
                                    </FormItem> 
                            </Col>
                            <Col style={{float:'right'}}>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                    <span className="ant-divider"></span>
                                    <Button type="ghost" onClick={this.handleReset}>重置</Button>
                            </Col>

                    </Row>
            </Form>
        </div>
    }
});
searchForm = createForm()(searchForm);

module.exports = searchForm;