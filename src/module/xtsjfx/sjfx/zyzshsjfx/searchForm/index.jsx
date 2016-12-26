import React from 'react'
import {Row,Col,Form,Button,Input,Modal} from 'antd'
import {SelectorJg} from 'component/compSelector'

const FormItem = Form.Item;
const createForm = Form.create;

let searchForm = React.createClass({
    getInitialState() { //初始化State状态，使用传入参数
    return {
        visible:true
      };
    },
    getDefaultProps(){
        return {
            onSubmit: {}
        }
    },
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },
    handleSubmit(e){
        e.preventDefault();
        console.log('a');
        let value = this.props.form.getFieldsValue();
        this.props.onSubmit(value);
    },

    handleCancel(e) {
    this.props.handleCancel();
  },

    render(){
        const footer=<div>
        <Button type="primary" htmlType="submit" className="query"  onClick={this.handleSubmit}>搜索</Button>
        <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </div>;
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20}
        };
        return <Modal title="查询" wrapClassName="vertical-center-modal" visible={true} footer={footer} onCancel={this.handleCancel} >
            <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
                        <Row>
                        <Col span="24">
                        <FormItem
                            {...formItemLayout}
                            label="姓名">
                            <Input placeholder="姓名" {...getFieldProps('XMING')}/>
                        </FormItem>
                        </Col>
                        </Row>
                        <Row>
                        <Col span="24">
                        <FormItem
                            {...formItemLayout}
                            label="执业证书号">
                            <Input placeholder="执业证书号" {...getFieldProps('ZYZSBH')}/>
                        </FormItem>
                        </Col>
                        </Row>
                        <Row>
                        <Col span="24">
                        <FormItem
                            {...formItemLayout}
                            label="所在单位">
                            <SelectorJg placeholder="所在单位" {...getFieldProps('ID')}/>
                        </FormItem>
                        </Col>
                        </Row>
            </Form>
        </Modal>
    }
});
searchForm = createForm()(searchForm);

module.exports = searchForm;