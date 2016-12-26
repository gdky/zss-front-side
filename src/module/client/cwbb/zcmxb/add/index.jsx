import React from 'react'
import {Col, Input,Row,Button,Icon,Form,Modal,DatePicker,InputNumber,message  } from 'antd'
import {SelectorYear,SelectorXZ} from 'component/compSelector'
import config from 'common/configuration'
import req from 'reqwest'
import auth from 'common/auth'
import './style.css'

const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const URL_C = config.HOST + config.URI_API_PROJECT + '/commont/checiftjbb/zcmxb';
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
    getInitialState() {
        return {
            checkmessage:false,
        }
    },
    componentWillReceiveProps(nextProps){//检测父组件state变化
        if (this.props.loading!=nextProps.loading) {
          this.stopLoading();
        };
    },
    stopLoading(){
            this.setState({loading:false});
      },
    handleSubmit(zt) {
      this.setState({loading:true});
      this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
              message.error(this.state.checkmessage);
              this.setState({loading:false});
                return;
            } else {
                  let value=values
                  for(var key in value){
                      if(!value[key]&&Object.prototype.toString.call(value[key])!="[object Number]"){
                          value[key]=null;
                      }
                        if(Object.prototype.toString.call(value[key])=="[object Date]"){//时间格式化
                                  var dd = value[key].Format("yyyy-MM-dd");
                                  value[key]=dd;
                              }
                  }
                  value.zyywcb1=this.props.data.zyywcb1;
                  value.zyywcb=this.props.data.zyywcb;
                  value.glfy1=this.props.data.glfy1;
                  value.glfy=this.props.data.glfy;
                  value.zczj1=this.props.data.zczj1;
                  value.zczj=this.props.data.zczj;
                  value.ztbj=zt;
                  this.props.onSubmit(value);
            }
       });
  },
     handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },

  showModal(e) {  
        e.preventDefault();
        var that=this;
        Modal.confirm({
        title: '是否确定提交？',
        content: '提交后将上传至省管理中心',
        onOk(){
                  that.handleSubmit(1);
          },
      });
  },
  selectChange(rule, value, callback){
    let cValue=this.props.form.getFieldsValue(['timevalue','nd']);
    this.setState({checkmessage:false,cloading:true});
    req({
            url: URL_C,
            type: 'json',
            method: 'get',
            data: {checked:encodeURIComponent(JSON.stringify(cValue))},
            headers:{'x-auth-token':auth.getToken()},
            contentType:'application/json',            
        }).then(resp => {
            this.setState({cloading:false});
            if (resp) {
                callback();
            }else{
               this.setState({checkmessage:"已存在该年份该时段报表"});
               callback('已存在该年份该时段报表'); 
            };
        }).fail(err => {
               this.setState({checkmessage:"校验错误，请检查网络",cloading:false});
            callback("校验错误，请检查网络");
        })
  },

    render() {
        const year = new Date().getFullYear();
         const { getFieldProps } = this.props.form;
              let obj =[{}];
         if(!!this.props.data){
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
                        <td colSpan="2">单位：(本事务所)</td>
                        
                        <td colSpan="4">统计截止时间段（半年期为1月至6月底）：
                                          <SelectorXZ style={{width:'150px'}} { ...getFieldProps('timevalue', { initialValue:'0',rules:[{validator:this.selectChange}]})}/>
                                          {this.state.cloading&&<span><Icon type="loading" /></span>}
                                          {this.state.checkmessage&&<span style={{'color':'red'}}>{this.state.checkmessage}</span>}
                        </td>
                         
                           
                        <td  >  <Col 
                          label="年度：">
                            <SelectorYear  { ...getFieldProps('nd', { initialValue:year,rules:[{validator:this.selectChange}]})} allowClear={false}/>
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
                        <td >{this.props.data.zyywcb1}</td>
                       <td >{this.props.data.zyywcb}</td>
                        <td style={{textAlign:'center'}} >二、主营业务税金及附加</td>   
                        <td>17</td>      
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('zyywsjfj1')}/></td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('zyywsjfj')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >1、工资费用</td>
                        <td>2</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('gzfy1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('gzfy')}/> </td>
                        <td style={{textAlign:'center'}} >三、其他业务支出</td>   
                        <td>18</td>      
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('qtywzc1')}/></td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('qtywzc')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >2、福利费</td>
                        <td>3</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('flf1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('flf')}/> </td>
                        <td style={{textAlign:'center'}} >四、管理费用</td>   
                        <td>19</td>      
                        <td >{this.props.data.glfy1}</td>
                        <td >{this.props.data.glfy}</td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >3、教育费</td>
                        <td>4</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('jyf1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('jyf')}/> </td>
                        <td style={{textAlign:'center'}} >1、工资费</td>   
                        <td>20</td>      
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_gzfy1')}/></td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_gzfy')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >4、公会经费</td>
                        <td>5</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('ghjf1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('ghjf')}/> </td>
                        <td style={{textAlign:'center'}} >2、福利费</td>   
                        <td>21</td>      
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_flf1')}/></td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_flf')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >5、社会统筹</td>
                        <td>6</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('shtc1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('shtc')}/> </td>
                        <td style={{textAlign:'center'}} >3、业务招待费</td>   
                        <td>22</td>      
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_ywzdf1')}/></td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_ywzdf')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >6、办公费</td>
                        <td>7</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('bgf1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('bgf')}/> </td>
                        <td style={{textAlign:'center'}} >4、办公费</td>   
                        <td>23</td>      
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_bgf1')}/></td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_bgf')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >7、差旅费</td>
                        <td>8</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('clf1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('clf')}/> </td>
                        <td style={{textAlign:'center'}} >5、其他税金</td>   
                        <td>24</td>      
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_qtsj1')}/></td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_qtsj')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >8、会费</td>
                        <td>9</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('hf1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('hf')}/> </td>
                        <td style={{textAlign:'center'}} >6、汽车费用</td>   
                        <td>25</td>      
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_qcfy1')}/></td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_qcfy')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >9、培训及资料费</td>
                        <td>10</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('pxzlf1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('pxzlf')}/> </td>
                        <td style={{textAlign:'center'}} >7、职业风险基金</td>   
                        <td>26</td>      
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_zyfxjj1')}/></td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_zyfxjj')}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >10、会务费</td>
                        <td>11</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('hwf1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('hwf')}/> </td>
                        <td style={{textAlign:'center'}} >8、职业责任保险</td>   
                        <td>27</td>      
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_zyzrbx1')}/></td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_zyzrbx')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >11、租凭费</td>
                        <td>12</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('zpf1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('zpf')}/> </td>
                        <td style={{textAlign:'center'}} >9、差旅费</td>   
                        <td>28</td>      
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_clf1')}/></td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_clf')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >12、折旧</td>
                        <td>13</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('zj1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('zj')}/> </td>
                        <td style={{textAlign:'center'}} >10、其他费用</td>   
                        <td>29</td>      
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_qtfy1')}/></td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('glfy_qtfy')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >13、住房公积金</td>
                        <td>14</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('zfgjj1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('zfgjj')}/> </td>
                        <td style={{textAlign:'center'}} >五、财务费用</td>   
                        <td>30</td>      
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('cwfy1')}/></td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('cwfy')}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >14、顾问咨询费</td>
                        <td>15</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('gwzxf1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('gwzxf')}/> </td>
                        <td style={{textAlign:'center'}} >六、营业外支出</td>   
                        <td>31</td>      
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('yywzc1')}/></td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('yywzc')}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >15、其他</td>
                        <td>16</td>
                        <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('qt1')}/> </td>
                       <td ><InputNumber min={0}  step={0.01}   {...getFieldProps('qt')}/> </td>
                        <td style={{textAlign:'center'}} >支出总计</td>   
                        <td>32</td>      
                        <td >{this.props.data.zczj1}</td>
                        <td >{this.props.data.zczj}</td>      
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
                       <td colSpan="5">
                                <p>1、支出明细表上报时需填报"本期数"及"本年累计数"，所选上报期时间以半年期/全年期为标准，每期只可提交一单数据；</p>
                                <p>2、"本期数"填报上报期的月份数据，"本年累计数"填报上报期年初至上报期月末的数据；</p>
                                <p>各栏关系：</p>
                                <p>【2行+……16行=1行】【20行+……29行=19行】【1行+17行+18行+19行+30行+31行=32行】</p>
                       </td>
                              <td>               
                        <Button type="primary" onClick={this.handleSubmit.bind(this,0)} loading={this.state.loading}> <Icon type="check"/>保存</Button>
                      </td>
                       <td style={{textAlign:'center'}}>
                         <Button type="primary" onClick={this.showModal} loading={this.state.loading}> <Icon type="arrow-up"/>提交</Button>
                        </td>
                        
                      <td>
                        <Button type="primary" onClick={this.handleReset} loading={this.state.loading}><Icon type="cross"/>清空</Button>
                      
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
    },
    onFieldsChange(props, fields){
      for (var key in fields) {
        props.changed(key,fields[key]['value']);
        }
    }
})(Addzcmxb);


module.exports = Addzcmxb