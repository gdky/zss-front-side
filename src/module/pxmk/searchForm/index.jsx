import React from 'react'
import {  DatePicker,Modal,Form, Input, Select,Table, Icon,Tabs,Button,Row,Col,message }from 'antd'

Date.prototype.Format = function (fmt) { //时间函数重写
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));//补0处理
    return fmt;
};
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
        this.props.form.validateFields((errors, values) => {//条件校验处理
              if (!!errors) {
                alert('条件输入错误');
                return;
              }
            let value = values;
              for(let key in value){
                if(Object.prototype.toString.call(value[key])=="[object Date]"){//时间格式化
                        let dd = value[key].Format("yyyy-MM-dd");
                        value[key]=dd;
                    };
              }
                this.props.onSubmit(value);
    });
    },
    disabledStartDate(rule, value, callback) {//日期校验规则方法
     const form = this.props.form;
     if (value &&value.getTime() > form.getFieldValue('clsj2').getTime()) {
        callback(new Error('最小时间大于最大时间'));
     }else {
        callback();
    };
 
  },
  disabledEndDate(rule, value, callback) {//日期校验规则方法
    const form = this.props.form;
    if (value &&value.getTime() < form.getFieldValue('clsj').getTime()) {
            callback(new Error('最大时间小于最小时间'));
    }else {
      callback();
    };
  },
    render(){
        const formItemLayout = {//表单样式
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }; 
    const formItemLayout2 = {//表单样式2
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }; 
    const { getFieldProps } = this.props.form;//获取表单输入组件值的特定写法
    const clsj = getFieldProps('clsj', {//设置日期输入组件校验规则
              rules: [
                { 
                   type: 'date', 
                   message: '请输入最小时间',
                 },{
                  validator: this.disabledStartDate,
                }
              ]
            });
               const clsj2 = getFieldProps('clsj2', {//设置日期输入组件校验规则
              rules: [
                {
                  type: 'date', 
                  message: '请输入最大时间'
                   },
                { validator: this.disabledEndDate, }
              ]
            });
        return <div className="search-form">
                <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
                    <Row>
                            <Col span="10">
                                    <FormItem label="标题：" {...formItemLayout}>
                                            <Input  { ...getFieldProps('BT')} ></Input>
                                    </FormItem> 
                            </Col>
                            <Col span="12">
                                    <FormItem
                                      label="开始时间："
                                      {...formItemLayout2}>
                                        <Col span="11">
                                        <FormItem>
                                        <DatePicker  placeholder="请选择日期" {...clsj} /></FormItem>
                                        </Col>
                                        <Col span="2">
                                          <p className="ant-form-split">至</p>
                                        </Col>
                                        <Col span="11">
                                         <FormItem>
                                            <DatePicker  placeholder="请选择日期"  {...clsj2} /></FormItem>
                                        </Col>
                                    </FormItem>
                            </Col>
                    </Row>
                    <Row>
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