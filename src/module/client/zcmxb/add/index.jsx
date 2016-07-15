import React from 'react'
import {Col, Input,Row,Button,Icon,Form,Modal,DatePicker  } from 'antd'
import {SelectorYear,SelectorXZ} from 'component/compSelector'
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

let Addzcmxb = React.createClass({
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
   // console.log('收到表单值：', value);
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
              let obj =[{}];
         if(this.props.data.length!=0){
              obj = this.props.data;
         }; 
          
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
                        <td colSpan="2">单位：{obj[0].DWMC}</td>
                        
                        <td colSpan="4">统计时间段：
                         <div>
                              <DatePicker                                          
                                          placeholder="开始日期" {...getFieldProps('kssj')} />                                   
                              <DatePicker    
                                          placeholder="结束日期" {...getFieldProps('jssj')}  />   
                        </div>
                        </td>    
                         
                           
                        <td  >  <Col 
                          label="年度：">
                            <SelectorYear  { ...getFieldProps('nd')}/>
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
                        <td ><Input   {...getFieldProps('zyywcb1')}/> </td>
                       <td ><Input   {...getFieldProps('zyywcb')}/> </td>
                        <td style={{textAlign:'center'}} >二、主营业务税金及附加</td>   
                        <td>17</td>      
                        <td ><Input   {...getFieldProps('zyywsjfj1')}/></td>
                        <td ><Input   {...getFieldProps('zyywsjfj')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >1、工资费用</td>
                        <td>2</td>
                        <td ><Input   {...getFieldProps('gzfy1')}/> </td>
                       <td ><Input   {...getFieldProps('gzfy')}/> </td>
                        <td style={{textAlign:'center'}} >三、其他业务支出</td>   
                        <td>18</td>      
                        <td ><Input   {...getFieldProps('qtywzc1')}/></td>
                        <td ><Input   {...getFieldProps('qtywzc')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >2、福利费</td>
                        <td>3</td>
                        <td ><Input   {...getFieldProps('flf1')}/> </td>
                       <td ><Input   {...getFieldProps('flf')}/> </td>
                        <td style={{textAlign:'center'}} >四、管理费用</td>   
                        <td>19</td>      
                        <td ><Input   {...getFieldProps('glfy1')}/></td>
                        <td ><Input   {...getFieldProps('glfy')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >3、教育费</td>
                        <td>4</td>
                        <td ><Input   {...getFieldProps('jyf1')}/> </td>
                       <td ><Input   {...getFieldProps('jyf')}/> </td>
                        <td style={{textAlign:'center'}} >1、工资费</td>   
                        <td>20</td>      
                        <td ><Input   {...getFieldProps('glfy_gzfy1')}/></td>
                        <td ><Input   {...getFieldProps('glfy_gzfy')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >4、公会经费</td>
                        <td>5</td>
                        <td ><Input   {...getFieldProps('ghjf1')}/> </td>
                       <td ><Input   {...getFieldProps('ghjf')}/> </td>
                        <td style={{textAlign:'center'}} >2、福利费</td>   
                        <td>21</td>      
                        <td ><Input   {...getFieldProps('glfy_flf1')}/></td>
                        <td ><Input   {...getFieldProps('glfy_flf')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >5、社会统筹</td>
                        <td>6</td>
                        <td ><Input   {...getFieldProps('shtc1')}/> </td>
                       <td ><Input   {...getFieldProps('shtc')}/> </td>
                        <td style={{textAlign:'center'}} >3、业务招待费</td>   
                        <td>22</td>      
                        <td ><Input   {...getFieldProps('glfy_ywzdf1')}/></td>
                        <td ><Input   {...getFieldProps('glfy_ywzdf')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >6、办公费</td>
                        <td>7</td>
                        <td ><Input   {...getFieldProps('bgf1')}/> </td>
                       <td ><Input   {...getFieldProps('bgf')}/> </td>
                        <td style={{textAlign:'center'}} >4、办公费</td>   
                        <td>23</td>      
                        <td ><Input   {...getFieldProps('glfy_bgf1')}/></td>
                        <td ><Input   {...getFieldProps('glfy_bgf')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >7、差旅费</td>
                        <td>8</td>
                        <td ><Input   {...getFieldProps('clf1')}/> </td>
                       <td ><Input   {...getFieldProps('clf')}/> </td>
                        <td style={{textAlign:'center'}} >5、其他税金</td>   
                        <td>24</td>      
                        <td ><Input   {...getFieldProps('glfy_qtsj1')}/></td>
                        <td ><Input   {...getFieldProps('glfy_qtsj')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >8、会费</td>
                        <td>9</td>
                        <td ><Input   {...getFieldProps('hf1')}/> </td>
                       <td ><Input   {...getFieldProps('hf')}/> </td>
                        <td style={{textAlign:'center'}} >6、汽车费用</td>   
                        <td>25</td>      
                        <td ><Input   {...getFieldProps('glfy_qcfy1')}/></td>
                        <td ><Input   {...getFieldProps('glfy_qcfy')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >9、培训及资料费</td>
                        <td>10</td>
                        <td ><Input   {...getFieldProps('pxzlf1')}/> </td>
                       <td ><Input   {...getFieldProps('pxzlf')}/> </td>
                        <td style={{textAlign:'center'}} >7、职业风险基金</td>   
                        <td>26</td>      
                        <td ><Input   {...getFieldProps('glfy_zyfxjj1')}/></td>
                        <td ><Input   {...getFieldProps('glfy_zyfxjj')}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >10、会务费</td>
                        <td>11</td>
                        <td ><Input   {...getFieldProps('hwf1')}/> </td>
                       <td ><Input   {...getFieldProps('hwf')}/> </td>
                        <td style={{textAlign:'center'}} >8、职业责任保险</td>   
                        <td>27</td>      
                        <td ><Input   {...getFieldProps('glfy_zyzrbx1')}/></td>
                        <td ><Input   {...getFieldProps('glfy_zyzrbx')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >11、租凭费</td>
                        <td>12</td>
                        <td ><Input   {...getFieldProps('zpf1')}/> </td>
                       <td ><Input   {...getFieldProps('zpf')}/> </td>
                        <td style={{textAlign:'center'}} >9、差旅费</td>   
                        <td>28</td>      
                        <td ><Input   {...getFieldProps('glfy_clf1')}/></td>
                        <td ><Input   {...getFieldProps('glfy_clf')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >12、折旧</td>
                        <td>13</td>
                        <td ><Input   {...getFieldProps('zj1')}/> </td>
                       <td ><Input   {...getFieldProps('zj')}/> </td>
                        <td style={{textAlign:'center'}} >10、其他费用</td>   
                        <td>29</td>      
                        <td ><Input   {...getFieldProps('glfy_qtfy1')}/></td>
                        <td ><Input   {...getFieldProps('glfy_qtfy')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >13、住房公积金</td>
                        <td>14</td>
                        <td ><Input   {...getFieldProps('zfgjj1')}/> </td>
                       <td ><Input   {...getFieldProps('zfgjj')}/> </td>
                        <td style={{textAlign:'center'}} >五、财务费用</td>   
                        <td>30</td>      
                        <td ><Input   {...getFieldProps('cwfy1')}/></td>
                        <td ><Input   {...getFieldProps('cwfy')}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >14、顾问咨询费</td>
                        <td>15</td>
                        <td ><Input   {...getFieldProps('gwzxf1')}/> </td>
                       <td ><Input   {...getFieldProps('gwzxf')}/> </td>
                        <td style={{textAlign:'center'}} >六、营业外支出</td>   
                        <td>31</td>      
                        <td ><Input   {...getFieldProps('yywzc1')}/></td>
                        <td ><Input   {...getFieldProps('yywzc')}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >15、其他</td>
                        <td>16</td>
                        <td ><Input   {...getFieldProps('qt1')}/> </td>
                       <td ><Input   {...getFieldProps('qt')}/> </td>
                        <td style={{textAlign:'center'}} >支出总计</td>   
                        <td>32</td>      
                        <td ><Input   {...getFieldProps('zczj1')}/></td>
                        <td ><Input   {...getFieldProps('zczj')}/></td>      
                    </tr>
                    
                    <tr>
                       <td></td>
                        <td style={{textAlign:'center'}} >所长：</td>
                       
                        <td ><Input   {...getFieldProps('sz')}/> </td>
                       <td style={{textAlign:'center'}} >主管会计：</td>
                       <td ><Input   {...getFieldProps('agkj')}/> </td>
                        <td style={{textAlign:'center'}} >制表人：</td>  
                         <td ><Input   {...getFieldProps('zb')}/> </td> 
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
Addzcmxb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(Addzcmxb);


module.exports = Addzcmxb