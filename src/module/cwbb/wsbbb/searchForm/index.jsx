import React from 'react'
import {Row,Col,Form,Button,Input,Modal,DatePicker,Select} from 'antd'
import {SelectorCS,SelectorYear} from 'component/compSelector'

import './style.css'

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const ButtonGroup = Button.Group;
let searchForm = React.createClass({
        getDefaultProps(){
            return {
                onSubmit: {}
            }
        },
        getInitialState(){
        return {
            sdyy:''
        }},
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
    showConfirm() {
                var that=this;
                const sels=this.props.selected.length;
                  Modal.confirm({
                    title: "已选择："+sels+" 项，是否锁定？",
                    content:that.state.sdyy,
                    onOk() {
                        that.props.allLocked(that.refs.myTextInput.refs.input.value);
                    },
                    okText:"锁定",
                  });
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
        this.state.sdyy=<p>锁定原因：<Input type="text" style={{width:"50%"}} ref="myTextInput"/></p>;
        return <div className="search-form">
            <Form horizontal onSubmit={this.handleSubmit}>
                <Row>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="报表类型："  >
                             <Select  { ...getFieldProps('bblx', { initialValue:'0'})} >
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
                             <Select  { ...getFieldProps('nd', { initialValue: yy[0]+''})} >
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
                    <Col span="5" offset="15">
                        <ButtonGroup>
                            <Button type="primary"
                                    onClick={this.showConfirm}
                                    disabled={this.props.selected.length<=0}>
                                批量锁定
                            </Button>
                            <Button type="ghost"
                                    onClick={this.props.allClean}
                                    disabled={this.props.selected.length<=0}>
                                撤销选择
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col span="4">
                        <Button type="primary" htmlType="submit" className="query" >查询</Button>
                        <Button type="ghost" onClick={this.handleReset}>重置</Button>
                    </Col>

                </Row>
            </Form>
        </div>
    }
});
searchForm = createForm()(searchForm);

module.exports = searchForm;