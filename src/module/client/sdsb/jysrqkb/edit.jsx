import React from 'react'
import { Steps, Col, Row, Spin, notification, Icon, Button, Form, Input, InputNumber, Popconfirm } from 'antd'
import Panel from 'component/compPanel'
import { SelectorYear, SelectorXZ, SelectorSWSXZ, SelectorCS } from 'component/compSelector'
import auth from 'common/auth.js'
import config from 'common/configuration.js'
import req from 'common/request'
import utils from 'common/utils'
import Success from './successScr'
import FailScr from './failScr'

const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const PanelBar = Panel.ToolBar;

let Editfrom = React.createClass({
    getInitialState() {
        return {
            checkQtssjzHs: true,
            checkQtssywsrHs1: true,
            checkQtssywsrHs2: true,
            checkQtssywsrHs3: true,
            checkQtssjzJe: true,
            checkQtssywsrJe1: true,
            checkQtssywsrJe2: true,
            checkQtssywsrJe3: true,
        }
    },
    checkSrze(rule, value, callback) {
        let zyywsrhj_je = this.props.form.getFieldValue('zyywsrhj_je');
        let qtywsrhj = this.props.form.getFieldValue('qtywsrhj');
        let srze = Number(zyywsrhj_je ? zyywsrhj_je : 0)
            + Number(qtywsrhj ? qtywsrhj : 0);
        if(!value){
            value=0;
        }
        if (value.toFixed(2) == srze.toFixed(2)) {
            callback();
        } else {
            callback("收入总额=主营业务合计+其他收入合计,数据有误，请重新确认一遍");
        }
    },

    checkHs(rule, value, callback) {
        if (value > 99999) {
            callback("最大为5位数")
        } else {
            callback()
        }
    },

    checkJe(rule, value, callback) {
        if (value > 9999999999999.99) {
            callback("最大为13位数")
        } else {
            callback()
        }
    },

    checkQtssjz_hs(rule, value, callback) {
        let qtssywsr_hs1 = this.props.form.getFieldValue('qtssywsr_hs1');
        let qtssywsr_hs2 = this.props.form.getFieldValue('qtssywsr_hs2');
        let qtssywsr_hs3 = this.props.form.getFieldValue('qtssywsr_hs3'); 
        if (value < qtssywsr_hs1) {
            this.setState({ checkQtssjzHs: false });
            callback("(5)其他涉税鉴证业务小计项必须大于等于{1}项");
        } else if (value < qtssywsr_hs2) {
            this.setState({ checkQtssjzHs: false });
            callback("(5)其他涉税鉴证业务小计项必须大于等于{2}项");
        } else if (value < qtssywsr_hs3) {
            this.setState({ checkQtssjzHs: false });
            callback("(5)其他涉税鉴证业务小计项必须大于等于{3}项");
        } else {
            this.setState({ checkQtssjzHs: true });
            callback();
        }
    },

    checkQtssjz_je(rule, value, callback) {
        let qtssywsr_je1 = this.props.form.getFieldValue('qtssywsr_je1');
        let qtssywsr_je2 = this.props.form.getFieldValue('qtssywsr_je2');
        let qtssywsr_je3 = this.props.form.getFieldValue('qtssywsr_hs3');
        if (value < qtssywsr_je1) {
            this.setState({ checkQtssjzJe: false });
            callback("(5)其他涉税鉴证业务小计项必须大于等于{1}项");
        } else if (value < qtssywsr_je2) {
            this.setState({ checkQtssjzJe: false });
            callback("(5)其他涉税鉴证业务小计项必须大于等于{2}项");
        } else if (value < qtssywsr_je3) {
            this.setState({ checkQtssjzJe: false });
            callback("(5)其他涉税鉴证业务小计项必须大于等于{3}项");
        } else {
            this.setState({ checkQtssjzJe: true });
            callback();
        }
    },

    checkQtssywsr_hs1(rule, value, callback) {
        let qtssjz_hs = this.props.form.getFieldValue('qtssjz_hs');
        if (qtssjz_hs < value) {
            this.setState({ checkQtssywsrHs1: false });
            callback("(5)其他涉税鉴证业务小计项必须大于等于{1}项");
        } else {
            this.setState({ checkQtssywsrHs1: true });
            if (!this.state.checkQtssjzHs) {
                this.props.form.validateFields(['qtssjz_hs'], { force: true });;
            }
            callback();
        }
    },

    checkQtssywsr_hs2(rule, value, callback) {
        let qtssjz_hs = this.props.form.getFieldValue('qtssjz_hs');
        if (qtssjz_hs < value) {
            this.setState({ checkQtssywsrHs2: false });
            callback("(5)其他涉税鉴证业务小计项必须大于等于{2}项");
        } else {
            this.setState({ checkQtssywsrHs2: true });
            if (!this.state.checkQtssjzHs) {
                this.props.form.validateFields(['qtssjz_hs'], { force: true });;
            }
            callback();
        }
    },

    checkQtssywsr_hs3(rule, value, callback) {
        let qtssjz_hs = this.props.form.getFieldValue('qtssjz_hs');
        if (qtssjz_hs < value) {
            this.setState({ checkQtssywsrHs3: false });
            callback("(5)其他涉税鉴证业务小计项必须大于等于{3}项");
        } else {
            this.setState({ checkQtssywsrHs3: true });
            if (!this.state.checkQtssjzHs) {
                this.props.form.validateFields(['qtssjz_hs'], { force: true });;
            }
            callback();
        }
    },

    checkQtssywsr_je1(rule, value, callback) {
        let qtssjz_je = this.props.form.getFieldValue('qtssjz_je');
        if (qtssjz_je < value) {
            this.setState({ checkQtssywsrJe1: false });
            callback("(5)其他涉税鉴证业务小计项必须大于等于{1}项");
        } else {
            this.setState({ checkQtssywsrJe1: true });
            if (!this.state.checkQtssjzJe) {
                this.props.form.validateFields(['qtssjz_je'], { force: true });;
            }
            callback();
        }
    },

    checkQtssywsr_je2(rule, value, callback) {
        let qtssjz_je = this.props.form.getFieldValue('qtssjz_je');
        if (qtssjz_je < value) {
            this.setState({ checkQtssywsrJe2: false });
            callback("(5)其他涉税鉴证业务小计项必须大于等于{2}项");
        } else {
            this.setState({ checkQtssywsrJe2: true });
            if (!this.state.checkQtssjzJe) {
                this.props.form.validateFields(['qtssjz_je'], { force: true });;
            }
            callback();
        }
    },

    checkQtssywsr_je3(rule, value, callback) {
        let qtssjz_je = this.props.form.getFieldValue('qtssjz_je');
        if (qtssjz_je < value) {
            this.setState({ checkQtssywsrJe3: false });
            callback("(5)其他涉税鉴证业务小计项必须大于等于{3}项");
        } else {
            this.setState({ checkQtssywsrJe3: true });
            if (!this.state.checkQtssjzJe) {
                this.props.form.validateFields(['qtssjz_je'], { force: true });;
            }
            callback();
        }
    },

    handleZcInputChange(changeField, value) {
        let f = this.props.form.getFieldsValue();
        f[changeField] = value;
        f.zcze = Number(f.zyywcb ? f.zyywcb : 0)
            + Number(f.zyywsjfj ? f.zyywsjfj : 0)
            + Number(f.yyfy ? f.yyfy : 0)
            + Number(f.glfy ? f.glfy : 0)
            + Number(f.cwfy ? f.cwfy : 0)
            + Number(f.yywzc ? f.yywzc : 0)
            + Number(f.qtzc ? f.qtzc : 0);
        this.props.form.setFieldsValue(f);
        this.props.form.validateFields(['zcze'], { force: true });
        this.props.form.validateFields(["qtssjz_hs"]);
        this.props.form.validateFields(['qtssjz_je']);
    },

    handleSrInputChange(changeField, value) {
        let f = this.props.form.getFieldsValue();
        f[changeField] = value;
        f.ssfwyw_hs = Number(f.dlswdj_hs ? f.dlswdj_hs : 0)
            + Number(f.dlnssb_hs ? f.dlnssb_hs : 0)
            + Number(f.dljzjz_hs ? f.dljzjz_hs : 0)
            + Number(f.dlsqjmts_hs ? f.dlsqjmts_hs : 0)
            + Number(f.dlzgrd_hs ? f.dlzgrd_hs : 0)
            + Number(f.dlzzssws_hs ? f.dlzzssws_hs : 0)
            + Number(f.dlyjdk_hs ? f.dlyjdk_hs : 0)
            + Number(f.spswgwzx_hs ? f.spswgwzx_hs : 0)
            + Number(f.dlssch_hs ? f.dlssch_hs : 0)
            + Number(f.sspx_hs ? f.sspx_hs : 0)
            + Number(f.qtssfwywxj_hs ? f.qtssfwywxj_hs : 0);

        f.ssjzyw_hs = Number(f.sdshsqj_hs ? f.sdshsqj_hs : 0)
            + Number(f.mbks_hs ? f.mbks_hs : 0)
            + Number(f.ccsssqkc_hs ? f.ccsssqkc_hs : 0)
            + Number(f.tt_hs ? f.tt_hs : 0)
            + Number(f.qtssjz_hs ? f.qtssjz_hs : 0);

        f.zyywsrhj_hs = Number(f.ssfwyw_hs ? f.ssfwyw_hs : 0)
            + Number(f.ssjzyw_hs ? f.ssjzyw_hs : 0);

        f.ssfwyw_je = Number(f.dlswdj_je ? f.dlswdj_je : 0)
            + Number(f.dlnssb_je ? f.dlnssb_je : 0)
            + Number(f.dljzjz_je ? f.dljzjz_je : 0)
            + Number(f.dlsqjmts_je ? f.dlsqjmts_je : 0)
            + Number(f.dlzgrd_je ? f.dlzgrd_je : 0)
            + Number(f.dlzzssws_je ? f.dlzzssws_je : 0)
            + Number(f.dlyjdk_je ? f.dlyjdk_je : 0)
            + Number(f.spswgwzx_je ? f.spswgwzx_je : 0)
            + Number(f.dlssch_je ? f.dlssch_je : 0)
            + Number(f.sspx_je ? f.sspx_je : 0)
            + Number(f.qtssfwywxj_je ? f.qtssfwywxj_je : 0);

        f.ssjzyw_je = Number(f.sdshsqj_je ? f.sdshsqj_je : 0)
            + Number(f.mbks_je ? f.mbks_je : 0)
            + Number(f.ccsssqkc_je ? f.ccsssqkc_je : 0)
            + Number(f.tt_je ? f.tt_je : 0)
            + Number(f.qtssjz_je ? f.qtssjz_je : 0); 

        f.zyywsrhj_je = Number(f.ssfwyw_je ? f.ssfwyw_je : 0)
            + Number(f.ssjzyw_je ? f.ssjzyw_je : 0);

        this.props.form.setFieldsValue(f);
        this.props.form.validateFields(['ssfwyw_hs', 'ssjzyw_hs', 'zyywsrhj_hs'], { force: true });
        this.props.form.validateFields(['ssfwyw_je', 'ssjzyw_je', 'zyywsrhj_je'], { force: true });
        this.props.form.validateFields(["qtssjz_hs"]);
        this.props.form.validateFields(['qtssjz_je']);
    },

    commit() {
        const {validateFields} = this.props.form;
        validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            values = utils.transEmpty2Null(values);
            this.props.onCommit(values);
        })
    },
    save() {
        const {validateFields} = this.props.form;
        validateFields({ force: true }, (errors, values) => {
            if (!!errors) {
                return;
            }
            values = utils.transEmpty2Null(values);
            this.props.onSave(values);
        })
    },

    render() {
        const {data, initData} = this.props;
        initData.tbnd = initData.tbnd + "";
        const {getFieldProps} = this.props.form;
        const layout = {
            labelCol: { span: 12 },
            wrapperCol: { span: 12 }
        };
        const style = { style: { width: '100%' } };
        const maxHs = 99999;
        const maxJe = 9999999999999.99;

        return <div className="fix-table no-border table-striped ">
            <Form horizontal>
                <table className="tg">
                    <colgroup>
                        <col className="ant-col-6"></col>
                        <col className="ant-col-3"></col>
                        <col className="ant-col-2"></col>
                        <col className="ant-col-4"></col>
                        <col className="ant-col-2"></col>
                        <col className="ant-col-4"></col>
                        <col className="ant-col-3"></col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>单位: {initData.dwmc}</td>
                            <td>
                                <SelectorYear disabled  { ...getFieldProps('nd', { initialValue: initData.tbnd }) } />
                            </td>
                            <td>制表人:</td>
                            <td ><Input {...getFieldProps('tbr', { initialValue: data.TBR }) } /> </td>
                            <td>所长：</td>
                            <td ><Input disabled {...getFieldProps('sz', { initialValue: initData.tbsz }) } /> </td>
                            <td>单位：万元、户</td>
                        </tr>
                        <tr style={{ textAlign: 'center' }}>
                            <th rowSpan="2">项目</th>
                            <th colSpan="3">上年数</th>
                            <th colSpan="3">本年数</th>
                        </tr>
                        <tr>
                            <th colSpan="2">户次</th>
                            <th >金额</th>
                            <th colSpan="2">户次</th>
                            <th>金额</th>
                        </tr>
                        <tr>
                            <td ><b>一、收人总额</b></td>
                            <td colSpan="2">----</td>
                            <td>
                                <FormItem>
                                    <InputNumber step={0.01} disabled  {...getFieldProps('srze0', { initialValue: initData.SRZE }) } />
                                </FormItem>
                            </td>
                            <td colSpan="2">----</td>
                            <td>
                                <FormItem>
                                    <InputNumber step={0.01} disabled  {...getFieldProps('srze', { initialValue: initData.bn_srze, rules: [{ validator: this.checkSrze }] }) } />
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td><b>（一）主营业务合计</b></td>
                            <td colSpan="2">
                                <FormItem>
                                    <InputNumber disabled  {...getFieldProps('zyywsrhj_hs0', { initialValue: initData.ZYYWSRHJ_HS }) } />
                                </FormItem>
                            </td>
                            <td>
                                <FormItem>
                                    <InputNumber step={0.01} disabled  {...getFieldProps('zyywsrhj_je0', { initialValue: initData.ZYYWSRHJ_JE }) } />
                                </FormItem>
                            </td>
                            <td colSpan="2">
                                <FormItem>
                                    <InputNumber max={maxHs} disabled {...getFieldProps('zyywsrhj_hs', { initialValue: data.ZYYWSRHJ_HS, rules: [{ validator: this.checkHs }] }) } />
                                </FormItem>
                            </td>
                            <td>
                                <FormItem>
                                    <InputNumber max={maxJe} step={0.01} disabled {...getFieldProps('zyywsrhj_je', { initialValue: data.ZYYWSRHJ_JE, rules: [{ validator: this.checkJe }] }) } />
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td>1、涉税服务业务</td>
                            <td colSpan="2">
                                <FormItem>
                                    <InputNumber disabled  {...getFieldProps('ssfwyw_hs0', { initialValue: initData.SSFWYW_HS }) } />
                                </FormItem>
                            </td>
                            <td>
                                <FormItem>
                                    <InputNumber step={0.01} disabled {...getFieldProps('ssfwyw_je0', { initialValue: initData.SSFWYW_JE }) } />
                                </FormItem>
                            </td>
                            <td colSpan="2">
                                <FormItem>
                                    <InputNumber max={maxHs} disabled  {...getFieldProps('ssfwyw_hs', { initialValue: data.SSFWYW_HS, rules: [{ validator: this.checkHs }] }) } />
                                </FormItem>
                            </td>
                            <td>
                                <FormItem>
                                    <InputNumber max={maxJe} step={0.01} disabled  {...getFieldProps('ssfwyw_je', { initialValue: data.SSFWYW_JE, rules: [{ validator: this.checkJe }] }) } />
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td>(1)代理税务登记</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('dlswdj_hs0', { initialValue: initData.DLSWDJ_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled  {...getFieldProps('dlswdj_je0', { initialValue: initData.DLSWDJ_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('dlswdj_hs', { initialValue: data.DLSWDJ_HS }) } onChange={this.handleSrInputChange.bind(this, "dlswdj_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('dlswdj_je', { initialValue: data.DLSWDJ_JE }) } onChange={this.handleSrInputChange.bind(this, "dlswdj_je")} /></td>
                        </tr>
                        <tr>
                            <td>(2)代理纳税申报</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('dlnssb_hs0', { initialValue: initData.DLNSSB_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled {...getFieldProps('dlnssb_je0', { initialValue: initData.DLNSSB_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('dlnssb_hs', { initialValue: data.DLNSSB_HS }) } onChange={this.handleSrInputChange.bind(this, "dlnssb_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('dlnssb_je', { initialValue: data.DLNSSB_JE }) } onChange={this.handleSrInputChange.bind(this, "dlnssb_je")} /></td>
                        </tr>
                        <tr>
                            <td>(3)代理建帐记帐</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('dljzjz_hs0', { initialValue: initData.DLJZJZ_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled  {...getFieldProps('dljzjz_je0', { initialValue: initData.DLJZJZ_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('dljzjz_hs', { initialValue: data.DLJZJZ_HS }) } onChange={this.handleSrInputChange.bind(this, "dljzjz_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('dljzjz_je', { initialValue: data.DLJZJZ_JE }) } onChange={this.handleSrInputChange.bind(this, "dljzjz_je")} /></td>
                        </tr>
                        <tr>
                            <td>(4)代理申请减、免、退税</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('dlsqjmts_hs0', { initialValue: initData.DLSQJMTS_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled  {...getFieldProps('dlsqjmts_je0', { initialValue: initData.DLSQJMTS_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('dlsqjmts_hs', { initialValue: data.DLSQJMTS_HS }) } onChange={this.handleSrInputChange.bind(this, "dlsqjmts_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('dlsqjmts_je', { initialValue: data.DLSQJMTS_JE }) } onChange={this.handleSrInputChange.bind(this, "dlsqjmts_je")} /></td>
                        </tr>
                        <tr>
                            <td>(5)代理申请增值税一般纳税人资格认定</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('dlzgrd_hs0', { initialValue: initData.DLZGRD_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled  {...getFieldProps('dlzgrd_je0', { initialValue: initData.DLZGRD_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('dlzgrd_hs', { initialValue: data.DLZGRD_HS }) } onChange={this.handleSrInputChange.bind(this, "dlzgrd_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('dlzgrd_je', { initialValue: data.DLZGRD_JE }) } onChange={this.handleSrInputChange.bind(this, "dlzgrd_je")} /></td>
                        </tr>
                        <tr>
                            <td>(6)代理制作涉税文书</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('dlzzssws_hs0', { initialValue: initData.DLZZSSWS_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled  {...getFieldProps('dlzzssws_je0', { initialValue: initData.DLZZSSWS_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('dlzzssws_hs', { initialValue: data.DLZZSSWS_HS }) } onChange={this.handleSrInputChange.bind(this, "dlzzssws_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('dlzzssws_je', { initialValue: data.DLZZSSWS_JE }) } onChange={this.handleSrInputChange.bind(this, "dlzzssws_je")} /></td>
                        </tr>
                        <tr>
                            <td>(7)代理一机多卡业务</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('dlyjdk_hs0', { initialValue: initData.DLYJDK_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled  {...getFieldProps('dlyjdk_je0', { initialValue: initData.DLYJDK_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('dlyjdk_hs', { initialValue: data.DLYJDK_HS }) } onChange={this.handleSrInputChange.bind(this, "dlyjdk_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('dlyjdk_je', { initialValue: data.DLYJDK_JE }) } onChange={this.handleSrInputChange.bind(this, "dlyjdk_je")} /></td>
                        </tr>
                        <tr>
                            <td>(8)受聘税务顾问咨珣</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('spswgwzx_hs0', { initialValue: initData.SPSWGWZX_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled  {...getFieldProps('spswgwzx_je0', { initialValue: initData.SPSWGWZX_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('spswgwzx_hs', { initialValue: data.SPSWGWZX_HS }) } onChange={this.handleSrInputChange.bind(this, "spswgwzx_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('spswgwzx_je', { initialValue: data.SPSWGWZX_JE }) } onChange={this.handleSrInputChange.bind(this, "spswgwzx_je")} /></td>
                        </tr>
                        <tr>
                            <td>(9)代理税收筹划</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('dlssch_hs0', { initialValue: initData.DLSSCH_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled  {...getFieldProps('dlssch_je0', { initialValue: initData.DLSSCH_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('dlssch_hs', { initialValue: data.DLSSCH_HS }) } onChange={this.handleSrInputChange.bind(this, "dlssch_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('dlssch_je', { initialValue: data.DLSSCH_JE }) } onChange={this.handleSrInputChange.bind(this, "dlssch_je")} /></td>
                        </tr>
                        <tr>
                            <td>(10)涉税培训业务</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('sspx_hs0', { initialValue: initData.SSPX_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled  {...getFieldProps('sspx_je0', { initialValue: initData.SSPX_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('sspx_hs',{initialValue: data.SSPX_HS}) } onChange={this.handleSrInputChange.bind(this, "sspx_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('sspx_je',{initialValue: data.SSPX_JE}) } onChange={this.handleSrInputChange.bind(this, "sspx_je")} /></td>
                        </tr>
                        <tr>
                            <td>(11)其他涉税服务业务小计</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('qtssfwywxj_hs0', { initialValue: initData.QTSSFWYWXJ_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled  {...getFieldProps('qtssfwywxj_je0', { initialValue: initData.QTSSFWYWXJ_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('qtssfwywxj_hs',{initialValue: data.QTSSFWYWXJ_HS}) } onChange={this.handleSrInputChange.bind(this, "qtssfwywxj_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('qtssfwywxj_je',{initialValue: data.QTSSFWYWXJ_JE}) } onChange={this.handleSrInputChange.bind(this, "qtssfwywxj_je")} /></td>
                        </tr>
                        <tr>
                            <td>2、涉税鉴证业务</td>
                            <td colSpan="2">
                                <FormItem>
                                    <InputNumber disabled  {...getFieldProps('ssjzyw_hs0', { initialValue: initData.SSJZYW_HS }) } />
                                </FormItem>
                            </td>
                            <td>
                                <FormItem>
                                    <InputNumber step={0.01} disabled  {...getFieldProps('ssjzyw_je0', { initialValue: initData.SSJZYW_JE }) } />
                                </FormItem>
                            </td>
                            <td colSpan="2">
                                <FormItem>
                                    <InputNumber max={maxHs} disabled  {...getFieldProps('ssjzyw_hs', {initialValue: data.SSJZYW_HS, rules: [{ validator: this.checkHs }] }) } />
                                </FormItem>
                            </td>
                            <td>
                                <FormItem>
                                    <InputNumber max={maxJe} step={0.01} disabled  {...getFieldProps('ssjzyw_je', {initialValue: data.SSJZYW_JE,rules: [{ validator: this.checkJe }] }) } />
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td>(1)企业所得税汇算清缴纳税申报鉴证业务</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('sdshsqj_hs0', { initialValue: initData.SDSHSQJ_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled  {...getFieldProps('sdshsqj_je0', { initialValue: initData.SDSHSQJ_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('sdshsqj_hs', { initialValue: data.SDSHSQJ_HS }) } onChange={this.handleSrInputChange.bind(this, "sdshsqj_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('sdshsqj_je', { initialValue: data.SDSHSQJ_JE }) } onChange={this.handleSrInputChange.bind(this, "sdshsqj_je")} /></td>
                        </tr>
                        <tr>
                            <td>(2)企业税前弥补亏损鉴证业务</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('mbks_hs0', { initialValue: initData.MBKS_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled  {...getFieldProps('mbks_je0', { initialValue: initData.MBKS_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('mbks_hs', { initialValue: data.MBKS_HS }) } onChange={this.handleSrInputChange.bind(this, "mbks_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('mbks_je', { initialValue: data.MBKS_JE }) } onChange={this.handleSrInputChange.bind(this, "mbks_je")} /></td>
                        </tr>
                        <tr>
                            <td>(3)企业资产损失税前税前扣除鉴证业务</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('ccsssqkc_hs0', { initialValue: initData.CCSSSQKC_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled  {...getFieldProps('ccsssqkc_je0', { initialValue: initData.CCSSSQKC_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('ccsssqkc_hs', { initialValue: data.CCSSSQKC_HS }) } onChange={this.handleSrInputChange.bind(this, "ccsssqkc_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('ccsssqkc_je', { initialValue: data.CCSSSQKC_JE }) } onChange={this.handleSrInputChange.bind(this, "ccsssqkc_je")} /></td>
                        </tr>
                        <tr>
                            <td>(4)土地增值税清算鉴证业务</td>
                            <td colSpan="2"><InputNumber disabled  {...getFieldProps('tt_hs0', { initialValue: initData.TT_HS }) } /></td>
                            <td><InputNumber step={0.01} disabled  {...getFieldProps('tt_je0', { initialValue: initData.TT_JE }) } /></td>
                            <td colSpan="2"><InputNumber max={maxHs} {...getFieldProps('tt_hs', { initialValue: data.TT_HS }) } onChange={this.handleSrInputChange.bind(this, "tt_hs")} /></td>
                            <td><InputNumber max={maxJe} step={0.01}   {...getFieldProps('tt_je', { initialValue: data.TT_JE }) } onChange={this.handleSrInputChange.bind(this, "tt_je")} /></td>
                        </tr>
                        <tr>
                            <td>(5)其他涉税鉴证业务小计</td>
                            <td colSpan="2">
                                <FormItem>
                                    <InputNumber disabled  {...getFieldProps('qtssjz_hs0', { initialValue: initData.QTSSJZ_HS }) } />
                                </FormItem>
                            </td>
                            <td>
                                <FormItem>
                                    <InputNumber step={0.01} disabled  {...getFieldProps('qtssjz_je0', { initialValue: initData.QTSSJZ_JE }) } />
                                </FormItem>
                            </td>
                            <td colSpan="2">
                                <FormItem>
                                    <InputNumber max={maxHs} {...getFieldProps('qtssjz_hs', {initialValue: data.QTSSJZ_HS, rules: [{ validator: this.checkQtssjz_hs }] }) } onChange={this.handleSrInputChange.bind(this, "qtssjz_hs")} />
                                </FormItem>
                            </td>
                            <td>
                                <FormItem>
                                    <InputNumber max={maxJe} step={0.01}   {...getFieldProps('qtssjz_je', {initialValue: data.QTSSJZ_JE, rules: [{ validator: this.checkQtssjz_je }] }) } onChange={this.handleSrInputChange.bind(this, "qtssjz_je")} />
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: '5em' }}>⑴</td>
                            <td colSpan="2">
                                <FormItem>
                                    <InputNumber disabled  {...getFieldProps('qtssywsr_hs10', { initialValue: initData.QTSSYWSR_HS1 }) } />
                                </FormItem>
                            </td>
                            <td>
                                <FormItem>
                                    <InputNumber step={0.01} disabled {...getFieldProps('qtssywsr_je10', { initialValue: initData.QTSSYWSR_JE1 }) } />
                                </FormItem>
                            </td>
                            <td colSpan="2">
                                <FormItem>
                                    <InputNumber max={maxHs} {...getFieldProps('qtssywsr_hs1', {initialValue: data.QTSSYWSR_HS1, rules: [{ validator: this.checkQtssywsr_hs1 }] }) } />
                                </FormItem>
                            </td>
                            <td>
                                <FormItem>
                                    <InputNumber max={maxJe} step={0.01}   {...getFieldProps('qtssywsr_je1', {initialValue: data.QTSSYWSR_JE1, rules: [{ validator: this.checkQtssywsr_je1 }] }) } />
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: '5em' }}>⑵</td>
                            <td colSpan="2">
                                <FormItem>
                                    <InputNumber disabled  {...getFieldProps('qtssywsr_hs20', { initialValue: initData.QTSSYWSR_HS2 }) } />
                                </FormItem>
                            </td>
                            <td>
                                <FormItem>
                                    <InputNumber step={0.01} disabled  {...getFieldProps('qtssywsr_je20', { initialValue: initData.QTSSYWSR_JE2 }) } />
                                </FormItem>
                            </td>
                            <td colSpan="2">
                                <FormItem>
                                    <InputNumber max={maxHs} {...getFieldProps('qtssywsr_hs2', {initialValue: data.QTSSYWSR_HS2, rules: [{ validator: this.checkQtssywsr_hs2 }] }) } />
                                </FormItem>
                            </td>
                            <td>
                                <FormItem>
                                    <InputNumber max={maxJe} step={0.01}   {...getFieldProps('qtssywsr_je2', {initialValue: data.QTSSYWSR_JE2, rules: [{ validator: this.checkQtssywsr_je2 }] }) } />
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: '5em' }}>⑶</td>
                            <td colSpan="2">
                                <FormItem>
                                    <InputNumber disabled  {...getFieldProps('qtssywsr_hs30', { initialValue: initData.QTSSYWSR_HS3 }) } />
                                </FormItem>
                            </td>
                            <td>
                                <FormItem>
                                    <InputNumber step={0.01} disabled  {...getFieldProps('qtssywsr_je30', { initialValue: initData.QTSSYWSR_JE3 }) } />
                                </FormItem>
                            </td>
                            <td colSpan="2">
                                <FormItem>
                                    <InputNumber max={maxHs} {...getFieldProps('qtssywsr_hs3', {initialValue: data.QTSSYWSR_HS3, rules: [{ validator: this.checkQtssywsr_hs3 }] }) } />
                                </FormItem>
                            </td>
                            <td>
                                <FormItem>
                                    <InputNumber max={maxJe} step={0.01}   {...getFieldProps('qtssywsr_je3', {initialValue: data.QTSSYWSR_JE3, rules: [{ validator: this.checkQtssywsr_je3 }] }) } />
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td><b>（二）其他收人合计</b></td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber step={0.01} disabled {...getFieldProps('qtywsrhj0', { initialValue: initData.QTYWSRHJ }) } /></Col></td>

                            <td colSpan="3"><Col span={12} offset={6}><InputNumber max={maxJe} step={0.01}  {...getFieldProps('qtywsrhj', { initialValue: data.QTYWSRHJ }) } /></Col></td>
                        </tr>
                        <tr>
                            <td><b>二、支出总额</b></td>
                            <td colSpan="3"><Col span={12} offset={6}>
                                <FormItem>
                                    <InputNumber step={0.01} disabled {...getFieldProps('zcze0', { initialValue: initData.ZCZE }) } />
                                </FormItem>
                            </Col></td>
                            <td colSpan="3"><Col span={12} offset={6}>
                                <FormItem>
                                    <InputNumber max={maxJe} step={0.01} disabled {...getFieldProps('zcze', { initialValue: data.ZCZE, rules: [{ validator: this.checkJe }] }) } />
                                </FormItem>
                            </Col></td>
                        </tr>
                        <tr>
                            <td>（一）主营业务成本</td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber step={0.01} disabled {...getFieldProps('zyywcb0', { initialValue: initData.ZYYWCB }) } /></Col></td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber max={maxJe} step={0.01}  {...getFieldProps('zyywcb', { initialValue: data.ZYYWCB }) } onChange={this.handleZcInputChange.bind(this, "zyywcb")} /></Col></td>
                        </tr>
                        <tr>
                            <td>（二）主营业务税金及附加</td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber step={0.01} disabled {...getFieldProps('zyywsjfj0', { initialValue: initData.ZYYWSJFJ }) } /></Col></td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber max={maxJe} step={0.01}  {...getFieldProps('zyywsjfj', { initialValue: data.ZYYWSJFJ }) } onChange={this.handleZcInputChange.bind(this, "zyywsjfj")} /></Col></td>
                        </tr>
                        <tr>
                            <td>（三）营业费用</td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber step={0.01} disabled {...getFieldProps('yyfy0', { initialValue: initData.YYFY }) } /></Col></td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber max={maxJe} step={0.01}  {...getFieldProps('yyfy', { initialValue: data.YYFY }) } onChange={this.handleZcInputChange.bind(this, "yyfy")} /></Col></td>
                        </tr>
                        <tr>
                            <td>（四）管理费用</td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber step={0.01} disabled {...getFieldProps('glfy0', { initialValue: initData.GLFY }) } /></Col></td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber max={maxJe} step={0.01}  {...getFieldProps('glfy', { initialValue: data.GLFY }) } onChange={this.handleZcInputChange.bind(this, "glfy")} /></Col></td>
                        </tr>
                        <tr>
                            <td>（五）财务费用</td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber step={0.01} disabled {...getFieldProps('cwfy0', { initialValue: initData.CWFY }) } /></Col></td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber max={maxJe} step={0.01}  {...getFieldProps('cwfy', { initialValue: data.CWFY }) } onChange={this.handleZcInputChange.bind(this, "cwfy")} /></Col></td>
                        </tr>
                        <tr>
                            <td>（六）营业外支出</td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber step={0.01} disabled {...getFieldProps('yywzc0', { initialValue: initData.YYWZC }) } /></Col></td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber max={maxJe} step={0.01}  {...getFieldProps('yywzc', { initialValue: data.YYWZC }) } onChange={this.handleZcInputChange.bind(this, "yywzc")} /></Col></td>
                        </tr>
                        <tr>
                            <td>（七）其他支出</td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber step={0.01} disabled {...getFieldProps('qtzc0', { initialValue: initData.QTZC }) } /></Col></td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber max={maxJe} max={99999.99} step={0.01}  {...getFieldProps('qtzc', { initialValue: data.QTZC }) } onChange={this.handleZcInputChange.bind(this, "qtzc")} /></Col></td>
                        </tr>
                        <tr>
                            <td><b>三、利润总额</b></td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber step={0.01} disabled {...getFieldProps('lrze0', { initialValue: initData.LRZE }) } /></Col></td>
                            <td colSpan="3"><Col span={12} offset={6}><InputNumber step={0.01} disabled {...getFieldProps('lrze', { initialValue: initData.bn_lrze }) } /></Col></td>
                        </tr>
                        <tr>
                            <td colSpan="7">
                                <p>填表说明：</p>
                                <p>1.各项收入数均截止到统计年度12月31日。</p>
                                <p>2.“其他涉税鉴证业务”是指除所得税汇算清缴、弥补亏损鉴证业务、企业资产损失税前扣除鉴证业务、土地增值税渚笪鉴证业务以外的涉税鉴证业务。</p>
                                <p>3.“其他收入”是指投资收益、补贴收入、营业外收入等非主营业务收入。</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Row style={{ marginTop: '24px' }}>
                    <Col span="5" offset="19">
                        <ButtonGroup>
                            <Popconfirm placement="top" title="确定保存？" onConfirm={this.save}>
                                <Button type="primary" disabled={data.ZTBJ=='0'?false:true}> <Icon type="save" />保存</Button>
                            </Popconfirm>
                            <Popconfirm placement="top" title="确定提交？" onConfirm={this.commit}>
                                <Button type="primary" disabled={data.ZTBJ=='0'?false:true}> <Icon type="to-top" />提交</Button>
                            </Popconfirm>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Form>
        </div>
    }
});
Editfrom = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = { value: props.data[prop] }
        }
        return result;
    }
})(Editfrom);


const c = React.createClass({
    getDefaultProps() {
        return {
            title: '编辑经营收入情况表',
            url: config.HOST + config.URI_API_PROJECT + '/client/jysrqkb',
            initUrl: config.HOST + config.URI_API_PROJECT + '/client/jysrqkb/getUpyear',
            detailUrl: config.HOST + config.URI_API_PROJECT + '/client/jysrqkb'
        }
    },
    getInitialState() {
        return {
            loading: true,
            data: {},
            initData: {},
            scr: 'normal'
        }
    },
    back() {
        this.props.onBack();
    },

    //保存
    handleSave(values) {
        const {url, id} = this.props;
        values.ztbj = 0;
        values.dwmc = this.state.data.dwmc;
        this.setState({ loading: true, data: values });
        req({
            method: 'put',
            url: url + `/${id}`,
            data: values
        }).then(resp => {
            this.setState({ loading: false, scr: 'success', successType: 'save' })
        }).catch(e => {
            this.setState({ loading: false });
            if (e.status == 403) {
                let res = JSON.parse(e.response);
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: res.text
                });
            } else {
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: '报表数据保存失败，请稍后再尝试'
                });
            }
        });
    },
    //提交
    handleCommit(values) {
        const {url, id} = this.props;
        values.ztbj = 1;
        values.dwmc = this.state.data.dwmc;
        this.setState({ loading: true, data: values });
        req({
            method: 'put',
            url: url + `/${id}`,
            data: values
        }).then(resp => {
            this.setState({ loading: false, scr: 'success', successType: 'commit' })
        }).catch(e => {
            this.setState({ loading: false });
            if (e.status == 403) {
                let res = JSON.parse(e.response);
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: res.text
                });
            } else {
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: '报表数据保存失败，请稍后再尝试'
                });
            }
        });
    },

    //异步获取前年数据和经营收入情况表明细
    async fetchData() {
        const {detailUrl, initUrl, id} = this.props;
        let fetch1 = req({
            method: 'get',
            url: initUrl
        });
        let fetch2 = req({
            method: 'get',
            url: detailUrl + `/${id}`
        });
        let [init, mx] = await Promise.all([fetch1, fetch2]);
        return { init: init, mx: mx }
    },

    componentDidMount() {
        this.fetchData().then(resp => {
            let initData = resp.init.upyear;
            let data = resp.mx; 
            this.setState({ data: data, loading: false, initData: initData })
        }).catch(e => {
            if (e.status == 403) {
                let res = JSON.parse(e.response);
                this.setState({ scr: 'fail', loading: false, failtext: res.text })
            } else {
                this.setState({ scr: 'fail', loading: false })
            }

        })
    },

    render() {
        const {title} = this.props;
        let {data, loading, scr, failtext, successType, initData} = this.state;
        const panelBar = <PanelBar>
            <Button onClick={this.back}>
                <Icon type="rollback" />返回
            </Button>
        </PanelBar>;

        let content = {
            normal: <Editfrom data={data} onCommit={this.handleCommit} onSave={this.handleSave} initData={initData} />,
            fail: <FailScr text={failtext} />,
            success: <Success type={successType} />
        };

        return <Panel className="jysrqkb-edit" toolbar={panelBar} title={title}>
            <Spin spinning={loading}>
                {content[scr]}
            </Spin>
        </Panel>

    }
});


module.exports = c;