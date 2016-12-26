import React from 'react'
import {Modal, Form, Col, Row, Button, Input,Radio,notification} from 'antd'
import req from 'reqwest'
import auth from 'common/auth'
import utils from 'common/utils'

const FormItem = Form.Item;
const createForm = Form.create;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


let modal = React.createClass({
    getInitialState(){
        return {
            loading: false,
            qtyy:true
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
            let thyy = {
                '1':'收费未达成一致',
                '2':'调整事项未达成一致',
                '3':values.qtyy
            };

            const obj = {
                lx:8, //类型4为申请退回操作
                data:{sqthyy:thyy[values.thyy_dm]}
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
                setFieldsValue({thyy_dm:'1',qtyy:null});
                refreshList();
                this.setState({loading: false});
                this.props.onClose();
            }).fail(e=> {
                setFieldsValue({thyy_dm:'1',qtyy:null});
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
    handleChange(e){
        if(e.target.value == '3'){
            this.setState({qtyy: false })
        }else{
            this.setState({qtyy: true })
        }
    },
    handleClose(){
        this.props.form.setFieldsValue({thyy_dm:'1',qtyy:null});
        this.props.onClose();
    },
    checkQtyy(rule, value, callback){
        let sqthyy = this.props.form.getFieldValue('thyy');
        if (sqthyy == '3' && (!value || !value.trim())) {
            callback("必填项");
        } else {
            callback()
        }
    },
    render(){
        const {getFieldProps} = this.props.form;
        const {visible,data} = this.props;

        const qtyyProps = getFieldProps('qtyy', {
            rules: [
                {validator: this.checkQtyy}
            ]
        });
        return <Form horizontal >
            <Modal
                visible = {visible}
                style={{top: '100px'}}
                title="业务退回申请"
                confirmLoading={this.state.loading}
                okText="提交退回申请" onOk={this.handleSubmit} onCancel={this.handleClose}>
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
                        <FormItem label="申请退回原因">
                        <RadioGroup  {...getFieldProps('thyy_dm', {
                            initialValue: '1',
                            onChange:this.handleChange
                        })}>
                            <RadioButton value="1">收费未达成一致</RadioButton>
                            <RadioButton value="2">调整事项未达成一致</RadioButton>
                            <RadioButton value="3">其他</RadioButton>
                        </RadioGroup>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem >
                            <Input type="textarea" placeholder="填写其他原因" disabled={this.state.qtyy} {...qtyyProps}/>
                        </FormItem>
                    </Col>
                </Row>
            </Modal>
        </Form>
    }
});
modal = createForm()(modal);
module.exports = modal;