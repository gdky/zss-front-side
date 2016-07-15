import React from 'react'
import {Col, Input,Row,Button,Icon,Form,Modal,Select,DatePicker  } from 'antd'
import {SelectorYear,SelectorXZ,SelectorJGXZ,SelectorCS} from 'component/compSelector'
import './style.css'

const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

Date.prototype.Format = function (fmt) { //时间格式化函数
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));//补0处理
    return fmt;
}
 
let Updateswsjbb = React.createClass({
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
        if(Object.prototype.toString.call(value[key])=="[object Date]"){//时间格式化
                    var dd = value[key].Format("yyyy-MM-dd");
                    value[key]=dd;
                }
   
    }

    value.id = obj.ID;
    value.jg_id=obj.JG_ID;
      
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
         if(Object.prototype.toString.call(value[key])=="[object Date]"){//时间格式化
                    var dd = value[key].Format("yyyy-MM-dd");
                    value[key]=dd;
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
                    <col className ="col-3"></col>
                    <col className="col-3"></col>
                    <col className="col-3"></col>
                    <col className="col-3"></col>
                    <col className ="col-3"></col>
                    <col className ="col-3"></col>  
                    <col className ="col-3"></col>
                    <col className ="col-3"></col>                 
                </colgroup>
                <tbody>
                    <tr>
                        <td colSpan="3">单位：{data.DWMC}</td>                                                                                              
                        <td  >  <Col 
                          label="年度：">
                            <SelectorYear  { ...getFieldProps('nd', { initialValue:data.ND})}/>
                        </Col>
                           </td>
                           <td >制表人：<Input   {...getFieldProps('tianbiaoren', { initialValue:data.TIANBIAOREN})}/> </td>
                           <td >所长：<Input   {...getFieldProps('suozhang', { initialValue:data.SUOZHANG})}/> </td> 
                       <td colSpan="2">单位：万元、人</td>
                    </tr>
                    
                      <tr>
                        <td width="11%" style={{textAlign:'center'}} >组织形式</td>
                        <td width="14%" >  <Col 
                          label="选择：">
                            <SelectorJGXZ  { ...getFieldProps('jgxz_dm', { initialValue:data.jgxzdm})}/>
                        </Col></td>
                        <td style={{textAlign:'center'}} >法人</td>                       
                        <td ><Input   {...getFieldProps('frdbxm', { initialValue:data.FRDBXM})}/> </td>
                        <td style={{textAlign:'center'}} >股东人数</td>
                        <td ><Input   {...getFieldProps('czrs', { initialValue:data.CZRS})}/> </td>
                        <td style={{textAlign:'center'}} >人员总数</td>
                         <td ><Input   {...getFieldProps('ryzs', { initialValue:data.RYZS})}/> </td>     
                    </tr>
                    
                      <tr>
                        <td width="11%" style={{textAlign:'center'}} >执业人数</td> 
                        <td ><Input disabled  {...getFieldProps('zyzcswsrs', { initialValue:data.ZYZCSWSRS})}/> </td>                     
                        <td style={{textAlign:'center'}} >资产总额</td>                       
                        <td ><Input   {...getFieldProps('zcze', { initialValue:data.ZCZE})}/> </td>
                        <td style={{textAlign:'center'}} >注册资金</td>
                        <td ><Input   {...getFieldProps('zczj', { initialValue:data.ZCZJ})}/> </td>
                        <td style={{textAlign:'center'}} >收入总额</td>
                         <td ><Input   {...getFieldProps('srze', { initialValue:data.SRZE})}/> </td>     
                    </tr>
                    
                     <tr>
                        <td width="11%" style={{textAlign:'center'}} >利润总额</td> 
                        <td ><Input disabled  {...getFieldProps('lrze', { initialValue:data.LRZE})}/> </td>                     
                        <td style={{textAlign:'center'}} >机构所在地</td>                       
                         <td  >  <Col 
                          label="选择：">
                            <SelectorCS  { ...getFieldProps('cs_dm', { initialValue:data.csdm})}/>
                        </Col></td>
                        <td style={{textAlign:'center'}} >委托户数</td>
                        <td ><Input   {...getFieldProps('wths', { initialValue:data.WTHS})}/> </td>
                         <td style={{textAlign:'center'}} >合伙人数</td>
                        <td ><Input   {...getFieldProps('hhrs', { initialValue:data.HHRS})}/> </td>
                    </tr>
                     <tr>
                        <td  style={{textAlign:'center'}} >运营资金</td> 
                        <td ><Input   {...getFieldProps('yysr', { initialValue:data.YYSR})}/> </td> 
                        <td></td>     
                        <td></td>  
                        <td></td>  
                        <td></td>  
                        <td></td>  
                        <td></td>                 
                       
                    </tr>
                     
                    
                </tbody>
                
                 <tbody>
                    <tr >
                       
                              <td  colSpan="3" style={{textAlign:'center'}}>               
                        <Button type="primary" onClick={this.handleSubmit}> <Icon type="check"/>保存</Button>
                         </td>
                                      
                     
                      
                       
                         <td  colSpan="2" style={{textAlign:'center'}}> 
                         <Button type="primary" onClick={this.showModal}> <Icon type="arrow-up"/>提交</Button>
                                       <Modal title="你确定要提交吗？" visible={this.state.visible}
                                             onOk={this.handleOk} onCancel={this.handleCancel}>
                                                 <p>提交后就不能修改了！！！</p>                             
                                        </Modal>
                        </td>
                      <td  colSpan="3" style={{textAlign:'center'}}> 
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


Updateswsjbb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(Updateswsjbb);
   

    

 

module.exports = Updateswsjbb