import React from 'react'
import auth from 'common/auth'
import config from 'common/configuration'
import req from 'reqwest'
import { isEmptyObject, jsonCopy } from 'common/utils'
import Panel from 'component/compPanel'
import { Col, Input, Row, Button, Icon, Form, Modal, notification, Spin, Alert } from 'antd'
import { SelectorYear, SelectorXZ } from 'component/compSelector'
import './style.css'

const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const URL = config.HOST + config.URI_API_PROJECT + "/checkLrb";

let Addlrb = React.createClass({
    getInitialState() {
        return { visible: false, checkNd: true, checkTimevalue: true, loading: false, helper: true };
    },

    getDefaultProps() {
        return {
            onSubmit: {}
        }
    },

    handleSubmit(ztbj) {
        var mp = {};
        let value = this.props.form.getFieldsValue()
        for (var key in value) {
            if (typeof (value[key]) == 'undefined' || (isNaN(value[key]) ? ("" == value[key]) : false)) {
                value[key] = null;
            }
        }
        value.ztbj = ztbj;
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {
                this.props.onSubmit(value);
            }
        });
    },

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },

    showModal(e) {
        e.preventDefault();
        var that = this;
        Modal.confirm({
            title: '是否确定提交？',
            content: '提交后就不能修改了！！！',
            onOk() {
                that.handleSubmit(1);
            },
        });
    },

    handleInputChange(e) {
        let changeField = e.target.id;
        let value = e.target.value;
        let entity = this.props.form.getFieldsValue();
        let zgywsr1 = 0;//本月数第1行
        let zgywcb1 = 0;
        let zgywsj1 = 0;
        let zgwylr1 = 0;//第4行
        let qtywlr1 = 0;
        let yyfy1 = 0;
        let glfy1 = 0;
        let cwfy1 = 0;
        let yylr1 = 0;//第9行
        let tzsy1 = 0;
        let btsr1 = 0;
        let yywsr1 = 0;
        let yywzc1 = 0;
        let lrze1 = 0;//第14行
        let sds1 = 0;
        let jlr1 = 0;//第16行

        let zgywsr = 0;//本年累计数第1行
        let zgywcb = 0;
        let zgywsj = 0;
        let zgwylr = 0;//第4行
        let qtywlr = 0;
        let yyfy = 0;
        let glfy = 0;
        let cwfy = 0;
        let yylr = 0;//第9行
        let tzsy = 0;
        let btsr = 0;
        let yywsr = 0;
        let yywzc = 0;
        let lrze = 0;//第14行
        let sds = 0;
        let jlr = 0;//第16行

        //本月数
        if (entity.zgywsr1) {
            zgywsr1 = entity.zgywsr1;
        }
        if (entity.zgywcb1) {
            zgywcb1 = entity.zgywcb1;
        }
        if (entity.zgywsj1) {
            zgywsj1 = entity.zgywsj1;
        }
        //第5行
        if (entity.qtywlr1) {
            qtywlr1 = entity.qtywlr1;
        }
        if (entity.yyfy1) {
            yyfy1 = entity.yyfy1;
        }
        if (entity.glfy1) {
            glfy1 = entity.glfy1;
        }
        if (entity.cwfy1) {
            cwfy1 = entity.cwfy1;
        }
        //第10行
        if (entity.tzsy1) {
            tzsy1 = entity.tzsy1;
        }
        if (entity.btsr1) {
            btsr1 = entity.btsr1;
        }
        if (entity.yywsr1) {
            yywsr1 = entity.yywsr1;
        }
        if (entity.yywzc1) {
            yywzc1 = entity.yywzc1;
        }
        //第15行
        if (entity.sds1) {
            sds1 = entity.sds1;
        }

        //本年累计数
        if (entity.zgywsr) {
            zgywsr = entity.zgywsr;
        }
        if (entity.zgywcb) {
            zgywcb = entity.zgywcb;
        }
        if (entity.zgywsj) {
            zgywsj = entity.zgywsj;
        }
        //第5行
        if (entity.qtywlr) {
            qtywlr = entity.qtywlr;
        }
        if (entity.yyfy) {
            yyfy = entity.yyfy;
        }
        if (entity.glfy) {
            glfy = entity.glfy;
        }
        if (entity.cwfy) {
            cwfy = entity.cwfy;
        }
        //第10行
        if (entity.tzsy) {
            tzsy = entity.tzsy;
        }
        if (entity.btsr) {
            btsr = entity.btsr;
        }
        if (entity.yywsr) {
            yywsr = entity.yywsr;
        }
        if (entity.yywzc) {
            yywzc = entity.yywzc;
        }
        //第15行
        if (entity.sds) {
            sds = entity.sds;
        }

        if (changeField == "zgywsr1") {//本月数
            zgywsr1 = value;
            this.props.form.setFieldsValue({ zgywsr1: value });
        } else if (changeField == "zgywcb1") {
            zgywcb1 = value;
            this.props.form.setFieldsValue({ zgywcb1: value });
        } else if (changeField == "zgywsj1") {
            zgywsj1 = value;
            this.props.form.setFieldsValue({ zgywsj1: value });
        } else if (changeField == "qtywlr1") {//第5行
            qtywlr1 = value;
            this.props.form.setFieldsValue({ qtywlr1: value });
        } else if (changeField == "yyfy1") {
            yyfy1 = value;
            this.props.form.setFieldsValue({ yyfy1: value });
        } else if (changeField == "glfy1") {
            glfy1 = value;
            this.props.form.setFieldsValue({ glfy1: value });
        } else if (changeField == "cwfy1") {
            cwfy1 = value;
            this.props.form.setFieldsValue({ cwfy1: value });
        } else if (changeField == "tzsy1") {//第10行
            tzsy1 = value;
            this.props.form.setFieldsValue({ tzsy1: value });
        } else if (changeField == "btsr1") {
            btsr1 = value;
            this.props.form.setFieldsValue({ btsr1: value });
        } else if (changeField == "yywsr1") {
            yywsr1 = value;
            this.props.form.setFieldsValue({ yywsr1: value });
        } else if (changeField == "yywzc1") {
            yywzc1 = value;
            this.props.form.setFieldsValue({ yywzc1: value });
        } else if (changeField == "sds1") {//第15行
            sds1 = value;
            this.props.form.setFieldsValue({ sds1: value });
        } else if (changeField == "zgywsr") {//本年数
            zgywsr = value;
            this.props.form.setFieldsValue({ zgywsr: value });
        } else if (changeField == "zgywcb") {
            zgywcb = value;
            this.props.form.setFieldsValue({ zgywcb: value });
        } else if (changeField == "zgywsj") {
            zgywsj = value;
            this.props.form.setFieldsValue({ zgywsj: value });
        } else if (changeField == "qtywlr") {//第5行
            qtywlr = value;
            this.props.form.setFieldsValue({ qtywlr: value });
        } else if (changeField == "yyfy") {
            yyfy = value;
            this.props.form.setFieldsValue({ yyfy: value });
        } else if (changeField == "glfy") {
            glfy = value;
            this.props.form.setFieldsValue({ glfy: value });
        } else if (changeField == "cwfy") {
            cwfy = value;
            this.props.form.setFieldsValue({ cwfy: value });
        } else if (changeField == "tzsy") {//第10行
            tzsy = value;
            this.props.form.setFieldsValue({ tzsy: value });
        } else if (changeField == "btsr") {
            btsr = value;
            this.props.form.setFieldsValue({ btsr: value });
        } else if (changeField == "yywsr") {
            yywsr = value;
            this.props.form.setFieldsValue({ yywsr: value });
        } else if (changeField == "yywzc") {
            yywzc = value;
            this.props.form.setFieldsValue({ yywzc: value });
        } else if (changeField == "sds") {//第15行
            sds = value;
            this.props.form.setFieldsValue({ sds: value });
        };

        //本月数
        if (!zgwylr1) zgwylr1 = "0";
        if (!qtywlr1) qtywlr1 = "0";
        if (!yylr1) yylr1 = "0";
        if (!tzsy1) tzsy1 = "0";
        if (!btsr1) btsr1 = "0";
        if (!yywsr1) yywsr1 = "0";
        zgwylr1 = zgywsr1 - zgywcb1 - zgywsj1;
        yylr1 = parseFloat(zgwylr1) + parseFloat(qtywlr1) - yyfy1 - glfy1 - cwfy1;
        lrze1 = parseFloat(yylr1) + parseFloat(tzsy1) + parseFloat(btsr1) + parseFloat(yywsr1) - yywzc1;
        jlr1 = lrze1 - sds1;
        this.props.form.setFieldsValue({ zgwylr1: zgwylr1 });//第4行
        this.props.form.setFieldsValue({ yylr1: yylr1 });//第9行
        this.props.form.setFieldsValue({ lrze1: lrze1 });//第14行
        this.props.form.setFieldsValue({ jlr1: jlr1 });//第16行

        //本年累计数
        if (!zgwylr) zgwylr = "0";
        if (!qtywlr) qtywlr = "0";
        if (!yylr) yylr = "0";
        if (!tzsy) tzsy = "0";
        if (!btsr) btsr = "0";
        if (!yywsr) yywsr = "0";
        zgwylr = zgywsr - zgywcb - zgywsj;
        yylr = parseFloat(zgwylr) + parseFloat(qtywlr) - yyfy - glfy - cwfy;
        lrze = parseFloat(yylr) + parseFloat(tzsy) + parseFloat(btsr) + parseFloat(yywsr) - yywzc;
        jlr = lrze - sds;
        this.props.form.setFieldsValue({ zgwylr: zgwylr });//第4行
        this.props.form.setFieldsValue({ yylr: yylr });//第9行
        this.props.form.setFieldsValue({ lrze: lrze });//第14行
        this.props.form.setFieldsValue({ jlr: jlr });//第16行
    },

    checkNd(rule, value, callback) {
        const timevalue = this.props.form.getFieldValue('timevalue');
        const where = { nd: value, timevalue: timevalue };
        const params = { where: encodeURIComponent(JSON.stringify(where)) };
        const token = auth.getToken();
        this.setState({ loading: true });
        req({
            url: URL,
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': token }
        }).then(resp => {
            this.setState({ loading: false });
            if (resp.result) {
                this.setState({ checkNd: true });
                if (!this.state.checkTimevalue) {
                    this.props.form.validateFields(['timevalue'], { force: true });
                }
                callback();
            } else {
                this.setState({ checkNd: false });
                callback("该年度的利润表记录已存在");
            }
        }).fail(e => {
            this.setState({ loading: false });
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '可能网络访问原因，请稍后尝试'
            });
            callback("校验失败");
        })

    },

    checkTimevalue(rule, value, callback) {
        let message = "";
        if (value == "0") {
            message = "该年度的上半年的利润表记录已存在";
        } else if (value == "1") {
            message = "该年度的全年的利润表记录已存在";
        }
        const nd = this.props.form.getFieldValue('nd');
        const where = { nd: nd, timevalue: value };
        const params = { where: encodeURIComponent(JSON.stringify(where)) };
        const token = auth.getToken();
        this.setState({ loading: true });
        req({
            url: URL,
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': token }
        }).then(resp => {
            this.setState({ loading: false });
            if (resp.result) {
                this.setState({ checkTimevalue: true });
                if (!this.state.checkNd) {
                    this.props.form.validateFields(['nd'], { force: true });
                }
                callback();
            } else {
                this.setState({ checkTimevalue: false });
                callback(message);
            }
        }).fail(e => {
            this.setState({ loading: false });
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '可能网络访问原因，请稍后尝试'
            });
            callback("校验失败");
        })
    },

    //帮助按钮
    handleHelper() {
        this.setState({ helper: !this.state.helper })
    },

    render() {

        //定义提示内容
        let helper = [];
        helper.push(<p key="helper-0">《利润表》反映税务师事务所在一定期内利润（亏损）的情况。</p>);
        helper.push(<p key="helper-1">各栏关系：</p>);
        helper.push(<p key="helper-2">【1行-2行-3行=4行】【4行+5行-6行-7行-8行=9行】【9行+10行+11行+12行-13行=14行】【14行-15行=16行】</p>);

        //定义工具栏内容
        let toolbar = <ToolBar>
            <ButtonGroup>
                <Button onClick={this.props.toback}>返回<Icon className="toggle-tip" type="arrow-left" /></Button>
                <Button type="primary" onClick={this.handleHelper}><Icon type="question" /></Button>
            </ButtonGroup>
        </ToolBar>;

        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        const year = new Date().getFullYear() + "";
        let obj = [{}];
        if (this.props.data.length != 0) {
            obj = this.props.data;
        };

        return <div className="add">
            {this.state.helper && <Alert message="利润表检索查询帮助"
                description={helper}
                type="info"
                closable
                onClose={this.handleHelperClose} />}
            <Panel title="添加利润表" toolbar={toolbar}>
                <div className="fix-table table-bordered table-striped" >
                    <Spin spinning={this.state.loading} tip="数据校验中。。。" >
                        <Form horizontal onSubmit={this.handleSubmit}>
                            <table>
                                <colgroup>
                                    <col className="col-2"></col>
                                    <col className="col-9"></col>
                                    <col className="col-2"></col>
                                    <col className="col-3"></col>
                                    <col className="col-4"></col>
                                    <col className="col-2"></col>
                                    <col className="col-2"></col>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td>单位：</td>
                                        <td colSpan="2">{obj[0].DWMC}</td>
                                        <td>年度：</td>
                                        <td>
                                            <FormItem required>
                                                <SelectorYear { ...getFieldProps('nd', { initialValue: year, rules: [{ required: true, message: "请选择年度" }, { validator: this.checkNd }] }) } />
                                            </FormItem>
                                        </td>
                                        <td>
                                            <FormItem required>
                                                <SelectorXZ { ...getFieldProps('timevalue', { initialValue: "0", rules: [{ required: true, message: "请选择性质" }, { validator: this.checkTimevalue }] }) } />
                                            </FormItem>
                                        </td>
                                        <td>单位：元</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">项目</td>
                                        <td>行次</td>
                                        <td >本月数</td>
                                        <td colSpan="2">本年累计数</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">一、主营业务收入</td>
                                        <td>1</td>
                                        <td>
                                            <FormItem required>
                                                <Input {...getFieldProps('zgywsr1', { rules: [{ required: true, message: "请填写" }] }) }
                                                    id="zgywsr1"
                                                    type="number"
                                                    onChange={this.handleInputChange} />
                                            </FormItem>
                                        </td>
                                        <td colSpan="2">
                                            <FormItem required>
                                                <Input {...getFieldProps('zgywsr', { rules: [{ required: true, message: "请填写" }] }) }
                                                    id="zgywsr"
                                                    type="number"
                                                    onChange={this.handleInputChange} />
                                            </FormItem>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">减：主营业务成本</td>
                                        <td>2</td>
                                        <td>
                                            <Input {...getFieldProps('zgywcb1') }
                                                id="zgywcb1"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input type="number"  {...getFieldProps('zgywcb') }
                                                id="zgywcb"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">主营业务税金及附加</td>
                                        <td>3</td>
                                        <td>
                                            <Input {...getFieldProps('zgywsj1') }
                                                id="zgywsj1"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input {...getFieldProps('zgywsj') }
                                                id="zgywsj"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">二、主营业务利润（亏损以“—”号填列）</td>
                                        <td>4</td>
                                        <td > <Input type="number" disabled {...getFieldProps('zgwylr1') } /></td>
                                        <td colSpan="2"> <Input type="number" disabled {...getFieldProps('zgwylr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">加：其它业务利润（亏损以“—”号填列）</td>
                                        <td>5</td>
                                        <td >
                                            <Input {...getFieldProps('qtywlr1') }
                                                id="qtywlr1"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input {...getFieldProps('qtywlr') }
                                                id="qtywlr"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">减：营业费用</td>
                                        <td>6</td>
                                        <td >
                                            <Input {...getFieldProps('yyfy1') }
                                                id="yyfy1"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input {...getFieldProps('yyfy') }
                                                id="yyfy"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">管理费用</td>
                                        <td>7</td>
                                        <td >
                                            <Input {...getFieldProps('glfy1') }
                                                id="glfy1"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input {...getFieldProps('glfy') }
                                                id="glfy"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">财务费用</td>
                                        <td>8</td>
                                        <td >
                                            <Input {...getFieldProps('cwfy1') }
                                                id="cwfy1"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input {...getFieldProps('cwfy') }
                                                id="cwfy"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">三、营业利润（亏损以“—”号填列）</td>
                                        <td>9</td>
                                        <td > <Input type="number" disabled  {...getFieldProps('yylr1') } /></td>
                                        <td colSpan="2"> <Input type="number" disabled {...getFieldProps('yylr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">加：投资收益（损失以“—”号填列）</td>
                                        <td>10</td>
                                        <td >
                                            <Input {...getFieldProps('tzsy1') }
                                                id="tzsy1"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input {...getFieldProps('tzsy') }
                                                id="tzsy"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">补贴收入</td>
                                        <td>11</td>
                                        <td>
                                            <Input {...getFieldProps('btsr1') }
                                                id="btsr1"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input {...getFieldProps('btsr') }
                                                id="btsr"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">营业外收入</td>
                                        <td>12</td>
                                        <td>
                                            <Input {...getFieldProps('yywsr1') }
                                                id="yywsr1"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input {...getFieldProps('yywsr') }
                                                id="yywsr"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">减：营业外支出</td>
                                        <td>13</td>
                                        <td>
                                            <Input {...getFieldProps('yywzc1') }
                                                id="yywzc1"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input {...getFieldProps('yywzc') }
                                                id="yywzc"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">四、利润总额（亏损总额以“—”号填列）</td>
                                        <td>14</td>
                                        <td > <Input type="number" disabled {...getFieldProps('lrze1') } /></td>
                                        <td colSpan="2"> <Input type="number" disabled  {...getFieldProps('lrze') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">减：所得税</td>
                                        <td>15</td>
                                        <td>
                                            <Input {...getFieldProps('sds1') }
                                                id="sds1"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input {...getFieldProps('sds') }
                                                id="sds"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">五、净利润（亏损以“—”号填列）</td>
                                        <td>16</td>
                                        <td > <Input type="number" disabled {...getFieldProps('jlr1') } /></td>
                                        <td colSpan="2"> <Input type="number" disabled  {...getFieldProps('jlr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">补充资料</td>
                                        <td></td>
                                        <td colSpan="3"> </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">项目</td>
                                        <td></td>
                                        <td > 本年累计数</td>
                                        <td colSpan="2"> 上年累计数</td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">1、出售、处置部门或被投资单位所得收益</td>
                                        <td></td>
                                        <td > <Input type="number"  {...getFieldProps('csczsy1') } /></td>
                                        <td colSpan="2"> <Input type="number"  {...getFieldProps('csczsy') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">2、自然灾害发生的损失</td>
                                        <td></td>
                                        <td > <Input type="number"  {...getFieldProps('zhss1') } /></td>
                                        <td colSpan="2"> <Input type="number"  {...getFieldProps('zhss') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">3、会计政策变更增加（或减少）利润总额</td>
                                        <td></td>
                                        <td > <Input type="number"  {...getFieldProps('zcbglr1') } /></td>
                                        <td colSpan="2"> <Input type="number"   {...getFieldProps('zcbglr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">4、会计估计变更增加（或减少）利润总额</td>
                                        <td></td>
                                        <td > <Input type="number"  {...getFieldProps('gjbglr1') } /></td>
                                        <td colSpan="2"> <Input type="number"  {...getFieldProps('gjbglr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">5、债务重组损失</td>
                                        <td></td>
                                        <td > <Input type="number"  {...getFieldProps('zwczss1') } /></td>
                                        <td colSpan="2"> <Input type="number"  {...getFieldProps('zwczss') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">6、其它</td>
                                        <td></td>
                                        <td > <Input type="number"  {...getFieldProps('qt1') } /></td>
                                        <td colSpan="2"> <Input type="number"  {...getFieldProps('qt') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">主营业务收入项目</td>
                                        <td></td>
                                        <td > 本月数</td>
                                        <td colSpan="2"> 本年累计数</td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">代理税务登记收入</td>
                                        <td>户数</td>
                                        <td > <Input type="number"  {...getFieldProps('dlswdjhs') } /></td>
                                        <td > <Input type="number" {...getFieldProps('dlswdjsr1') } /></td>
                                        <td colSpan="2"> <Input type="number"  {...getFieldProps('dlswdjsr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">代理纳税申报收入</td>
                                        <td>户数</td>
                                        <td > <Input type="number"  {...getFieldProps('dlnssbhs') } /></td>
                                        <td > <Input type="number"  {...getFieldProps('dlnssbsr1') } /></td>
                                        <td colSpan="2"> <Input type="number"  {...getFieldProps('dlnssbsr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">代理纳税审查收入</td>
                                        <td>户数</td>
                                        <td > <Input type="number"  {...getFieldProps('dlnsschs') } /></td>
                                        <td > <Input type="number"  {...getFieldProps('dlnsscsr1') } /></td>
                                        <td colSpan="2"> <Input type="number"  {...getFieldProps('dlnsscsr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">代理建帐建制收入</td>
                                        <td>户数</td>
                                        <td > <Input type="number"  {...getFieldProps('dljzjzhs') } /></td>
                                        <td > <Input type="number"  {...getFieldProps('dljzjzsr1') } /></td>
                                        <td colSpan="2"> <Input type="number"  {...getFieldProps('dljzjzsr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">受聘顾问咨询收入</td>
                                        <td>户数</td>
                                        <td > <Input type="number"  {...getFieldProps('spgwzxhs') } /></td>
                                        <td > <Input type="number"  {...getFieldProps('spgwzxsr1') } /></td>
                                        <td colSpan="2"> <Input type="number"  {...getFieldProps('spgwzxsr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">代理申请税务复议收入</td>
                                        <td>户数</td>
                                        <td > <Input type="number"  {...getFieldProps('dlsqswfyhs') } /></td>
                                        <td > <Input type="number"  {...getFieldProps('dlsqswfysr1') } /></td>
                                        <td colSpan="2"> <Input type="number"  {...getFieldProps('dlsqswfysr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">培训收入</td>
                                        <td>户数</td>
                                        <td > <Input type="number"  {...getFieldProps('pxhs') } /></td>
                                        <td > <Input type="number"  {...getFieldProps('pxsr1') } /></td>
                                        <td colSpan="2"> <Input type="number"  {...getFieldProps('pxsr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">其它主营业务收入</td>
                                        <td>户数</td>
                                        <td > <Input type="number"  {...getFieldProps('qtzyywsrhs') } /></td>
                                        <td > <Input type="number"  {...getFieldProps('qtzyywsr1') } /></td>
                                        <td colSpan="2"> <Input type="number"  {...getFieldProps('qtzyywsr') } /></td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center', verticalAlign: "middle" }} colSpan="2">
                                            <FormItem {...formItemLayout} label="所长" required>
                                                <Input  {...getFieldProps('sz', { rules: [{ required: true, message: "请填写所长" }] }) } />
                                            </FormItem>
                                        </td>
                                        <td colSpan="2">
                                            <FormItem {...formItemLayout} label="主管会计" required>
                                                <Input   {...getFieldProps('zgkj', { rules: [{ required: true, message: "请填写主管会计" }] }) } />
                                            </FormItem>
                                        </td>
                                        <td style={{ textAlign: 'center' }} colSpan="3">
                                            <FormItem {...formItemLayout} label="制表人" required>
                                                <Input  {...getFieldProps('zbr', { rules: [{ required: true, message: "请填写制表人" }] }) } />
                                            </FormItem>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr >
                                        <td></td>
                                        <td>
                                            <Button type="primary" onClick={this.handleSubmit.bind(this, 0)} loading={this.props.btnloading}> <Icon type="check" />保存</Button>
                                        </td>
                                        <td>
                                            <Button type="primary" onClick={this.showModal} loading={this.props.btnloading}> <Icon type="arrow-up" />提交</Button>
                                        </td>
                                        <td>
                                            <Button type="primary" onClick={this.handleReset} loading={this.props.btnloading}><Icon type="cross" />重置</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Form>
                    </Spin>
                </div>
            </Panel>
        </div >
    }
});

Addlrb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = { value: props.data[prop] }
        }
        return result;
    }
})(Addlrb);








module.exports = Addlrb