import React from 'react'
import {Col, Input,Row,Button,Icon,Form,Modal } from 'antd'
import {SelectorYear,SelectorXZ} from 'component/compSelector'
import './style.css'

const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
let Addlrfpb = React.createClass({
    getDefaultProps(){
        return {
            onSubmit: {}
        }
    },
    handleSubmit(e) {
    e.preventDefault();
    var mp = {};
    let value=this.props.form.getFieldsValue()
    for(var key in value){
        if(!value[key]){
            value[key]=null;
        }
    }
    //console.log('收到表单值：', value);
    this.props.onSubmit(value);
  },

     handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },
    //Modal
   getInitialState() {
    return { visible: false };
  },
  showModal(e) {
    e.preventDefault();
    var mp={};
    let value=this.props.form.getFieldsValue()
     for(var key in value){
         if(!value[key]){
             value[key]=null;
         }
     }
    this.setState({
      visible: true,
      okValue:value,
    });
  },
  handleOk(e) {
    // console.log('点击了确定',this.state.okValue);
    this.props.handleOk(this.state.okValue)
    this.setState({
      visible: false
    });
  },
  handleCancel(e) {
    
    this.setState({
      visible: false
    });
  },

    render() {
        
         const { getFieldProps } = this.props.form;
           let obj =[{}];
         if(this.props.data.length!=0){
              obj = this.props.data;
         }; 
        return <div className="add">
        <div className="fix-table table-bordered table-striped" >
        <Form horizontal onSubmit={this.handleSubmit}>
            <table>
            
                
                <colgroup>
                    <col className ="col-2"></col>
                    <col className="col-5"></col>
                    <col className="col-2"></col>
                    <col className="col-4"></col>
                    <col className="col-3"></col>
                    <col className="col-3"></col>
                    <col className="col-3"></col>
                    <col className="col-2"></col>
                </colgroup>

                <tbody>
                    <tr>
                        <td>单位：</td>
                        <td>{obj[0].DWMC}</td>
                        <td>  <Col
                         
                          label="年度：">
                            <SelectorYear { ...getFieldProps('nd')}/>
                        </Col>
                           </td>
                      
                       
                         <td >    
                                <Col span="8" >负责人：</Col>
                                <Col span="14" offset="2" ><Input  {...getFieldProps('dwfzr')} />  </Col>     
                         </td>
                         <td >    
                                <Col span="6" >财会</Col>
                                <Col span="16" offset="2" ><Input  {...getFieldProps('ckfzr')} />  </Col>     
                         </td>
                         <td >    
                                <Col span="6" >复核</Col>
                                <Col span="16" offset="2" ><Input  {...getFieldProps('fhr')} />  </Col>     
                         </td>
                         <td >    
                                <Col span="6" >制表</Col>
                                <Col span="16" offset="2" ><Input  {...getFieldProps('zbr')} />  </Col>     
                         </td>
                         <td>单位：元</td> 
                       </tr>
                       
                        <tr>
                        <td colSpan="3" style={{textAlign:'center'}} >项目</td>
                        <td>行次</td>
                        <td colSpan="2">本年实际</td>
                        <td colSpan="2">上年实际</td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>一、净利润</td>
                        <td>1</td>
                        <td colSpan="2" ><Input  {...getFieldProps('jlr')} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('jlrupyear')} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>加：年初未分配利润</td>
                        <td>2</td>
                        <td colSpan="2" ><Input  {...getFieldProps('ncwfplr')} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('ncwfplrupyear')} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>其他转入</td>
                        <td>3</td>
                        <td colSpan="2" ><Input  {...getFieldProps('qtzr')} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('qtzrupyear')} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>二、可供分配的利润</td>
                        <td>4</td>
                        <td colSpan="2" ><Input  {...getFieldProps('kfplr')} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('kfplrupyear')} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>减：提取盈余公积</td>
                        <td>5</td>
                        <td colSpan="2" ><Input  {...getFieldProps('yygj')} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('yygjupyear')} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>提取职工奖励福利基金</td>
                        <td>6</td>
                        <td colSpan="2" ><Input  {...getFieldProps('jlfljj')} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('jlfljjupyear')} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>提取储备基金</td>
                        <td>7</td>
                        <td colSpan="2" ><Input  {...getFieldProps('cbjj')} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('cbjjupyear')} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>提取企业发展基金</td>
                        <td>8</td>
                        <td colSpan="2" ><Input  {...getFieldProps('qyfzjj')} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('qyfzjjupyear')} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>利润归还投资</td>
                        <td>9</td>
                        <td colSpan="2" ><Input  {...getFieldProps('lrghtz')} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('lrghtzupyear')} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>三、可供投资者分配的利润</td>
                        <td>10</td>
                        <td colSpan="2" ><Input  {...getFieldProps('tzzfplr')} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('tzzfplrupyear')} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>减：应付优先股股利</td>
                        <td>11</td>
                        <td colSpan="2" ><Input  {...getFieldProps('yxgl')} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('yxglupyear')} /> </td>
                       </tr>
                       
                        <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>应付普通股股利</td>
                        <td>12</td>
                        <td colSpan="2" ><Input  {...getFieldProps('ptgl')} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('ptglupyear')} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>转作资本（或股本）的普通股股利</td>
                        <td>13</td>
                        <td colSpan="2" ><Input  {...getFieldProps('zhptgl')} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('zhptglupyear')} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>四、未分配利润</td>
                        <td>14</td>
                        <td colSpan="2" ><Input  {...getFieldProps('wfplr')} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('wfplrupyear')} /> </td>
                       </tr>
                   
                    
                </tbody>
                
                 <tbody>
                    <tr >
                       <td></td>
                       
                        
                              <td>               
                        <Button type="primary" onClick={this.handleSubmit}> <Icon type="check"/>保存</Button>
                                      
                      </td>
                      
                       <td style={{textAlign:'center'}}>
                        
                         <Button type="primary" onClick={this.showModal}> <Icon type="arrow-up"/>提交</Button>
                                       <Modal title="你确定要提交吗？" visible={this.state.visible}
                                             onOk={this.handleOk} onCancel={this.handleCancel}>
                                                 <p>提交后就不能修改了！！！</p>
                                                 
                                          
        </Modal>
                        </td>
                        
                      <td>
                        <Button type="primary" onClick={this.handleReset}><Icon type="cross"/>重置</Button>
                      
                       </td>
                      
                    </tr>
                </tbody>
               
            </table>
            </Form>

        </div>
        </div>
    }
});
Addlrfpb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(Addlrfpb);


   

    

 

module.exports = Addlrfpb