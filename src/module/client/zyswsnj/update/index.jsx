import React from 'react'
import req from 'reqwest'
import config from 'common/configuration'
import auth from 'common/auth'
import { Col, Input, Row, Button, Icon, Form, Modal, Select, Checkbox, DatePicker } from 'antd'
import { SelectorYear, SelectorXZ, SelectorNames, SelectorXm } from 'component/compSelector'
import './style.css'

const API_URL = config.HOST + config.URI_API_PROJECT + '/add/zyswsnj1';
const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

let Updateswsnjb = React.createClass({
    getDefaultProps() {
        return {
            onSubmit: {}
        }
    },
    handleSubmit(ztdm) {
        const obj = this.props.data;
        var mp = {};
        let value = this.props.form.getFieldsValue()
        var date = new Date(value['SWSFZRSJ']);
        value['SWSFZRSJ'] = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        let arr = []
        for (var key in value) {
            if (!value[key]) {
                value[key] = null;
            }
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
        value.ztdm=ztdm;
        value['id'] = obj.ID;

        this.props.onSubmit(value);
    },

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },
    //Modal
    getInitialState() {
        return {
            visible: false, swsdata: {
                sws_id: this.props.data.sws_id,
                xb: this.props.data.xb,
                xl: this.props.data.xl,
                SRI: this.props.data.SRI,
                SFZH: this.props.data.SFZH,
                DWMC: this.props.data.dwmc,
                ZYZSBH: this.props.data.ZYZSBH,
                DHHM: this.props.data.DHHM,
                ZYZGZSBH: this.props.data.ZYZGZSBH,
                BAFS: this.props.data.BAFS,
                CZBL: this.props.data.CZBL,



            }
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



    handleCancel(e) {

        this.setState({
            visible: false
        });
    },
    //处理姓名下拉框改变事件
    handleXmChange(value) {
        this.props.form.setFieldsValue({ sws_id: value });
        req({
            url: API_URL + '/' + value,
            type: 'json',
            method: 'get',
            headers: { 'x-auth-token': auth.getToken() },
            contentType: 'application/json'
        }).then(resp => {
            this.setState({ swsdata: resp });
        }).fail(err => {
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




        const { getFieldProps } = this.props.form;
        const data = this.props.data;
        const obj1 = this.state.swsdata;


        var obj2 = {};
        var obj3 = {};
        var arr1 = [];
        var arr2 = [];

        if (data.ZJWGDM) {
            arr1 = data.ZJWGDM.split(',');

            for (var i = 0; i < arr1.length; i++) {
                obj2[arr1[i]] = true;
            }
        }

        if (data.NJWGDM) {
            arr2 = data.NJWGDM.split(',');

            for (var i = 0; i < arr2.length; i++) {
                obj3[arr2[i]] = true;
            }
        }

        return <div className="add">
            <div className="fix-table table-bordered table-striped" >
                <Form horizontal onSubmit={this.handleSubmit}>

                    <table>
                        <tbody>
                            <tr>
                                <td>姓名：</td>
                                <td><SelectorXm {...getFieldProps('sws_id', { initialValue: data.sws_id }) } onChange={this.handleXmChange}></SelectorXm></td>
                                <td>性别：{obj1.xb}</td>
                                <td>年度：<label {...getFieldProps('nd', {initialValue: data.nd }) }>{data.nd}</label></td>
                                <td rowSpan="6">照片</td>
                            </tr>
                            <tr>
                                <td>出生年月：</td>
                                <td>{obj1.SRI}</td>
                                <td>文化程度：</td>
                                <td>{obj1.xl}</td>
                            </tr>
                            <tr>
                                <td>身份证号：</td>
                                <td>{obj1.SFZH}</td>
                                <td>所在单位：</td>
                                <td>{obj1.DWMC}</td>

                            </tr>
                            <tr>
                                <td>联系电话：</td>
                                <td>{obj1.DHHM}</td>
                                <td>执业注册（备案）编号：</td>
                                <td>{obj1.ZYZSBH}</td>
                            </tr>
                            <tr>
                                <td>执业注册日期：</td>
                                <td>{data.ZYZCRQ}</td>
                                <td>出资比率：   </td>
                                <td>{data.CZBL}%</td>
                            </tr>
                            <tr>
                                <td>资格证书编号：</td>
                                <td>{obj1.ZYZGZSBH}</td>
                                <td>本年度报备份数：</td>
                                <td>{obj1.BAFS}</td>
                            </tr>



                            <tr className="add">
                                <th>自检情况：</th>
                                <th colSpan="4">违规条款(违规请打勾) </th>
                 
                            </tr>



                            <tr>
                                <td></td>
                                <td colSpan="3">允许或默认他人或本人名义作为税务师税务所出资人出资的</td>
                                <td><Checkbox {...getFieldProps('wg1', { initialValue:obj2['1'] , valuePropName: 'checked' }) }/></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td colSpan="3">同时在两个以上税务师事务所出资的</td>
                                <td><Checkbox {...getFieldProps('wg2', { initialValue:obj2['2'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td colSpan="3">允许或默认他人以本人名义接受税务师事务所其他出资人转让股份的</td>
                                <td><Checkbox {...getFieldProps('wg3', { initialValue:obj2['3'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>



                            <tr>
                                <td></td>
                                <td colSpan="3">同时在两个以上税务师事务所执业又坚持不改正的</td>
                                <td><Checkbox {...getFieldProps('wg4', { initialValue:obj2['4'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>


                            <tr>
                                <td></td>
                                <td colSpan="3">连续2年有不良职业记录的</td>
                                <td><Checkbox {...getFieldProps('wg5', { initialValue:obj2['5'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td colSpan="3">连续2年未参加年检的</td>
                                <td><Checkbox {...getFieldProps('wg6', { initialValue:obj2['6'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="3">无正当理由拒绝在规定年限内参加年检的</td>
                                <td><Checkbox {...getFieldProps('wg7', { initialValue:obj2['7'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="3">明知委托人对重要涉税事项的处理与国家税收法律、法规及有关规定相抵触，而不予指明</td>
                                <td><Checkbox {...getFieldProps('wg8', { initialValue:obj2['8'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td colSpan="3">明知委托人对重要涉税事项的处理会损害报告使用人或者其他利害关系人的合法权益，而予以隐瞒或者作不实的报告</td>
                                <td><Checkbox {...getFieldProps('wg9', { initialValue:obj2['9'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td colSpan="3">明知委托人对重要涉税事项的处理会导致报告使用人或者其他利害关系人产生重大误解，而不予以指明</td>
                                <td><Checkbox {...getFieldProps('wg10', { initialValue:obj2['10'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>


                            <tr>
                                <td></td>
                                <td colSpan="3">明知委托人对重要涉税事项有其他不实内容，而不予以证明</td>
                                <td><Checkbox {...getFieldProps('wg11', { initialValue:obj2['11'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td colSpan="3">执业期间，买卖委托人的股票、债券</td>
                                <td><Checkbox {...getFieldProps('wg12', { initialValue:obj2['12'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="3">索取、收受委托合同约定以外的酬金或者其他财务，或者利用执业之便，牟取其他不正当的利益</td>
                                <td><Checkbox {...getFieldProps('wg13', { initialValue:obj2['13'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td colSpan="3">允许他人以本人名义执业</td>
                                <td><Checkbox {...getFieldProps('wg14', { initialValue:obj2['14'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>


                            <tr>
                                <td></td>
                                <td colSpan="3">向税务机关工作人员行贿或者指使、诱导委托人行贿</td>
                                <td><Checkbox {...getFieldProps('wg15', { initialValue:obj2['15'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>


                            <tr>
                                <td></td>
                                <td colSpan="3">其他违反法律、行政法规的行为</td>
                                <td><Checkbox {...getFieldProps('wg16', { initialValue:obj2['16'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td colSpan="3">以个人名义承接业务或者收费的</td>
                                <td><Checkbox {...getFieldProps('wg17', { initialValue:obj2['17'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td colSpan="3">泄露委托人商业秘密的</td>
                                <td><Checkbox {...getFieldProps('wg18', { initialValue:obj2['18'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="3">利用职业之便，牟取不正当利益的</td>
                                <td><Checkbox {...getFieldProps('wg19', { initialValue:obj2['19'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="3">出具虚假涉税文书</td>
                                <td><Checkbox {...getFieldProps('wg20', { initialValue:obj2['20'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="3">违反税收法律、行政法规，造成委托人未缴或者少缴税款的</td>
                                <td><Checkbox {...getFieldProps('wg21', { initialValue:obj2['21'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td colSpan="3">未按规定缴纳个人会费</td>
                                <td><Checkbox {...getFieldProps('wg23', { initialValue:obj2['23'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>


                            <tr>
                                <td></td>
                                <td colSpan="3">未按规定办理个人登记、变更手续</td>
                                <td><Checkbox {...getFieldProps('wg24', { initialValue:obj2['24'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td colSpan="3">未参加继续教育情况</td>
                                <td><Checkbox {...getFieldProps('wg25', { initialValue:obj2['25'] , valuePropName: 'checked' }) }></Checkbox></td>
                            </tr>

                            <tr>
                                <td>年检总结: </td>
                                <td colSpan="4"><Input {...getFieldProps('ZJ', { initialValue: data.NJZJ }) } type="textarea" autosize /></td>
                            </tr>

                            <tr>
                                <td rowSpan="2">事务所负责人意见</td>
                                <td colSpan="2"><Input {...getFieldProps('SWSFZRYJ', { initialValue: data.SWSFZRYJ }) } type="textarea" autosize /></td>
                                <td colSpan="2">时间：<DatePicker {...getFieldProps('SWSFZRSJ', { initialValue: data.SWSFZRSJ }) } />
                                    负责人签名：<Input {...getFieldProps('SWSFZR', { initialValue: data.SWSFZR}) } style={{ width: "30%" }} /> </td>

                            </tr>





                        </tbody>


                        <tbody>
                                        <tr >
                                            <td></td>
                                            <td>
                                                <Button type="primary" onClick={this.handleSubmit.bind(this, 1)} loading={this.props.btnloading}> <Icon type="check" />保存</Button>
                                            </td>
                                            <td>
                                                <Button type="primary" onClick={this.showModal} loading={this.props.btnloading}> <Icon type="arrow-up" />提交</Button>
                                            </td>
                    
                                        </tr>
                                    </tbody>

                    </table>
                </Form>

            </div>
        </div>
    }
});


Updateswsnjb = Form.create()(Updateswsnjb);






module.exports = Updateswsnjb