import React from 'react'
import {Form, Row, Col, Input, Button, InputNumber, DatePicker, Select} from 'antd'
import {SelectorYWLX, SelectorISWS, SelectorSB, SelectorHY, SelectorDQ,SelectorQGSS} from 'component/compSelector'
import Customer from './customer.jsx'

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

//定义纳税方式人性质下拉
const SelectNSRXZ = React.createClass({
    render(){
        return <Select {...this.props} >
            <Option value="0">一般纳税人</Option>
            <Option value="1">小规模纳税人</Option>
            <Option value="2">非增值税纳税人</Option>
        </Select>
    }
});
//定义征收
const SelectZSFS = React.createClass({
    render(){
        return <Select {...this.props} >
            <Option value="0">查账征收</Option>
            <Option value="1">核定征收</Option>
        </Select>
    }
});

//定义委托企业性质
const SelectWTDWXZ = React.createClass({
    render(){
        return <Select {...this.props} >
            <Option value="0">居民企业</Option>
            <Option value="1">非居民企业</Option>
        </Select>
    }
});
//定义签名执业税务师下拉
const SelectZysws = React.createClass({
    render(){
        const list = this.props.data;
        let options = list.map(item=> {
            return <Option key={item.ZYSWS_ID}>{item.XMING}</Option>
        });
        return <Select
            {...this.props}
            placeholder="点击选择"
            multiple
            style={{width: '100%'}}>
            {options}
        </Select>
    }
});

let form = React.createClass({
    getInitialState(){
        return {
            customerModal: false,
            cs: '',
            qmsws: ''
        }
    },
    reset(e){
        e.preventDefault();
        this.props.form.resetFields();
    },
    commit(){
        this.props.form.validateFieldsAndScroll({force: true},(errors, values) => {
            if (!!errors) {
                return;
            }
            this.props.onCommit(values);
        })
    },
    save(){
        this.props.form.validateFieldsAndScroll({force: true},(errors, values) => {
            if (!!errors) {
                return;
            }
            this.props.onSave(values);
        })
    },
    checkSssq(rule, value, callback){
        if (value && (!(value[0] instanceof Date) && !(value[1] instanceof Date))) {
            callback("请输入所属时期起止")
        } else {
            callback()
        }
    },
    checkQmsws(rule, value, callback){
        if (!value || value.length != 2) {
            callback("只能选择两位签名税务师")
        } else {
            callback()
        }
    },
    checkDq(rule, value, callback){
        let isws = this.props.form.getFieldValue('ISWS');
        if (isws === 'N' && (!value || value.length == 0) ) {
            callback("必填项")
        } else {
            callback()
        }
    },

    getCustomers(){
        this.setState({customerModal: true})
    },
    closeCustomer(){
        this.setState({customerModal: false})
    },
    handleOk(entity){
        this.setState({
            customerModal: false,
            customer: entity
        });
        this.props.form.setFieldsValue({
            WTDW: entity.DWMC,
            NSRSBH: entity.NSRSBH,
            NSRSBHDF: entity.NSRSBHDF,
            LXR: entity.LXR,
            LXDH: entity.LXDH,
            LXDZ: entity.DWDZ,
            CUSTOMER_ID:entity.ID
        })
    },
    getSwjg1(value, option){
        const {setFieldsValue, getFieldValue} = this.props.form;
        let sbdm = getFieldValue('SB_DM');
        let cs = [];
        let length = option.length;
        for(let i=0; i < length; i++){
            if(option[i].label == '直属'){
                cs.push('');
            }else{
                cs.push(option[i].label)
            }
        }
        this.setState({cs: cs.join('')});
        setFieldsValue({CITY:option[0]?option[0].label:''});
        if (sbdm == 1) {
            setFieldsValue({ZGSWJG: '广东省'+cs.join('') + '国家税务局'})
        } else {
            setFieldsValue({ZGSWJG: '广东省'+cs.join('') + '地方税务局'})
        }
    },
    getSwjg2(value){
        const {getFieldValue,setFieldsValue} = this.props.form;
        let isws = getFieldValue('ISWS');
        let {cs} = this.state;
        if (isws=='N' && value == 1) {
            setFieldsValue({ZGSWJG: '广东省'+cs + '国家税务局'})
        } else if(isws=='N' && value == 2) {
            setFieldsValue({ZGSWJG: '广东省'+cs + '地方税务局'})
        } else if (isws=='Y' && value == 1){
            setFieldsValue({ZGSWJG: cs + '国家税务局'})
        } else {
            setFieldsValue({ZGSWJG: cs + '地方税务局'})
        }
    },
    getSwjg3(value, option){
        const {setFieldsValue, getFieldValue} = this.props.form;
        let sbdm = getFieldValue('SB_DM');
        let cs = [];
        let length = option.length;
        for(let i=0; i < length; i++){
            cs.push(option[i].label)
        }
        this.setState({cs: cs.join('')});
        setFieldsValue({CITY:cs.join('')});
        if (sbdm == 1) {
            setFieldsValue({ZGSWJG: cs.join('') + '国家税务局'})
        } else {
            setFieldsValue({ZGSWJG: cs.join('') + '地方税务局'})
        }
    },

    getQMSWS(value){
        let i = value.length;
        let qmsws = [];
        while (i--) {
            qmsws.push(value[i].label)
        }
        this.setState({qmsws: qmsws.reverse().join(' , ')});
    },
    render(){
        const {getFieldProps} = this.props.form;
        const {YWLX_DM,ISWS,ZT} = this.props.data;
        const xyhProps = getFieldProps('XYH', {
            rules: [
                {required: true, whitespace: true, message: '请填写协议文号'}
            ]
        });
        const dwmcProps = getFieldProps('WTDW', {
            rules: [
                {required: true, whitespace: true, message: '请选择一个委托企业单位'}
            ]
        });
        const ywlxProps = getFieldProps('YWLX_DM', {
            rules: [
                {required: true, message: '必须选择协议类型'}
            ]
        });
        const xyjeProps = getFieldProps('XYJE', {
            rules: [
                {required: true, type: 'number', message: '输入正确的协议收费金额'}
            ]
        });
        const sssqProps = getFieldProps('SSSQ', {
            rules: [
                {required: true, type: 'array', message: '输入所属时期'},
                {validator: this.checkSssq}
            ]
        });

        const qmswsProps = getFieldProps('QMSWS', {
            rules: [
                {validator: this.checkQmsws}
            ],
            onChange: this.getQMSWS
        });
        const dqProps = getFieldProps('DQ', {
            rules: [
                {validator: this.checkDq}
            ],
            onChange: this.getSwjg1
        });
        const qgssProps = getFieldProps('QGSS', {
            onChange: this.getSwjg3
        });

        const bgwhProps = getFieldProps('BGWH', {
            rules: [
                {required: true, whitespace: true, message: '必填项'}
            ]
        });
        const bgrqProps = getFieldProps('BGRQ', {
            rules: [
                {required: true, type: 'date', message: '选择报告日期'}
            ]
        });
        const yjfhProps = getFieldProps('YJFH', {
            rules: [
                {required: true, whitespace: true, message: '必填项'}
            ],
            trigger: 'onBlur'
        });
        const rjfhProps = getFieldProps('RJFH', {
            rules: [
                {required: true, whitespace: true, message: '必填项'}
            ],
            trigger: 'onBlur'
        });
        const sjfhProps = getFieldProps('SJFH', {
            rules: [
                {required: true, whitespace: true, message: '必填项'}
            ],
            trigger: 'onBlur'
        });
        const sfjeProps = getFieldProps('SFJE', {
            rules: [
                {required: true, type: 'number', message: '必填项'}
            ]
        });
        const cityProps = getFieldProps('CITY');
        const khProps = getFieldProps('CUSTOMER_ID');

        const swjg = {};
        swjg['Y']=<Col span="5" key="2">
            <FormItem style={{width: '90%'}}>
                <SelectorQGSS placeholder="选择地区" {...qgssProps}/>
            </FormItem>
        </Col>;

        swjg['N']=<Col span="5" key="2">
            <FormItem style={{width: '90%'}}>
                <SelectorDQ placeholder="选择地区" {...dqProps}/>
            </FormItem>
        </Col>;


        const tzValue = {};
        tzValue['2'] = <Row>
            <Col span="24">
                <FormItem
                    labelCol={{span: 4}} wrapperCol={{span: 8}}
                    label="所得税税前扣除项目鉴证金额" required>
                    <InputNumber min={0} max={9999999999.99} step={0.01}
                                 style={{width: '75%'}} {...getFieldProps('TZVALUE1')}/>元
                </FormItem>
            </Col>
        </Row>;
        tzValue['3'] = <Row>
            <Col span="12">
                <FormItem
                    labelCol={{span: 8}} wrapperCol={{span: 12}}
                    label="纳税调整增加额" required>
                    <InputNumber min={0} max={9999999999.99} step={0.01}
                                 style={{width: '75%'}} {...getFieldProps('TZVALUE1')}/>元
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem
                    labelCol={{span: 8}} wrapperCol={{span: 12}}
                    label="纳税调整减少额" required>
                    <InputNumber min={0} max={9999999999.99} step={0.01}
                                 style={{width: '75%'}} {...getFieldProps('TJVALUE2')}/>元
                </FormItem>
            </Col>
        </Row>;
        tzValue['4'] = <Row>
            <Col span="12">
                <FormItem
                    labelCol={{span: 8}} wrapperCol={{span: 12}}
                    label="应补税额" required>
                    <InputNumber min={0} max={9999999999.99} step={0.01}
                                 style={{width: '75%'}} {...getFieldProps('TZVALUE1')}/>元
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem
                    labelCol={{span: 8}} wrapperCol={{span: 12}}
                    label="应退税额" required>
                    <InputNumber min={0} max={9999999999.99} step={0.01}
                                 style={{width: '75%'}} {...getFieldProps('TJVALUE2')}/>元
                </FormItem>
            </Col>
        </Row>;
        tzValue['5'] = tzValue['4'];
        tzValue['6'] = tzValue['4'];
        tzValue['8'] = tzValue['4'];
        tzValue['9'] = tzValue['4'];
        tzValue['10'] = <Row>
            <Col span="12">
                <FormItem
                    labelCol={{span: 8}} wrapperCol={{span: 12}}
                    label="调增应纳税额" required>
                    <InputNumber min={0} max={9999999999.99} step={0.01}
                                 style={{width: '75%'}} {...getFieldProps('TZVALUE1')}/>元
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem
                    labelCol={{span: 8}} wrapperCol={{span: 12}}
                    label="调减应纳税额" required>
                    <InputNumber min={0} max={9999999999.99} step={0.01}
                                 style={{width: '75%'}} {...getFieldProps('TJVALUE2')}/>元
                </FormItem>
            </Col>
        </Row>;


        return <Form horizontal>
            <Customer visible={this.state.customerModal}
                      closable
                      style={{top: '200px'}}
                      onOk={this.handleOk}
                      onCancel={this.closeCustomer}/>
            <h3>填写协议信息</h3>
            <div className="form-content">
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
                            <Input style={{width: '60%'}} disabled {...dwmcProps}/> &nbsp;
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
                            <Input disabled {...getFieldProps('LXDZ')}/>
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
                            <InputNumber min={0} max={9999999999.99} step={0.01} style={{width: '60%'}} {...xyjeProps}/>元
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
                    <Col span="24">
                        <FormItem
                            labelCol={{span: 4}} wrapperCol={{span: 16}}
                            label="备注">
                            <Input type="textarea" rows={2} {...getFieldProps('MEMO')}/>
                        </FormItem>
                    </Col>
                </Row>
            </div>

            <h3>填写业务信息</h3>
            <Row>
                <Col span="6">
                    <FormItem
                      labelCol={{span: 16}} wrapperCol={{span: 7}}
                      label="主管税务机关">
                        <SelectorISWS {...getFieldProps('ISWS', {
                            initialValue: 'N',
                            onChange: this.handleISWS
                        })} />
                    </FormItem>
                </Col>
                <Col span="3" key="1">
                    <FormItem style={{width: '90%'}}>
                        <SelectorSB  {...getFieldProps('SB_DM', {initialValue: '1', onChange: this.getSwjg2})}/>
                    </FormItem>
                </Col>
                {(!!ISWS && !!ISWS.value) ? swjg[ISWS.value] : swjg['N']}
                <Col span="6" key="3">
                    <FormItem style={{width: '90%'}}>
                        <Input placeholder="主管税务机关名称"  {...getFieldProps('ZGSWJG')}/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem
                      labelCol={{span: 8}} wrapperCol={{span: 12}}
                      label="委托企业行业类型">
                        <SelectorHY  {...getFieldProps('HY_ID', {initialValue: '1'})}/>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem
                      labelCol={{span: 8}} wrapperCol={{span: 12}}
                      label="委托企业增值税纳税人类型">
                        <SelectNSRXZ  {...getFieldProps('NSRXZ', {initialValue: '0'})}/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem
                      labelCol={{span: 8}} wrapperCol={{span: 12}}
                      label="委托企业征收方式">
                        <SelectZSFS  {...getFieldProps('ZSFS_DM', {initialValue: '0'})}/>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem
                      labelCol={{span: 8}} wrapperCol={{span: 12}}
                      label="委托企业性质">
                        <SelectWTDWXZ  {...getFieldProps('WTDWXZ_DM', {initialValue: '0'})}/>
                    </FormItem>
                </Col>

            </Row>
            <Row>
                <Col span="12">
                    <FormItem
                      labelCol={{span: 8}} wrapperCol={{span: 12}}
                      label="报告文号">
                        <Input  {...bgwhProps}/>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem
                      labelCol={{span: 8}} wrapperCol={{span: 12}}
                      label="报告日期">
                        <DatePicker  {...bgrqProps}/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <FormItem
                      labelCol={{span: 4}} wrapperCol={{span: 10}}
                      label="一级复核" required={true}>
                        <Input style={{width: '60%'}} {...yjfhProps}/> 项目负责人的复核
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <FormItem
                      labelCol={{span: 4}} wrapperCol={{span: 10}}
                      label="二级复核"
                      required>
                        <Input style={{width: '60%'}} {...rjfhProps}/> 部门负责人的复核
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <FormItem
                      labelCol={{span: 4}} wrapperCol={{span: 10}}
                      label="三级复核"
                      required>
                        <Input style={{width: '60%'}} {...sjfhProps}/> 机构负责人的复核
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="16">
                    <FormItem
                      labelCol={{span: 6}} wrapperCol={{span: 9}}
                      label="签名注册税务师" required>
                        <SelectZysws labelInValue  data={this.props.zysws} {...qmswsProps}/>
                        <span>{this.state.qmsws}</span>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <FormItem
                      labelCol={{span: 4}} wrapperCol={{span: 8}}
                      label="委托企业营业收入">
                        <InputNumber min={0} max={999999999999.99} step={0.01} style={{width: '75%'}} {...sfjeProps}/>元
                    </FormItem>
                </Col>
            </Row>
            {!!YWLX_DM ? tzValue[YWLX_DM.value] : null}
            <Row>
                <Col span="24">
                    <FormItem
                      labelCol={{span: 4}} wrapperCol={{span: 8}}
                      label="具体项目">
                        <Input style={{width: '100%'}} {...getFieldProps('JTXM')}/>
                    </FormItem>
                </Col>
            </Row>

            <Row>
                <Col span="10" offset="10">
                    <Button
                        size="large"
                        style={{marginRight: '16px'}}
                        onClick={this.reset}>清空</Button>
                    <Button
                        size="large"
                        style={{marginRight: '16px'}}
                        onClick={this.save}>保存</Button>
                    {!ZT || ZT.value === 0 ?
                    <Button
                        size="large"
                        type="primary"
                        onClick={this.commit}>报备</Button> :null}

                </Col>
            </Row>


        </Form>
    }
});

form = createForm({
    mapPropsToFields(props) {
        return props.data
    },
    onFieldsChange(props,field){
        props.onFieldChange(field)
    }
})(form);

module.exports = form;