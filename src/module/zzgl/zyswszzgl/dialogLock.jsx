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
        const {apiUrl,refreshList,keys} = this.props;
        const {setFieldsValue,validateFields} = this.props.form;
        validateFields((errors, values)=>{
            if (!!errors) {
                return;
            }
            const obj = {
                sdyy: values.sdyy,
                swsId: keys
            };
            this.setState({loading: true});
            req({
                url: apiUrl,
                type: 'json',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                headers: {'x-auth-token': token}
            }).then(resp=> {
                setFieldsValue({'sdyy': null});
                refreshList();
                this.setState({loading: false});
                this.props.onClose();
            }).fail(e=> {
                setFieldsValue({'sdyy': null});
                this.setState({loading: false});
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: '网络访问故障，请稍后尝试'
                });
                this.props.onClose();
            })
        })
    },
    handleClose(){
        this.props.form.setFieldsValue({'sdyy': null});
        this.props.onClose();
    },
    render(){
        const {getFieldProps} = this.props.form;
        const {visible,keys} = this.props;
        const sdyyProps = getFieldProps('sdyy', {
            rules: [
                {required: true, whitespace: true, message: '填写锁定原因'}
            ]
        });
        return <Form horizontal>
            <Modal className="zyswszzgl lock"
              visible={visible}
              style={{top: '100px'}}
              title="锁定税务师资质"
              confirmLoading={this.state.loading}
              okText="确认锁定" onOk={this.handleSubmit} onCancel={this.handleClose}>
                <div>
                    <p>已选择<em>{keys.length}</em>人</p>
                </div>
                <Row>
                    <Col span="24">
                        <FormItem
                          label="锁定原因">
                            <Input placeholder="请注明该税务师资质被锁定原因"
                                   autoComplete="off"
                                   type="textarea"
                                   rows={5} {...sdyyProps}/>
                        </FormItem>
                    </Col>
                </Row>
            </Modal>
        </Form>
    }
});
modal = createForm()(modal);
module.exports = modal;