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
 
let Updatezcfzb = React.createClass({
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
                        
                        <td colSpan="3">统计时间段：
                         <div>
                              <DatePicker                                          
                                          placeholder="开始日期" {...getFieldProps('kssj', { initialValue:data.A})} />                                   
                              <DatePicker    
                                          placeholder="结束日期" {...getFieldProps('jssj', { initialValue:data.B})}  />   
                        </div>
                        </td>    
                         
                           
                        <td width="11%">  <Col 
                          label="年度：">
                            <SelectorYear  { ...getFieldProps('nd', { initialValue:data.ND})}/>
                        </Col>
                           </td>
                           
                            <td > <Col>
                            <SelectorXZ { ...getFieldProps('timevalue', { initialValue:data.TIMEVALUE})}/>
                        </Col>
                           </td>
                      
                       <td>单位：元</td>
                    </tr>
                     <tr>
                        <td style={{textAlign:'center'}} >资产</td>
                        <td>行次</td>
                        <td > 年初数</td>
                        <td > 年末数</td>   
                        <td style={{textAlign:'center'}} >负债及所有者权益（或股东权益）</td>   
                        <td  >行次</td>      
                        <td > 年初数</td>
                        <td > 年末数</td>       
                    </tr> 
                    
                    <tr>
                        <td style={{textAlign:'center'}} >流动资产：</td>
                        <td></td>
                        <td > </td>
                        <td > </td>   
                        <td style={{textAlign:'center'}} >流动负债：</td>   
                        <td></td>      
                        <td ></td>
                        <td > </td>       
                    </tr> 
                    
                     <tr>
                        <td style={{textAlign:'center'}} >货币资金</td>
                        <td>1</td>
                        <td ><Input   {...getFieldProps('ldzc_hbzj_nc', { initialValue:data.LDZC_HBZJ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_hbzj', { initialValue:data.LDZC_HBZJ})}/> </td>
                        <td style={{textAlign:'center'}} >短期借款</td>   
                        <td>33</td>      
                        <td ><Input   {...getFieldProps('ldfz_dqjk_nc', { initialValue:data.LDFZ_DQJK_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_dqjk', { initialValue:data.LDFZ_DQJK})}/></td>      
                    </tr> 
                    
                    <tr>
                        <td style={{textAlign:'center'}} >短期投资</td>
                        <td>2</td>
                        <td ><Input   {...getFieldProps('ldzc_dqtz_nc', { initialValue:data.LDZC_DQTZ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_dqtz', { initialValue:data.LDZC_DQTZ})}/> </td>
                        <td style={{textAlign:'center'}} >应付票据</td>   
                        <td>34</td>      
                        <td ><Input   {...getFieldProps('ldfz_yfpj_nc', { initialValue:data.LDFZ_YFPJ_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yfpj', { initialValue:data.LDFZ_YFPJ})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >应收票据</td>
                        <td>3</td>
                        <td ><Input   {...getFieldProps('ldzc_yspj_nc', { initialValue:data.LDZC_YSPJ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_yspj', { initialValue:data.LDZC_YSPJ})}/> </td>
                        <td style={{textAlign:'center'}} >应付账款</td>   
                        <td>35</td>      
                        <td ><Input   {...getFieldProps('ldfz_yfzk_nc', { initialValue:data.LDFZ_YFZK_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yfzk', { initialValue:data.LDFZ_YFZK})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >应收股利</td>
                        <td>4</td>
                        <td ><Input   {...getFieldProps('ldzc_ysgl_nc', { initialValue:data.LDZC_YSGL_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_ysgl', { initialValue:data.LDZC_YSGL})}/> </td>
                        <td style={{textAlign:'center'}} >预收账款</td>   
                        <td>36</td>      
                        <td ><Input   {...getFieldProps('ldfz_yszk_nc', { initialValue:data.LDFZ_YSZK_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yszk', { initialValue:data.LDFZ_YSZK})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >应收利息</td>
                        <td>5</td>
                        <td ><Input   {...getFieldProps('ldzc_yslx_nc', { initialValue:data.LDZC_YSLX_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_yslx', { initialValue:data.LDZC_YSLX})}/> </td>
                        <td style={{textAlign:'center'}} >应付工资</td>   
                        <td>37</td>      
                        <td ><Input   {...getFieldProps('ldfz_yfgz_nc', { initialValue:data.LDFZ_YFGZ_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yfgz', { initialValue:data.LDFZ_YFGZ})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >应收账款</td>
                        <td>6</td>
                        <td ><Input   {...getFieldProps('ldzc_yszk_nc', { initialValue:data.LDZC_YSZK_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_yszk', { initialValue:data.LDZC_YSZK})}/> </td>
                        <td style={{textAlign:'center'}} >应付福利费</td>   
                        <td>38</td>      
                        <td ><Input   {...getFieldProps('ldfz_yffl_nc', { initialValue:data.LDFZ_YFFL_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yffl', { initialValue:data.LDFZ_YFFL})}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >其他应收款</td>
                        <td>7</td>
                        <td ><Input   {...getFieldProps('ldzc_qtys_nc', { initialValue:data.LDZC_QTYS_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_qtys', { initialValue:data.LDZC_QTYS})}/> </td>
                        <td style={{textAlign:'center'}} >应付股利</td>   
                        <td>39</td>      
                        <td ><Input   {...getFieldProps('ldfz_yfgl_nc', { initialValue:data.LDFZ_YFGL_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yfgl', { initialValue:data.LDFZ_YFGL})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >预付账款</td>
                        <td>8</td>
                        <td ><Input   {...getFieldProps('ldzc_yfzk_nc', { initialValue:data.LDZC_YFZK_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_yfzk', { initialValue:data.LDZC_YFZK})}/> </td>
                        <td style={{textAlign:'center'}} >应交税金</td>   
                        <td>40</td>      
                        <td ><Input   {...getFieldProps('ldfz_yjsj_nc', { initialValue:data.LDFZ_YJSJ_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yjsj', { initialValue:data.LDFZ_YJSJ})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >应收补贴款</td>
                        <td>9</td>
                        <td ><Input   {...getFieldProps('ldzc_ysbt_nc', { initialValue:data.LDZC_YSBT_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_ysbt', { initialValue:data.LDZC_YSBT})}/> </td>
                        <td style={{textAlign:'center'}} >其他应交款</td>   
                        <td>41</td>      
                        <td ><Input   {...getFieldProps('ldfz_qtyj_nc', { initialValue:data.LDFZ_QTYJ_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_qtyj', { initialValue:data.LDFZ_QTYJ})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >存货</td>
                        <td>10</td>
                        <td ><Input   {...getFieldProps('ldzc_ch_nc', { initialValue:data.LDZC_CH_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_ch', { initialValue:data.LDZC_CH})}/> </td>
                        <td style={{textAlign:'center'}} >其他应付款</td>   
                        <td>42</td>      
                        <td ><Input   {...getFieldProps('ldfz_qtyf_nc', { initialValue:data.LDFZ_QTYF_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_qtyf', { initialValue:data.LDFZ_QTYF})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >待摊费用</td>
                        <td>11</td>
                        <td ><Input   {...getFieldProps('ldzc_dtfy_nc', { initialValue:data.LDZC_DTFY_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_dtfy', { initialValue:data.LDZC_DTFY})}/> </td>
                        <td style={{textAlign:'center'}} >预提费用</td>   
                        <td>43</td>      
                        <td ><Input   {...getFieldProps('ldfz_ytfy_nc', { initialValue:data.LDFZ_YTFY_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_ytfy', { initialValue:data.LDFZ_YTFY})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >一年内到期的长期债券投资</td>
                        <td>12</td>
                        <td ><Input   {...getFieldProps('ldzc_dqzj_nc', { initialValue:data.LDZC_DQZJ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_dqzj', { initialValue:data.LDZC_DQZJ})}/> </td>
                        <td style={{textAlign:'center'}} >预计负债</td>   
                        <td>44</td>      
                        <td ><Input   {...getFieldProps('ldfz_yjfz_nc', { initialValue:data.LDFZ_YJFZ_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yjfz', { initialValue:data.LDFZ_YJFZ})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >其他流动资产</td>
                        <td>13</td>
                        <td ><Input   {...getFieldProps('ldzc_qtldzc_nc', { initialValue:data.LDZC_QTLDZC_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_qtldzc', { initialValue:data.LDZC_QTLDZC})}/> </td>
                        <td style={{textAlign:'center'}} >一年内到期的长期负债</td>   
                        <td>45</td>      
                        <td ><Input   {...getFieldProps('ldfz_dqfz_nc', { initialValue:data.LDFZ_DQFZ_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_dqfz', { initialValue:data.LDFZ_DQFZ})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >流动资产合计</td>
                        <td>14</td>
                        <td ><Input   {...getFieldProps('ldzc_hj_nc', { initialValue:data.LDZCHJ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_hj', { initialValue:data.LDZCHJ})}/> </td>
                        <td style={{textAlign:'center'}} >其他流动负债</td>   
                        <td>46</td>      
                        <td ><Input   {...getFieldProps('ldfz_qtfz_nc', { initialValue:data.LDFZ_QTFZ_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_qtfz', { initialValue:data.LDFZ_QTFZ})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >长期投资:</td>
                        <td colSpan="7"></td>
                           
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >长期股权投资</td>
                        <td>15</td>
                        <td ><Input   {...getFieldProps('cqtz_gq_nc', { initialValue:data.CQTZ_GQ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('cqtz_gq', { initialValue:data.CQTZ_GQ})}/> </td>
                        <td style={{textAlign:'center'}} >流动负债合计</td>   
                        <td>47</td>      
                        <td ><Input   {...getFieldProps('ldfz_hj_nc', { initialValue:data.LDFZ_HJ_NC})}/></td>
                        <td ><Input   {...getFieldProps('ldfz_hj', { initialValue:data.LDFZ_HJ})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >长期债权投资</td>
                        <td>16</td>
                        <td ><Input   {...getFieldProps('cqtz_zq_nc', { initialValue:data.CQTZ_ZQ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('cqtz_zq', { initialValue:data.CQTZ_ZQ})}/> </td>
                        <td style={{textAlign:'center'}} >长期负债:</td>   
                        <td colSpan="3"></td>      
                       
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >长期投资合计</td>
                        <td>17</td>
                        <td ><Input   {...getFieldProps('cqtz_hj_nc', { initialValue:data.CQTZ_HJ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('cqtz_hj', { initialValue:data.CQTZ_HJ})}/> </td>
                        <td style={{textAlign:'center'}} >长期借款</td>   
                        <td>48</td>      
                        <td ><Input   {...getFieldProps('cqfz_cqjk_nc', { initialValue:data.CQFZ_CQJK_NC})}/></td>
                        <td ><Input   {...getFieldProps('cqfz_cqjk', { initialValue:data.CQFZ_CQJK})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >固定资产:</td>
                        <td colSpan="3"></td>
                        
                        <td style={{textAlign:'center'}} >应付债券</td>   
                        <td>49</td>      
                        <td ><Input   {...getFieldProps('cqfz_yfzq_nc', { initialValue:data.CQFZ_YFZQ_NC})}/></td>
                        <td ><Input   {...getFieldProps('cqfz_yfzq', { initialValue:data.CQFZ_YFZQ})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >固定资产原价</td>
                        <td>18</td>
                        <td ><Input   {...getFieldProps('gdzc_yj_nc', { initialValue:data.GDZC_YJ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_yj', { initialValue:data.GDZC_YJ})}/> </td>
                        <td style={{textAlign:'center'}} >长期应付款</td>   
                        <td>50</td>      
                        <td ><Input   {...getFieldProps('cqfz_cqyf_nc', { initialValue:data.CQFZ_CQYF_NC})}/></td>
                        <td ><Input   {...getFieldProps('cqfz_cqyf', { initialValue:data.CQFZ_CQYF})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >减：累计折旧</td>
                        <td>19</td>
                        <td ><Input   {...getFieldProps('gdzc_ljzj_nc', { initialValue:data.GDZC_LJZJ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_ljzj', { initialValue:data.GDZC_LJZJ})}/> </td>
                        <td style={{textAlign:'center'}} >专项应付款</td>   
                        <td>51</td>      
                        <td ><Input   {...getFieldProps('cqfz_zxyf_nc', { initialValue:data.CQFZ_ZXYF_NC})}/></td>
                        <td ><Input   {...getFieldProps('cqfz_zxyf', { initialValue:data.CQFZ_ZXYF})}/></td>      
                    </tr>
                    
                    <tr>
                        
                        <td colSpan="4"></td>
                      
                        <td style={{textAlign:'center'}} >职业风险基金</td>   
                        <td>52</td>      
                        <td ><Input   {...getFieldProps('cqfz_zyfxjj_nc', { initialValue:data.CQFZ_ZYFXJJ_NC})}/></td>
                        <td ><Input   {...getFieldProps('cqfz_zyfxjj', { initialValue:data.CQFZ_ZYFXJJ})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >固定资产净值</td>
                        <td>20</td>
                        <td ><Input   {...getFieldProps('gdzc_jz_nc', { initialValue:data.GDZC_JZ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_jz', { initialValue:data.GDZC_JZ})}/> </td>
                        <td style={{textAlign:'center'}} >其他长期负债</td>   
                        <td>53</td>      
                        <td ><Input   {...getFieldProps('cqfz_qtfz_nc', { initialValue:data.CQFZ_QTFZ_NC})}/></td>
                        <td ><Input   {...getFieldProps('cqfz_qtfz', { initialValue:data.CQFZ_QTFZ})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >减：固定资产减值准备</td>
                        <td>21</td>
                        <td ><Input   {...getFieldProps('gdzc_jzzb_nc', { initialValue:data.GDZC_JZZB_NC})}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_jzzb', { initialValue:data.GDZC_JZZB})}/> </td>
                        <td style={{textAlign:'center'}} >长期负债合计</td>   
                        <td>54</td>      
                        <td ><Input   {...getFieldProps('cqfz_hj_nc', { initialValue:data.CQFZ_HJ_NC})}/></td>
                        <td ><Input   {...getFieldProps('cqfz_hj', { initialValue:data.CQFZ_HJ})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >固定资产净额</td>
                        <td>22</td>
                        <td ><Input   {...getFieldProps('gdzc_je_nc', { initialValue:data.GDZC_JE_NC})}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_je', { initialValue:data.GDZC_JE})}/> </td>
                        <td style={{textAlign:'center'}} >递延税项：</td>   
                        <td colSpan="3"></td>                       
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >工程物资</td>
                        <td>23</td>
                        <td ><Input   {...getFieldProps('gdzc_gcwz_nc', { initialValue:data.GDZC_GCWZ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_gcwz', { initialValue:data.GDZC_GCWZ})}/> </td>
                        <td style={{textAlign:'center'}} >递延税款贷项</td>   
                        <td>55</td>      
                        <td ><Input   {...getFieldProps('dysx_dyskdx_nc', { initialValue:data.DYSX_DYSKDX_NC})}/></td>
                        <td ><Input   {...getFieldProps('dysx_dyskdx', { initialValue:data.DYSX_DYSKDX})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >在建工程</td>
                        <td>24</td>
                        <td ><Input   {...getFieldProps('gdzc_zjgc_nc', { initialValue:data.GDZC_ZJGC_NC})}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_zjgc', { initialValue:data.GDZC_ZJGC})}/> </td>
                        <td style={{textAlign:'center'}} >负债合计</td>   
                        <td>56</td>      
                        <td ><Input   {...getFieldProps('dysx_fzhj_nc', { initialValue:data.DYSX_FZHJ_NC})}/></td>
                        <td ><Input   {...getFieldProps('dysx_fzhj', { initialValue:data.DYSX_FZHJ})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >固定资产清理</td>
                        <td>25</td>
                        <td ><Input   {...getFieldProps('gdzc_ql_nc', { initialValue:data.GDZC_QL_NC})}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_ql', { initialValue:data.GDZC_QL})}/> </td>
                         
                        <td colSpan="4"></td>                       
                    </tr>
                    
                       <tr>
                        <td style={{textAlign:'center'}} >固定资产合计</td>
                        <td>26</td>
                        <td ><Input   {...getFieldProps('gdzc_hj_nc', { initialValue:data.GDZC_HJ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_hj', { initialValue:data.GDZC_HJ})}/> </td>
                        <td style={{textAlign:'center'}} >所有者权益（或股东权益）：</td>   
                        <td colSpan="3"></td>           
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >无形资产及其他资产：</td>
                        <td colSpan="3"></td>
                     
                        <td style={{textAlign:'center'}} >实收资本（或股本）</td>   
                        <td>57</td>      
                        <td ><Input   {...getFieldProps('syzqy_sszb_nc', { initialValue:data.SYZQY_SSZB_NC})}/></td>
                        <td ><Input   {...getFieldProps('syzqy_sszb', { initialValue:data.SYZQY_SSZB})}/></td>      
                    </tr>
                                    
                        <tr>
                        <td style={{textAlign:'center'}} >无形资产</td>
                        <td>27</td>
                        <td ><Input   {...getFieldProps('wxqt_wxzc_nc', { initialValue:data.WXQT_WXZC_NC})}/> </td>
                       <td ><Input   {...getFieldProps('wxqt_wxzc', { initialValue:data.WXQT_WXZC})}/> </td>
                        <td style={{textAlign:'center'}} >减：已归还投资</td>   
                        <td>58</td>      
                        <td ><Input   {...getFieldProps('syzqy_yhtz_nc', { initialValue:data.SYZQY_YHTZ_NC})}/></td>
                        <td ><Input   {...getFieldProps('syzqy_yhtz', { initialValue:data.SYZQY_YHTZ})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >长期待摊费用</td>
                        <td>28</td>
                        <td ><Input   {...getFieldProps('wxqt_cqdt_nc', { initialValue:data.WXQT_CQDT_NC})}/> </td>
                       <td ><Input   {...getFieldProps('wxqt_cqdt', { initialValue:data.WXQT_CQDT})}/> </td>
                        <td style={{textAlign:'center'}} >实收资本（股本）净额</td>   
                        <td>59</td>      
                        <td ><Input   {...getFieldProps('syzqy_sszbje_nc', { initialValue:data.SYZQY_SSZBJE_NC})}/></td>
                        <td ><Input   {...getFieldProps('syzqy_sszbje', { initialValue:data.SYZQY_SSZBJE})}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >其他长期资产</td>
                        <td>29</td>
                        <td ><Input   {...getFieldProps('wxqt_qtcq_nc', { initialValue:data.WXQT_QTCQ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('wxqt_qtcq', { initialValue:data.WXQT_QTCQ})}/> </td>
                        <td style={{textAlign:'center'}} >资本公积</td>   
                        <td>60</td>      
                        <td ><Input   {...getFieldProps('syzqy_zbgj_nc', { initialValue:data.SYZQY_ZBGJ_NC})}/></td>
                        <td ><Input   {...getFieldProps('syzqy_zbgj', { initialValue:data.SYZQY_ZBGJ})}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >无形资产和其他资产合计</td>
                        <td>30</td>
                        <td ><Input   {...getFieldProps('wxqt_hj_nc', { initialValue:data.WXQT_HJ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('wxqt_hj', { initialValue:data.WXQT_HJ})}/> </td>
                        <td style={{textAlign:'center'}} >盈余公积</td>   
                        <td>61</td>      
                        <td ><Input   {...getFieldProps('syzqy_yygj_nc', { initialValue:data.SYZQY_YYGJ_NC})}/></td>
                        <td ><Input   {...getFieldProps('syzqy_yygj', { initialValue:data.SYZQY_YYGJ})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >递延税项：</td>
                        <td colSpan="3"></td>
                        
                        <td style={{textAlign:'center'}} >未分配利润</td>   
                        <td>62</td>      
                        <td ><Input   {...getFieldProps('syzqy_wfplr_nc', { initialValue:data.SYZQY_WFPLR_NC})}/></td>
                        <td ><Input   {...getFieldProps('syzqy_wfplr', { initialValue:data.SYZQY_WFPLR})}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >递延税款借项</td>
                        <td>31</td>
                        <td ><Input   {...getFieldProps('ydsx_skjx_nc', { initialValue:data.YDSX_SKJX_NC})}/> </td>
                       <td ><Input   {...getFieldProps('ydsx_skjx', { initialValue:data.YDSX_SKJX})}/> </td>
                        <td style={{textAlign:'center'}} >所有者权益(或股东权益)合计</td>   
                        <td>63</td>      
                        <td ><Input   {...getFieldProps('syzqy_hj_nc', { initialValue:data.SYZQY_HJ_NC})}/></td>
                        <td ><Input   {...getFieldProps('syzqy_hj', { initialValue:data.SYZQY_HJ})}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >资产总计</td>
                        <td>32</td>
                        <td ><Input   {...getFieldProps('zczj_nc', { initialValue:data.ZCZJ_NC})}/> </td>
                       <td ><Input   {...getFieldProps('zczj', { initialValue:data.ZCZJ})}/> </td>
                        <td style={{textAlign:'center'}} >负债和所有者权益(或股东权益)合计</td>   
                        <td>64</td>      
                        <td ><Input   {...getFieldProps('fzsyzqy_hj_nc', { initialValue:data.FZSYZQY_HJ_NC})}/></td>
                        <td ><Input   {...getFieldProps('fzsyzqy_hj', { initialValue:data.FZSYZQY_HJ})}/></td>      
                    </tr>

                      <tr>
                       <td></td>
                        <td style={{textAlign:'center'}} >所长：</td>
                        <td ><Input   {...getFieldProps('sz', { initialValue:data.SZ})}/> </td>                     
                        <td style={{textAlign:'center'}} >主管会计：</td>                             
                        <td ><Input   {...getFieldProps('zgkj', { initialValue:data.ZGKJ})}/></td>
                         <td style={{textAlign:'center'}} >制表人：</td> 
                        <td ><Input   {...getFieldProps('zbr', { initialValue:data.ZBR})}/></td>    
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


Updatezcfzb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(Updatezcfzb);
   

    

 

module.exports = Updatezcfzb