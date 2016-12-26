import React from 'react'
import {Row, Col, Form, Button} from 'antd'
import {SelectorYear} from 'component/compSelector'

const FormItem = Form.Item;
const createForm = Form.create;

let searchForm = React.createClass({
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },

    handleSubmit(e) {
        e.preventDefault();
        let result = true;
        let value = this.props.form.getFieldsValue();
        for(var key in value){ 
            if(typeof(value[key])=='undefined'){
                value[key]=null;
            }
        };
        this.props.form.validateFields((errors, value) => {
            if (!!errors) {
                result = false;
                return;
            }
        });
        if (result) {
            this.props.onSubmit(value);
        }
    },

    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 }
        };
        const bbnd=new Date().getFullYear();
        return <div className="search-form">
            <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="10">
                        <FormItem
                            {...formItemLayout}
                            label="提交报备年度">
                            <SelectorYear {...getFieldProps('bbnd', { initialValue: bbnd }) }/>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="5" offset="5">
                        <Button type="primary" htmlType="submit" className="query">数据分析</Button>
                        <Button type="ghost" onClick={this.handleReset}>重置</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    }
});
searchForm = createForm()(searchForm);
module.exports = searchForm;