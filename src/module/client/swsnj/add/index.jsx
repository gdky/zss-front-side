import React from 'react'
import req from 'reqwest'
import config from 'common/configuration'
import auth from 'common/auth'
import { Col, Input, Row, Button, Icon, Form, Modal, Checkbox, DatePicker, InputNumber } from 'antd'
import { SelectorYear, SelectorXZ, SelectorXm } from 'component/compSelector'
import './style.css'


const API_URL3 = config.HOST + config.URI_API_PROJECT + '/add/swsnj2';
const CheckNd_URL = config.HOST + config.URI_API_PROJECT + '/add/swsnj3';
const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;

let Addswsnj = React.createClass({
    getDefaultProps() {
        return {
            onSubmit: {}
        }
    },




    handleSubmit(ztdm) {

        var mp = {};
        let value = this.props.form.getFieldsValue()
        let arr = [];
        var date = new Date(value['qzrq']);
        value['qzrq'] = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        console.log(value);
        for (var key in value) {
            if (key.indexOf('wg') != -1) {
                if (value[key]) {
                    let length = key.length - 2;
                    let str = key.substr(2, length);
                    arr.push(str);

                }
            }

        }
        let wg = arr.join(',');
        if (wg == '') {
            value['wg'] = null;
        } else {
            value['wg'] = wg;
        }
        value.ztdm = ztdm;
        //验证表单，若通过就保存
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
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
    //Modal
    getInitialState() {
        return { visible: false, nd1: new Date().getFullYear() };
    },






    showModal(e) {
        e.preventDefault();
        var that = this;
        Modal.confirm({
            title: '是否确定提交？',
            content: '提交后就不能修改了！！！',
            onOk() {
                that.handleSubmit(2);
            },
        });
    },

   
    handleCancel(e) {

        this.setState({
            visible: false
        });
    },
    //年检年度是否重复校验方法
    checkNdIfExit(rule, value, callback) {
        const rs = true;
        const params = { where: encodeURIComponent(JSON.stringify({ nd: value })), }
        req({
            url: CheckNd_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': auth.getToken() },
            contentType: 'application/json',
        }).then(resp => {
            if (value == resp.data) {
                callback('同一年度不能做两次年检，请选择其他年度');
            } else {
                callback();
            }
        }).fail(err => {
            this.setState({ loading: false });
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                        <p>Status: {err.status}</p>
                    </div>)
            });
        })
    },
    //时间范围校验
    checkBirthday(rule, value, callback) {


        if (value && value.getTime() >= Date.now()) {
            callback(new Error('请不要选择一个未来的时间！'));
        } else {
            callback();
        }
    },




    //年度下拉框数据显示
    handleNdChange(value) {

        this.props.form.setFieldsValue({ nd: value });
        this.props.form.validateFields(['nd'], { force: true });
        const params = { where: encodeURIComponent(JSON.stringify({ nd: value })), }
        req({
            url: API_URL3,
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': auth.getToken() },
            contentType: 'application/json',
        }).then(resp => {
            this.setState({
                bndbafs: resp.data
            })
        }).fail(err => {
            this.setState({ loading: false });
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                        <p>Status: {err.status}</p>
                    </div>)
            });
        })



    },
    componentDidMount() {
        const nd = new Date().getFullYear() - 1;
        const params = { where: encodeURIComponent(JSON.stringify({ nd: nd })), }
        req({
            url: API_URL3,
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': auth.getToken() },
            contentType: 'application/json',
        }).then(resp => {
            this.setState({
                bndbafs: resp.data
            })
        }).fail(err => {
            this.setState({ loading: false });
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                        <p>Status: {err.status}</p>
                    </div>)
            });
        })
    },




    render() {

        const { getFieldProps} = this.props.form;
        //年检总结意见校验
        const textareaProps = getFieldProps('ZJ', {
            rules: [
                { required: true, type: 'string', message: '请填写年检总结' },
            ],
        });
        //应教育人数校验
        const yjyrsProps = getFieldProps('yjyrs', {
            initialValue: 0,
            rules: [
                { required: true, type: 'integer', message: '请填写应教育人数' },
            ],
        });
        //实际教育人数校验
        const sjjyrsProps = getFieldProps('sjjyrs', {
            initialValue: 0,
            rules: [
                { required: true, type: 'integer', message: '请填写实际教育人数' },
            ],
        });
        //未教育人数校验
        const wjyrsProps = getFieldProps('wjyrs', {
            initialValue: 0,
            rules: [
                { required: true, type: 'integer', message: '请填写未教育人数' },
            ],
        });
        //注册税务师变动情况增加校验
        const zcswsbzjProps = getFieldProps('ZCSWSBZJ', {
            initialValue: 0,
            rules: [
                { required: true, type: 'integer', message: '请填写注册增加人数' },
            ],
        });
        //注册税务师变动情况减少校验
        const zcswsbjsProps = getFieldProps('ZCSWSBJS', {
            initialValue: 0,
            rules: [
                { required: true, type: 'integer', whitespace: true, message: '请填写注册税务师减少人数' },
            ],
        });
        //股东变动情况增加校验
        const gdbdqkzjProps = getFieldProps('GDBDQKZJ', {
            initialValue: 0,
            rules: [
                { required: true, type: 'integer', whitespace: true, message: '请填写股东增加人数' },
            ],
        });
        //股东变动情况减少校验
        const gdbdqkjsProps = getFieldProps('GDBDQKJS', {
            initialValue: 0,
            rules: [
                { required: true, type: 'integer', whitespace: true, message: '请填写股东减少人数' },
            ],
        });

        //事务所负责人意见修改校验
        const fzryjProps = getFieldProps('NJZJ', {
            rules: [
                { required: true, type: 'string', whitespace: true, message: '请填写负责人意见' },
            ],
        });

        //签证时间校验
        const sjProps = getFieldProps('qzrq', {
            rules: [
                { required: true, type: 'date', whitespace: true, message: '请选择一个时间' },
                { validator: this.checkBirthday },
            ],
        });
        //负责人签名验证
        const qmProps = getFieldProps('FZR', {
            rules: [
                { required: true, type: 'string', whitespace: true, message: '负责人签名不能为空' },
            ],
        });

        const obj = this.props.data[0];


        let nd = new Date().getFullYear() - 1;

        return <div className="fix-table table-bordered table-striped">

            <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>


                <Row>
                    <Col span="8">
                        <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }}
                            label="年度">

                            <SelectorYear {...getFieldProps('nd', {
                                initialValue: nd,
                                rules: [{
                                    require: true,
                                    message: '选择一个年度做自检',
                                }, {
                                    validator: this.checkNdIfExit,
                                }]
                            }) }
                                onChange={this.handleNdChange} />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }} label="事务所名称">
                            <Input {...getFieldProps('dwmc', { initialValue: obj.dwmc }) } disabled />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }} label="机构注册号码：">
                            <Input {...getFieldProps('jgzchm', { initialValue: obj.zsbh }) } disabled />
                        </FormItem>
                    </Col>



                </Row>



                <Row>

                    <Col span="8">
                        <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }} label="所长姓名：">
                            <Input {...getFieldProps('sz', { initialValue: obj.SZ }) } disabled />
                        </FormItem>

                    </Col>
                    <Col span="8">
                        <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }} label="注册资金：">
                            <Input {...getFieldProps('zczj', { initialValue: obj.ZCZJ }) } disabled />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }} label="联系电话：">
                            <Input {...getFieldProps('dhhm', { initialValue: obj.dhhm }) } disabled />
                        </FormItem>

                    </Col>

                </Row>

                <Row>
                    <Col span="8">
                        <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }} label="办公地点">
                            <Input {...getFieldProps('bgdz', { initialValue: obj.bgdz }) } disabled />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }} label="邮编">
                            <Input {...getFieldProps('yzbm', { initialValue: obj.yzbm }) } disabled />
                        </FormItem>

                    </Col>
                    <Col span="8">
                        <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }} label="组织形式：">
                            <Input {...getFieldProps('jgxz', { initialValue: obj.jgxz }) } disabled />
                        </FormItem>
                    </Col>
                </Row>

                <Row>

                    <Col span="8">
                        <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }} label="机构正式成立时间：">
                            <Input {...getFieldProps('clsj', { initialValue: obj.clsj }) } disabled />
                        </FormItem>

                    </Col>
                    <Col span="8">
                        <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }} label="本年度报备份数：" ><Input {...getFieldProps('bndbafs', { initialValue: this.state.bndbafs }) } disabled /></FormItem>

                    </Col>
                    <Col span="8">
                        <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }} label="执业注册税务师人数：">
                            <Input {...getFieldProps('zyrs', { initialValue: obj.dqzyrs }) } disabled />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }} label="总人数：">  <Input {...getFieldProps('zrs', { initialValue: obj.dqzrs }) } disabled />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }} label="分所数："><Input {...getFieldProps('FSS', { initialValue: obj.dqfss }) } disabled /></FormItem>
                    </Col>

                </Row>


                <Row >
                    <Col span="3">
                        <FormItem labelCol={{ span: 22 }} label="参加后续教育:"></FormItem>
                    </Col>
                    <Col span="2">
                        <FormItem  > <InputNumber {...yjyrsProps} min={0} /></FormItem>
                    </Col>
                    <Col span="2">
                        <FormItem  ><span>人应参加</span></FormItem>
                    </Col>
                    <Col span="2">
                        <FormItem  > <InputNumber {...sjjyrsProps } min={0} /></FormItem>
                    </Col>
                    <Col span="2">
                        <FormItem  ><span>人实参加</span></FormItem>
                    </Col>
                    <Col span="2">
                        <FormItem  ><InputNumber {...wjyrsProps} min={0} /></FormItem>
                    </Col>
                    <Col span="2">
                        <FormItem  ><span>未参加</span></FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="3">
                        <FormItem labelCol={{ span: 22 }} label="注册税务师变动情况："></FormItem>
                    </Col>

                    <Col span="2">
                        <FormItem  > <InputNumber {...zcswsbzjProps } min={0} /></FormItem>
                    </Col>
                    <Col span="2">
                        <FormItem  ><span>增加</span></FormItem>
                    </Col>

                    <Col span="2">
                        <FormItem  > <InputNumber {...zcswsbjsProps} min={0} /></FormItem>
                    </Col>
                    <Col span="2">
                        <FormItem  ><span>减少</span></FormItem>

                    </Col>

                </Row>
                <Row>
                    <Col span="3">
                        <FormItem labelCol={{ span: 22 }} label="股东变动情况："></FormItem>
                    </Col>

                    <Col span="2">
                        <FormItem  > <InputNumber {...gdbdqkzjProps} min={0} /></FormItem>
                    </Col>
                    <Col span="2">
                        <FormItem  ><span>增加</span></FormItem>
                    </Col>

                    <Col span="2">
                        <FormItem  > <InputNumber {...gdbdqkjsProps } min={0} /></FormItem>
                    </Col>
                    <Col span="2">
                        <FormItem  ><span>减少</span></FormItem>

                    </Col>

                </Row>

                <div className="fix-table table-bordered table-striped">
                    <table>
                        <tbody>
                            <tr className="add">
                                <th>年检选项：</th>
                                <th>违规条款（违规请打勾）</th>
                                <th>所自检</th>
                            </tr>
                            <tr>
                                <td><h3>执业资格</h3></td>
                                <td>本所存在注册税务师人数未达到规定的标准</td>
                                <td><Checkbox {...getFieldProps('wg1') }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>本所有发起人或合伙人以及出资人不按规定出资</td>
                                <td><Checkbox {...getFieldProps('wg2') }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>本所注册资本或经营资金不到位，出资人（股东）的出资不符合规定</td>
                                <td><Checkbox {...getFieldProps('wg3') }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>本所事项变更存在未按归定和程序办理相关的手续</td>
                                <td><Checkbox {...getFieldProps('wg4') }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>本所办公地点和税务机关在一起</td>
                                <td><Checkbox {...getFieldProps('wg5') }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>本所存在拒绝在规定的时间参加年检</td>
                                <td><Checkbox {...getFieldProps('wg6') }></Checkbox></td>
                            </tr>

                            <tr>
                                <td><h3>执业质量</h3></td>
                                <td>本所存在采取强迫、欺诈等不正当的手段招揽业务</td>
                                <td> <Checkbox {...getFieldProps('wg7') }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>本所没有与委托人签订协议书或协议书有不规范的行为</td>
                                <td><Checkbox {...getFieldProps('wg8') }></Checkbox></td>
                            </tr>


                            <tr>
                                <td></td>
                                <td>本所收到《注册税务师管理暂行办法》第四十三、四十四条所列行政处罚</td>
                                <td><Checkbox {...getFieldProps('wg9') }></Checkbox></td>
                            </tr>


                            <tr>
                                <td></td>
                                <td>本所存在未按照《注册税务师管理暂行办法》归定承办相关业务</td>
                                <td> <Checkbox {...getFieldProps('wg10') }></Checkbox></td>
                            </tr>


                            <tr>
                                <td></td>
                                <td>本所存在未按协议规定履行义务</td>
                                <td><Checkbox {...getFieldProps('wg11') }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>本所未按照财务会计制度核算，内部管理较不好</td>
                                <td><Checkbox {...getFieldProps('wg12') }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>本所利用职务之便，牟取不正当利益</td>
                                <td><Checkbox {...getFieldProps('wg13') }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>本所有采取夸大宣传、诋毁同行、以低于成本价收费等不正当方式承接业务</td>
                                <td><Checkbox {...getFieldProps('wg14') }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>本所有允许以本所名义承接相关业务</td>
                                <td><Checkbox {...getFieldProps('wg15') }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>本所有出具虚假涉税文书，造成委托人未缴或少缴税款</td>
                                <td><Checkbox {...getFieldProps('wg16') }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>本所有违反税收法律，行政法规，造成委托人未缴或少缴税款</td>
                                <td> <Checkbox {...getFieldProps('wg17') }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>连续两年以上未开展任何业务的</td>
                                <td> <Checkbox {...getFieldProps('wg28') }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>未执行全省统一涉税鉴证收费标准的</td>
                                <td><Checkbox {...getFieldProps('wg29') }></Checkbox></td>
                            </tr>
                            <tr>
                                <td><h3>收费管理</h3></td>
                                <td>本所财务会计制度不健全，会计核算不符合规定要求</td>
                                <td><Checkbox {...getFieldProps('wg18') }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>本所有隐藏，转移业务收入，虚报经营亏损</td>
                                <td><Checkbox {...getFieldProps('wg19') }></Checkbox></td>
                            </tr>


                            <tr>
                                <td></td>
                                <td>本所有弄虚作假高额支付租赁房屋，设备等费用</td>
                                <td><Checkbox {...getFieldProps('wg20') }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>本所未按规定进行纳税申报以及缴纳税款</td>
                                <td><Checkbox {...getFieldProps('wg21') }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>本所有偷税行为</td>
                                <td><Checkbox {...getFieldProps('wg22') }></Checkbox></td>
                            </tr>
                            <tr>
                                <td><h3>其他方面</h3></td>
                                <td>本所有未经批准自行设立分支机构</td>
                                <td><Checkbox {...getFieldProps('wg23') }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>本所有未经批准自行挂靠或者接受挂靠</td>
                                <td><Checkbox {...getFieldProps('wg24') }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>本所有对分支机构只收管理费</td>
                                <td><Checkbox {...getFieldProps('wg25') }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>本所分支机构执业资质不符合要求</td>
                                <td><Checkbox {...getFieldProps('wg26') }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>本所分支机构一年内有两次以上执业质量问题</td>
                                <td> <Checkbox {...getFieldProps('wg27') }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>未按照规定缴纳团体会费</td>
                                <td><Checkbox {...getFieldProps('wg30') }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>未按照规定办理团体会员登记、变更手续</td>
                                <td> <Checkbox {...getFieldProps('wg31') }></Checkbox></td>
                            </tr>
                            <tr>
                                <td><b>评级选项</b></td>
                                <td><b>年检及格A级单位</b></td>
                                <td><b>自评级</b><Checkbox></Checkbox></td>
                            </tr>

                        </tbody>
                    </table>


                    <Row>
                        <Col>
                            <FormItem></FormItem>
                        </Col>
                    </Row>


                    <Row>
                        <Col span="24">
                            <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label="年检总结">  <Input {...textareaProps} type="textarea" />
                            </FormItem>
                        </Col>



                    </Row>


                    <Row>
                        <Col span="12">

                            <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="事务所负责人意见:" ><Input {...fzryjProps } type="textarea" /></FormItem>



                        </Col>



                        <Col span="6" >
                            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="时间:" > <DatePicker {...sjProps} /></FormItem>

                        </Col>
                        <Col span="6">
                            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="负责人签名:" >
                                <Input {...qmProps }></Input>
                            </FormItem>
                        </Col>



                    </Row>


                    <Row>
                        <Col span="3">
                            <Button type="primary" onClick={this.handleSubmit.bind(this, 1)} loading={this.props.btnloading}> <Icon type="check" />保存</Button>

                        </Col>
                        <Col span="3">
                            <Button type="primary" onClick={this.showModal} loading={this.props.btnloading}> <Icon type="arrow-up" />提交</Button>
                        </Col>
                        <Col span="3">
                            <Button type="primary" onClick={this.handleReset} loading={this.props.btnloading}><Icon type="cross" />重置</Button>

                        </Col>
                    </Row>
                </div>
            </Form>


        </div>
    }
});
Addswsnj = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = { value: props.data[prop] }
        }
        return result;
    }
})(Addswsnj);








module.exports = Addswsnj;