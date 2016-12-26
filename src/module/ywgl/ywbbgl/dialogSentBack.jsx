import React from 'react'
import {Modal, Form, Col, Row, Button, Input,notification} from 'antd'
import req from 'reqwest'
import auth from 'common/auth'

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
        const {setFieldsValue,getFieldsValue} = this.props.form;
        const values = getFieldsValue();
        const obj = {
            lx:2, //更新操作类型2为退回
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
            setFieldsValue({'thyy': null});
            refreshList();
            this.setState({loading: false});
            this.props.onClose();
        }).fail(e=> {
            setFieldsValue({'thyy': null});
            this.setState({loading: false});
            notification.error({
                duration: 3,
                message: '操作失败',
                description: '可能网络访问原因，请稍后尝试'
            });
            this.props.onClose();
        })

    },
    handleClose(){
        this.props.form.setFieldsValue({'thyy': null});
        this.props.onClose();
    },
    render(){
        const {getFieldProps} = this.props.form;
        const {visible,data} = this.props;
        return <Form horizontal >
            <Modal
              visible = {visible}
              style={{top: '100px'}}
              title="退回业务报备"
              confirmLoading={this.state.loading}
              okText="确认退回" onOk={this.handleSubmit} onCancel={this.handleClose}>
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
                            <td>协议金额 :</td>
                            <td>{data.xyje}</td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <Row>
                    <Col span="24">
                        <FormItem
                          label="退回原因">
                            <Input placeholder="请注明该业务被退回原因"
                                   autoComplete="off"
                                   type="textarea"
                                   rows={5} {...getFieldProps('thyy')}/>
                        </FormItem>
                    </Col>
                </Row>
            </Modal>
        </Form>
    }
});
modal = createForm()(modal);
module.exports = modal;