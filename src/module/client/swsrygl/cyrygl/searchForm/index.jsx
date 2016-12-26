import React from 'react'
import {Row,Col,Form,Button,Input,Modal,DatePicker} from 'antd'
import {SelectorCS,SelectorXL,SelectorXB,SelectorZW} from 'component/compSelector'


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
            <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
                <Row>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="人员名称：">
                            <Input placeholder="人员名称" { ...getFieldProps('xm')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="身份证号码：">
                            <Input placeholder="身份证号后6位" { ...getFieldProps('sfzh')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="职务：">
                          <SelectorZW { ...getFieldProps('zw')}/>
                        </FormItem>
                    </Col>
                    
                    
                </Row>
                <Row>
                  
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="性别：">
                             <SelectorXB { ...getFieldProps('xb')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="城市：">
                            <SelectorCS { ...getFieldProps('cs')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="学历：">
                            <SelectorXL { ...getFieldProps('xl')}/>
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