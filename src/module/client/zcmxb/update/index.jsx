import React from 'react'
import {Col, Input,Row,Button,Icon,Form,Modal,Select,DatePicker  } from 'antd'
import {SelectorYear,SelectorXZ} from 'component/compSelector'
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
 
let Updatezcmxb = React.createClass({
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
                    <col className ="col-4"></col>
                    <col className="col-2"></col>
                    <col className="col-3"></col>
                    <col className="col-3"></col>
                    <col className ="col-4"></col>
                    <col className ="col-2"></col>  
                    <col className ="col-3"></col>
                    <col className ="col-3"></col>                 
                </colgroup>
                <tbody>
                    <tr>
                        <td colSpan="2">单位： {data.DWMC}</td>
                        
                        <td colSpan="4">统计时间段：
                         <div>
                              <DatePicker                                          
                                          placeholder="开始日期" {...getFieldProps('kssj', { initialValue:data.A})} />                                   
                              <DatePicker    
                                          placeholder="结束日期" {...getFieldProps('jssj', { initialValue:data.B})}  />   
                        </div>
                        </td>    
                         
                           
                        <td  >  <Col 
                          label="年度：">
                            <SelectorYear  { ...getFieldProps('nd', { initialValue:data.ND})}/>
                        </Col>
                           </td>
                       <td>单位：元</td>
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >项目</td>
                        <td>行次</td>
                        <td > 本期数</td>
                        <td > 本年累计数</td>   
                        <td style={{textAlign:'center'}} >项目</td>   
                        <td  >行次</td>      
                        <td > 本期数数</td>
                        <td > 本年累计数</td>       
                    </tr> 
                    
                    
                    <tr>
                        <td style={{textAlign:'center'}} >一、主营业务成本</td>
                        <td>1</td>
                        <td ><Input   {...getFieldProps('zyywcb1', { initialValue:data.ZYYWCB1})}/> </td>
                       <td ><Input   {...getFieldProps('zyywcb', { initialValue:data.ZYYWCB})}/> </td>
                        <td style={{textAlign:'center'}} >二、主营业务税金及附加</td>   
                        <td>17</td>      
                        <td ><Input   {...getFieldProps('zyywsjfj1', { initialValue:data.ZYYWSJFJ1})}/></td>
                        <td ><Input   {...getFieldProps('zyywsjfj', { initialValue:data.ZYYWSJFJ})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >1、工资费用</td>
                        <td>2</td>
                        <td ><Input   {...getFieldProps('gzfy1', { initialValue:data.GZFY1})}/> </td>
                       <td ><Input   {...getFieldProps('gzfy', { initialValue:data.GZFY})}/> </td>
                        <td style={{textAlign:'center'}} >三、其他业务支出</td>   
                        <td>18</td>      
                        <td ><Input   {...getFieldProps('qtywzc1', { initialValue:data.QTYWZC1})}/></td>
                        <td ><Input   {...getFieldProps('qtywzc', { initialValue:data.QTYWZC})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >2、福利费</td>
                        <td>3</td>
                        <td ><Input   {...getFieldProps('flf1', { initialValue:data.FLF1})}/> </td>
                       <td ><Input   {...getFieldProps('flf', { initialValue:data.FLF})}/> </td>
                        <td style={{textAlign:'center'}} >四、管理费用</td>   
                        <td>19</td>      
                        <td ><Input   {...getFieldProps('glfy1', { initialValue:data.GLFY1})}/></td>
                        <td ><Input   {...getFieldProps('glfy', { initialValue:data.GLFY})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >3、教育费</td>
                        <td>4</td>
                        <td ><Input   {...getFieldProps('jyf1', { initialValue:data.JYF1})}/> </td>
                       <td ><Input   {...getFieldProps('jyf', { initialValue:data.JYF})}/> </td>
                        <td style={{textAlign:'center'}} >1、工资费</td>   
                        <td>20</td>      
                        <td ><Input   {...getFieldProps('glfy_gzfy1', { initialValue:data.GLFY_GZFY1})}/></td>
                        <td ><Input   {...getFieldProps('glfy_gzfy', { initialValue:data.GLFY_GZFY})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >4、公会经费</td>
                        <td>5</td>
                        <td ><Input   {...getFieldProps('ghjf1', { initialValue:data.GHJF1})}/> </td>
                       <td ><Input   {...getFieldProps('ghjf', { initialValue:data.GHJF})}/> </td>
                        <td style={{textAlign:'center'}} >2、福利费</td>   
                        <td>21</td>      
                        <td ><Input   {...getFieldProps('glfy_flf1', { initialValue:data.GLFY_FLF1})}/></td>
                        <td ><Input   {...getFieldProps('glfy_flf', { initialValue:data.GLFY_FLF})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >5、社会统筹</td>
                        <td>6</td>
                        <td ><Input   {...getFieldProps('shtc1', { initialValue:data.SHTC1})}/> </td>
                       <td ><Input   {...getFieldProps('shtc', { initialValue:data.SHTC})}/> </td>
                        <td style={{textAlign:'center'}} >3、业务招待费</td>   
                        <td>22</td>      
                        <td ><Input   {...getFieldProps('glfy_ywzdf1', { initialValue:data.GLFY_YWZDF1})}/></td>
                        <td ><Input   {...getFieldProps('glfy_ywzdf', { initialValue:data.GLFY_YWZDF})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >6、办公费</td>
                        <td>7</td>
                        <td ><Input   {...getFieldProps('bgf1', { initialValue:data.BGF1})}/> </td>
                       <td ><Input   {...getFieldProps('bgf', { initialValue:data.BGF})}/> </td>
                        <td style={{textAlign:'center'}} >4、办公费</td>   
                        <td>23</td>      
                        <td ><Input   {...getFieldProps('glfy_bgf1', { initialValue:data.GLFY_BGF1})}/></td>
                        <td ><Input   {...getFieldProps('glfy_bgf', { initialValue:data.GLFY_BGF})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >7、差旅费</td>
                        <td>8</td>
                        <td ><Input   {...getFieldProps('clf1', { initialValue:data.CLF1})}/> </td>
                       <td ><Input   {...getFieldProps('clf', { initialValue:data.CLF})}/> </td>
                        <td style={{textAlign:'center'}} >5、其他税金</td>   
                        <td>24</td>      
                        <td ><Input   {...getFieldProps('glfy_qtsj1', { initialValue:data.GLFY_QTSJ1})}/></td>
                        <td ><Input   {...getFieldProps('glfy_qtsj', { initialValue:data.GLFY_QTSJ})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >8、会费</td>
                        <td>9</td>
                        <td ><Input   {...getFieldProps('hf1', { initialValue:data.HF1})}/> </td>
                       <td ><Input   {...getFieldProps('hf', { initialValue:data.HF})}/> </td>
                        <td style={{textAlign:'center'}} >6、汽车费用</td>   
                        <td>25</td>      
                        <td ><Input   {...getFieldProps('glfy_qcfy1', { initialValue:data.GLFY_QCFY1})}/></td>
                        <td ><Input   {...getFieldProps('glfy_qcfy', { initialValue:data.GLFY_QCFY})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >9、培训及资料费</td>
                        <td>10</td>
                        <td ><Input   {...getFieldProps('pxzlf1', { initialValue:data.PXZLF1})}/> </td>
                       <td ><Input   {...getFieldProps('pxzlf', { initialValue:data.PXZLF})}/> </td>
                        <td style={{textAlign:'center'}} >7、职业风险基金</td>   
                        <td>26</td>      
                        <td ><Input   {...getFieldProps('glfy_zyfxjj1', { initialValue:data.GLFY_ZYFXJJ1})}/></td>
                        <td ><Input   {...getFieldProps('glfy_zyfxjj', { initialValue:data.GLFY_ZYFXJJ})}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >10、会务费</td>
                        <td>11</td>
                        <td ><Input   {...getFieldProps('hwf1', { initialValue:data.HWF1})}/> </td>
                       <td ><Input   {...getFieldProps('hwf', { initialValue:data.HWF})}/> </td>
                        <td style={{textAlign:'center'}} >8、职业责任保险</td>   
                        <td>27</td>      
                        <td ><Input   {...getFieldProps('glfy_zyzrbx1', { initialValue:data.GLFY_ZYZRBX1})}/></td>
                        <td ><Input   {...getFieldProps('glfy_zyzrbx', { initialValue:data.GLFY_ZYZRBX})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >11、租凭费</td>
                        <td>12</td>
                        <td ><Input   {...getFieldProps('zpf1', { initialValue:data.ZPF1})}/> </td>
                       <td ><Input   {...getFieldProps('zpf', { initialValue:data.ZPF})}/> </td>
                        <td style={{textAlign:'center'}} >9、差旅费</td>   
                        <td>28</td>      
                        <td ><Input   {...getFieldProps('glfy_clf1', { initialValue:data.GLFY_CLF1})}/></td>
                        <td ><Input   {...getFieldProps('glfy_clf', { initialValue:data.GLFY_CLF})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >12、折旧</td>
                        <td>13</td>
                        <td ><Input   {...getFieldProps('zj1', { initialValue:data.ZJ1})}/> </td>
                       <td ><Input   {...getFieldProps('zj', { initialValue:data.ZJ})}/> </td>
                        <td style={{textAlign:'center'}} >10、其他费用</td>   
                        <td>29</td>      
                        <td ><Input   {...getFieldProps('glfy_qtfy1', { initialValue:data.GLFY_QTFY1})}/></td>
                        <td ><Input   {...getFieldProps('glfy_qtfy', { initialValue:data.GLFY_QTFY})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >13、住房公积金</td>
                        <td>14</td>
                        <td ><Input   {...getFieldProps('zfgjj1', { initialValue:data.ZFGJJ1})}/> </td>
                       <td ><Input   {...getFieldProps('zfgjj', { initialValue:data.ZFGJJ})}/> </td>
                        <td style={{textAlign:'center'}} >五、财务费用</td>   
                        <td>30</td>      
                        <td ><Input   {...getFieldProps('cwfy1', { initialValue:data.CWFY1})}/></td>
                        <td ><Input   {...getFieldProps('cwfy', { initialValue:data.CWFY})}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >14、顾问咨询费</td>
                        <td>15</td>
                        <td ><Input   {...getFieldProps('gwzxf1', { initialValue:data.GWZXF1})}/> </td>
                       <td ><Input   {...getFieldProps('gwzxf', { initialValue:data.GWZXF})}/> </td>
                        <td style={{textAlign:'center'}} >六、营业外支出</td>   
                        <td>31</td>      
                        <td ><Input   {...getFieldProps('yywzc1', { initialValue:data.YYWZC1})}/></td>
                        <td ><Input   {...getFieldProps('yywzc', { initialValue:data.YYWZC})}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >15、其他</td>
                        <td>16</td>
                        <td ><Input   {...getFieldProps('qt1', { initialValue:data.QT1})}/> </td>
                       <td ><Input   {...getFieldProps('qt', { initialValue:data.QT})}/> </td>
                        <td style={{textAlign:'center'}} >支出总计</td>   
                        <td>32</td>      
                        <td ><Input   {...getFieldProps('zczj1', { initialValue:data.ZCZJ1})}/></td>
                        <td ><Input   {...getFieldProps('zczj', { initialValue:data.ZCZJ})}/></td>      
                    </tr>
                    
                    <tr>
                       <td></td>
                        <td style={{textAlign:'center'}} >所长：</td>
                       
                        <td ><Input   {...getFieldProps('sz', { initialValue:data.SZ})}/> </td>
                       <td style={{textAlign:'center'}} >主管会计：</td>
                       <td ><Input   {...getFieldProps('agkj', { initialValue:data.AGKJ})}/> </td>
                        <td style={{textAlign:'center'}} >制表人：</td>  
                         <td ><Input   {...getFieldProps('zb', { initialValue:data.ZB})}/> </td> 
                           <td></td>
                           
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
                        
                      
                      
                    </tr>
                </tbody>
               
            </table>
            </Form>

        </div>
        </div>
    }
});


Updatezcmxb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(Updatezcmxb);
   

    

 

module.exports = Updatezcmxb