import React from 'react'
import {Modal, Form, Col, Row, Button, Input,Radio,notification} from 'antd'
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

            const obj = {
                lx:10, //类型10为申请启用操作
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
                setFieldsValue({sqqyly:null});
                refreshList();
                this.setState({loading: false});
                this.props.onClose();
            }).fail(e=> {
                setFieldsValue({sqqyly:null});
                this.setState({loading: false});
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: '网络访问故障'
                });
                this.props.onClose();
            })
        });


    },

    handleClose(){
        this.props.form.setFieldsValue({sqqyly:null});
        this.props.onClose();
    },

    render(){
        const {getFieldProps} = this.props.form;
        const {visible,data} = this.props;

        const sqqylyProps = getFieldProps('sqqyly', {
            rules: [
                {required: true, whitespace: true, message: '必填项'}
            ]
        });
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
        };
        return <Form horizontal >
            <Modal
                visible = {visible}
                style={{top: '100px'}}
                title="业务启用申请"
                confirmLoading={this.state.loading}
                okText="提交启用申请" onOk={this.handleSubmit} onCancel={this.handleClose}>
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
                            <td>事务所 :</td>
                            <td>{data.swsmc}</td>
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
                        <FormItem {...layout} label="启用原因"  >
                            <Input type="textarea" placeholder="填写申请理由"  {...sqqylyProps}/>
                        </FormItem>
                    </Col>
                </Row>
            </Modal>
        </Form>
    }
});
modal = createForm()(modal);
module.exports = modal;