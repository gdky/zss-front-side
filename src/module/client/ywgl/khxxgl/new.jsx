import React from 'react'
import Panel from 'component/compPanel'
import {Button, Icon, Form, Input, notification, Select, Row, Col,message} from 'antd';
import config from 'common/configuration'
import auth from 'common/auth'
import req from 'reqwest'
import utils from 'common/utils'


const FormItem = Form.Item;
const createForm = Form.create;

const token = auth.getToken();
const JG_ID = auth.getJgid();
const CUSTOMER_URL = config.HOST + config.URI_API_PROJECT + '/customers';

const updateAction = {
    //新增客户信息
    add: function (param) {
        return req({
            url: CUSTOMER_URL,
            method: 'post',
            type: 'json',
            contentType: 'application/json',
            data: JSON.stringify(param),
            headers: {'x-auth-token': token}
        })
    },
    //修改客户信息
    update: function (param) {
        return req({
            url: CUSTOMER_URL + '/' + param.ID,
            method: 'put',
            type: 'json',
            contentType: 'application/json',
            data: JSON.stringify(param),
            headers: {'x-auth-token': token}
        })
    }
};

//根据不同类型分别显示新增、修改标题
const titelType = {
    add: '新增',
    update: '修改'
};


//定义客户信息录入表单
let EditForm = React.createClass({
    getInitialState(){
        return {
            updating: false
        }
    },
    getDefaultProps(){
        return {
            onSubmit: {}
        }
    },
    setFinished(boolean){
        this.props.onSaved(boolean);
    },
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },
    checkNsrsbh(rule, value, callback){
        const {getFieldValue} = this.props.form;
        if (!value && !getFieldValue("NSRSBHDF")) {
            callback("纳税人识别号和地方识别号至少要填一项")
        } else {
            callback();
        }
    },
    checkNsrsbhdf(rule, value, callback){
        const {getFieldValue} = this.props.form;
        if (!value && !getFieldValue("NSRSBH")) {
            callback("纳税人识别号和地方识别号至少要填一项")
        }else {
            callback();
        }
    },
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll({force: true}, (errors, values) => {
            if (!!errors) {
                return;
            }
            let value = this.props.form.getFieldsValue();
            value = utils.transEmpty2Null(value);
            value.JG_ID = JG_ID;
            value.ID = this.props.data.ID;
            updateAction[this.props.type](value).then(resp => {
                this.setFinished(true);
                this.props.form.resetFields();
                if(resp.code == '200' || resp.code =='201'){
                    notification.success({
                        duration: 2,
                        message: '修改成功',
                        description: '客户信息已保存'
                    });
                    this.props.refresh();
                }else {
                    notification.error({
                        duration: 10,
                        message: '修改失败',
                        description: resp.text
                    });
                }

            }).fail(e => {
                message.error('网络故障');
            });
        })

    },
    handleUpdateCancel(){
        this.props.onReset();
    },
    render(){
        let title = titelType[this.props.type] + '客户信息';
        const {getFieldProps} = this.props.form;
        const dwmcProps = getFieldProps('DWMC', {
            rules: [
                {required: true, whitespace: true, message: '请填写客户单位名称'}
            ]
        });
        const nsrsbhProps = getFieldProps('NSRSBH', {
            rules: [
                {validator: this.checkNsrsbh}
            ]
        });
        const nsrsbhdfProps = getFieldProps('NSRSBHDF', {
            rules: [
                {validator: this.checkNsrsbhdf}
            ]
        });
        const lxrProps = getFieldProps('LXR', {
            rules: [
                {required: true, whitespace: true, message: '请填写联系人'}
            ]
        });
        return <Panel title={title}>
            <div className="new-form">
                <Form horizontal onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span="9">
                            <FormItem
                                labelCol={{span: 7}} wrapperCol={{span: 15}}
                                label="单位名称"
                                required={true}>
                                <Input placeholder="单位名称" {...dwmcProps}/>
                            </FormItem>
                        </Col>
                        <Col span="14">
                            <FormItem
                                labelCol={{span: 6}} wrapperCol={{span: 18}}
                                label="单位地址">
                                <Input placeholder="单位地址" {...getFieldProps('DWDZ')}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="9">
                            <FormItem
                                labelCol={{span: 7}} wrapperCol={{span: 15}}
                                label="纳税人识别号"
                                required>
                                <Input placeholder="纳税人识别号" {...nsrsbhProps}/>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem
                                labelCol={{span: 8}} wrapperCol={{span: 15}}
                                label="地税税务登记证号">
                                <Input placeholder="地税税务登记证号" {...nsrsbhdfProps}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="9">
                            <FormItem
                                labelCol={{span: 7}} wrapperCol={{span: 15}}
                                label="联系人">
                                <Input placeholder="联系人" {...lxrProps}/>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem
                                labelCol={{span: 8}} wrapperCol={{span: 15}}
                                label="联系电话">
                                <Input placeholder="联系电话" {...getFieldProps('LXDH')}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="4" offset="20">

                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{float: 'right'}}
                                size="large"
                                loading={this.state.updating}>保存</Button>

                            {this.props.type == 'update' ?
                                <Button type="ghost"
                                        style={{float: 'right', marginRight: '16px'}}
                                        size="large"
                                        onClick={this.handleUpdateCancel}>取消</Button> : null}
                        </Col>
                    </Row>
                </Form>
            </div>
        </Panel>
    }
});
EditForm = createForm({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(EditForm);

module.exports = EditForm;