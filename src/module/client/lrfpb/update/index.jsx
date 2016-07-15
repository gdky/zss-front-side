import React from 'react'
import {Col, Input,Row,Button,Icon,Form,Modal,Select } from 'antd'
import {SelectorYear,SelectorXZ} from 'component/compSelector'
import './style.css'

const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
 
let Updatelrfpb = React.createClass({
    getDefaultProps(){
        return {
            onSubmit: {}
        }
    },
    handleSubmit(e) {
    const obj = this.props.data1;
    e.preventDefault();
    var mp = {};
    let value=this.props.form.getFieldsValue()
    for(var key in value){
        if(!value[key]){
            value[key]=null;
        }
    }

    value.id = obj.ID;
      
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
    const obj = this.props.data1;
    value.id = obj.ID;   
    value.jg_id=obj.JG_ID;
     
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
         const data = this.props.data1;
        
       
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
                        <td>{data.DWMC}</td>
                        <td>  <Col
                         
                          label="年度：">
                            <SelectorYear { ...getFieldProps('nd', { initialValue:data.ND })}/>
                        </Col>
                           </td>
                      
                       
                         <td >    
                                <Col span="8" >负责人：</Col>
                                <Col span="14" offset="2" ><Input  {...getFieldProps('dwfzr', { initialValue:data.DWFZR })} />  </Col>     
                         </td>
                         <td >    
                                <Col span="6" >财会</Col>
                                <Col span="16" offset="2" ><Input  {...getFieldProps('ckfzr', { initialValue:data.CKFZR })} />  </Col>     
                         </td>
                         <td >    
                                <Col span="6" >复核</Col>
                                <Col span="16" offset="2" ><Input  {...getFieldProps('fhr', { initialValue:data.FHR })} />  </Col>     
                         </td>
                         <td >    
                                <Col span="6" >制表</Col>
                                <Col span="16" offset="2" ><Input  {...getFieldProps('zbr', { initialValue:data.ZBR })} />  </Col>     
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
                        <td colSpan="2" ><Input  {...getFieldProps('jlr', { initialValue:data.JLR })} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('jlrupyear', { initialValue:data.JLRUPYEAR })} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>加：年初未分配利润</td>
                        <td>2</td>
                        <td colSpan="2" ><Input  {...getFieldProps('ncwfplr', { initialValue:data.NCWFPLR })} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('ncwfplrupyear', { initialValue:data.NCWFPLRUPYEAR })} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>其他转入</td>
                        <td>3</td>
                        <td colSpan="2" ><Input  {...getFieldProps('qtzr', { initialValue:data.QTZR })} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('qtzrupyear', { initialValue:data.QTZRUPYEAR })} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>二、可供分配的利润</td>
                        <td>4</td>
                        <td colSpan="2" ><Input  {...getFieldProps('kfplr', { initialValue:data.KFPLR })} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('kfplrupyear', { initialValue:data.KFPLRUPYEAR })} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>减：提取盈余公积</td>
                        <td>5</td>
                        <td colSpan="2" ><Input  {...getFieldProps('yygj', { initialValue:data.YYGJ })} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('yygjupyear', { initialValue:data.YYGJUPYEAR })} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>提取职工奖励福利基金</td>
                        <td>6</td>
                        <td colSpan="2" ><Input  {...getFieldProps('jlfljj', { initialValue:data.JLFLJJ })} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('jlfljjupyear', { initialValue:data.JLFLJJUPYEAR })} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>提取储备基金</td>
                        <td>7</td>
                        <td colSpan="2" ><Input  {...getFieldProps('cbjj', { initialValue:data.CBJJ })} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('cbjjupyear', { initialValue:data.CBJJUPYEAR })} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>提取企业发展基金</td>
                        <td>8</td>
                        <td colSpan="2" ><Input  {...getFieldProps('qyfzjj', { initialValue:data.QYFZJJ })} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('qyfzjjupyear', { initialValue:data.QYFZJJUPYEAR })} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>利润归还投资</td>
                        <td>9</td>
                        <td colSpan="2" ><Input  {...getFieldProps('lrghtz', { initialValue:data.LRGHTZ })} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('lrghtzupyear', { initialValue:data.LRGHTZUPYEAR })} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>三、可供投资者分配的利润</td>
                        <td>10</td>
                        <td colSpan="2" ><Input  {...getFieldProps('tzzfplr', { initialValue:data.TZZFPLR })} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('tzzfplrupyear', { initialValue:data.TZZFPLRUPYEAR })} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>减：应付优先股股利</td>
                        <td>11</td>
                        <td colSpan="2" ><Input  {...getFieldProps('yxgl', { initialValue:data.YXGL })} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('yxglupyear', { initialValue:data.YXGLUPYEAR })} /> </td>
                       </tr>
                       
                        <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>应付普通股股利</td>
                        <td>12</td>
                        <td colSpan="2" ><Input  {...getFieldProps('ptgl', { initialValue:data.PTGL })} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('ptglupyear', { initialValue:data.PTGLUPYEAR })} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>转作资本（或股本）的普通股股利</td>
                        <td>13</td>
                        <td colSpan="2" ><Input  {...getFieldProps('zhptgl', { initialValue:data.ZHPTGL })} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('zhptglupyear', { initialValue:data.ZHPTGLUPYEAR })} /> </td>
                       </tr>
                       
                       <tr>
                        <td  colSpan="3" style={{textAlign:'center'}}>四、未分配利润</td>
                        <td>14</td>
                        <td colSpan="2" ><Input  {...getFieldProps('wfplr', { initialValue:data.WFPLR })} /> </td>
                        <td colSpan="2"><Input  {...getFieldProps('wfplrupyear', { initialValue:data.WFPLRUPYEAR })} /> </td>
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
                       
                      
                       </td>
                      
                    </tr>
                </tbody>
               
            </table>
            </Form>

        </div>
        </div>
    }
});


Updatelrfpb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(Updatelrfpb);
   

    

 

module.exports = Updatelrfpb