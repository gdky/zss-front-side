import React from 'react'
import {SelectorYear}from 'component/compSelector'
import {Row,Col,Form,Button,Input,Modal,DatePicker,Select} from 'antd'
import './style.css'

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const year = new Date().getFullYear();
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
            let value = this.props.form.getFieldsValue();
            this.props.onSubmit(value);
        });
    },
    getYearOptions(){
            const options =[];
            for(let i = 0; i<5 ; i++ ){
                let option =  <Option key={year-i}>{year-i}</Option>;
                options.push(option)
            }
            return options;
        },
    getMonthOptions(){
            const options =[];
            for(let i = 1; i<13 ; i++ ){
                const mon=i<10?'0'+i:i+'';
                let option =  <Option key={mon}>{mon}</Option>;
                options.push(option)
            }
            return options;
        },
    render(){
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16}
        };
        const yearOptions = this.getYearOptions();
        const monthOptions = this.getMonthOptions();
        return <div className="search-form">
            <Form horizontal onSubmit={this.handleSubmit}>
                <Row> 
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="年份：">
                        <Select   {...getFieldProps('YEAR',{ initialValue: year.toString()})}>
                            {yearOptions}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                          {...formItemLayout}
                          label="月份：">
                          <Select  placeholder="选择月份" allowClear {...getFieldProps('MON')}>
                            {monthOptions}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="4" offset={4}>
                    <Button type="primary" htmlType="submit">查询</Button><span className="ant-divider"></span>
                    <Button type="ghost" onClick={this.handleReset}>重置</Button>
                    </Col>
                    </Row>
            </Form>
        </div>
    }
});
searchForm = createForm()(searchForm);

module.exports = searchForm;