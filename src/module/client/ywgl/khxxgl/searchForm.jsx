import React from 'react'
import {Row,Col,Form,Button,Input} from 'antd'
import {SelectorCS,SelectorYear} from 'component/compSelector'

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
            <Form horizontal onSubmit={this.handleSubmit}>
                <Row>
                    <Col span="12">
                        <FormItem
                            {...formItemLayout}
                            label="客户单位名称">
                            <Input placeholder="客户单位名称" {...getFieldProps('dwmc')}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem
                            {...formItemLayout}
                            label="联系人">
                            <Input placeholder="联系人" {...getFieldProps('lxr')}/>

                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem
                          {...formItemLayout}
                          label="纳税人识别号">
                            <Input placeholder="纳税人识别号" {...getFieldProps('nsrsbh')}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem
                          {...formItemLayout}
                          label="地税纳税人识别号">
                            <Input placeholder="地税纳税人识别号" {...getFieldProps('nsrsbhdf')}/>
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