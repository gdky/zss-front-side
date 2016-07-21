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
 
let Updatexjllb = React.createClass({
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
                    <col className="col-5"></col>
                    <col className="col-2"></col>
                    <col className="col-9"></col>
                    <col className ="col-3"></col>
                    <col className ="col-3"></col>                  
                </colgroup>
                <tbody>
                    <tr>
                        <td>单位：</td>
                        <td>{data.DWMC}</td>
                        <td>统计时间段：</td>    
                         <td>
                          <div>
                              <DatePicker                                          
                                          placeholder="开始日期"  {...getFieldProps('kssj', { initialValue:data.A})} />                                   
                              <DatePicker    
                                          placeholder="结束日期"  {...getFieldProps('jssj', { initialValue:data.B})}  />   
                        </div>
                         </td>   
                           
                        <td>  <Col 
                          label="年度：">
                            <SelectorYear { ...getFieldProps('nd', { initialValue:data.ND })}/>
                        </Col>
                           </td>
                      
                       <td>单位：元</td>
                    
                       </tr>  
                        <tr>
                        <td colSpan="4" style={{textAlign:'center'}} >项目</td>
                        <td>行次</td>
                        <td >金额</td>                       
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>一、经营活动产生的现金流量：</td>
                        <td> </td>
                        <td> </td>
                        
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>销售商品、提供劳务收到的现金</td>
                        <td>1 </td>
                       <td><Input  {...getFieldProps('jyhd_xjlr_xslw', { initialValue:data.JYHD_XJLR_XSLW })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>收到的税费返还</td>
                        <td>2</td>
                       <td><Input  {...getFieldProps('jyhd_xjlr_skfh', { initialValue:data.JYHD_XJLR_SKFH })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>收到的其它与经营活动有关的现金</td>
                        <td>3</td>
                       <td><Input  {...getFieldProps('jyhd_xjlr_qtjy', { initialValue:data.JYHD_XJLR_QTJY })} /> </td> 
                       </tr>
                       
                        <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>现金流入小计</td>
                        <td>4</td>
                       <td><Input  {...getFieldProps('jyhd_xjlr_xj', { initialValue:data.JYHD_XJLR_XJ })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}> 购买商品、接收劳务支付的现金</td>
                        <td>5</td>
                       <td><Input  {...getFieldProps('jyhd_xjlc_gmlw', { initialValue:data.JYHD_XJLC_GMLW })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>支付给职工以及为职工支付的现金</td>
                        <td>6</td>
                       <td><Input  {...getFieldProps('jyhd_xjlc_zfzg', { initialValue:data.JYHD_XJLC_ZFZG })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>支付的各项税费</td>
                        <td>7</td>
                       <td><Input  {...getFieldProps('jyhd_xjlc_sf', { initialValue:data.JYHD_XJLC_SF })} /> </td> 
                       </tr>
                       
                        <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>支付的其它与经营活动有关的现金</td>
                        <td>8</td>
                       <td><Input  {...getFieldProps('jyhd_xjlc_qtjy', { initialValue:data.JYHD_XJLC_QTJY })} /> </td> 
                       </tr>
                       
                        <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>现金流出小计</td>
                        <td>9</td>
                       <td><Input  {...getFieldProps('jyhd_xjlc_xj', { initialValue:data.JYHD_XJLC_XJ })} /> </td> 
                       </tr>
                       
                        <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>经营活动产生的现金流量净额</td>
                        <td>10</td>
                       <td><Input  {...getFieldProps('jyhd_je', { initialValue:data.JYHD_JE })} /> </td> 
                       </tr>
                       
                        <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>二、投资活动产生的现金流量：</td>
                        <td></td>
                       <td> </td> 
                       </tr>
                       
                        <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>收回投资所收到的现金</td>
                        <td>11</td>
                       <td><Input  {...getFieldProps('tzhd_xjlr_shtz', { initialValue:data.TZHD_XJLR_SHTZ })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>取得投资收益所收到的现金</td>
                        <td>12</td>
                       <td><Input  {...getFieldProps('tzhd_xjlr_tzsy', { initialValue:data.TZHD_XJLR_TZSY })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>处置固定资产、无形资产和其他长期资产所收回的现金净额</td>
                        <td>13</td>
                       <td><Input  {...getFieldProps('tzhd_xjlr_czzc', { initialValue:data.TZHD_XJLR_CZZC })} /> </td> 
                       </tr>
                       
                        <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>收到其他与投资活动有关的现金</td>
                        <td>14</td>
                       <td><Input  {...getFieldProps('tzhd_xjlr_qttz', { initialValue:data.TZHD_XJLR_QTTZ })} /> </td> 
                       </tr>
                       
                        <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>投资活动现金流入小计</td>
                        <td>15</td>
                       <td><Input  {...getFieldProps('tzhd_xjlr_xj', { initialValue:data.TZHD_XJLR_XJ })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>购建固定资产、无形资产和其他长期资产所支付的现金</td>
                        <td>16</td>
                       <td><Input  {...getFieldProps('tzhd_xjlc_gjzc', { initialValue:data.TZHD_XJLC_GJZC })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>投资所支付的现金</td>
                        <td>17</td>
                       <td><Input  {...getFieldProps('tzhd_xjlc_tz', { initialValue:data.TZHD_XJLC_TZ })} /> </td> 
                       </tr>
                        
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>支付的其他与投资活动有关的现金</td>
                        <td>18</td>
                       <td><Input  {...getFieldProps('tzhd_xjlc_qttz', { initialValue:data.TZHD_XJLC_QTTZ })} /> </td> 
                       </tr>
                        
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>投资活动现金流出小计</td>
                        <td>19</td>
                       <td><Input  {...getFieldProps('tzhd_xjlc_xj', { initialValue:data.TZHD_XJLC_XJ })} /> </td> 
                       </tr>
                        
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>投资活动产生的现金流量净额</td>
                        <td>20</td>
                       <td><Input  {...getFieldProps('tzhd_je', { initialValue:data.TZHD_JE })} /> </td> 
                       </tr>
                       
                        <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>三、筹资活动产生的现金流量：</td>
                        <td></td>
                       <td> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>吸收投资所收到的现金</td>
                        <td>21</td>
                       <td><Input  {...getFieldProps('czhd_xjlr_xstz', { initialValue:data.CZHD_XJLR_XSTZ })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>借款所收到的现金</td>
                        <td>22</td>
                       <td><Input  {...getFieldProps('czhd_xjlr_jk', { initialValue:data.CZHD_XJLR_JK })} /> </td> 
                       </tr>
                       
                        <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>收到的其它与筹资活动有关的现金</td>
                        <td>23</td>
                       <td><Input  {...getFieldProps('czhd_xjlr_qtcz', { initialValue:data.CZHD_XJLR_QTCZ })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>筹资活动现金流入小计</td>
                        <td>24</td>
                       <td><Input  {...getFieldProps('czhd_xjlr_xj', { initialValue:data.CZHD_XJLR_XJ })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>偿还债务所支付的现金</td>
                        <td>25</td>
                       <td><Input  {...getFieldProps('czhd_xjlc_chzw', { initialValue:data.CZHD_XJLC_CHZW })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>分配股利、利润或偿付利息所支付的现金</td>
                        <td>26</td>
                       <td><Input  {...getFieldProps('czhd_xjlc_fplr', { initialValue:data.CZHD_XJLC_FPLR })} /> </td> 
                       </tr>
                       
                        <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>支付的其它与筹资活动有关的现金</td>
                        <td>27</td>
                       <td><Input  {...getFieldProps('czhd_xjlc_qtcz', { initialValue:data.CZHD_XJLC_QTCZ })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>筹资活动现金流出小计</td>
                        <td>28</td>
                       <td><Input  {...getFieldProps('czhd_xjlc_xj', { initialValue:data.CZHD_XJLC_XJ })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>筹资活动产生的现金流量净额</td>
                        <td>29</td>
                       <td><Input  {...getFieldProps('czhd_je', { initialValue:data.CZHD_JE })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>四、汇率变动对现金的影响</td>
                        <td>30</td>
                       <td><Input  {...getFieldProps('hlbdyx', { initialValue:data.HLBDYX })} /> </td> 
                       </tr>
                       
                       <tr>
                        <td  colSpan="4" style={{textAlign:'center'}}>五、现金及现金等价物净增加额</td>
                        <td>31</td>
                       <td><Input  {...getFieldProps('xjjzzj', { initialValue:data.XJJZZJ })} /> </td> 
                       </tr>
                       
                        <tr>  
                        <td  colSpan="4" style={{textAlign:'center'}}>补充资料</td> 
                        <td></td> 
                        <td></td>  
                        </tr>
 
 <tr>  
 <td  colSpan="4" style={{textAlign:'center'}}>1、将净利润调节为经营活动的现金流量</td>  
 <td></td>  
 <td></td>  
 </tr>
 
 <tr>  
 <td  colSpan="4" style={{textAlign:'center'}}>补充资料净利润</td> 
  <td>32</td>  
  <td><Input  {...getFieldProps('bczl_jlr', { initialValue:data.BCZL_JLR })} /></td>  
  </tr>
 
 <tr> 
  <td  colSpan="4" style={{textAlign:'center'}}>加：计提的资产减值准备</td> 
   <td>33</td>  
   <td><Input  {...getFieldProps('bczl_jtzcjz', { initialValue:data.BCZL_JTZCJZ })} /></td>  
   </tr>
 
 <tr>  
 <td  colSpan="4" style={{textAlign:'center'}}>固定资产折旧</td>  
 <td>34</td>  
 <td><Input  {...getFieldProps('bczl_gdzczj', { initialValue:data.BCZL_GDZCZJ })} /></td> 
  </tr>
 
 <tr>  
 <td  colSpan="4" style={{textAlign:'center'}}>无形资产摊销</td>  
 <td>35</td>  
 <td><Input  {...getFieldProps('bczl_wxzctx', { initialValue:data.BCZL_WXZCTX })} /></td> 
  </tr>
  
 <tr>  
 <td  colSpan="4" style={{textAlign:'center'}}>长期待摊费用摊销</td> 
  <td>36</td> 
   <td><Input  {...getFieldProps('bczl_cqdtfy', { initialValue:data.BCZL_CQDTFY })} /></td> 
    </tr>
 
<tr>  
<td  colSpan="4" style={{textAlign:'center'}}>待摊费用减少（减：增加）</td> 
 <td>37</td>  
 <td><Input  {...getFieldProps('bczl_dtfyjs', { initialValue:data.BCZL_DTFYJS })} /></td> 
  </tr>

<tr>  
<td  colSpan="4" style={{textAlign:'center'}}>预提费用减少（减：减少）</td> 
 <td>38</td>  
 <td><Input  {...getFieldProps('bczl_ytfyjs', { initialValue:data.BCZL_YTFYJS })} /></td> 
  </tr>

<tr> 
 <td  colSpan="4" style={{textAlign:'center'}}>处置固定资产、无形资产和其他长期资产的损失（减：收益）</td> 
  <td>39</td> 
   <td><Input  {...getFieldProps('bczl_zcss', { initialValue:data.BCZL_ZCSS })} /></td> 
    </tr>

<tr>  
<td  colSpan="4" style={{textAlign:'center'}}>固定资产报废损失</td> 
 <td>40</td>  
 <td><Input  {...getFieldProps('bczl_gdzcbf', { initialValue:data.BCZL_GDZCBF })} /></td>  
 </tr>

<tr>  
<td  colSpan="4" style={{textAlign:'center'}}>财务费用</td>  
<td>41</td>  
<td><Input  {...getFieldProps('bczl_cwfy', { initialValue:data.BCZL_CWFY })} /></td> 
 </tr>

<tr> 
 <td  colSpan="4" style={{textAlign:'center'}}>投资损失（减：收益）</td>  
 <td>42</td> 
  <td><Input  {...getFieldProps('bczl_tzss', { initialValue:data.BCZL_TZSS })} /></td>  
  </tr> 
                     
<tr> 
 <td  colSpan="4" style={{textAlign:'center'}}>递延税款贷项（减：借项）</td> 
  <td>43</td> 
   <td><Input  {...getFieldProps('bczl_dysddx', { initialValue:data.BCZL_DYSDDX })} /></td> 
    </tr>  

<tr>  
<td  colSpan="4" style={{textAlign:'center'}}>存货的减少（减：增加）</td> 
 <td>44</td>  
 <td><Input  {...getFieldProps('bczl_chjs', { initialValue:data.BCZL_CHJS })} /></td>  
 </tr>  

<tr> 
 <td  colSpan="4" style={{textAlign:'center'}}>经营性应收项目的减少（减：增加）</td> 
  <td>45</td>  
  <td><Input  {...getFieldProps('bczl_ysxmjs', { initialValue:data.BCZL_YSXMJS })} /></td> 
   </tr>   

<tr> 
 <td  colSpan="4" style={{textAlign:'center'}}>经营性应付项目的增加（减：减少）</td> 
  <td>46</td>  
  <td><Input  {...getFieldProps('bczl_yfxmzj', { initialValue:data.BCZL_YFXMZJ })} /></td> 
   </tr>   

<tr> 
 <td  colSpan="4" style={{textAlign:'center'}}>其它</td> 
  <td>47</td>  
  <td><Input  {...getFieldProps('bczl_qt', { initialValue:data.BCZL_QT })} /></td>  
  </tr>  

<tr> 
 <td  colSpan="4" style={{textAlign:'center'}}>补充资料经营活动产生的现金流量净额</td>  
 <td>48</td>  
 <td><Input  {...getFieldProps('bczl_xjllje', { initialValue:data.BCZL_XJLLJE })} /></td>  
 </tr>  

<tr>  
<td  colSpan="4" style={{textAlign:'center'}}>2、不涉及现金收支的投资和筹资活动：</td> 
 <td></td>  
 <td></td> 
  </tr>     

<tr>  
<td  colSpan="4" style={{textAlign:'center'}}>债务转为资本</td> 
 <td>49</td>  
 <td><Input  {...getFieldProps('bczl_zwzwzb', { initialValue:data.BCZL_ZWZWZB })} /></td>  
 </tr>  

<tr> 
 <td  colSpan="4" style={{textAlign:'center'}}>一年内到期的可转换公司债券</td> 
  <td>50</td>  
  <td><Input  {...getFieldProps('bczl_yndqzj', { initialValue:data.BCZL_YNDQZJ })} /></td> 
   </tr>  

<tr>  
<td  colSpan="4" style={{textAlign:'center'}}>融资租入固定资产</td>  
<td>51</td>  
<td><Input  {...getFieldProps('bczl_rzzrzc', { initialValue:data.BCZL_RZZRZC })} /></td>  
</tr>   

<tr>  
<td  colSpan="4" style={{textAlign:'center'}}>3、现金及现金等价物净增加情况：</td> 
 <td></td> 
  <td></td> 
   </tr>  

<tr>  
<td  colSpan="4" style={{textAlign:'center'}}>现金的期末余额</td> 
 <td>52</td>  
 <td><Input  {...getFieldProps('bczl_xjqmye', { initialValue:data.BCZL_XJQMYE })} /></td> 
  </tr>   

<tr> 
 <td  colSpan="4" style={{textAlign:'center'}}>减：现金的期初余额</td>  
 <td>53</td>
   <td><Input  {...getFieldProps('bczl_xjqcye', { initialValue:data.BCZL_XJQCYE })} /></td> 
    </tr>  

<tr>  
<td  colSpan="4" style={{textAlign:'center'}}>加：现金的等价物的期末余额</td> 
 <td>54</td>  
 <td><Input  {...getFieldProps('bczl_xjdjwqmye', { initialValue:data.BCZL_XJDJWQMYE })} /></td> 
  </tr>  

<tr>  
<td  colSpan="4" style={{textAlign:'center'}}>减：现金等价物的期初余额</td> 
 <td>55</td> 
  <td><Input  {...getFieldProps('bczl_xjdjwqcye', { initialValue:data.BCZL_XJDJWQCYE })} /></td> 
   </tr>

<tr> 
 <td  colSpan="4" style={{textAlign:'center'}}>补充资料现金及现金等价物净增加额</td> 
  <td>56</td>  
  <td><Input  {...getFieldProps('bczl_xjdjwjezj', { initialValue:data.BCZL_XJDJWJEZJ })} /></td> 
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


Updatexjllb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(Updatexjllb);
   

    

 

module.exports = Updatexjllb