import React from 'react'
import {Row,Col,Form,Button,Input,Modal,DatePicker,Select,Icon} from 'antd'
import {SelectorCS,SelectorYear,SelectorTGZT} from 'component/compSelector'

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
      for(let i=0;i<4;i++){
        yy.push(nowy.getFullYear()-i);
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
                             <Select  { ...getFieldProps('bblx', { initialValue: '0'})} >
                            <Option value="0">事务所情况统计表1</Option>
                            <Option value="1">行业人员情况统计表2</Option>
                            <Option value="2">经营收入统计表4</Option>
                            <Option value="3">经营规模统计表5</Option>
                            <Option value="4">鉴证业务情况统计表6</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="统计年度：">
                             <Select  { ...getFieldProps('nd', { initialValue: yy[1]+''})} >
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
                    <Col span="10" offset="10">
                    <ButtonGroup>
                        <Button type="primary"
                                onClick={this.showConfirm}
                                disabled={this.props.selected.length<=0}
                                icon="lock">
                            锁定事务所
                        </Button>
                        <Button type="ghost"
                                onClick={this.props.allClean}
                                disabled={this.props.selected.length<=0}
                                icon="rollback">
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