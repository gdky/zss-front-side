import React from 'react'
import req from 'reqwest'
import config from 'common/configuration'
import auth from 'common/auth'
import { Col, Input, Row, Button, Icon, Form, Modal, Checkbox, DatePicker, InputNumber, Select, Spin } from 'antd'
import { SelectorYear, SelectorXZ, SelectorXm } from 'component/compSelector'
import './style.css'
import Panel from 'component/compPanel'

const API_URL3 = config.HOST + config.URI_API_PROJECT + '/add/swsnj2';
const CheckNd_URL = config.HOST + config.URI_API_PROJECT + '/add/swsnj3';
const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const ToolBar = Panel.ToolBar;

let Updatejgnjb = React.createClass({
    getDefaultProps() {
        return {
            onSubmit: {}
        }
    },

    handleSubmit(ztdm) {

        var mp = {};
        let value = this.props.form.getFieldsValue()
        var id = this.props.data.ID;//entity:this.props.data()
        value['id'] = id;

        let arr = [];
        for (var key in value) {
            if (Object.prototype.toString.call(value[key]) == "[object Undefined]") {
                value[key] = null
            };
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
        // value.id = obj.ID;
        value.ztdm = ztdm;
        this.props.onSubmit(value);
    },

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },
    //Modal
    getInitialState() {
        return {
            visible: false, entity: this.props.data, bndbafs: this.props.data.BAFS

        };
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
    handleOk(e) {
        this.props.handleOk(this.state.okValue)
        this.setState({
            visible: false
        });
    },
    handleCancel(e) {

        this.setState({
            visible: false
        });
    },

    //年检年度是否重复校验方法
    checkNdIfExit(rule, value, callback) {
        var id = this.props.data.ID
        const params = { where: encodeURIComponent(JSON.stringify({ nd: value, njid: id })), }
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

    render() {

        //定义工具栏内容
        let toolbar = <ToolBar>
            <ButtonGroup>
                <Button onClick={this.props.toback}>返回<Icon className="toggle-tip" type="arrow-left" /></Button>
            </ButtonGroup>
        </ToolBar>;
        const { getFieldProps } = this.props.form;
        const data = this.props.data;
        const obj = this.props.data;
        let bndbafs= this.state.bndbafs?this.state.bndbafs:data.BAFS; 
        var obj2 = {};
        var obj3 = {};
        var arr1 = [];
        var arr2 = [];
        if (obj.ZJWGDM) {
            arr1 = obj.ZJWGDM.split(',');

            for (var i = 0; i < arr1.length; i++) {
                obj2[arr1[i]] = true;
            }
        }
        if (obj.NJWGDM) {
            arr2 = obj.NJWGDM.split(',');

            for (var i = 0; i < arr2.length; i++) {
                obj3[arr2[i]] = true;
            }
        }
 
        return <div className="add">
            <Panel title="事务所年检表修改" toolbar={toolbar}>
                <div className="fix-table table-bordered table-striped" >

                    <div className="fix-table table-bordered table-striped" >
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
                                        <td>{data.dwmc}</td>
                                        <td>时间</td>
                                        <td> <Col

                                            label="年度：">
                                            <FormItem >
                                                <SelectorYear  {...getFieldProps('nd', {
                                                    initialValue: data.ND,
                                                    rules: [{
                                                        require: true,
                                                        message: '选择一个年度做自检',
                                                    }, {
                                                        validator: this.checkNdIfExit
                                                    }]
                                                }) } onChange={this.handleNdChange} />
                                            </FormItem>
                                        </Col>
                                        </td>
                                        <td>组织形式：{data.jgxz}</td>
                                    </tr>

                                    <tr>
                                        <td>所长姓名</td>
                                        <td>{data.SZ}</td>
                                        <td>注册资金</td>
                                        <td>{data.ZCZJ}</td>
                                        <td>邮政编码：{data.yzbm}</td>
                                    </tr>
                                    <tr>
                                        <td>办公地点</td>
                                        <td>{data.bgdz}</td>
                                        <td>联系电话</td>
                                        <td>{data.dhhm}</td>
                                        <td>本年度报备份数：<label {...getFieldProps('BAFS', { initialValue: bndbafs }) }>{bndbafs}</label>份</td>

                                    </tr>
                                    <tr>
                                        <td>总人数：</td>
                                        <td><Input  {...getFieldProps('ZRS', { initialValue: data.dqzyrs }) } style={{ width: "50%" }} /></td>
                                        <td>执业注册税务师人数：</td>
                                        <td><Input {...getFieldProps('zyrs', { initialValue: data.ZYRS }) } style={{ width: "50%" }} /></td>
                                        <td></td>


                                    </tr>



                                    <tr>
                                        <td>参加后续教育：</td>

                                        <td><FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 8 }} label="人应参加：" ><Input {...getFieldProps('yjyrs', { initialValue: data.YJYRS }) } style={{ width: "50%" }} /></FormItem></td>
                                        <td ><FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 8 }} label="人实参加：" ><Input {...getFieldProps('sjjyrs', { initialValue: data.SJJYRS }) } style={{ width: "50%" }} /></FormItem></td>
                                        <td><FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} label="未参加：" ><Input {...getFieldProps('wjyrs', { initialValue: data.WJYRS }) } style={{ width: "50%" }} /></FormItem></td>

                                        <td></td>


                                    </tr>
                                    <tr>

                                        <td>注册税务师变动情况：</td>
                                        <td ><FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} label="增加：" ><Input {...getFieldProps('ZCSWSBZJ') } style={{ width: "50%" }} /></FormItem></td>
                                        <td  ><FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} label="减少：" ><Input {...getFieldProps('ZCSWSBJS') } style={{ width: "50%" }} /></FormItem></td>
                                        <td> 分所数: </td>
                                        <td ><FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} label="" ><Input{...getFieldProps('FSS') } style={{ width: "50%" }} /></FormItem></td>

                                    </tr>
                                    <tr >

                                        <td>股东变动情况：</td>
                                        <td ><FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} label="增加：" ><Input {...getFieldProps('GDBDQKZJ') } style={{ width: "50%" }} /></FormItem></td>
                                        <td ><FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} label="减少：" ><Input {...getFieldProps('GDBDQKJS') } style={{ width: "50%" }} /></FormItem></td>
                                        <td colSpan="2"></td>
                                    </tr>

                                    <tr>
                                        <td>自检选项：</td>
                                        <td colSpan="3">违规条款</td>
                                        <td>所自检</td>
                                    </tr>

                                    <tr>
                                        <td>执业资格：</td>
                                        <td colSpan="3">本所存在注册税务师人数未达到规定的标准</td>
                                        <td><Checkbox {...getFieldProps('wg1', { initialValue: obj2['1'], valuePropName: 'checked' }) }> </Checkbox></td>
                                    </tr>



                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所有发起人或合伙人以及出资人不按规定出资
                                </td>
                                        <td><Checkbox  {...getFieldProps('wg2', { initialValue: obj2['2'], valuePropName: 'checked' }) } ></Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所注册资本或经营资金不到位，出资人（股东）的出资不符合规定
                                </td>
                                        <td><Checkbox {...getFieldProps('wg3', { initialValue: obj2['3'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所事项变更存在未按归定和程序办理相关的手续
                                </td>
                                        <td><Checkbox {...getFieldProps('wg4', { initialValue: obj2['4'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所办公地点和税务机关在一起
                                </td>
                                        <td><Checkbox {...getFieldProps('wg5', { initialValue: obj2['5'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所存在拒绝在规定的时间参加年检
                                </td>
                                        <td><Checkbox {...getFieldProps('wg6', { initialValue: obj2['6'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td>
                                            执业质量
                                </td>
                                        <td colSpan="3">

                                            本所存在采取强迫、欺诈等不正当的手段招揽业务
                                </td>
                                        <td><Checkbox {...getFieldProps('wg7', { initialValue: obj2['7'], valuePropName: 'checked' }) }> </Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所没有与委托人签订协议书或协议书有不规范的行为
                                </td>
                                        <td><Checkbox {...getFieldProps('wg8', { initialValue: obj2['8'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所收到《注册税务师管理暂行办法》第四十三、四十四条所列行政处罚
                                </td>
                                        <td><Checkbox {...getFieldProps('wg9', { initialValue: obj2['9'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所存在未按照《注册税务师管理暂行办法》归定承办相关业务
                                </td>
                                        <td><Checkbox {...getFieldProps('wg10', { initialValue: obj2['10'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所存在未按协议规定履行义务
                                </td>
                                        <td><Checkbox {...getFieldProps('wg11', { initialValue: obj2['11'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所未按照财务会计制度核算，内部管理较不好
                                </td>
                                        <td><Checkbox  {...getFieldProps('wg12', { initialValue: obj2['12'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所利用职务之便，牟取不正当利益
                                </td>
                                        <td><Checkbox {...getFieldProps('wg13', { initialValue: obj2['13'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所有采取夸大宣传、诋毁同行、以低于成本价收费等不正当方式承接业务
                                </td>
                                        <td><Checkbox  {...getFieldProps('wg14', { initialValue: obj2['14'], valuePropName: 'checked' }) } ></Checkbox></td>
                                    </tr>


                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所有允许以本所名义承接相关业务
                                </td>
                                        <td><Checkbox  {...getFieldProps('wg15', { initialValue: obj2['15'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所有出具虚假涉税文书，造成委托人未缴或少缴税款
                                </td>
                                        <td><Checkbox {...getFieldProps('wg16', { initialValue: obj2['16'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所有违反税收法律，行政法规，造成委托人未缴或少缴税款
                                </td>
                                        <td><Checkbox {...getFieldProps('wg17', { initialValue: obj2['17'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            连续两年以上未开展任何业务的
                                </td>
                                        <td><Checkbox {...getFieldProps('wg28', { initialValue: obj2['28'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            未执行全省统一涉税鉴证收费标准的
                                </td>
                                        <td><Checkbox {...getFieldProps('wg29', { initialValue: obj2['29'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>
                                    <tr>
                                        <td>收费管理：</td>
                                        <td colSpan="3">
                                            本所财务会计制度不健全，会计核算不符合规定要求
                                </td>
                                        <td><Checkbox  {...getFieldProps('wg18', { initialValue: obj2['18'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所有隐藏，转移业务收入，虚报经营亏损
                                </td>
                                        <td><Checkbox {...getFieldProps('wg19', { initialValue: obj2['19'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所有弄虚作假高额支付租赁房屋，设备等费用
                                </td>
                                        <td><Checkbox {...getFieldProps('wg20', { initialValue: obj2['20'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所未按规定进行纳税申报以及缴纳税款
                                </td>
                                        <td><Checkbox  {...getFieldProps('wg21', { initialValue: obj2['21'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所有偷税行为
                                </td>
                                        <td><Checkbox {...getFieldProps('wg22', { initialValue: obj2['22'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>
                                    <tr>
                                        <td>其他方面：</td>
                                        <td colSpan="3">

                                            本所有未经批准自行设立分支机构
                                </td>
                                        <td><Checkbox {...getFieldProps('wg23', { initialValue: obj2['23'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所有未经批准自行挂靠或者接受挂靠
                                </td>
                                        <td><Checkbox {...getFieldProps('wg24', { initialValue: obj2['24'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所有对分支机构只收管理费
                                </td>
                                        <td><Checkbox {...getFieldProps('wg25', { initialValue: obj2['25'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所分支机构执业资质不符合要求
                                </td>
                                        <td><Checkbox {...getFieldProps('wg26', { initialValue: obj2['26'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            本所分支机构一年内有两次以上执业质量问题
                                </td>
                                        <td><Checkbox {...getFieldProps('wg27', { initialValue: obj2['27'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            未按照规定缴纳团体会费
                                </td>
                                        <td><Checkbox {...getFieldProps('wg30', { initialValue: obj2['30'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="3">

                                            未按照规定办理团体会员登记、变更手续
                                </td>
                                        <td><Checkbox {...getFieldProps('wg31', { initialValue: obj2['31'], valuePropName: 'checked' }) }></Checkbox></td>
                                    </tr>


                                    <tr>
                                        <td >年检总结修改：</td>
                                        <td colSpan="4"><Input {...getFieldProps('ZJ') } row={100} type="textarea" /></td>
                                    </tr>

                                    <tr>

                                        <td colSpan="4">事务所负责人意见修改：</td>
                                        <td>负责人签名：</td>

                                    </tr>
                                    <tr>


                                        <td colSpan="4"><Input {...getFieldProps('NJZJ') } placeholder="可根据实际情况对输入框进行调整（将鼠标放置到输入框右下角即可拉伸）" type="textarea" /></td>
                                        <td><Input {...getFieldProps('FZR') } /></td>

                                    </tr>





                                </tbody>
                            </table>
                            <Row>
                                <FormItem></FormItem>
                            </Row>

                            <Row>
                                <Col span="3">
                                    <Button type="primary" onClick={this.handleSubmit.bind(this, 1)} loading={this.props.btnloading}> <Icon type="check" />保存</Button>
                                </Col>
                                <Col>
                                    <Button type="primary" onClick={this.showModal} loading={this.props.btnloading}> <Icon type="arrow-up" />提交</Button>
                                </Col>
                            </Row>

                        </Form>
                    </div>

                </div>
            </Panel>
        </div>
    }
});


Updatejgnjb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = { value: props.data[prop] }
        }
        return result;
    }
})(Updatejgnjb);






module.exports = Updatejgnjb