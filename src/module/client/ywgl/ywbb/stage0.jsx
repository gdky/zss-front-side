import React from 'react'
import {Form,Row,Col,Input,Button,InputNumber,DatePicker} from 'antd'
import numeral from 'numeral'
import Panel from 'component/compPanel'
import utils from 'common/utils'
import {SelectorYWLX} from 'component/compSelector'


const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const createForm = Form.create;

let stage = React.createClass({
    next(){
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            values = utils.transEmpty2Null(values);
            this.props.onSubmit({stage: 1, values: values});
        })
    },
    checkSssq(rule, value, callback){
        if( value &&(!(value[0] instanceof Date) &&  !(value[1] instanceof Date))){
            callback("请输入所属时期起止")
        }else{
            callback()
        }
    },
    render(){
        const { getFieldProps } = this.props.form;
        const xyhProps = getFieldProps('XYH', {
            rules: [
                {required: true, whitespace: true, message: '请填写协议文号'}
            ]
        });
        const dwmcProps = getFieldProps('DWMC', {
            rules: [
                {required: true, whitespace: true, message: '请选择一个委托企业单位'}
            ]
        });
        const ywlxProps = getFieldProps('YWLX_DM', {
            rules: [
                {required: true,  message: '必须选择协议类型'}
            ]
        });
        const xyjeProps = getFieldProps('XYJE', {
            rules: [
                {required: true,type:'number',  message: '输入正确的协议收费金额'}
            ]
        });
        const sssqProps = getFieldProps('SSSQ', {
            rules: [
                {required: true, type:'array',  message: '输入所属时期'},
                { validator: this.checkSssq }
            ]
        });

        return <Panel title="填写协议信息" className="stage">

            <Form horizontal form={this.props.form}>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 3}} wrapperCol={{span: 5}}
                          label="协议文号">
                            <Input  {...xyhProps}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 3}} wrapperCol={{span: 5}}
                          label="委托企业">
                            <Input  {...dwmcProps}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 3}} wrapperCol={{span: 5}}
                          label="纳税人识别号">
                            <Input placeholder="纳税人识别号" disabled {...getFieldProps('NSRSBH')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 3}} wrapperCol={{span: 5}}
                          label="地税税务登记证号">
                            <Input placeholder="地税税务登记证号" disabled {...getFieldProps('NSRSBHDF')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem
                          labelCol={{span: 9}} wrapperCol={{span: 15}}
                          label="联系人">
                            <Input disabled {...getFieldProps('DWDZ')}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                          labelCol={{span: 9}} wrapperCol={{span: 15}}
                          label="联系电话">
                            <Input disabled {...getFieldProps('LXDH')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 3}} wrapperCol={{span: 13}}
                          label="委托企业联系地址">
                            <Input disabled {...getFieldProps('DWDZ')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 3}} wrapperCol={{span: 6}}
                          label="委托项目类型">
                            <SelectorYWLX  {...ywlxProps}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 3}} wrapperCol={{span: 8}}
                          label="协议收费金额">
                            <InputNumber  style={{width:'75%'}} {...xyjeProps}/>元
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 3}} wrapperCol={{span: 5}}
                          label="项目所属时期">
                            <RangePicker format="yyyy/MM/dd " {...sssqProps}/>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="4" offset="10">

                        <Button
                          size="large"
                          onClick={this.next}>下一步</Button>

                    </Col>
                </Row>
            </Form>
        </Panel>
    }
});

stage = createForm({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(stage);

module.exports = stage;