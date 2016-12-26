import React from 'react'
import auth from 'common/auth'
import config from 'common/configuration'
import req from 'reqwest'
import Panel from 'component/compPanel'
import { Col, Input, Row, Button, Icon, Form, Modal, notification, Spin, Alert } from 'antd'
import { SelectorYear, SelectorXZ } from 'component/compSelector'
import './style.css'

const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const token = auth.getToken();
const GET_URL = config.HOST + config.URI_API_PROJECT + "/lrfpb/getJgxx";
const CHECK_URL = config.HOST + config.URI_API_PROJECT + "/checkLrfpb";

let Addlrfpb = React.createClass({
    getInitialState() {
        return { visible: false, jgxx: {}, loading: false, tip: "数据加载中。。。", helper: true };
    },
    getDefaultProps() {
        return {
            onSubmit: {}
        }
    },
    //获取利润分配表中单位信息
    fetch_jgxx(params) {
        this.setState({ loading: true });
        req({
            url: GET_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': token }
        }).then(resp => {
            this.setState({ jgxx: resp.data, loading: false });
        }).fail(e => {
            this.setState({ loading: false });
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '可能网络访问原因，请稍后尝试'
            });
        })
    },

    componentDidMount() {
        this.fetch_jgxx();
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

    checkNd(rule, value, callback) {
        const where = { nd: value };
        const params = { where: encodeURIComponent(JSON.stringify(where)) };
        this.setState({ loading: true, tip: "数据校验中。。。" });
        req({
            url: CHECK_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': token }
        }).then(resp => {
            this.setState({ loading: false });
            if (resp.result) {
                callback();
            } else {
                callback("该年度的利润分配表记录已存在");
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

    handleInputChange(e) {
        let changeField = e.target.id;
        let fieldValue = e.target.value;
        let value = e.target.value;
        if (!value) {
            value = 0;
        }
        let entity = this.props.form.getFieldsValue();
        let jlr = 0;//本月数第1行
        let ncwfplr = 0;
        let qtzr = 0;
        let kfplr = 0;//第4行
        let yygj = 0;
        let jlfljj = 0;
        let cbjj = 0;
        let qyfzjj = 0;
        let lrghtz = 0;//第9行
        let tzzfplr = 0;
        let yxgl = 0;
        let ptgl = 0;
        let zhptgl = 0;
        let wfplr = 0;//第14行 

        let jlrupyear = 0;//本年累计数第1行
        let ncwfplrupyear = 0;
        let qtzrupyear = 0;
        let kfplrupyear = 0;//第4行
        let yygjupyear = 0;
        let jlfljjupyear = 0;
        let cbjjupyear = 0;
        let qyfzjjupyear = 0;
        let lrghtzupyear = 0;//第9行
        let tzzfplrupyear = 0;
        let yxglupyear = 0;
        let ptglupyear = 0;
        let zhptglupyear = 0;
        let wfplrupyear = 0;//第14行 

        //本年
        if (entity.jlr) {
            jlr = entity.jlr;
        }
        if (entity.ncwfplr) {
            ncwfplr = entity.ncwfplr;
        }
        if (entity.qtzr) {
            qtzr = entity.qtzr;
        }
        //第5行
        if (entity.yygj) {
            yygj = entity.yygj;
        }
        if (entity.jlfljj) {
            jlfljj = entity.jlfljj;
        }
        if (entity.cbjj) {
            cbjj = entity.cbjj;
        }
        if (entity.qyfzjj) {
            qyfzjj = entity.qyfzjj;
        }
        if (entity.lrghtz) {
            lrghtz = entity.lrghtz;
        }
        //第11行
        if (entity.yxgl) {
            yxgl = entity.yxgl;
        }
        if (entity.ptgl) {
            ptgl = entity.ptgl;
        }
        if (entity.zhptgl) {
            zhptgl = entity.zhptgl;
        }


        //上年
        if (entity.jlrupyear) {
            jlrupyear = entity.jlrupyear;
        }
        if (entity.ncwfplrupyear) {
            ncwfplrupyear = entity.ncwfplrupyear;
        }
        if (entity.qtzrupyear) {
            qtzrupyear = entity.qtzrupyear;
        }
        //第5行
        if (entity.yygjupyear) {
            yygjupyear = entity.yygjupyear;
        }
        if (entity.jlfljjupyear) {
            jlfljjupyear = entity.jlfljjupyear;
        }
        if (entity.cbjjupyear) {
            cbjjupyear = entity.cbjjupyear;
        }
        if (entity.qyfzjjupyear) {
            qyfzjjupyear = entity.qyfzjjupyear;
        }
        if (entity.lrghtzupyear) {
            lrghtzupyear = entity.lrghtzupyear;
        }
        //第11行
        if (entity.yxglupyear) {
            yxglupyear = entity.yxglupyear;
        }
        if (entity.ptglupyear) {
            ptglupyear = entity.ptglupyear;
        }
        if (entity.zhptglupyear) {
            zhptglupyear = entity.zhptglupyear;
        }

        if (changeField == "jlr") {//本年
            jlr = value;
            this.props.form.setFieldsValue({ jlr: fieldValue });
        } else if (changeField == "ncwfplr") {
            ncwfplr = value;
            this.props.form.setFieldsValue({ ncwfplr: fieldValue });
        } else if (changeField == "qtzr") {
            qtzr = value;
            this.props.form.setFieldsValue({ qtzr: fieldValue });
        } else if (changeField == "yygj") {//第5行
            yygj = value;
            this.props.form.setFieldsValue({ yygj: fieldValue });
        } else if (changeField == "jlfljj") {
            jlfljj = value;
            this.props.form.setFieldsValue({ jlfljj: fieldValue });
        } else if (changeField == "cbjj") {
            cbjj = value;
            this.props.form.setFieldsValue({ cbjj: fieldValue });
        } else if (changeField == "qyfzjj") {
            qyfzjj = value;
            this.props.form.setFieldsValue({ qyfzjj: fieldValue });
        } else if (changeField == "lrghtz") {
            lrghtz = value;
            this.props.form.setFieldsValue({ lrghtz: fieldValue });
        } else if (changeField == "yxgl") {//第11行
            yxgl = value;
            this.props.form.setFieldsValue({ yxgl: fieldValue });
        } else if (changeField == "ptgl") {
            ptgl = value;
            this.props.form.setFieldsValue({ ptgl: fieldValue });
        } else if (changeField == "zhptgl") {
            zhptgl = value;
            this.props.form.setFieldsValue({ zhptgl: fieldValue });
        } else if (changeField == "jlrupyear") {//上年
            jlrupyear = value;
            this.props.form.setFieldsValue({ jlrupyear: fieldValue });
        } else if (changeField == "ncwfplrupyear") {
            ncwfplrupyear = value;
            this.props.form.setFieldsValue({ ncwfplrupyear: fieldValue });
        } else if (changeField == "qtzrupyear") {
            qtzrupyear = value;
            this.props.form.setFieldsValue({ qtzrupyear: fieldValue });
        } else if (changeField == "yygjupyear") {//第5行
            yygjupyear = value;
            this.props.form.setFieldsValue({ yygjupyear: fieldValue });
        } else if (changeField == "jlfljjupyear") {
            jlfljjupyear = value;
            this.props.form.setFieldsValue({ jlfljjupyear: fieldValue });
        } else if (changeField == "cbjjupyear") {
            cbjjupyear = value;
            this.props.form.setFieldsValue({ cbjjupyear: fieldValue });
        } else if (changeField == "qyfzjjupyear") {
            qyfzjjupyear = value;
            this.props.form.setFieldsValue({ qyfzjjupyear: fieldValue });
        } else if (changeField == "lrghtzupyear") {
            lrghtzupyear = value;
            this.props.form.setFieldsValue({ lrghtzupyear: fieldValue });
        } else if (changeField == "yxglupyear") {//第11行
            yxglupyear = value;
            this.props.form.setFieldsValue({ yxglupyear: fieldValue });
        } else if (changeField == "ptglupyear") {
            ptglupyear = value;
            this.props.form.setFieldsValue({ ptglupyear: fieldValue });
        } else if (changeField == "zhptglupyear") {
            zhptglupyear = value;
            this.props.form.setFieldsValue({ zhptglupyear: fieldValue });
        }

        //本年
        kfplr = parseFloat(jlr) + parseFloat(ncwfplr) + parseFloat(qtzr);
        tzzfplr = parseFloat(kfplr) - parseFloat(yygj) - parseFloat(jlfljj) - parseFloat(cbjj) - parseFloat(qyfzjj) - parseFloat(lrghtz);
        wfplr = parseFloat(tzzfplr) - parseFloat(yxgl) - parseFloat(ptgl) - parseFloat(zhptgl);
        this.props.form.setFieldsValue({ kfplr: kfplr });
        this.props.form.setFieldsValue({ tzzfplr: tzzfplr });
        this.props.form.setFieldsValue({ wfplr: wfplr });
        //上年
        kfplrupyear = parseFloat(jlrupyear) + parseFloat(ncwfplrupyear) + parseFloat(qtzrupyear);
        tzzfplrupyear = parseFloat(kfplrupyear) - parseFloat(yygjupyear) - parseFloat(jlfljjupyear) - parseFloat(cbjjupyear) - parseFloat(qyfzjjupyear) - parseFloat(lrghtzupyear);
        wfplrupyear = parseFloat(tzzfplrupyear) - parseFloat(yxglupyear) - parseFloat(ptglupyear) - parseFloat(zhptglupyear);
        this.props.form.setFieldsValue({ kfplrupyear: kfplrupyear });
        this.props.form.setFieldsValue({ tzzfplrupyear: tzzfplrupyear });
        this.props.form.setFieldsValue({ wfplrupyear: wfplrupyear });
    },

    //帮助按钮
    handleHelper() {
        this.setState({ helper: !this.state.helper })
    },

    render() {
        //定义提示内容
        let helper = [];
        helper.push(<p key="helper-0">1、《利润分配表》反映企业利润分配的情况和年末未分配利润的结余情况。</p>);
        helper.push(<p key="helper-1">2、《利润分配表》上报时可选择上报数据的时间。上报的数据“时间”框件中，“年度”不可提交相同年度的单据。</p>);
        helper.push(<p key="helper-2">各栏关系：</p>);
        helper.push(<p key="helper-3">【1行+2行+3行=4行】【4行-5行-6行-7行-8行-9行=10行】【10行-11行-12行-13行=14行】</p>);

        //定义工具栏内容
        let toolbar = <ToolBar>
            <ButtonGroup>
                <Button onClick={this.props.toback}>返回<Icon className="toggle-tip" type="arrow-left" /></Button>
                <Button type="primary" onClick={this.handleHelper}><Icon type="question" /></Button>
            </ButtonGroup>
        </ToolBar>;

        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 14 },
        };
        let jgxx = this.state.jgxx;
        const year = new Date().getFullYear() + "";
        return <div className="add">
            {this.state.helper && <Alert message="利润表检索查询帮助"
                description={helper}
                type="info"
                closable
                onClose={this.handleHelperClose} />}
            <Panel title="添加利润分配表" toolbar={toolbar}>
                <div className="fix-table table-bordered table-striped" >
                    <Spin spinning={this.state.loading} tip={this.state.tip}>
                        <Form horizontal onSubmit={this.handleSubmit}>
                            <table>
                                <colgroup>
                                    <col className="col-2"></col>
                                    <col className="col-5"></col>
                                    <col className="col-2"></col>
                                    <col className="col-4"></col>
                                    <col className="col-3"></col>
                                    <col className="col-3"></col>
                                    <col className="col-3"></col>
                                    <col className="col-2"></col>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td colSpan="2">单位：{jgxx.DWMC}</td>
                                        <td>
                                            <FormItem required>
                                                <SelectorYear { ...getFieldProps('nd', { initialValue: year, rules: [{ required: true, message: "请选择年度" }, { validator: this.checkNd }] }) } />
                                            </FormItem>
                                        </td>
                                        <td>
                                            <FormItem {...formItemLayout} label="负责人" required>
                                                <Input  {...getFieldProps('dwfzr', { rules: [{ required: true, message: "请填写负责人" }] }) } />
                                            </FormItem>
                                        </td>
                                        <td>
                                            <FormItem {...formItemLayout} label="财会" required>
                                                <Input  {...getFieldProps('ckfzr', { rules: [{ required: true, message: "请填写财会" }] }) } />
                                            </FormItem>
                                        </td>
                                        <td>
                                            <FormItem {...formItemLayout} label="复核" required>
                                                <Input  {...getFieldProps('fhr', { rules: [{ required: true, message: "请填写复核" }] }) } />
                                            </FormItem>
                                        </td>
                                        <td>
                                            <FormItem {...formItemLayout} label="制表" required>
                                                <Input  {...getFieldProps('zbr', { rules: [{ required: true, message: "请填写制表" }] }) } />
                                            </FormItem>
                                        </td>
                                        <td>单位：元</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }} >项目</td>
                                        <td>行次</td>
                                        <td colSpan="2">本年实际</td>
                                        <td colSpan="2">上年实际</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>一、净利润</td>
                                        <td>1</td>
                                        <td colSpan="2" >
                                            <Input  {...getFieldProps('jlr') }
                                                id="jlr"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input  {...getFieldProps('jlrupyear') }
                                                id="jlrupyear"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>加：年初未分配利润</td>
                                        <td>2</td>
                                        <td colSpan="2" >
                                            <Input  {...getFieldProps('ncwfplr') }
                                                id="ncwfplr"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input  {...getFieldProps('ncwfplrupyear') }
                                                id="ncwfplrupyear"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>其他转入</td>
                                        <td>3</td>
                                        <td colSpan="2" >
                                            <Input  {...getFieldProps('qtzr') }
                                                id="qtzr"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input  {...getFieldProps('qtzrupyear') }
                                                id="qtzrupyear"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>二、可供分配的利润</td>
                                        <td>4</td>
                                        <td colSpan="2" ><Input  {...getFieldProps('kfplr') } type="number" disabled /> </td>
                                        <td colSpan="2"><Input  {...getFieldProps('kfplrupyear') } type="number" disabled /> </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>减：提取盈余公积</td>
                                        <td>5</td>
                                        <td colSpan="2" >
                                            <Input  {...getFieldProps('yygj') }
                                                id="yygj"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input  {...getFieldProps('yygjupyear') }
                                                id="yygjupyear"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>提取职工奖励福利基金</td>
                                        <td>6</td>
                                        <td colSpan="2" >
                                            <Input  {...getFieldProps('jlfljj') }
                                                id="jlfljj"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input  {...getFieldProps('jlfljjupyear') }
                                                id="jlfljjupyear"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>提取储备基金</td>
                                        <td>7</td>
                                        <td colSpan="2" >
                                            <Input  {...getFieldProps('cbjj') }
                                                id="cbjj"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input  {...getFieldProps('cbjjupyear') }
                                                id="cbjjupyear"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>提取企业发展基金</td>
                                        <td>8</td>
                                        <td colSpan="2" >
                                            <Input  {...getFieldProps('qyfzjj') }
                                                id="qyfzjj"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input  {...getFieldProps('qyfzjjupyear') }
                                                id="qyfzjjupyear"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>利润归还投资</td>
                                        <td>9</td>
                                        <td colSpan="2" >
                                            <Input  {...getFieldProps('lrghtz') }
                                                id="lrghtz"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input  {...getFieldProps('lrghtzupyear') }
                                                id="lrghtzupyear"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>三、可供投资者分配的利润</td>
                                        <td>10</td>
                                        <td colSpan="2" ><Input  {...getFieldProps('tzzfplr') } type="number" disabled /> </td>
                                        <td colSpan="2"><Input  {...getFieldProps('tzzfplrupyear') } type="number" disabled /> </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>减：应付优先股股利</td>
                                        <td>11</td>
                                        <td colSpan="2" >
                                            <Input  {...getFieldProps('yxgl') }
                                                id="yxgl"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input  {...getFieldProps('yxglupyear') }
                                                id="yxglupyear"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>应付普通股股利</td>
                                        <td>12</td>
                                        <td colSpan="2" >
                                            <Input  {...getFieldProps('ptgl') }
                                                id="ptgl"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input  {...getFieldProps('ptglupyear') }
                                                id="ptglupyear"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>转作资本（或股本）的普通股股利</td>
                                        <td>13</td>
                                        <td colSpan="2" >
                                            <Input  {...getFieldProps('zhptgl') }
                                                id="zhptgl"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                        <td colSpan="2">
                                            <Input  {...getFieldProps('zhptglupyear') }
                                                id="zhptglupyear"
                                                type="number"
                                                onChange={this.handleInputChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>四、未分配利润</td>
                                        <td>14</td>
                                        <td colSpan="2" ><Input  {...getFieldProps('wfplr') } type="number" disabled /> </td>
                                        <td colSpan="2"><Input  {...getFieldProps('wfplrupyear') } type="number" disabled /> </td>
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
        </div>
    }
});
Addlrfpb = Form.create()(Addlrfpb);
module.exports = Addlrfpb