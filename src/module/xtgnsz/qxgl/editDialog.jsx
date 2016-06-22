import React from 'react'
import {Button, Form, Input, Modal} from 'antd'

const FormItem = Form.Item;

let dialog = React.createClass({
    handleSubmit(){
        this.props.onSubmit(this.props.form.getFieldsValue())
    },
    render(){
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18}
        };
        return <div className="qxgl-dialog">
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="名称">
                    <Input  {...getFieldProps('name')}  />
                </FormItem>
                <FormItem {...formItemLayout} label="描述">
                    <Input  {...getFieldProps('description')}  />
                </FormItem>
            </Form>
        </div>

    }
});
dialog = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(dialog);

module.exports = dialog;


