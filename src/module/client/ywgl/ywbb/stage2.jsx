import React from 'react'
import {Form,Row,Col,Input,Button} from 'antd'
import Panel from 'component/compPanel'

const FormItem = Form.Item;
const createForm = Form.create;

let stage = React.createClass({
    save(){
        this.props.onSave();
    },
    commit(){
        this.props.onCommit();
    },
    back(){
        this.props.onStageChange(1)
    },
    render(){
        const { getFieldProps } = this.props.form;
        return <Panel title="确认事务所资料" className="stage">

            <Form horizontal form={this.props.form}>
                <Row>
                    <Col span="12">
                        <FormItem
                          labelCol={{span: 8}} wrapperCol={{span: 12}}
                          label="事务所名称">
                            <Input disabled  {...getFieldProps('dwmc')}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem
                          labelCol={{span: 8}} wrapperCol={{span: 12}}
                          label="事务所税务登记证号">
                            <Input disabled  {...getFieldProps('swdjhm')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem
                          labelCol={{span: 8}} wrapperCol={{span: 12}}
                          label="事务所电话">
                            <Input disabled  {...getFieldProps('dhua')}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem
                          labelCol={{span: 8}} wrapperCol={{span: 12}}
                          label="事务所传真">
                            <Input disabled  {...getFieldProps('czhen')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem
                          labelCol={{span: 8}} wrapperCol={{span: 12}}
                          label="电子邮件">
                            <Input disabled  {...getFieldProps('dzyj')}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem
                          labelCol={{span: 8}} wrapperCol={{span: 12}}
                          label="事务所网址">
                            <Input disabled  {...getFieldProps('wangzhi')}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem
                          labelCol={{span: 4}} wrapperCol={{span: 10}}
                          label="事务所地址">
                            <Input disabled  {...getFieldProps('dzhi')}/>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="6" offset="10">
                        <Button
                          size="large"
                          style={{marginRight:'16px'}}
                          onClick={this.back}>上一步</Button>
                        <Button
                          size="large"
                          style={{marginRight:'16px'}}
                          onClick={this.save}>保存</Button>
                        <Button
                          size="large"
                          type="primary"
                          onClick={this.commit}>报备</Button>

                    </Col>
                </Row>
            </Form>

        </Panel>

    }
});

stage = createForm({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(stage);

module.exports = stage;