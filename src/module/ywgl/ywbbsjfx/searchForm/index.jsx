import React from 'react'
import {Row,Col,Form,Button,Input,Radio} from 'antd'
import {SelectorYWLX,SelectorYear} from 'component/compSelector'

const FormItem = Form.Item;
const createForm = Form.create;
const RadioGroup = Radio.Group;

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
        let result=true;
        let value = this.props.form.getFieldsValue();
        this.props.form.validateFields((errors,value)=>{
            if(!!errors){
                result=false;
                return ;
            }
        });
        if(result){
            this.props.onSubmit(value);
        }
    },
    checkFsnd(rule, value, callback){
        const form = this.props.form;
        if(!value&&!form.getFieldValue('bbnd')){
            callback('业务发生年度，业务报备年度两者必须选择其一');
        }else{
            if(value){
                if(form.getFieldValue('bbnd')){
                    callback('业务发生年度，业务报备年度两者只能选择其一');
                }   
            }else{
                form.validateFields(['bbnd'], { force: true });
            }
        }
    },
    checkBbnd(rule, value, callback){
        const form = this.props.form;
        if(!value&&!form.getFieldValue('fsnd')){
            callback('业务发生年度，业务报备年度两者必须选择其一');
        }else{
            if(value){
                if(form.getFieldValue('fsnd')){
                    callback('业务发生年度，业务报备年度两者只能选择其一');
                }   
            }else{
                form.validateFields(['fsnd'], { force: true });
            }
        }
    },
    render(){
        const year = new Date().getFullYear()-1;
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16}
        };
        return <div className="search-form">
            <Form horizontal onSubmit={this.handleSubmit} >
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="12">
                        <FormItem
                            {...formItemLayout}
                            label="按业务发生年度">
                            <SelectorYear {...getFieldProps('fsnd',{rules:[{validator:this.checkFsnd}]})}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="12">
                        <FormItem
                            {...formItemLayout}
                            label="按业务报备年度">
                            <SelectorYear {...getFieldProps('bbnd',{rules:[{validator:this.checkBbnd}]})}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="12">
                        <FormItem
                            {...formItemLayout}
                            label="按鉴证业务类型">
                            <SelectorYWLX {...getFieldProps('ywlx')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="11" offset="2" >
                        <FormItem
                            {...formItemLayout}
                            label="">
                            <RadioGroup {...getFieldProps('type',{ initialValue: 'yw'})}>
                            <Radio value="yw">按业务发生地统计</Radio>
                            <Radio value="sws">按事务所所在地统计</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="6" offset="6">
                        <Button type="primary" htmlType="submit" className="query" loading={this.props.loading}>统计</Button>
                        <Button type="ghost" onClick={this.handleReset}>取消</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    }
});
searchForm = createForm()(searchForm);

module.exports = searchForm;