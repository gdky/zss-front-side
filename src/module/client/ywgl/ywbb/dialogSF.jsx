import React from 'react'
import {Modal, Form, Col, Row, Button, Input,InputNumber,notification} from 'antd'
import req from 'reqwest'
import auth from 'common/auth'
import utils from 'common/utils'

const FormItem = Form.Item;
const createForm = Form.create;


let modal = React.createClass({
    getInitialState(){
        return {
            loading: false
        }
    },
    handleSubmit(){
        const token = auth.getToken();
        const {data,apiUrl,refreshList} = this.props;
        const {setFieldsValue,validateFields} = this.props.form;
        validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            values = utils.transEmpty2Null(values);
            const obj = {
                lx:4, //更新类型4为收费操作
                data:values
            };
            this.setState({loading: true});
            req({
                url: apiUrl + data.id,
                type: 'json',
                method: 'put',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                headers: {'x-auth-token': token}
            }).then(resp=> {
                setFieldsValue({fphm: null,sjsqje:null,fpje:null});
                refreshList();
                this.setState({loading: false});
                this.props.onClose();
            }).fail(e=> {
                setFieldsValue({fphm: null,sjsqje:null,fpje:null});
                this.setState({loading: false});
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: '网络故障，数据无法更新'
                });
                this.props.onClose();
            })
        });


    },
    handleClose(){
        this.props.form.setFieldsValue({fphm: null,sjsqje:null});
        this.props.onClose();
    },
    render(){
        const {getFieldProps} = this.props.form;
        const {visible,data} = this.props;

        const sjsqjeProps = getFieldProps('sjsqje', {
            rules: [
                {required: true, type: 'number', message: '必填项'}
            ]
        });
        const fpjeProps = getFieldProps('fpje', {
            rules: [
                {required: true, type: 'number', message: '必填项'}
            ]
        });
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
        };
        return <Form horizontal >
            <Modal
                visible = {visible}
                style={{top: '100px'}}
                title="业务实际收费处理"
                confirmLoading={this.state.loading}
                okText="确认收费" onOk={this.handleSubmit} onCancel={this.handleClose}>
                <div className="fix-table no-border">
                    <table>
                        <tbody>
                        <tr>
                            <td>报备号码 :</td>
                            <td>{data.bbhm}</td>
                        </tr>
                        <tr>
                            <td>委托企业 :</td>
                            <td>{data.wtdw}</td>
                        </tr>
                        <tr>
                            <td>业务类型 :</td>
                            <td>{data.ywlx}</td>
                        </tr>
                        <tr>
                            <td>报备日期 :</td>
                            <td>{data.bbrq}</td>
                        </tr>
                        <tr>
                            <td>最后修改日期 :</td>
                            <td>{data.zbrq}</td>
                        </tr>
                        <tr>
                            <td>协议金额 :</td>
                            <td>{data.xyje}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <Row style={{marginTop:'8px'}}>
                    <Col span="24">
                        <FormItem {...layout}
                                  label="实际收取金额">
                            <InputNumber style={{width:'70%'}} min={0} max={9999999999.99} step={0.01} {...sjsqjeProps}/>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem {...layout}
                            label="发票金额">
                            <InputNumber style={{width:'70%'}} min={0} max={9999999999.99} step={0.01} {...fpjeProps}/>
                        </FormItem>
                    </Col>

                    <Col span="24">
                        <FormItem {...layout}
                            label="发票号码，多个号码以','分隔">
                            <Input placeholder="发票号码" {...getFieldProps('fphm')}/>
                        </FormItem>
                    </Col>

                </Row>
            </Modal>
        </Form>
    }
});
modal = createForm({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = { value: props.data[prop] }
        }
        return result;
    }
})(modal);
module.exports = modal;