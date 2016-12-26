import React from 'react'
import {  DatePicker,Modal,Form, Input, Select,Table, Icon,Tabs,Button,Row,Col,message,Checkbox }from 'antd'
import {SelectorCS} from 'component/compSelector'

const FormItem = Form.Item;
const createForm = Form.create;

function noop() {
  return false;
}
let searchForm = React.createClass({
    getDefaultProps(){
        return {
            onSubmit: {},
            rest:true
        }
    },
    getInitialState() {
    return {
      checked1: false,
      checked2: false,
    };
  },
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
        this.setState({ checked1: false,checked2: false });
    },
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (!!errors) {
               
                return;
              }
        let value = this.props.form.getFieldsValue();
        this.props.onSubmit(value);
        });
    },

      checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
          validateFields(['password2'], { force: true });
        }
        callback();
      },

      checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('password1')) {
          callback('两次输入密码不一致！');
        } else {
          callback();
        }
      },
      checkboxfs(rule, value, callback) {
        if (value==true||value==false) {
         this.setState({ checked2: !this.state.checked2 });
        };
        callback();
      },
      checkboxzc(rule, value, callback) {
        if (value==true||value==false) {
         this.setState({ checked1: !this.state.checked1 });
         };
         callback();
      },

     componentWillReceiveProps(nextProps){//检测父组件state变化
            if (this.props.rest!=nextProps.rest) {
                this.props.form.resetFields();
                this.setState({ checked1: false,checked2: false });
            };
        },
    render() {
    const { getFieldProps } = this.props.form;
    const passwdProps = getFieldProps('password1', {
      rules: [
        { required: true, whitespace: true,min: 6, message: '密码至少为 6 个字符' },
        { validator: this.checkPass },
      ],
    });
    const rePasswdProps = getFieldProps('password2', {
      rules: [{
        required: true,
        whitespace: true,
        min: 6,
        message: '请再次输入密码',
      }, {
        validator: this.checkPass2,
      }],
    });
    const checkbox1 = getFieldProps('iswdfs', {
        valuePropName: 'checked',
      rules: [
        { validator: this.checkboxfs },
      ],
    });
    const checkbox2 = getFieldProps('iswdzc', {
        valuePropName: 'checked',
      rules: [
        { validator: this.checkboxzc },
      ],
    });
    const xmProps = getFieldProps('names', {
      rules: [
        { required: true, message: '请填写姓名' },
      ],
    });
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    return <div className="swslogin-form">
      <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
        <FormItem
          {...formItemLayout}
          label="单位名称" >
          <Input {...getFieldProps('dwmc', { rules: [ { required: true, min: 5, message: '名称至少为 5 个字符' }]})}
           placeholder="请输入单位名称" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="账号名" >
          <Input {...getFieldProps('uname', { rules: [ { required: true, min: 5, message: '至少为 5 个字符' }]})} 
          placeholder="用于登陆系统的账号名称" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="用户名" >
          <Input {...getFieldProps('userName', { rules: [ { required: true, min: 5, message: '至少为 5 个字符' }]})}  />
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback >
          <Input {...passwdProps} type="password" autoComplete="off"
            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="确认密码"
          hasFeedback>
          <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="姓名">
          <Input {...xmProps}  />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="身份证号">
          <Input {...getFieldProps('idcard')}  />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="移动电话">
          <Input {...getFieldProps('phone',{rules: [{'required': true,min: 11, message: '请输入11位手机号码'}]})}  />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="所在城市">
          <SelectorCS {...getFieldProps('cs',{rules: [{'required': true,message: '请选择城市'}]})}  />
        <p><Checkbox {...checkbox1} disabled={this.state.checked1} >是否外省主所在本省设立分所</Checkbox></p>
        <p><Checkbox {...checkbox2} disabled={this.state.checked2} >是否外省事务所在本省办理业务用户</Checkbox></p>
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" htmlType="submit" loading={this.props.loading} >确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    </div>
  },
});
searchForm = createForm()(searchForm);

module.exports = searchForm;