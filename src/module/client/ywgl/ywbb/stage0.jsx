import React from 'react'
import {Form,Row,Col,Input,Button,InputNumber,DatePicker} from 'antd'
import Panel from 'component/compPanel'
import utils from 'common/utils'
import {SelectorYWLX} from 'component/compSelector'
import Customer from './customer.jsx'

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const createForm = Form.create;

let stage = React.createClass({
    getInitialState(){
      return {
          customerModal:false
      }
    },
    next(){
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            values = utils.transEmpty2Null(values);
            this.props.onSubmit({stage: 1, values: values,customer:this.state.customer||this.props.customer});
            console.log(this.state.customer)
        })
    },
    checkSssq(rule, value, callback){
        if( value &&(!(value[0] instanceof Date) &&  !(value[1] instanceof Date))){
            callback("请输入所属时期起止")
        }else{
            callback()
        }
    },
    getCustomers(){
        this.setState({customerModal:true})
    },
    closeCustomer(){
        this.setState({customerModal:false})
    },
    handleOk(entity){
        this.setState({
            customerModal:false,
            customer:entity
        });
        this.props.form.setFieldsValue({
            DWMC:entity.DWMC,
            NSRSBH:entity.NSRSBH,
            NSRSBHDF: entity.NSRSBHDF,
            LXR: entity.LXR,
            LXDH: entity.LXDH,
            DWDZ:entity.DWDZ
        })
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
            <Customer visible={this.state.customerModal}
                      closable
                      style={{top:'200px'}}
                      onOk={this.handleOk}
                      onCancel={this.closeCustomer} />

            <Form horizontal form={this.props.form}>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 4}} wrapperCol={{span: 6}}
                          label="协议文号">
                            <Input  {...xyhProps}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 4}} wrapperCol={{span: 10}}
                          label="委托企业">
                            <Input style={{width:'60%'}} {...dwmcProps}/>
                            <Button type="ghost" onClick={this.getCustomers}>选择</Button>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 4}} wrapperCol={{span: 6}}
                          label="纳税人识别号">
                            <Input placeholder="纳税人识别号" disabled {...getFieldProps('NSRSBH')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 4}} wrapperCol={{span: 6}}
                          label="地税税务登记证号">
                            <Input placeholder="地税税务登记证号" disabled {...getFieldProps('NSRSBHDF')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem
                          labelCol={{span: 8}} wrapperCol={{span: 12}}
                          label="联系人">
                            <Input disabled {...getFieldProps('LXR')}/>
                        </FormItem>
                    </Col>
                    <Col span="12" pull="4">
                        <FormItem
                          labelCol={{span: 8}} wrapperCol={{span: 8}}
                          label="联系电话">
                            <Input disabled {...getFieldProps('LXDH')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 4}} wrapperCol={{span: 12}}
                          label="委托企业联系地址">
                            <Input disabled {...getFieldProps('DWDZ')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 4}} wrapperCol={{span: 6}}
                          label="委托项目类型">
                            <SelectorYWLX  {...ywlxProps}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 4}} wrapperCol={{span: 10}}
                          label="协议收费金额">
                            <InputNumber  style={{width:'60%'}} {...xyjeProps}/>元
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 4}} wrapperCol={{span: 6}}
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