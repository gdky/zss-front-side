import React from 'react'
import { Popover, Button, InputNumber,notification,Form,Row,Icon} from 'antd'
import req from 'reqwest'
import config from 'common/configuration'
import auth from 'common/auth'

const FormItem = Form.Item;

let pop = React.createClass({
    getInitialState(){
        return {
            visible: false
        }
    },
    hide() {
        this.props.form.resetFields();
        this.setState({
            visible: false
        });
    },
    handleVisibleChange(visible) {
        this.setState({visible});
    },
    handleOk(){
        const token = auth.getToken();
        const {id,apiUrl,refreshList} = this.props;
        let value  = this.props.form.getFieldsValue();
        if(value.value >=0 ){
            req({
                url: apiUrl + id,
                type: 'json',
                method: 'put',
                contentType: 'application/json',
                data: JSON.stringify(value),
                headers: {'x-auth-token': token}
            }).then(resp=> {
                refreshList();
                this.hide();
            }).fail(e=> {
                this.hide();
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: '可能网络访问原因，请稍后尝试'
                });
            })
        }else{
            this.hide();
        }
    },

    handleCancel(){
        this.hide();
    },
    render(){
        const {getFieldProps,setFieldsValue} = this.props.form;
          const content = <Form>
              <Row>
                  <FormItem>
                      <InputNumber style={{width:'100%'}} {...getFieldProps('value')}/>
                  </FormItem>
              </Row>
              <Row style={{textAlign:'right'}}>
                  <Button type="ghost" size="small" onClick={this.handleCancel}>取消</Button>&nbsp;&nbsp;&nbsp;
                  <Button type="primary" size="small" onClick={this.handleOk}>确认</Button>
              </Row>
        </Form>;

        return <Popover trigger="click"
                        content={content}
                        visible={this.state.visible}
                        onVisibleChange={this.handleVisibleChange}>
            <a><Icon type="edit" /></a>
        </Popover>
    }
});
pop = Form.create()(pop);

module.exports = pop;