import React from 'react'
import {Row, Col, Form, Button, Input, DatePicker, InputNumber, Checkbox} from 'antd'
import {SelectorCS, SelectorYWLX, SelectorYear, SelectorYWZT, SelectorZSFS} from 'component/compSelector'

const FormItem = Form.Item;
const createForm = Form.create;
const RangePicker = DatePicker.RangePicker;

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
        let commitValues = this.props.form.getFieldsValue();
        //首先处理搜索表单提交的信息，将字符串去首尾空格，将空值的搜索条件丢弃
        const values = {};
        for (let prop in commitValues) {
            if (commitValues[prop]) {
                if (typeof commitValues[prop] == 'string' && !!commitValues[prop].trim()) {
                    values[prop] = commitValues[prop].trim()
                } else {
                    values[prop] = commitValues[prop]
                }
            }
        }
        //加工各提交字段的值
        if (values.xyje1 || values.xyje2) {
            values.xyje = [values.xyje1 || 0, values.xyje2 || 0];
        }
        if (values.sjsqje1 || values.sjsqje2) {
            values.sjsqje = [values.sjsqje1 || 0, values.sjsqje2 || 0];
        }
        if (values.is_yd) {
            values.is_yd = values.is_yd ? 'Y' : 'N';
        }
        if (values.swbz) {
            values.swbz = values.swbz ? 1 : 0;
        }
        if (values.bbrq && !values.bbrq[0]) {
            delete values.bbrq
        }
        if (values.bgrq && !values.bgrq[0]) {
            delete values.bgrq
        }

        this.props.onSubmit(values);
    },
    render(){
        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16}
        };

        return <div className="search-form">
            <Form horizontal onSubmit={this.handleSubmit}>
                <Row>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="事务所名称">
                            <Input placeholder="事务所名称" {...getFieldProps('swsmc')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="委托单位名称">
                            <Input placeholder="委托单位名称" {...getFieldProps('wtdw')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="税务登记证号">
                            <Input placeholder="税务登记证号" { ...getFieldProps('wtdwnsrsbh')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="业务类型">
                            <SelectorYWLX placeholder="业务类型" {...getFieldProps('ywlx_dm')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            labelCol={{span: 8}} wrapperCol={{span: 16}}
                            label="协议收费金额">
                            <InputNumber style={{width: '40%'}} step={0.01} { ...getFieldProps('xyje1')}/>&nbsp;- &nbsp;
                            <InputNumber style={{width: '40%'}} step={0.01} { ...getFieldProps('xyje2')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="实际收费金额">
                            <InputNumber style={{width: '40%'}} step={0.01} { ...getFieldProps('sjsqje1')}/>&nbsp;- &nbsp;
                            <InputNumber style={{width: '40%'}} step={0.01} { ...getFieldProps('sjsqje2')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="协议文号">
                            <Input placeholder="协议文号" {...getFieldProps('xyh')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="报告文号">
                            <Input placeholder="报告文号" {...getFieldProps('bgwh')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="报备号码">
                            <Input placeholder="报备号码" { ...getFieldProps('bbhm')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="报备日期：">
                            <RangePicker format="yyyy/MM/dd" { ...getFieldProps('bbrq',
                                {getValueFromEvent: (date, dateString)=> dateString})}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="报告日期">
                            <RangePicker format="yyyy/MM/dd" { ...getFieldProps('bgrq',
                                {getValueFromEvent: (date, dateString)=> dateString})}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="业务发生地">
                            <SelectorCS { ...getFieldProps('cs_dm')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="业务状态：">
                            <SelectorYWZT  { ...getFieldProps('zt')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="鉴证年度">
                            <SelectorYear { ...getFieldProps('nd')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="征收方式">
                            <SelectorZSFS { ...getFieldProps('zsfs_dm')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="异地报备">
                            <Checkbox  {...getFieldProps('is_yd', {valuePropName: 'checked'})}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="外省事务所">
                            <Checkbox  {...getFieldProps('swbz', {valuePropName: 'checked'})}/>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="4" offset="20">
                        <Button type="primary" htmlType="submit" className="query">查询</Button>
                        <Button type="ghost" onClick={this.handleReset}>重置</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    }
});
searchForm = createForm()(searchForm);

module.exports = searchForm;