import React from 'react'
import {Col, Input,Row,Button,Icon,Form,Modal } from 'antd'
import {SelectorYear,SelectorXZ} from 'component/compSelector'
import './style.css'

const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
let Addlrb = React.createClass({
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
                    <col className="col-9"></col>
                    <col className="col-2"></col>
                    <col className="col-3"></col>
                    <col className="col-4"></col>
                    <col className="col-2"></col>
                    <col className="col-2"></col>
                </colgroup>

                <tbody>
                    <tr>
                        <td>单位：</td>
                        <td colSpan="2">{obj[0].DWMC}</td>
                        
                        <td>年度：</td>
                        <td>  <Col
                         
                          label="年度：">
                            <SelectorYear { ...getFieldProps('nd')}/>
                        </Col>
                           </td>
                        <td> <Col
                         
                          >
                            <SelectorXZ { ...getFieldProps('timevalue')}/>
                        </Col>
                           </td>
                        <td>单位：元</td>
                    </tr>
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">项目</td>
                        <td>行次</td>
                        <td >本月数</td>
                        <td colSpan="2">本年累计数</td>                   
                    </tr>
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">一、主营业务收入</td>
                        <td>1</td>
                        <td >   <Input   {...getFieldProps('zgywsr1')}/> </td>
                        <td colSpan="2">   <Input   {...getFieldProps('zgywsr')}/> </td>                  
                    </tr> 
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">减：主营业务成本</td>
                        <td>2</td>
                        <td > <Input   {...getFieldProps('zgywcb1')}/> </td>
                        <td colSpan="2">  <Input   {...getFieldProps('zgywcb')}/></td>                 
                    </tr> 
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">主营业务税金及附加</td>
                        <td>3</td>
                        <td > <Input   {...getFieldProps('zgywsj1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('zgywsj')}/></td>                 
                    </tr> 
                     <tr>
                        <td style={{textAlign:'center'}} colSpan="3">二、主营业务利润（亏损以“—”号填列）</td>
                        <td>4</td>
                       <td > <Input   {...getFieldProps('zgwylr1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('zgwylr')}/></td>                 
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">加：其它业务利润（亏损以“—”号填列）</td>
                        <td>5</td>
                         <td > <Input   {...getFieldProps('qtywlr1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('qtywlr')}/></td>               
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">减：营业费用</td>
                        <td>6</td>
                         <td > <Input   {...getFieldProps('yyfy1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('yyfy')}/></td>                  
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">管理费用</td>
                        <td>7</td>
                       <td > <Input   {...getFieldProps('glfy1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('glfy')}/></td>                 
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">财务费用</td>
                        <td>8</td>
                         <td > <Input   {...getFieldProps('cwfy1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('cwfy')}/></td>                  
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">三、营业利润（亏损以“—”号填列）</td>
                        <td>9</td>
                         <td > <Input   {...getFieldProps('yylr1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('yylr')}/></td>                 
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">加：投资收益（损失以“—”号填列）</td>
                        <td>10</td>
                         <td > <Input   {...getFieldProps('tzsy1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('tzsy')}/></td>                 
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">补贴收入</td>
                        <td>11</td>
                        <td > <Input   {...getFieldProps('btsr1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('btsr')}/></td>                 
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">营业外收入</td>
                        <td>12</td>
                       <td > <Input   {...getFieldProps('yywsr1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('yywsr')}/></td>                  
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">减：营业外支出</td>
                        <td>13</td>
                       <td > <Input   {...getFieldProps('yywzc1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('yywzc')}/></td>                 
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">四、利润总额（亏损总额以“—”号填列）</td>
                        <td>14</td>
                        <td > <Input   {...getFieldProps('lrze1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('lrze')}/></td>                 
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">减：所得税</td>
                        <td>15</td>
                          <td > <Input   {...getFieldProps('sds1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('sds')}/></td>                 
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">五、净利润（亏损以“—”号填列）</td>
                        <td>16</td>
                         <td > <Input   {...getFieldProps('jlr1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('jlr')}/></td>                  
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} colSpan="3">补充资料</td>
                        <td></td>
                        <td colSpan="3"> </td>                                       
                    </tr> 
                    
                     <tr>
                        <td style={{textAlign:'center'}} colSpan="3">项目</td>
                        <td></td>
                        <td > 本年累计数</td>
                        <td colSpan="2"> 上年累计数</td>                 
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} colSpan="3">1、出售、处置部门或被投资单位所得收益</td>
                        <td></td>
                        <td > <Input   {...getFieldProps('csczsy1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('csczsy')}/></td>                 
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="3">2、自然灾害发生的损失</td>
                        <td></td>
                       <td > <Input   {...getFieldProps('zhss1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('zhss')}/></td>                
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} colSpan="3">3、会计政策变更增加（或减少）利润总额</td>
                        <td></td>
                        <td > <Input   {...getFieldProps('zcbglr1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('zcbglr')}/></td>                 
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} colSpan="3">4、会计估计变更增加（或减少）利润总额</td>
                        <td></td>
                        <td > <Input   {...getFieldProps('gjbglr1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('gjbglr')}/></td>                  
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} colSpan="3">5、债务重组损失</td>
                        <td></td>
                        <td > <Input   {...getFieldProps('zwczss1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('zwczss')}/></td>                 
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} colSpan="3">6、其它</td>
                        <td></td>
                       <td > <Input   {...getFieldProps('qt1')}/></td>
                        <td colSpan="2"> <Input   {...getFieldProps('qt')}/></td>                  
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} colSpan="3">主营业务收入项目</td>
                        <td></td>
                        <td > 本月数</td>
                        <td colSpan="2"> 本年累计数</td>                 
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="2">代理税务登记收入</td>
                        <td>户数</td>
                       <td > <Input   {...getFieldProps('dlswdjhs')}/></td>
                       <td > <Input   {...getFieldProps('dlswdjsr1')}/></td>
                       <td colSpan="2"> <Input   {...getFieldProps('dlswdjsr')}/></td>                 
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="2">代理纳税申报收入</td>
                        <td>户数</td>
                        <td > <Input   {...getFieldProps('dlnssbhs')}/></td>
                       <td > <Input   {...getFieldProps('dlnssbsr1')}/></td>
                       <td colSpan="2"> <Input   {...getFieldProps('dlnssbsr')}/></td>               
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} colSpan="2">代理纳税审查收入</td>
                        <td>户数</td>
                        <td > <Input   {...getFieldProps('dlnsschs')}/></td>
                       <td > <Input   {...getFieldProps('dlnsscsr1')}/></td>
                       <td colSpan="2"> <Input   {...getFieldProps('dlnsscsr')}/></td>              
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} colSpan="2">代理建帐建制收入</td>
                        <td>户数</td>
                       <td > <Input   {...getFieldProps('dljzjzhs')}/></td>
                       <td > <Input   {...getFieldProps('dljzjzsr1')}/></td>
                       <td colSpan="2"> <Input   {...getFieldProps('dljzjzsr')}/></td>               
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="2">受聘顾问咨询收入</td>
                        <td>户数</td>
                        <td > <Input   {...getFieldProps('spgwzxhs')}/></td>
                       <td > <Input   {...getFieldProps('spgwzxsr1')}/></td>
                       <td colSpan="2"> <Input   {...getFieldProps('spgwzxsr')}/></td>                
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="2">代理申请税务复议收入</td>
                        <td>户数</td>
                        <td > <Input   {...getFieldProps('dlsqswfyhs')}/></td>
                       <td > <Input   {...getFieldProps('dlsqswfysr1')}/></td>
                       <td colSpan="2"> <Input   {...getFieldProps('dlsqswfysr')}/></td>                
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="2">培训收入</td>
                        <td>户数</td>
                        <td > <Input   {...getFieldProps('pxhs')}/></td>
                       <td > <Input   {...getFieldProps('pxsr1')}/></td>
                       <td colSpan="2"> <Input   {...getFieldProps('pxsr')}/></td>                 
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} colSpan="2">其它主营业务收入</td>
                        <td>户数</td>
                        <td > <Input   {...getFieldProps('qtzyywsrhs')}/></td>
                       <td > <Input   {...getFieldProps('qtzyywsr1')}/></td>
                       <td colSpan="2"> <Input   {...getFieldProps('qtzyywsr')}/></td>                 
                    </tr>
                    
                     <tr>
                    
                        <td style={{textAlign:'center'}}  colSpan="2">
                        
                        <Row>
                                 <Col span="12" >所长：</Col>
                                <Col span="12" ><Input  {...getFieldProps('sz')} />  </Col>
                          </Row>
                         </td>
                        <td>主管会计</td>
                        
                         <td > <Input   {...getFieldProps('zgkj')}/></td>
                        <td style={{textAlign:'center'}}  colSpan="3">
                        
                        <Row>
                                 <Col span="3" offset="6">制表：</Col>
                                <Col span="5" ><Input  {...getFieldProps('zbr')} />  </Col>
                          </Row>
                         </td>              
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
Addlrb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(Addlrb);


   

    

 

module.exports = Addlrb