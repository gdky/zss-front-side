import React from 'react'
import {Col, Input,Row,Button,Icon,Form,Modal,DatePicker  } from 'antd'
import {SelectorYear,SelectorXZ,SelectorJGXZ,SelectorCS} from 'component/compSelector'
import './style.css'

const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;

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

let Addjzywqktjb = React.createClass({
    getDefaultProps(){
        return {
            onSubmit: {},
           
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
          if(Object.prototype.toString.call(value[key])=="[object Date]"){//时间格式化
                    var dd = value[key].Format("yyyy-MM-dd");
                    value[key]=dd;
                }
        
    }
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
         let data =[{}];
         if(this.props.data2.length!=0){
              data = this.props.data2;
         };
         
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
                        <td>{data[0].DWMC}</td>                                                                                            
                        <td  >  <Col 
                          label="年度：">
                            <SelectorYear  { ...getFieldProps('nd')}/>
                        </Col>
                           </td>
                           <td >制表人：<Input   {...getFieldProps('tianbiaoren')}/> </td>
                           <td >所长：<Input   {...getFieldProps('suozhang')}/> </td> 
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
                        <td ><Input   {...getFieldProps('hsqjje_hs0', { initialValue:data[0].HSQJJE_HS})}/> </td> 
                         <td ><Input   {...getFieldProps('hsqjje_je0', { initialValue:data[0].HSQJJE_JE})}/> </td>      
                         <td ><Input   {...getFieldProps('hsqjje_hs')}/> </td>  
                         <td ><Input   {...getFieldProps('hsqjje_je')}/> </td>  
                      </tr>  
                       <tr>
                        <td  >3</td>                       
                        <td >其中：（1）调增应纳所得税税额  </td>
                        <td ><Input   {...getFieldProps('tzynsdse_hs0', { initialValue:data[0].TZYNSDSE_HS})}/> </td> 
                         <td ><Input   {...getFieldProps('tzynsdse_je0', { initialValue:data[0].TZYNSDSE_JE})}/> </td>      
                         <td ><Input   {...getFieldProps('tzynsdse_hs')}/> </td>  
                         <td ><Input   {...getFieldProps('tzynsdse_je')}/> </td>  
                      </tr>  
                      
                      <tr>
                        <td  >4</td>                       
                        <td > &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（2）调减应纳所得税税额  </td>
                        <td ><Input   {...getFieldProps('tjynsdse_hs0', { initialValue:data[0].TJYNSDSE_HS})}/> </td> 
                         <td ><Input   {...getFieldProps('tjynsdse_je0', { initialValue:data[0].TJYNSDSE_JE})}/> </td>      
                         <td ><Input   {...getFieldProps('tjynsdse_hs')}/> </td>  
                         <td ><Input   {...getFieldProps('tjynsdse_je')}/> </td>  
                      </tr> 
                      
                      <tr>
                        <td  >5</td>                       
                        <td > 企业税前弥补亏损鉴证业务 </td>
                        <td ><Input   {...getFieldProps('mbksje_hs0', { initialValue:data[0].MBKSJE_HS})}/> </td> 
                         <td ><Input   {...getFieldProps('mbksje_je0', { initialValue:data[0].MBKSJE_HS})}/> </td>      
                         <td ><Input   {...getFieldProps('mbksje_hs')}/> </td>  
                         <td ><Input   {...getFieldProps('mbksje_je')}/> </td>  
                      </tr> 
                      
                       <tr>
                        <td  >6</td>                       
                        <td > 企业资产损失税前扣除鉴证业务 </td>
                        <td ><Input   {...getFieldProps('ccsskc_hs0', { initialValue:data[0].CCSSKC_HS})}/> </td> 
                         <td ><Input   {...getFieldProps('ccsskc_je0', { initialValue:data[0].CCSSKC_JE})}/> </td>      
                         <td ><Input   {...getFieldProps('ccsskc_hs')}/> </td>  
                         <td ><Input   {...getFieldProps('ccsskc_je')}/> </td>  
                      </tr> 
                      
                        <tr>
                        <td  >7</td>                       
                        <td > 土地增值税清算鉴证业务 </td>
                        <td ><Input   {...getFieldProps('tdzzsqsjz_hs0', { initialValue:data[0].TDZZSQSJZ_HS})}/> </td> 
                         <td ><Input   {...getFieldProps('tdzzsqsjz_je0', { initialValue:data[0].TDZZSQSJZ_JE})}/> </td>      
                         <td ><Input   {...getFieldProps('tdzzsqsjz_hs')}/> </td>  
                         <td ><Input   {...getFieldProps('tdzzsqsjz_je')}/> </td>  
                      </tr> 
                      
                      <tr>
                        <td  >8</td>                       
                        <td > 其他鉴证业务小计 </td>
                        <td ><Input   {...getFieldProps('qtjz_hs0', { initialValue:data[0].QTJZ_HS})}/> </td> 
                         <td ><Input   {...getFieldProps('qtjz_je0', { initialValue:data[0].QTJZ_JE})}/> </td>      
                         <td ><Input   {...getFieldProps('qtjz_hs')}/> </td>  
                         <td ><Input   {...getFieldProps('qtjz_je')}/> </td>  
                      </tr> 
                      
                       <tr>
                        <td  >9</td>                       
                        <td > 其中：（1）高新技术企业认定鉴证业务 </td>
                        <td ><Input   {...getFieldProps('gxjsqyrdqzyw_hs0', { initialValue:data[0].GXJSQYRDQZYW_HS})}/> </td> 
                         <td ><Input   {...getFieldProps('gxjsqyrdqzyw_je0', { initialValue:data[0].GXJSQYRDQZYW_JE})}/> </td>      
                         <td ><Input   {...getFieldProps('gxjsqyrdqzyw_hs')}/> </td>  
                         <td ><Input   {...getFieldProps('gxjsqyrdqzyw_je')}/> </td>  
                      </tr> 
                      
                       <tr>
                        <td  >10</td>                       
                        <td >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（2）企业注销税务登记税款清算鉴证业务 </td>
                        <td ><Input   {...getFieldProps('qyzxswdeskjsjzyw_hs0', { initialValue:data[0].QYZXSWDESKJSJZYW_HS})}/> </td> 
                         <td ><Input   {...getFieldProps('qyzxswdeskjsjzyw_je0', { initialValue:data[0].QYZXSWDESKJSJZYW_HS})}/> </td>      
                         <td ><Input   {...getFieldProps('qyzxswdeskjsjzyw_hs')}/> </td>  
                         <td ><Input   {...getFieldProps('qyzxswdeskjsjzyw_je')}/> </td>  
                      </tr> 
                      
                       <tr>
                        <td  >11</td>                       
                        <td >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（3）研发费加计扣除鉴证业务 </td>
                        <td ><Input   {...getFieldProps('yffjjkcjzyw_hs0', { initialValue:data[0].YFFJJKCJZYW_HS})}/> </td> 
                         <td ><Input   {...getFieldProps('yffjjkcjzyw_je0', { initialValue:data[0].YFFJJKCJZYW_JE})}/> </td>      
                         <td ><Input   {...getFieldProps('yffjjkcjzyw_hs')}/> </td>  
                         <td ><Input   {...getFieldProps('yffjjkcjzyw_je')}/> </td>  
                      </tr> 
                      
                       <tr>
                        <td  >12</td>                       
                        <td >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（4）其他 </td>
                        <td ><Input   {...getFieldProps('qt_hs0', { initialValue:data[0].QT_HS})}/> </td> 
                         <td ><Input   {...getFieldProps('qt_je0', { initialValue:data[0].QT_JE})}/> </td>      
                         <td ><Input   {...getFieldProps('qt_hs')}/> </td>  
                         <td ><Input   {...getFieldProps('qt_je')}/> </td>  
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
           <div >
                <p>填表说明：</p>
                <p>1、本表统计数据截止为统计年度的12月31日；上报截止期为次年3月31日。（具体时间以各省通知为准）</p>
              
            </div>
        </div>
    }
});
Addjzywqktjb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(Addjzywqktjb);


module.exports = Addjzywqktjb;