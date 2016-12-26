import React from 'react'
import {Modal, Row, Col, Button, Form, Input, InputNumber, Checkbox, Radio, DatePicker} from 'antd'
import {SelectorXB, SelectorZW} from 'component/compSelector'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
let c = React.createClass({
    getDefaultProps(){
        return {
            title: '录入参会人员信息'
        }
    },
    handleClose(){
        this.props.onClose()
    },
    reset(){
        this.props.form.resetFields();
    },
    handleSubmit(){
        this.props.form.validateFields({force: true}, (errors, values) => {
            if (!!errors) {
                return;
            }
            for(let k in values){
                if(values[k] === undefined)  values[k] = null
            }
            values.xb = values.xb.label;
            values.zw = values.zw.label;
            values.rzsj = values.zssj[0];
            values.lksj = values.zssj[1];
            this.reset();
            this.props.onOk(values);
            this.handleClose()
        })
    },
    render(){
        const {title, visible} = this.props;
        const {getFieldProps} = this.props.form;
        const layout = {
            labelCol: {span: 8},
            wrapperCol: {span: 14}
        };
        const xmingProps = getFieldProps('xming', {
            rules: [
                {required: true, whitespace: true, message: '必填'}
            ]
        });
        const xbProps = getFieldProps('xb', {
            rules: [
                {required: true, type: 'object', message: '必填'}
            ]
        });
        const zwProps = getFieldProps('zw', {
            rules: [
                {required: true, type: 'object', message: '必填'}
            ]
        });
        const zssjProps = getFieldProps('zssj', {
            rules: [
                {required: true, type: 'array', message: '必填'}
            ],
            getValueFromEvent: (date, dateString) => dateString
        });
        const fjlxProps = getFieldProps('fjlx', {
            rules: [
                {required: true, message: '必填'}
            ]
        });

        return <Modal title={title} width={500} onCancel={this.handleClose} visible={visible} onOk={this.handleSubmit}>
            <Form horizontal>
                <Row>
                    <Col span="8">
                        <FormItem label="姓名" {...layout} >
                            <Input  { ...xmingProps} />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="性别" {...layout} >
                            <SelectorXB labelInValue  { ...xbProps} />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="年龄" {...layout} >
                            <InputNumber   { ...getFieldProps('nl')} />
                        </FormItem>
                    </Col>
                </Row>

                <FormItem label="职务" {...layout} >
                    <SelectorZW labelInValue   { ...zwProps} />
                </FormItem>
                <FormItem label="手机" {...layout} >
                    <Input   { ...getFieldProps('yddh')} />
                </FormItem>
                <FormItem label="电话" {...layout} >
                    <Input   { ...getFieldProps('dhhm')} />
                </FormItem>
                <FormItem label="电子邮箱" {...layout} >
                    <Input   { ...getFieldProps('email')} />
                </FormItem>
                <FormItem label="住宿时间" {...layout} >
                    <RangePicker format="yyyy-MM-dd "
                                 { ...zssjProps} />
                </FormItem>
                <FormItem label="房型" {...layout}>
                    <RadioGroup {...fjlxProps}>
                        <Radio value="1">单人房</Radio>
                        <Radio value="2">双人房</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="点餐" {...layout}>
                    <Checkbox { ...getFieldProps('zaoc', {valuePropName: 'checked',initialValue: false})}>早餐</Checkbox>
                    <Checkbox { ...getFieldProps('wuc', {valuePropName: 'checked',initialValue: false})}>午餐</Checkbox>
                    <Checkbox { ...getFieldProps('wanc', {valuePropName: 'checked',initialValue: false})}>晚餐</Checkbox>
                </FormItem>
                <FormItem label="备注" {...layout}>
                    <Input type="textarea" { ...getFieldProps('bz')} /></FormItem>

            </Form>
        </Modal>
    }
});
c = Form.create()(c);

module.exports = c;
