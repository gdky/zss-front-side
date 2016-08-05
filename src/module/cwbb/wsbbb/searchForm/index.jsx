import React from 'react'
import {Row,Col,Form,Button,Input,Modal,DatePicker,Select} from 'antd'
import {SelectorCS,SelectorYear} from 'component/compSelector'

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
      const nowy = new Date();
      var yy =[];
      for(let i=0;i<7;i++){
        yy.push(nowy.getFullYear()-1-i);
      }
     
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16}
        };
        const yearOptions = yy.map(year => <Option key={year}>{year}</Option>);
        return <div className="search-form">
            <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
                <Row>
                    
                  
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="报表类型："  >
                             <Select  { ...getFieldProps('bblx', { initialValue: '0'})} >
                            <Option value="0">财务报表-利润表</Option>
                            <Option value="1">财务报表-资产负债表</Option>  
                            <Option value="2">财务报表-利润分配表</Option> 
                            <Option value="3">财务报表-现金流量表</Option> 
                            <Option value="4">财务报表-支出明细表</Option>                        
                        </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="上报年度：">
                             <Select  { ...getFieldProps('nd', { initialValue: yy[0]})} >
                            {yearOptions}
                        </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="事务所名称：">
                            <Input placeholder="事务所名称" {...getFieldProps('dwmc')}/>
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