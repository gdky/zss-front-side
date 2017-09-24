import React from 'react'
import {Row,Col,Form,Button,Input,Modal,DatePicker,Select} from 'antd'
import {SelectorCS,SelectorYear,SelectorTGZT} from 'component/compSelector'
import './style.css'

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
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16}
        };
        return <div className="search-form">
            <Form horizontal onSubmit={this.handleSubmit} >
                <Row>
                    <Col span="4">
                        <FormItem
                          {...formItemLayout}
                          label="姓名：">
                            <Input placeholder="姓名" {...getFieldProps('xm')}/>
                        </FormItem>
                    </Col>
                      <Col span="6">
                        <FormItem
                          {...formItemLayout}
                          label="事务所名称：">
                            <Input placeholder="事务所名称" {...getFieldProps('dwmc')}/>
                        </FormItem>
                    </Col>
                     <Col span="5">
                        <FormItem
                          {...formItemLayout}
                          label="资格证书：">
                            <Input placeholder="资格证书编号" {...getFieldProps('zyzgzsbh')}/>
                        </FormItem>
                    </Col>
                    <Col span="5">
                        <FormItem
                          {...formItemLayout}
                          label="注册编号：">
                            <Input placeholder="执业注册编号" {...getFieldProps('zyzsbh')}/>
                        </FormItem>
                    </Col>
                    <Col span="4">
                        <FormItem
                          {...formItemLayout}
                          label="状态：">
                           <Select { ...getFieldProps('spzt')} placeholder="选择状态"   >
                            <Option key="3">审批中</Option>
                            <Option key="4">被调出</Option>
                            <Option key="9">执业转非执业</Option>
                            <Option key="6">转籍</Option>
                            <Option key="8">转所</Option>
                            <Option key="5">注销</Option>
                            <Option key="2">无效</Option>
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