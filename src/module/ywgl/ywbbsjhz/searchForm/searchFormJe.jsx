import React from 'react'
import {Row, Col, Form, Button} from 'antd'
import {SelectorYWLX, SelectorYear, SelectorCS} from 'component/compSelector'

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

    //组件加载时读取数据
    componentDidMount() {
        const value = this.props.value;
        if (value) {
            this.props.form.setFieldsValue({ bbnd: value.bbnd, ywlx: value.ywlx,fsd:value.fsd });
        }
    },

    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 }
        };
        const data = this.props.initialValue;
        return <div className="search-form">
            <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="10">
                        <FormItem
                            {...formItemLayout}
                            label="提交报备年度">
                            <SelectorYear {...getFieldProps('bbnd', { initialValue: data.bbnd }) }/>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="10">
                        <FormItem
                            {...formItemLayout}
                            label="业务类型">
                            <SelectorYWLX
                                {...getFieldProps('ywlx', { initialValue: data.ywlx }) } />
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="10">
                        <FormItem
                            {...formItemLayout}
                            label="业务发生地">
                            <SelectorCS
                                {...getFieldProps('fsd', { initialValue: data.fsd }) } />
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