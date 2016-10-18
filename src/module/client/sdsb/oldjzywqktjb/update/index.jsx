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
 
let Updatejygmtjb = React.createClass({
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
                    <col className ="col-2"></col>
                    <col className="col-6"></col>
                    <col className="col-4"></col>
                    <col className="col-4"></col>
                    <col className ="col-4"></col>
                    <col className ="col-4"></col>  
                                   
                </colgroup>
                <tbody>
                    <tr>
                        <td >单位:</td>  
                        <td> {data.DWMC}</td>                                                                                            
                        <td  >  <Col 
                          label="年度：">
                            <SelectorYear  { ...getFieldProps('nd', { initialValue:data.ND})}/>
                        </Col>
                           </td>
                           <td >制表人：<Input   {...getFieldProps('tianbiaoren', { initialValue:data.TIANBIAOREN})}/> </td>
                           <td >所长：<Input   {...getFieldProps('suozhang', { initialValue:data.SUOZHANG})}/> </td> 
                       <td>单位：万元、户</td>                
                      </tr>        
                     <tr>
                        <td rowSpan="2">序号</td>
                        <td rowSpan="2">项目</td>
                        <td colSpan="2">上年数</td>          
                        <td colSpan="2">本年数</td>                        
                         
                   </tr>
                    <tr>
                        <td>户数</td>
                        <td>金额</td>
                        <td>户数</td>
                        <td>金额</td>
                      
                   </tr>
                    <tr>
                        
                        <td>1</td>
                        <td>企业所得税汇算清缴总户数</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                   </tr>       
                      <tr>
                        <td  >2</td>                       
                        <td >企业所得税汇算清缴纳税申报鉴证业务  </td>
                        <td ><Input   {...getFieldProps('hsqjje_hs0', { initialValue:data.HSQJJE_HS0})}/> </td> 
                         <td ><Input   {...getFieldProps('hsqjje_je0', { initialValue:data.HSQJJE_JE0})}/> </td>      
                         <td ><Input   {...getFieldProps('hsqjje_hs', { initialValue:data.HSQJJE_HS})}/> </td>  
                         <td ><Input   {...getFieldProps('hsqjje_je', { initialValue:data.HSQJJE_JE})}/> </td>  
                      </tr>  
                       <tr>
                        <td  >3</td>                       
                        <td >其中：（1）调增应纳所得税税额  </td>
                        <td ><Input   {...getFieldProps('tzynsdse_hs0', { initialValue:data.TZYNSDSE_HS0})}/> </td> 
                         <td ><Input   {...getFieldProps('tzynsdse_je0', { initialValue:data.TZYNSDSE_JE0})}/> </td>      
                         <td ><Input   {...getFieldProps('tzynsdse_hs', { initialValue:data.TZYNSDSE_HS})}/> </td>  
                         <td ><Input   {...getFieldProps('tzynsdse_je', { initialValue:data.TZYNSDSE_JE})}/> </td>  
                      </tr>  
                      
                      <tr>
                        <td  >4</td>                       
                        <td > &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（2）调减应纳所得税税额  </td>
                        <td ><Input   {...getFieldProps('tjynsdse_hs0', { initialValue:data.TJYNSDSE_HS0})}/> </td> 
                         <td ><Input   {...getFieldProps('tjynsdse_je0', { initialValue:data.TJYNSDSE_JE0})}/> </td>      
                         <td ><Input   {...getFieldProps('tjynsdse_hs', { initialValue:data.TJYNSDSE_HS})}/> </td>  
                         <td ><Input   {...getFieldProps('tjynsdse_je', { initialValue:data.TJYNSDSE_JE})}/> </td>  
                      </tr> 
                      
                      <tr>
                        <td  >5</td>                       
                        <td > 企业税前弥补亏损鉴证业务 </td>
                        <td ><Input   {...getFieldProps('mbksje_hs0', { initialValue:data.MBKSJE_HS0})}/> </td> 
                         <td ><Input   {...getFieldProps('mbksje_je0', { initialValue:data.MBKSJE_JE0})}/> </td>      
                         <td ><Input   {...getFieldProps('mbksje_hs', { initialValue:data.MBKSJE_HS})}/> </td>  
                         <td ><Input   {...getFieldProps('mbksje_je', { initialValue:data.MBKSJE_JE})}/> </td>  
                      </tr> 
                      
                       <tr>
                        <td  >6</td>                       
                        <td > 企业资产损失税前扣除鉴证业务 </td>
                        <td ><Input   {...getFieldProps('ccsskc_hs0', { initialValue:data.CCSSKC_HS0})}/> </td> 
                         <td ><Input   {...getFieldProps('ccsskc_je0', { initialValue:data.CCSSKC_JE0})}/> </td>      
                         <td ><Input   {...getFieldProps('ccsskc_hs', { initialValue:data.CCSSKC_HS})}/> </td>  
                         <td ><Input   {...getFieldProps('ccsskc_je', { initialValue:data.CCSSKC_JE})}/> </td>  
                      </tr> 
                      
                        <tr>
                        <td  >7</td>                       
                        <td > 土地增值税清算鉴证业务 </td>
                        <td ><Input   {...getFieldProps('tdzzsqsjz_hs0', { initialValue:data.TDZZSQSJZ_HS0})}/> </td> 
                         <td ><Input   {...getFieldProps('tdzzsqsjz_je0', { initialValue:data.TDZZSQSJZ_JE0})}/> </td>      
                         <td ><Input   {...getFieldProps('tdzzsqsjz_hs', { initialValue:data.TDZZSQSJZ_HS})}/> </td>  
                         <td ><Input   {...getFieldProps('tdzzsqsjz_je', { initialValue:data.TDZZSQSJZ_JE})}/> </td>  
                      </tr> 
                      
                      <tr>
                        <td  >8</td>                       
                        <td > 其他鉴证业务小计 </td>
                        <td ><Input   {...getFieldProps('qtjz_hs0', { initialValue:data.QTJZ_HS0})}/> </td> 
                         <td ><Input   {...getFieldProps('qtjz_je0', { initialValue:data.QTJZ_JE0})}/> </td>      
                         <td ><Input   {...getFieldProps('qtjz_hs', { initialValue:data.QTJZ_HS})}/> </td>  
                         <td ><Input   {...getFieldProps('qtjz_je', { initialValue:data.QTJZ_JE})}/> </td>  
                      </tr> 
                      
                       <tr>
                        <td  >9</td>                       
                        <td > 其中：（1）高新技术企业认定鉴证业务 </td>
                        <td ><Input   {...getFieldProps('gxjsqyrdqzyw_hs0', { initialValue:data.GXJSQYRDQZYW_HS0})}/> </td> 
                         <td ><Input   {...getFieldProps('gxjsqyrdqzyw_je0', { initialValue:data.GXJSQYRDQZYW_JE0})}/> </td>      
                         <td ><Input   {...getFieldProps('gxjsqyrdqzyw_hs', { initialValue:data.GXJSQYRDQZYW_HS})}/> </td>  
                         <td ><Input   {...getFieldProps('gxjsqyrdqzyw_je', { initialValue:data.GXJSQYRDQZYW_JE})}/> </td>  
                      </tr> 
                      
                       <tr>
                        <td  >10</td>                       
                        <td >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（2）企业注销税务登记税款清算鉴证业务 </td>
                        <td ><Input   {...getFieldProps('qyzxswdeskjsjzyw_hs0', { initialValue:data.QYZXSWDESKJSJZYW_HS0})}/> </td> 
                         <td ><Input   {...getFieldProps('qyzxswdeskjsjzyw_je0', { initialValue:data.QYZXSWDESKJSJZYW_JE0})}/> </td>      
                         <td ><Input   {...getFieldProps('qyzxswdeskjsjzyw_hs', { initialValue:data.QYZXSWDESKJSJZYW_HS})}/> </td>  
                         <td ><Input   {...getFieldProps('qyzxswdeskjsjzyw_je', { initialValue:data.QYZXSWDESKJSJZYW_JE})}/> </td>  
                      </tr> 
                      
                       <tr>
                        <td  >11</td>                       
                        <td >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（3）研发费加计扣除鉴证业务 </td>
                        <td ><Input   {...getFieldProps('yffjjkcjzyw_hs0', { initialValue:data.YFFJJKCJZYW_HS0})}/> </td> 
                         <td ><Input   {...getFieldProps('yffjjkcjzyw_je0', { initialValue:data.YFFJJKCJZYW_JE0})}/> </td>      
                         <td ><Input   {...getFieldProps('yffjjkcjzyw_hs', { initialValue:data.YFFJJKCJZYW_HS})}/> </td>  
                         <td ><Input   {...getFieldProps('yffjjkcjzyw_je', { initialValue:data.YFFJJKCJZYW_JE})}/> </td>  
                      </tr> 
                      
                       <tr>
                        <td  >12</td>                       
                        <td >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（4）其他 </td>
                        <td ><Input   {...getFieldProps('qt_hs0', { initialValue:data.QT_HS0})}/> </td> 
                         <td ><Input   {...getFieldProps('qt_je0', { initialValue:data.QT_JE0})}/> </td>      
                         <td ><Input   {...getFieldProps('qt_hs', { initialValue:data.QT_HS})}/> </td>  
                         <td ><Input   {...getFieldProps('qt_je', { initialValue:data.QT_JE})}/> </td>  
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
                    </tr>
                </tbody>
               
            </table>
            </Form>

        </div>
        </div>
    }
});


Updatejygmtjb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(Updatejygmtjb);
   

    

 

module.exports = Updatejygmtjb