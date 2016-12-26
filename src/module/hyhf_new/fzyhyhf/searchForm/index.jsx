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
        const formItemLayout2 = {//表单样式
                  labelCol: { span: 8 },
                  wrapperCol: { span: 16 },
                };  
    const { getFieldProps } = this.props.form;//获取表单输入组件值的特定写法
    const nowy = new Date();
      var yy =[];
      for(let i=0;i<4;i++){
        yy.push(nowy.getFullYear()-i);
      };
      const yearOptions = yy.map(year => <Option key={year}>{year}</Option>);
        return <div className="search-form">
                <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
                    <Row>
                            <Col span="6">
                                    <FormItem label="所属年份：" {...formItemLayout2}>
                                            <Select { ...getFieldProps('nd', { initialValue: yy[0]})} >
                                            {yearOptions}
                                            </Select>
                                    </FormItem> 
                            </Col>
                            <Col span="6">
                                    <FormItem label="缴纳情况：" {...formItemLayout2}>
                                            <Select { ...getFieldProps('jnqk')} >
                                            <Option key="1" value="yj">已缴费</Option>
                                            <Option key="2" value="wj">未缴费</Option>
                                            </Select>
                                    </FormItem> 
                            </Col>
                            <Col span="6">
                                    <FormItem label="姓名：" {...formItemLayout}>
                                            <Input {...getFieldProps('xming')} placeholder="请输入搜索条件" />
                                    </FormItem>
                            </Col>
                            <Col span="6">
                                    <FormItem label="身份证号：" {...formItemLayout}>
                                            <Input {...getFieldProps('sfzh')} placeholder="身份证后六位" />
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