import React from 'react'
import auth from 'common/auth'
import config from 'common/configuration'
import req from 'reqwest'
import Panel from 'component/compPanel'
import { Col, Input, Row, Button, Icon, Form, Modal, Select, Spin, Alert,notification,InputNumber} from 'antd'
import { SelectorYear, SelectorXZ } from 'component/compSelector'
import './style.css'

const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const token = auth.getToken();
const CHECK_URL = config.HOST + config.URI_API_PROJECT + "/checkLrfpb";

let Updatelrfpb = React.createClass({
    getInitialState() {
        return { visible: false, loading: false, helper: true };
    },
    getDefaultProps() {
        return {
            onSubmit: {}
        }
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
        value.id = obj.id.value;
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
        const lrfpbid = this.props.data.id.value;
        const where = { nd: value, lrfpbid: lrfpbid };
        const params = { where: encodeURIComponent(JSON.stringify(where)) };
        this.setState({ loading: true });
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
        const data = this.props.data;
        return <div className="add">
            {this.state.helper && <Alert message="利润表检索查询帮助"
                description={helper}
                type="info"
                closable
                onClose={this.handleHelperClose} />}
            <Panel title="利润分配表修改" toolbar={toolbar}>
                <div className="fix-table table-bordered table-striped" >
                    <Spin spinning={this.props.loading} tip="数据加载中。。。">
                        <Spin spinning={this.state.loading} tip="数据校验中。。。">
                            <Form horizontal onSubmit={this.handleSubmit}>
                                <table>
                                    <colgroup>
                                        <col className="col-2"/>
                                        <col className="col-5"/>
                                        <col className="col-2"/>
                                        <col className="col-4"/>
                                        <col className="col-3"/>
                                        <col className="col-3"/>
                                        <col className="col-3"/>
                                        <col className="col-2"/>
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td colSpan="2">单位：{getFieldProps('dwmc').value}</td>
                                            <td>
                                                <FormItem required>
                                                    <SelectorYear { ...getFieldProps('nd', {rules: [{ required: true, message: "请选择年度" }, { validator: this.checkNd }] }) } />
                                                </FormItem>
                                            </td>
                                            <td>
                                                <FormItem {...formItemLayout} label="负责人" required>
                                                    <Input  {...getFieldProps('dwfzr', {rules: [{ required: true, message: "请填写负责人" }] }) } />
                                                </FormItem>
                                            </td>
                                            <td>
                                                <FormItem {...formItemLayout} label="财会" required>
                                                    <Input  {...getFieldProps('ckfzr', {rules: [{ required: true, message: "请填写财会" }] }) } />
                                                </FormItem>
                                            </td>
                                            <td>
                                                <FormItem {...formItemLayout} label="复核" required>
                                                    <Input  {...getFieldProps('fhr', {rules: [{ required: true, message: "请填写复核" }] }) } />
                                                </FormItem>
                                            </td>
                                            <td>
                                                <FormItem {...formItemLayout} label="制表" required>
                                                    <Input  {...getFieldProps('zbr', {rules: [{ required: true, message: "请填写制表" }] }) } />
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
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('jlr') }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('jlrupyear') }/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>加：年初未分配利润</td>
                                            <td>2</td>
                                            <td colSpan="2" >
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('ncwfplr') }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('ncwfplrupyear') }/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>其他转入</td>
                                            <td>3</td>
                                            <td colSpan="2" >
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('qtzr') }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('qtzrupyear') }/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>二、可供分配的利润</td>
                                            <td>4</td>
                                            <td colSpan="2" ><InputNumber max={99999999999999} style={{width: '10em'}}  {...getFieldProps('kfplr') }  disabled /> </td>
                                            <td colSpan="2"><InputNumber max={99999999999999} style={{width: '10em'}}  {...getFieldProps('kfplrupyear') }  disabled /> </td>
                                        </tr>

                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>减：提取盈余公积</td>
                                            <td>5</td>
                                            <td colSpan="2" >
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('yygj') } />
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('yygjupyear') }/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>提取职工奖励福利基金</td>
                                            <td>6</td>
                                            <td colSpan="2" >
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('jlfljj') }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('jlfljjupyear') } />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>提取储备基金</td>
                                            <td>7</td>
                                            <td colSpan="2" >
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('cbjj') }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('cbjjupyear') } />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>提取企业发展基金</td>
                                            <td>8</td>
                                            <td colSpan="2" >
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('qyfzjj') }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('qyfzjjupyear') } />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>利润归还投资</td>
                                            <td>9</td>
                                            <td colSpan="2" >
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('lrghtz') }/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('lrghtzupyear')}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>三、可供投资者分配的利润</td>
                                            <td>10</td>
                                            <td colSpan="2" ><InputNumber max={99999999999999} style={{width: '10em'}}  {...getFieldProps('tzzfplr')}  disabled /> </td>
                                            <td colSpan="2"><InputNumber max={99999999999999} style={{width: '10em'}}  {...getFieldProps('tzzfplrupyear')} disabled /> </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>减：应付优先股股利</td>
                                            <td>11</td>
                                            <td colSpan="2" >
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('yxgl')}/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('yxglupyear')}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>应付普通股股利</td>
                                            <td>12</td>
                                            <td colSpan="2" >
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('ptgl')}/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('ptglupyear')}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>转作资本（或股本）的普通股股利</td>
                                            <td>13</td>
                                            <td colSpan="2" >
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('zhptgl')}/>
                                            </td>
                                            <td colSpan="2">
                                                <InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('zhptglupyear')} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>四、未分配利润</td>
                                            <td>14</td>
                                            <td colSpan="2" ><InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('wfplr')}  disabled /> </td>
                                            <td colSpan="2"><InputNumber max={9999999999999} style={{width: '10em'}}  {...getFieldProps('wfplrupyear')}  disabled /> </td>
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

Updatelrfpb = Form.create({
    mapPropsToFields(props) {
        return props.data
    },
    onFieldsChange(props,field){
        props.changed(field,'update')
    }
})(Updatelrfpb);

module.exports = Updatelrfpb