import React from 'react'
import auth from 'common/auth'
import config from 'common/configuration'
import req from 'reqwest'
import { isEmptyObject, jsonCopy } from 'common/utils'
import Panel from 'component/compPanel'
import { Col, Input, Row, Button, Icon, Form, Modal, notification, Spin, Alert,InputNumber,message } from 'antd'
import { SelectorYear, SelectorXZ } from 'component/compSelector'
import './style.css'

const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const URL = config.HOST + config.URI_API_PROJECT + "/checkLrb";
const GET_URL = config.HOST + config.URI_API_PROJECT + "/cwbb/getJgxx";

let Addlrb = React.createClass({
    getInitialState() {
        return { visible: false, checkNd: true, checkTimevalue: true, loading: false, helper: true ,jgxx: {}};
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
    //获取表中单位信息
    fetch_jgxx(params) {
        const token = auth.getToken();
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
            message.error('网络访问故障');
        })
    },
    componentDidMount(){
        this.fetch_jgxx();
        const {getFieldsValue} = this.props.form;
        const {getFormEntity} = this.props;
        let values = getFieldsValue();
        let entity={};
        for(let prop in values){
            entity[prop]={};
            entity[prop].value = values[prop]
        }
        getFormEntity(entity);
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
                                        <td colSpan="2">{this.state.jgxx.DWMC}</td>
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
                                                <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('zgywsr1', 
                                                { rules: [{ required: true, type:'number', message: "请填写" }] }) } />
                                            </FormItem>
                                        </td>
                                        <td colSpan="2">
                                            <FormItem required>
                                                <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('zgywsr', 
                                                { rules: [{ required: true, type:'number', message: "请填写" }] }) } />
                                            </FormItem>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">减：主营业务成本</td>
                                        <td>2</td>
                                        <td>
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('zgywcb1') }/>
                                        </td>
                                        <td colSpan="2">
                                            <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('zgywcb') } />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">主营业务税金及附加</td>
                                        <td>3</td>
                                        <td>
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('zgywsj1') } />
                                        </td>
                                        <td colSpan="2">
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('zgywsj') } />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">二、主营业务利润（亏损以“—”号填列）</td>
                                        <td>4</td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}  disabled {...getFieldProps('zgwylr1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}  disabled {...getFieldProps('zgwylr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">加：其它业务利润（亏损以“—”号填列）</td>
                                        <td>5</td>
                                        <td >
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('qtywlr1') }/>
                                        </td>
                                        <td colSpan="2">
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('qtywlr') }/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">减：营业费用</td>
                                        <td>6</td>
                                        <td >
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('yyfy1') }/>
                                        </td>
                                        <td colSpan="2">
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('yyfy') }/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">管理费用</td>
                                        <td>7</td>
                                        <td >
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('glfy1') }/>
                                        </td>
                                        <td colSpan="2">
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('glfy') }/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">财务费用</td>
                                        <td>8</td>
                                        <td >
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('cwfy1') }/>
                                        </td>
                                        <td colSpan="2">
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('cwfy') }/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">三、营业利润（亏损以“—”号填列）</td>
                                        <td>9</td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}  disabled  {...getFieldProps('yylr1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}} disabled {...getFieldProps('yylr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">加：投资收益（损失以“—”号填列）</td>
                                        <td>10</td>
                                        <td >
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('tzsy1') }/>
                                        </td>
                                        <td colSpan="2">
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('tzsy') }/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">补贴收入</td>
                                        <td>11</td>
                                        <td>
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('btsr1') }/>
                                        </td>
                                        <td colSpan="2">
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('btsr') }/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">营业外收入</td>
                                        <td>12</td>
                                        <td>
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('yywsr1') }/>
                                        </td>
                                        <td colSpan="2">
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('yywsr') } />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">减：营业外支出</td>
                                        <td>13</td>
                                        <td>
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('yywzc1') }/>
                                        </td>
                                        <td colSpan="2">
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('yywzc') }/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">四、利润总额（亏损总额以“—”号填列）</td>
                                        <td>14</td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}  disabled {...getFieldProps('lrze1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}  disabled  {...getFieldProps('lrze') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">减：所得税</td>
                                        <td>15</td>
                                        <td>
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('sds1') } />
                                        </td>
                                        <td colSpan="2">
                                            <InputNumber max={9999999999999} style={{width:'12em'}} {...getFieldProps('sds') }/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">五、净利润（亏损以“—”号填列）</td>
                                        <td>16</td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}  disabled {...getFieldProps('jlr1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}  disabled  {...getFieldProps('jlr') } /></td>
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
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('csczsy1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('csczsy') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">2、自然灾害发生的损失</td>
                                        <td></td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('zhss1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('zhss') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">3、会计政策变更增加（或减少）利润总额</td>
                                        <td></td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('zcbglr1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}    {...getFieldProps('zcbglr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">4、会计估计变更增加（或减少）利润总额</td>
                                        <td></td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('gjbglr1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('gjbglr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">5、债务重组损失</td>
                                        <td></td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('zwczss1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('zwczss') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="3">6、其它</td>
                                        <td></td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('qt1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('qt') } /></td>
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
                                        <td > <InputNumber max={99999}  {...getFieldProps('dlswdjhs') } /></td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}  {...getFieldProps('dlswdjsr1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('dlswdjsr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">代理纳税申报收入</td>
                                        <td>户数</td>
                                        <td > <InputNumber max={99999}  {...getFieldProps('dlnssbhs') } /></td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('dlnssbsr1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('dlnssbsr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">代理纳税审查收入</td>
                                        <td>户数</td>
                                        <td > <InputNumber max={99999} {...getFieldProps('dlnsschs') } /></td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('dlnsscsr1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('dlnsscsr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">代理建帐建制收入</td>
                                        <td>户数</td>
                                        <td > <InputNumber max={999999} {...getFieldProps('dljzjzhs') } /></td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('dljzjzsr1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('dljzjzsr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">受聘顾问咨询收入</td>
                                        <td>户数</td>
                                        <td > <InputNumber max={99999} {...getFieldProps('spgwzxhs') } /></td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('spgwzxsr1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('spgwzxsr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">代理申请税务复议收入</td>
                                        <td>户数</td>
                                        <td > <InputNumber max={99999} {...getFieldProps('dlsqswfyhs') } /></td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('dlsqswfysr1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('dlsqswfysr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">培训收入</td>
                                        <td>户数</td>
                                        <td > <InputNumber max={99999} {...getFieldProps('pxhs') } /></td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('pxsr1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('pxsr') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center' }} colSpan="2">其它主营业务收入</td>
                                        <td>户数</td>
                                        <td > <InputNumber max={99999} {...getFieldProps('qtzyywsrhs') } /></td>
                                        <td > <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('qtzyywsr1') } /></td>
                                        <td colSpan="2"> <InputNumber max={9999999999999} style={{width:'12em'}}   {...getFieldProps('qtzyywsr') } /></td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center', verticalAlign: "middle" }} colSpan="2">
                                            <FormItem {...formItemLayout} label="所长" required>
                                                <Input {...getFieldProps('sz', { rules: [{ required: true, message: "请填写所长" }] }) } />
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
        return props.data
    },
    onFieldsChange(props,field){
        props.changed(field,'add')
    }
})(Addlrb);

module.exports = Addlrb