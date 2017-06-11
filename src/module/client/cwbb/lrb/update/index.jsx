import React from 'react'
import auth from 'common/auth'
import config from 'common/configuration'
import req from 'reqwest'
import Panel from 'component/compPanel'
import { Col, Input, Row, Button, Icon, Form, Modal, Select, notification, Spin, Alert, InputNumber } from 'antd'
import { SelectorYear, SelectorXZ } from 'component/compSelector'
import './style.css'

const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const URL = config.HOST + config.URI_API_PROJECT + "/checkLrb";

let Updatelrb = React.createClass({
    getDefaultProps() {
        return {
            onSubmit: {}
        }
    },

    getInitialState() {
        return { visible: false, checkNd: true, checkTimevalue: true, loading: false, helper: true };
    },

    handleSubmit(ztbj) {
        const obj = this.props.data;
        let value = this.props.form.getFieldsValue()
        for (var key in value) {
            if (typeof (value[key]) == 'undefined' || (isNaN(value[key]) ? ("" == value[key]) : false)) {
                value[key] = null;
            }
        }
        value.ztbj = ztbj;
        value.id = obj.ID;
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {
                console.log(value)
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
            content: '提交后将无法修改。',
            onOk() {
                that.handleSubmit(1);
            },
        });
    },

    handleInputChange(e) {
        /*let changeField = e.target.id;
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
   */ },

    checkNd(rule, value, callback) {
        const lrbid = this.props.data.ID;
        const timevalue = this.props.form.getFieldValue('timevalue');
        const where = { nd: value, timevalue: timevalue, lrbid: lrbid };
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
        const lrbid = this.props.data.ID;
        let message = "";
        if (value == "0") {
            message = "该年度的上半年的利润表记录已存在";
        } else if (value == "1") {
            message = "该年度的全年的利润表记录已存在";
        }
        const nd = this.props.form.getFieldValue('nd');
        const where = { nd: nd, timevalue: value, lrbid: lrbid };
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
        const data = this.props.data;
        return <div className="add">
            {this.state.helper && <Alert message="利润表检索查询帮助"
                description={helper}
                type="info"
                closable
                onClose={this.handleHelperClose} />}
            <Panel title="利润表修改" toolbar={toolbar}>
                <div className="fix-table table-bordered table-striped" >
                    <Spin spinning={this.props.loading} tip="数据加载中。。。">
                        <Spin spinning={this.state.loading} tip="数据校验中。。。">
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
                                            <td>{data.DWMC}</td>
                                            <td></td>
                                            <td>时间</td>
                                            <td>
                                                <FormItem required>
                                                    <SelectorYear { ...getFieldProps('nd', { initialValue: data.ND + "", rules: [{ required: true, message: "请选择年度" }, { validator: this.checkNd }] }) } />
                                                </FormItem>
                                            </td>
                                            <td>
                                                <FormItem required>
                                                    <SelectorXZ { ...getFieldProps('timevalue', { initialValue: data.TIMEVALUE, rules: [{ required: true, message: "请选择性质" }, { validator: this.checkTimevalue }] }) } />
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
                                            <td >
                                                <FormItem required>
                                                    <InputNumber max={9999999999.99}  {...getFieldProps('zgywsr1', {rules: [{ required: true, type: 'number',message: "必填" }] }) }/>
                                                </FormItem>
                                            </td>
                                            <td colSpan="2">
                                                <FormItem required>
                                                    <InputNumber max={9999999999.99} {...getFieldProps('zgywsr', {rules: [{ required: true, type: 'number',message: "必填" }] }) }/>
                                                </FormItem>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">减：主营业务成本</td>
                                            <td>2</td>
                                            <td>
                                                <InputNumber max={9999999999.99} {...getFieldProps('zgywcb1', { initialValue: data.ZGYWCB1 }) }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999.99} {...getFieldProps('zgywcb', { initialValue: data.ZGYWCB }) }/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">主营业务税金及附加</td>
                                            <td>3</td>
                                            <td>
                                                <InputNumber max={9999999999.99} {...getFieldProps('zgywsj1', { initialValue: data.ZGYWSJ1 }) }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999.99} {...getFieldProps('zgywsj', { initialValue: data.ZGYWSJ }) }/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">二、主营业务利润（亏损以“—”号填列）</td>
                                            <td>4</td>
                                            <td > <InputNumber max={9999999999.99} {...getFieldProps('zgwylr1', { initialValue: data.ZGWYLR1 }) } disabled /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('zgwylr', { initialValue: data.ZGWYLR }) } disabled /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">加：其它业务利润（亏损以“—”号填列）</td>
                                            <td>5</td>
                                            <td >
                                                <InputNumber max={9999999999.99} {...getFieldProps('qtywlr1', { initialValue: data.QTYWLR1 }) }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999.99} {...getFieldProps('qtywlr', { initialValue: data.QTYWLR }) }/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">减：营业费用</td>
                                            <td>6</td>
                                            <td >
                                                <InputNumber max={9999999999.99} {...getFieldProps('yyfy1', { initialValue: data.YYFY1 }) }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999.99} {...getFieldProps('yyfy', { initialValue: data.YYFY }) } />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">管理费用</td>
                                            <td>7</td>
                                            <td >
                                                <InputNumber max={9999999999.99} {...getFieldProps('glfy1', { initialValue: data.GLFY1 }) }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999.99} {...getFieldProps('glfy', { initialValue: data.GLFY }) }/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">财务费用</td>
                                            <td>8</td>
                                            <td >
                                                <InputNumber max={9999999999.99} {...getFieldProps('cwfy1', { initialValue: data.CWFY1 }) }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999.99} {...getFieldProps('cwfy', { initialValue: data.CWFY }) }/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">三、营业利润（亏损以“—”号填列）</td>
                                            <td>9</td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('yylr1', { initialValue: data.YYLR1 }) } disabled /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('yylr', { initialValue: data.YYLR }) } disabled /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">加：投资收益（损失以“—”号填列）</td>
                                            <td>10</td>
                                            <td >
                                                <InputNumber max={9999999999.99} {...getFieldProps('tzsy1', { initialValue: data.TZSY1 }) }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999.99} {...getFieldProps('tzsy', { initialValue: data.TZSY }) }/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">补贴收入</td>
                                            <td>11</td>
                                            <td>
                                                <InputNumber max={9999999999.99} {...getFieldProps('btsr1', { initialValue: data.BTSR1 }) }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999.99} {...getFieldProps('btsr', { initialValue: data.BTSR }) }/>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">营业外收入</td>
                                            <td>12</td>
                                            <td>
                                                <InputNumber max={9999999999.99} {...getFieldProps('yywsr1', { initialValue: data.YYWSR1 }) }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999.99} {...getFieldProps('yywsr', { initialValue: data.YYWSR }) }/>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">减：营业外支出</td>
                                            <td>13</td>
                                            <td>
                                                <InputNumber max={9999999999.99} {...getFieldProps('yywzc1', { initialValue: data.YYWZC1 }) }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999.99} {...getFieldProps('yywzc', { initialValue: data.YYWZC }) }/>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">四、利润总额（亏损总额以“—”号填列）</td>
                                            <td>14</td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('lrze1', { initialValue: data.LRZE1 }) } disabled /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('lrze', { initialValue: data.LRZE }) }  disabled /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">减：所得税</td>
                                            <td>15</td>
                                            <td>
                                                <InputNumber max={9999999999.99} {...getFieldProps('sds1', { initialValue: data.SDS1 }) }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999.99} {...getFieldProps('sds', { initialValue: data.SDS }) }/>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">五、净利润（亏损以“—”号填列）</td>
                                            <td>16</td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('jlr1', { initialValue: data.JLR1 }) }  disabled /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('jlr', { initialValue: data.JLR }) }  disabled /></td>
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
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('csczsy1', { initialValue: data.CSCZSY1 }) } /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('csczsy', { initialValue: data.CSCZSY }) }  /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">2、自然灾害发生的损失</td>
                                            <td></td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('zhss1', { initialValue: data.ZHSS1 }) }  /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('zhss', { initialValue: data.ZHSS }) }  /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">3、会计政策变更增加（或减少）利润总额</td>
                                            <td></td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('zcbglr1', { initialValue: data.ZCBGLR1 }) }  /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('zcbglr', { initialValue: data.ZCBGLR }) }  /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">4、会计估计变更增加（或减少）利润总额</td>
                                            <td></td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('gjbglr1', { initialValue: data.GJBGLR1 }) }  /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('gjbglr', { initialValue: data.GJBJLR }) }  /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">5、债务重组损失</td>
                                            <td></td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('zwczss1', { initialValue: data.ZWCZSS1 }) }   /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('zwczss', { initialValue: data.ZWCZSS }) }  /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="3">6、其它</td>
                                            <td></td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('qt1', { initialValue: data.QT1 }) }  /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('qt', { initialValue: data.QT }) }   /></td>
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
                                            <td > <InputNumber max={99999999}   {...getFieldProps('dlswdjhs', { initialValue: data.DLSWDJHS }) } /></td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('dlswdjsr1', { initialValue: data.DLSWDJSR1 }) } /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('dlswdjsr', { initialValue: data.DLSWDJSR }) } /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="2">代理纳税申报收入</td>
                                            <td>户数</td>
                                            <td > <InputNumber max={99999999}   {...getFieldProps('dlnssbhs', { initialValue: data.DLNSSBHS }) } /></td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('dlnssbsr1', { initialValue: data.DLNSSBSR1 }) } /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('dlnssbsr', { initialValue: data.DLNSSBSR }) } /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="2">代理纳税审查收入</td>
                                            <td>户数</td>
                                            <td > <InputNumber max={99999999}   {...getFieldProps('dlnsschs', { initialValue: data.DLNSSCHS }) } /></td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('dlnsscsr1', { initialValue: data.DLNSSCSR1 }) } /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('dlnsscsr', { initialValue: data.DLNSSCSR }) } /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="2">代理建帐建制收入</td>
                                            <td>户数</td>
                                            <td > <InputNumber max={99999999}   {...getFieldProps('dljzjzhs', { initialValue: data.DLJZJZHS }) } /></td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('dljzjzsr1', { initialValue: data.DLJZJZSR1 }) } /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('dljzjzsr', { initialValue: data.DLJZJZSR }) } /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="2">受聘顾问咨询收入</td>
                                            <td>户数</td>
                                            <td > <InputNumber max={99999999}   {...getFieldProps('spgwzxhs', { initialValue: data.SPGWZXHS }) } /></td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('spgwzxsr1', { initialValue: data.SPGWZXSR1 }) } /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('spgwzxsr', { initialValue: data.SPGWZXSR }) } /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="2">代理申请税务复议收入</td>
                                            <td>户数</td>
                                            <td > <InputNumber max={99999999}   {...getFieldProps('dlsqswfyhs', { initialValue: data.DLSQSWFYHS }) } /></td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('dlsqswfysr1', { initialValue: data.DLSQSWFYSR1 }) } /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('dlsqswfysr', { initialValue: data.DLSQSWFYSR }) } /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="2">培训收入</td>
                                            <td>户数</td>
                                            <td > <InputNumber max={99999999}   {...getFieldProps('pxhs', { initialValue: data.PXHS }) } /></td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('pxsr1', { initialValue: data.PXSR1 }) } /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('pxsr', { initialValue: data.PXSR }) } /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} colSpan="2">其它主营业务收入</td>
                                            <td>户数</td>
                                            <td > <InputNumber max={99999999}   {...getFieldProps('qtzyywsrhs', { initialValue: data.QTZYYWSRHS }) } /></td>
                                            <td > <InputNumber max={9999999999.99}   {...getFieldProps('qtzyywsr1', { initialValue: data.QTZYYWSR1 }) } /></td>
                                            <td colSpan="2"> <InputNumber max={9999999999.99}   {...getFieldProps('qtzyywsr', { initialValue: data.QTZYYWSR }) } /></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <FormItem {...formItemLayout} label="所长" required>
                                                    <Input  {...getFieldProps('sz', { initialValue: data.SZ, rules: [{ required: true, message: "请填写所长" }] }) } />
                                                </FormItem>
                                            </td>
                                            <td colSpan="2">
                                                <FormItem {...formItemLayout} label="主管会计" required>
                                                    <Input   {...getFieldProps('zgkj', { initialValue: data.ZGKJ, rules: [{ required: true, message: "请填写主管会计" }] }) } />
                                                </FormItem>
                                            </td>
                                            <td style={{ textAlign: 'center' }} colSpan="3">
                                                <FormItem {...formItemLayout} label="制表人" required>
                                                    <Input  {...getFieldProps('zbr', { initialValue: data.ZBR, rules: [{ required: true, message: "请填写制表人" }] }) } />
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
                    </Spin>
                </div>
            </Panel>
        </div>
    }
});


Updatelrb = Form.create({
    mapPropsToFields(props) {
        return props.data
    },
    onFieldsChange(props,field){
        props.changed(field)
    }
})(Updatelrb);

module.exports = Updatelrb