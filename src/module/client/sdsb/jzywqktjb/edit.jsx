import React from 'react'
import {Steps, Col, Row, Spin, notification, Icon, Button, Form, Input,InputNumber,Popconfirm} from 'antd'
import Panel from 'component/compPanel'
import {SelectorYear, SelectorXZ, SelectorSWSXZ, SelectorCS} from 'component/compSelector'
import config from 'common/configuration.js'
import req from 'common/request'
import utils from 'common/utils'
import Success from './successScr'
import FailScr from './failScr'
import {mapKeys} from 'lodash'
import numeral from 'numeral'

const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const PanelBar = Panel.ToolBar;

let Editfrom = React.createClass({
    checkhs1(rule, value, callback){
        if (value == 0 && this.props.form.getFieldValue('tzynsdse_je') != 0) {
            callback("户数不能为0")
        } else {
            callback()
        }
    },
    checkhs2(rule, value, callback){
        if (value == 0 && this.props.form.getFieldValue('tjynsdse_je') != 0) {
            callback("户数不能为0")
        } else {
            callback()
        }
    },
    checkhs3(rule, value, callback){
        if (value == 0 && this.props.form.getFieldValue('mbksje_je') != 0) {
            callback("户数不能为0")
        } else {
            callback()
        }
    },
    checkhs4(rule, value, callback){
        if (value == 0 && this.props.form.getFieldValue('ccsskc_je') != 0) {
            callback("户数不能为0")
        } else {
            callback()
        }
    },
    checkhs5(rule, value, callback){
        if (value == 0 && this.props.form.getFieldValue('tdzzsqsjz_je') != 0) {
            callback("户数不能为0")
        } else {
            callback()
        }
    },
    checkhs6(rule, value, callback){
        if (value == 0 && this.props.form.getFieldValue('qtjz_je') != 0) {
            callback("户数不能为0")
        } else {
            callback()
        }
    },
    checkhs7(rule, value, callback){
        if (value == 0 && this.props.form.getFieldValue('gxjsqyrdqzyw_je') != 0) {
            callback("户数不能为0")
        } else {
            callback()
        }
    },
    checkhs8(rule, value, callback){
        if (value == 0 && this.props.form.getFieldValue('qyzxswdeskjsjzyw_je') != 0) {
            callback("户数不能为0")
        } else {
            callback()
        }
    },
    checkhs9(rule, value, callback){
        if (value == 0 && this.props.form.getFieldValue('yffjjkcjzyw_je') != 0) {
            callback("户数不能为0")
        } else {
            callback()
        }
    },
    checkhs10(rule, value, callback){
        if (value == 0 && this.props.form.getFieldValue('qt_je') != 0) {
            callback("户数不能为0")
        } else {
            callback()
        }
    },
    zero(v, prev){
        if (!v) {
            return 0
        } else {
            return v
        }
    },
    tonull(v, prev){
        if (!v.trim()) {
            return null
        } else {
            return v
        }
    },
    commit(){
        const {validateFields} = this.props.form;
        validateFields({force: true}, (errors, values) => {
            if (!!errors) {
                return;
            }
            this.props.onCommit(values);
        })
    },
    save(){
        const {validateFields} = this.props.form;
        validateFields({force: true}, (errors, values) => {
            if (!!errors) {
                return;
            }
            values = utils.transEmpty2Null(values);
            this.props.onSave(values);
        })
    },
    render(){
        const {data} = this.props;
        const {getFieldProps} = this.props.form;
        const layout = {
            labelCol: {span: 12},
            wrapperCol: {span: 12}
        };
        const style = {style: {width: '100%'}};
        const tzynsdse_hs = getFieldProps('tzynsdse_hs', {
            rules: [
                {validator: this.checkhs1}
            ],
            normalize: this.zero
        });
        const tjynsdse_hs = getFieldProps('tjynsdse_hs', {
            rules: [
                {validator: this.checkhs2}
            ],
            normalize: this.zero
        });
        const mbksje_hs = getFieldProps('mbksje_hs', {
            rules: [
                {validator: this.checkhs3}
            ],
            normalize: this.zero
        });
        const ccsskc_hs = getFieldProps('ccsskc_hs', {
            rules: [
                {validator: this.checkhs4}
            ],
            normalize: this.zero
        });
        const tdzzsqsjz_hs = getFieldProps('tdzzsqsjz_hs', {
            rules: [
                {validator: this.checkhs5}
            ],
            normalize: this.zero
        });
        const qtjz_hs = getFieldProps('qtjz_hs', {
            rules: [
                {validator: this.checkhs6}
            ],
            normalize: this.zero
        });
        const gxjsqyrdqzyw_hs = getFieldProps('gxjsqyrdqzyw_hs', {
            rules: [
                {validator: this.checkhs7}
            ],
            normalize: this.zero
        });
        const qyzxswdeskjsjzyw_hs = getFieldProps('qyzxswdeskjsjzyw_hs', {
            rules: [
                {validator: this.checkhs8}
            ],
            normalize: this.zero
        });
        const yffjjkcjzyw_hs = getFieldProps('yffjjkcjzyw_hs', {
            rules: [
                {validator: this.checkhs9}
            ],
            normalize: this.zero
        });
        const qt_hs = getFieldProps('qt_hs', {
            rules: [
                {validator: this.checkhs10}
            ],
            normalize: this.zero
        });
        const tbrProps = getFieldProps('tianbiaoren', {
            rules: [
                {required: true, whitespace: true, message: '必填'},
            ],
            normalize: this.tonull
        });
        const szProps = getFieldProps('suozhang', {
            rules: [
                {required: true, whitespace: true, message: '必填'}
            ]
        });

        return <div className="fix-table no-border table-striped  ">
            <Form horizontal>
                <table className="tg">
                    <colgroup>
                        <col style={{width:'5%'}}/>
                        <col style={{width:'35%'}}/>
                        <col style={{width:'15%'}}/>
                        <col style={{width:'15%'}}/>
                        <col style={{width:'15%'}}/>
                        <col style={{width:'15%'}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <td colSpan="2">事务所名称：{data.dwmc ? data.dwmc.value : ''}</td>
                        <td colSpan="2"><FormItem label="年度"  {...layout}><Input {...style}
                          disabled { ...getFieldProps('nd')} /></FormItem></td>
                        <td colSpan="2">单位：万元、户</td>
                    </tr>
                    <tr>
                        <td className="tg-s6z2" rowSpan="2"><br/>序号</td>
                        <td className="tg-s6z2" rowSpan="2"><br/>项目</td>
                        <td className="tg-s6z2" colSpan="2">上年数</td>
                        <td className="tg-s6z2" colSpan="2">本年数</td>
                    </tr>
                    <tr>
                        <td className="tg-s6z2">户数</td>
                        <td className="tg-s6z2">金额</td>
                        <td className="tg-s6z2">户数</td>
                        <td className="tg-s6z2">金额</td>
                    </tr>
                    <tr>
                        <td className="tg-031e">1</td>
                        <td className="tg-031e">企业所得税汇算清缴总户数</td>
                        <td className="tg-031e">--</td>
                        <td className="tg-031e">--</td>
                        <td className="tg-yw4l">--</td>
                        <td className="tg-yw4l">--</td>
                    </tr>
                    <tr>
                        <td className="tg-031e">2</td>
                        <td className="tg-031e">企业所得税汇算清缴纳税申报鉴证业务</td>
                        <td className="tg-031e"><FormItem><InputNumber disabled {...style} {...getFieldProps('hsqjje_hs0', {normalize: this.zero})}/></FormItem></td>
                        <td className="tg-031e"><FormItem><InputNumber disabled step={0.01} {...style} {...getFieldProps('hsqjje_je0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber disabled {...style} {...getFieldProps('hsqjje_hs', {normalize: this.zero})} /></FormItem></td>
                        <td className="tg-yw4l"><FormItem><InputNumber disabled step={0.01} {...style} {...getFieldProps('hsqjje_je', {normalize: this.zero})}/></FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-031e">3</td>
                        <td className="tg-031e">其中：（1）调增应纳所得税税额</td>
                        <td className="tg-031e"><FormItem><InputNumber disabled {...style} {...getFieldProps('tzynsdse_hs0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-031e"><FormItem><InputNumber disabled step={0.01} {...style} {...getFieldProps('tzynsdse_je0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber min={0} {...style} {...tzynsdse_hs}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber min={0} step={0.01} {...style} {...getFieldProps('tzynsdse_je', {normalize: this.zero})}/></FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-031e">4</td>
                        <td className="tg-031e">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（2）调减应纳所得税税额</td>
                        <td className="tg-031e"><FormItem><InputNumber disabled {...style} {...getFieldProps('tjynsdse_hs0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-031e"><FormItem><InputNumber disabled step={0.01} {...style} {...getFieldProps('tjynsdse_je0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber min={0} {...style} {...tjynsdse_hs}/></FormItem></td>
                        <td className="tg-yw4l"><FormItem><InputNumber min={0} step={0.01} {...style} {...getFieldProps('tjynsdse_je', {normalize: this.zero})}/></FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-031e">5</td>
                        <td className="tg-031e">企业税前弥补亏损鉴证业务</td>
                        <td className="tg-031e"><FormItem><InputNumber disabled {...style} {...getFieldProps('mbksje_hs0', {normalize: this.zero})}/></FormItem></td>
                        <td className="tg-031e"><FormItem><InputNumber disabled step={0.01} {...style} {...getFieldProps('mbksje_je0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber min={0} {...style} {...mbksje_hs}/></FormItem></td>
                        <td className="tg-yw4l"><FormItem><InputNumber step={0.01} {...style} {...getFieldProps('mbksje_je', {normalize: this.zero})}/></FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-031e">6</td>
                        <td className="tg-031e">企业资产损失税前扣除鉴证业务</td>
                        <td className="tg-031e"><FormItem><InputNumber disabled {...style} {...getFieldProps('ccsskc_hs0', {normalize: this.zero})}/></FormItem></td>
                        <td className="tg-031e"><FormItem><InputNumber disabled step={0.01} {...style} {...getFieldProps('ccsskc_je0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber min={0}  {...style} {...ccsskc_hs}/></FormItem></td>
                        <td className="tg-yw4l"><FormItem><InputNumber step={0.01} {...style} {...getFieldProps('ccsskc_je', {normalize: this.zero})}/></FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-031e">7</td>
                        <td className="tg-031e">土地增值税清算鉴证业务</td>
                        <td className="tg-031e"><FormItem><InputNumber disabled {...style} {...getFieldProps('tdzzsqsjz_hs0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-031e"><FormItem><InputNumber disabled step={0.01} {...style} {...getFieldProps('tdzzsqsjz_je0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber min={0} {...style} {...tdzzsqsjz_hs}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber step={0.01} {...style} {...getFieldProps('tdzzsqsjz_je', {normalize: this.zero})}/></FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-031e">8</td>
                        <td className="tg-031e">其他鉴证业务小计</td>
                        <td className="tg-031e"><FormItem><InputNumber disabled {...style} {...getFieldProps('qtjz_hs0', {normalize: this.zero})}/></FormItem></td>
                        <td className="tg-031e"><FormItem><InputNumber disabled step={0.01} {...style} {...getFieldProps('qtjz_je0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber min={0} disabled{...style} {...qtjz_hs}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber step={0.01} disabled {...style} {...getFieldProps('qtjz_je', {normalize: this.zero})}/></FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-031e">9</td>
                        <td className="tg-031e">其中：（1）高新技术企业认定鉴证业务</td>
                        <td className="tg-031e"><FormItem><InputNumber disabled {...style} {...getFieldProps('gxjsqyrdqzyw_hs0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-031e"><FormItem><InputNumber disabled step={0.01} {...style} {...getFieldProps('gxjsqyrdqzyw_je0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber min={0} {...style} {...gxjsqyrdqzyw_hs}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber step={0.01} {...style} {...getFieldProps('gxjsqyrdqzyw_je', {normalize: this.zero})}/></FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-031e">10</td>
                        <td className="tg-031e">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（2）企业注销税务登记税款清算鉴证业务</td>
                        <td className="tg-031e"><FormItem><InputNumber disabled {...style} {...getFieldProps('qyzxswdeskjsjzyw_hs0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-031e"><FormItem><InputNumber disabled step={0.01} {...style} {...getFieldProps('qyzxswdeskjsjzyw_je0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber min={0} {...style} {...qyzxswdeskjsjzyw_hs}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber step={0.01} {...style} {...getFieldProps('qyzxswdeskjsjzyw_je', {normalize: this.zero})}/></FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-031e">11</td>
                        <td className="tg-031e">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（3）研发费加计扣除鉴证业务</td>
                        <td className="tg-031e"><FormItem><InputNumber
                          disabled {...style} {...getFieldProps('yffjjkcjzyw_hs0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-031e"><FormItem><InputNumber disabled
                                                                       step={0.01} {...style} {...getFieldProps('yffjjkcjzyw_je0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber
                          min={0} {...style} {...yffjjkcjzyw_hs}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber
                          step={0.01} {...style} {...getFieldProps('yffjjkcjzyw_je', {normalize: this.zero})}/></FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-031e">12</td>
                        <td className="tg-031e">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（4）其他</td>
                        <td className="tg-031e"><FormItem><InputNumber
                          disabled {...style} {...getFieldProps('qt_hs0', {normalize: this.zero})}/></FormItem></td>
                        <td className="tg-031e"><FormItem><InputNumber disabled
                                                                       step={0.01} {...style} {...getFieldProps('qt_je0', {normalize: this.zero})}/></FormItem>
                        </td>
                        <td className="tg-yw4l"><FormItem><InputNumber
                          min={0} {...style} {...qt_hs}/></FormItem></td>
                        <td className="tg-yw4l"><FormItem><InputNumber
                          step={0.01} {...style} {...getFieldProps('qt_je', {normalize: this.zero})}/></FormItem></td>
                    </tr>
                    <tr>
                        <td className="tg-031e" colSpan="2"><FormItem labelCol={{span: 4}} wrapperCol={{span: 20}} label="备注">
                            <Input type="textarea" {...style} {...getFieldProps('bz')}/></FormItem></td>
                        <td className="tg-031e" colSpan="2"><FormItem {...layout} label="填表人"><Input  {...style} {...tbrProps}/></FormItem></td>
                        <td className="tg-031e" colSpan="2"><FormItem {...layout} label="所长"><Input disabled {...style} {...szProps}/></FormItem></td>

                    </tr>

                    </tbody>
                </table>
                <Row style={{marginTop: '24px'}}>
                    <Col span="5" offset="19">
                        <ButtonGroup>
                            <Popconfirm placement="top" title="确定保存？" onConfirm={this.save}>
                                <Button type="primary"> <Icon type="save"/>保存</Button>
                            </Popconfirm>
                            <Popconfirm placement="top" title="确定提交？" onConfirm={this.commit}>
                                <Button type="primary"> <Icon type="to-top"/>提交</Button>
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
        return props.data
    },
    onFieldsChange(props, fields) {
        props.onFieldChange(fields)
    }
})(Editfrom);


const c = React.createClass({
    getDefaultProps(){
        return {
            title: '添加行业鉴证业务情况统计表6',
            url: config.HOST + config.URI_API_PROJECT + '/client/jzywqktjb',
        }
    },
    getInitialState(){
        return {
            loading: true,
            data: {},
            scr: 'normal'
        }
    },
    back(){
        this.props.onBack();
    },
    propAdd(o, propList){
        let value = null;
        let i = propList.length;
        while (i--){
            if (o.hasOwnProperty(propList[i])) {
                value += numeral(o[propList[i]].value).value();
            }
        }
        return value;
    },
    handleFieldChange(field){
        const {data} = this.state;
        for (let prop in field) {
            data[prop] = field[prop]
        }
        let value = this.propAdd(data, ['tzynsdse_hs','tjynsdse_hs']);
        if (value !== null){
            data['hsqjje_hs'] = {};
            data['hsqjje_hs'].value = value
        }
        value = this.propAdd(data, ['tzynsdse_je','tjynsdse_je']);
        if (value !== null){
            data['hsqjje_je'] = {};
            data['hsqjje_je'].value = value
        }
        value = this.propAdd(data, ['gxjsqyrdqzyw_hs','qyzxswdeskjsjzyw_hs','yffjjkcjzyw_hs','qt_hs']);
        if (value !== null){
            data['qtjz_hs'] = {};
            data['qtjz_hs'].value = value
        }
        value = this.propAdd(data, ['gxjsqyrdqzyw_je','qyzxswdeskjsjzyw_je','yffjjkcjzyw_je','qt_je']);
        if (value !== null) {
            data['qtjz_je'] = {};
            data['qtjz_je'].value = value
        }
        this.setState({data: data})
    },

    //保存
    handleSave(values){
        const {url,id} = this.props;
        values.ztbj = 0;
        this.setState({loading: true});
        req({
            method: 'put',
            url: url+ `/${id}`,
            data: values
        }).then(resp=> {
            this.setState({loading: false, scr: 'success', successType: 'save'})
        }).catch(e=> {
            this.setState({loading: false});
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
    handleCommit(values){
        const {url,id} = this.props;
        values.ztbj = 1;
        this.setState({loading: true});
        req({
            method: 'put',
            url: url+ `/${id}`,
            data: values
        }).then(resp=> {
            this.setState({loading: false, scr: 'success', successType: 'commit'})
        }).catch(e=> {
            this.setState({loading: false});
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

    componentDidMount(){
        const {url,id}  = this.props;
        req({
            method: 'get',
            url: url + `/${id}`
        }).then(resp=> {
            let values = mapKeys(resp,function(value,key){
                return key.toLowerCase()
            });
            let result = {};
            for (let prop in values) {
                result[prop] = {value: values[prop]}
            }
            this.setState({data: result, loading: false})
        }).catch(e=> {
            if (e.status == 403) {
                let res = JSON.parse(e.response);
                this.setState({scr: 'fail', loading: false, failtext: res.text})
            } else {
                this.setState({scr: 'fail', loading: false})
            }
        })
    },

    render(){
        const {title} = this.props;
        let {data, loading, scr, failtext, successType} = this.state;
        const panelBar = <PanelBar>
            <Button onClick={this.back}>
                <Icon type="rollback"/>返回
            </Button>
        </PanelBar>;

        let content = {
            normal: <Editfrom data={data}
                              onCommit={this.handleCommit}
                              onSave={this.handleSave}
                              onFieldChange={this.handleFieldChange}/>,
            fail: <FailScr text={failtext}/>,
            success: <Success type={successType}/>
        };

        return <Panel className="swsjbqk-edit" toolbar={panelBar} title={title}>
            <Spin spinning={loading}>
                {content[scr]}
            </Spin>
        </Panel>

    }
});


module.exports = c;