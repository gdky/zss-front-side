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

let Addzcfzb = React.createClass({
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
                        <td colSpan="2">单位： {obj[0].DWMC}</td>
                        
                        <td colSpan="3">统计时间段：
                         <div>
                              <DatePicker                                          
                                          placeholder="开始日期" {...getFieldProps('kssj')} />                                   
                              <DatePicker    
                                          placeholder="结束日期" {...getFieldProps('jssj')}  />   
                        </div>
                        </td>    
                         
                           
                        <td width="11%">  <Col 
                          label="年度：">
                            <SelectorYear  { ...getFieldProps('nd')}/>
                        </Col>
                           </td>
                           
                            <td > <Col>
                            <SelectorXZ { ...getFieldProps('timevalue')}/>
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
                        <td ><Input   {...getFieldProps('ldzc_hbzj_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_hbzj')}/> </td>
                        <td style={{textAlign:'center'}} >短期借款</td>   
                        <td>33</td>      
                        <td ><Input   {...getFieldProps('ldfz_dqjk_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_dqjk')}/></td>      
                    </tr> 
                    
                    <tr>
                        <td style={{textAlign:'center'}} >短期投资</td>
                        <td>2</td>
                        <td ><Input   {...getFieldProps('ldzc_dqtz_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_dqtz')}/> </td>
                        <td style={{textAlign:'center'}} >应付票据</td>   
                        <td>34</td>      
                        <td ><Input   {...getFieldProps('ldfz_yfpj_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yfpj')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >应收票据</td>
                        <td>3</td>
                        <td ><Input   {...getFieldProps('ldzc_yspj_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_yspj')}/> </td>
                        <td style={{textAlign:'center'}} >应付账款</td>   
                        <td>35</td>      
                        <td ><Input   {...getFieldProps('ldfz_yfzk_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yfzk')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >应收股利</td>
                        <td>4</td>
                        <td ><Input   {...getFieldProps('ldzc_ysgl_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_ysgl')}/> </td>
                        <td style={{textAlign:'center'}} >预收账款</td>   
                        <td>36</td>      
                        <td ><Input   {...getFieldProps('ldfz_yszk_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yszk')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >应收利息</td>
                        <td>5</td>
                        <td ><Input   {...getFieldProps('ldzc_yslx_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_yslx')}/> </td>
                        <td style={{textAlign:'center'}} >应付工资</td>   
                        <td>37</td>      
                        <td ><Input   {...getFieldProps('ldfz_yfgz_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yfgz')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >应收账款</td>
                        <td>6</td>
                        <td ><Input   {...getFieldProps('ldzc_yszk_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_yszk')}/> </td>
                        <td style={{textAlign:'center'}} >应付福利费</td>   
                        <td>38</td>      
                        <td ><Input   {...getFieldProps('ldfz_yffl_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yffl')}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >其他应收款</td>
                        <td>7</td>
                        <td ><Input   {...getFieldProps('ldzc_qtys_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_qtys')}/> </td>
                        <td style={{textAlign:'center'}} >应付股利</td>   
                        <td>39</td>      
                        <td ><Input   {...getFieldProps('ldfz_yfgl_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yfgl')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >预付账款</td>
                        <td>8</td>
                        <td ><Input   {...getFieldProps('ldzc_yfzk_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_yfzk')}/> </td>
                        <td style={{textAlign:'center'}} >应交税金</td>   
                        <td>40</td>      
                        <td ><Input   {...getFieldProps('ldfz_yjsj_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yjsj')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >应收补贴款</td>
                        <td>9</td>
                        <td ><Input   {...getFieldProps('ldzc_ysbt_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_ysbt')}/> </td>
                        <td style={{textAlign:'center'}} >其他应交款</td>   
                        <td>41</td>      
                        <td ><Input   {...getFieldProps('ldfz_qtyj_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_qtyj')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >存货</td>
                        <td>10</td>
                        <td ><Input   {...getFieldProps('ldzc_ch_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_ch')}/> </td>
                        <td style={{textAlign:'center'}} >其他应付款</td>   
                        <td>42</td>      
                        <td ><Input   {...getFieldProps('ldfz_qtyf_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_qtyf')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >待摊费用</td>
                        <td>11</td>
                        <td ><Input   {...getFieldProps('ldzc_dtfy_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_dtfy')}/> </td>
                        <td style={{textAlign:'center'}} >预提费用</td>   
                        <td>43</td>      
                        <td ><Input   {...getFieldProps('ldfz_ytfy_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_ytfy')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >一年内到期的长期债券投资</td>
                        <td>12</td>
                        <td ><Input   {...getFieldProps('ldzc_dqzj_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_dqzj')}/> </td>
                        <td style={{textAlign:'center'}} >预计负债</td>   
                        <td>44</td>      
                        <td ><Input   {...getFieldProps('ldfz_yjfz_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_yjfz')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >其他流动资产</td>
                        <td>13</td>
                        <td ><Input   {...getFieldProps('ldzc_qtldzc_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_qtldzc')}/> </td>
                        <td style={{textAlign:'center'}} >一年内到期的长期负债</td>   
                        <td>45</td>      
                        <td ><Input   {...getFieldProps('ldfz_dqfz_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_dqfz')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >流动资产合计</td>
                        <td>14</td>
                        <td ><Input   {...getFieldProps('ldzc_hj_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ldzc_hj')}/> </td>
                        <td style={{textAlign:'center'}} >其他流动负债</td>   
                        <td>46</td>      
                        <td ><Input   {...getFieldProps('ldfz_qtfz_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_qtfz')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >长期投资:</td>
                        <td colSpan="7"></td>
                           
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >长期股权投资</td>
                        <td>15</td>
                        <td ><Input   {...getFieldProps('cqtz_gq_nc')}/> </td>
                       <td ><Input   {...getFieldProps('cqtz_gq')}/> </td>
                        <td style={{textAlign:'center'}} >流动负债合计</td>   
                        <td>47</td>      
                        <td ><Input   {...getFieldProps('ldfz_hj_nc')}/></td>
                        <td ><Input   {...getFieldProps('ldfz_hj')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >长期债权投资</td>
                        <td>16</td>
                        <td ><Input   {...getFieldProps('cqtz_zq_nc')}/> </td>
                       <td ><Input   {...getFieldProps('cqtz_zq')}/> </td>
                        <td style={{textAlign:'center'}} >长期负债:</td>   
                        <td colSpan="3"></td>      
                       
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >长期投资合计</td>
                        <td>17</td>
                        <td ><Input   {...getFieldProps('cqtz_hj_nc')}/> </td>
                       <td ><Input   {...getFieldProps('cqtz_hj')}/> </td>
                        <td style={{textAlign:'center'}} >长期借款</td>   
                        <td>48</td>      
                        <td ><Input   {...getFieldProps('cqfz_cqjk_nc')}/></td>
                        <td ><Input   {...getFieldProps('cqfz_cqjk')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >固定资产:</td>
                        <td colSpan="3"></td>
                        
                        <td style={{textAlign:'center'}} >应付债券</td>   
                        <td>49</td>      
                        <td ><Input   {...getFieldProps('cqfz_yfzq_nc')}/></td>
                        <td ><Input   {...getFieldProps('cqfz_yfzq')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >固定资产原价</td>
                        <td>18</td>
                        <td ><Input   {...getFieldProps('gdzc_yj_nc')}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_yj')}/> </td>
                        <td style={{textAlign:'center'}} >长期应付款</td>   
                        <td>50</td>      
                        <td ><Input   {...getFieldProps('cqfz_cqyf_nc')}/></td>
                        <td ><Input   {...getFieldProps('cqfz_cqyf')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >减：累计折旧</td>
                        <td>19</td>
                        <td ><Input   {...getFieldProps('gdzc_ljzj_nc')}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_ljzj')}/> </td>
                        <td style={{textAlign:'center'}} >专项应付款</td>   
                        <td>51</td>      
                        <td ><Input   {...getFieldProps('cqfz_zxyf_nc')}/></td>
                        <td ><Input   {...getFieldProps('cqfz_zxyf')}/></td>      
                    </tr>
                    
                    <tr>
                        
                        <td colSpan="4"></td>
                      
                        <td style={{textAlign:'center'}} >职业风险基金</td>   
                        <td>52</td>      
                        <td ><Input   {...getFieldProps('cqfz_zyfxjj_nc')}/></td>
                        <td ><Input   {...getFieldProps('cqfz_zyfxjj')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >固定资产净值</td>
                        <td>20</td>
                        <td ><Input   {...getFieldProps('gdzc_jz_nc')}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_jz')}/> </td>
                        <td style={{textAlign:'center'}} >其他长期负债</td>   
                        <td>53</td>      
                        <td ><Input   {...getFieldProps('cqfz_qtfz_nc')}/></td>
                        <td ><Input   {...getFieldProps('cqfz_qtfz')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >减：固定资产减值准备</td>
                        <td>21</td>
                        <td ><Input   {...getFieldProps('gdzc_jzzb_nc')}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_jzzb')}/> </td>
                        <td style={{textAlign:'center'}} >长期负债合计</td>   
                        <td>54</td>      
                        <td ><Input   {...getFieldProps('cqfz_hj_nc')}/></td>
                        <td ><Input   {...getFieldProps('cqfz_hj')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >固定资产净额</td>
                        <td>22</td>
                        <td ><Input   {...getFieldProps('gdzc_je_nc')}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_je')}/> </td>
                        <td style={{textAlign:'center'}} >递延税项：</td>   
                        <td colSpan="3"></td>                       
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >工程物资</td>
                        <td>23</td>
                        <td ><Input   {...getFieldProps('gdzc_gcwz_nc')}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_gcwz')}/> </td>
                        <td style={{textAlign:'center'}} >递延税款贷项</td>   
                        <td>55</td>      
                        <td ><Input   {...getFieldProps('dysx_dyskdx_nc')}/></td>
                        <td ><Input   {...getFieldProps('dysx_dyskdx')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >在建工程</td>
                        <td>24</td>
                        <td ><Input   {...getFieldProps('gdzc_zjgc_nc')}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_zjgc')}/> </td>
                        <td style={{textAlign:'center'}} >负债合计</td>   
                        <td>56</td>      
                        <td ><Input   {...getFieldProps('dysx_fzhj_nc')}/></td>
                        <td ><Input   {...getFieldProps('dysx_fzhj')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >固定资产清理</td>
                        <td>25</td>
                        <td ><Input   {...getFieldProps('gdzc_ql_nc')}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_ql')}/> </td>
                         
                        <td colSpan="4"></td>                       
                    </tr>
                    
                       <tr>
                        <td style={{textAlign:'center'}} >固定资产合计</td>
                        <td>26</td>
                        <td ><Input   {...getFieldProps('gdzc_hj_nc')}/> </td>
                       <td ><Input   {...getFieldProps('gdzc_hj')}/> </td>
                        <td style={{textAlign:'center'}} >所有者权益（或股东权益）：</td>   
                        <td colSpan="3"></td>           
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >无形资产及其他资产：</td>
                        <td colSpan="3"></td>
                     
                        <td style={{textAlign:'center'}} >实收资本（或股本）</td>   
                        <td>57</td>      
                        <td ><Input   {...getFieldProps('syzqy_sszbje_nc')}/></td>
                        <td ><Input   {...getFieldProps('syzqy_sszbje')}/></td>      
                    </tr>
                                    
                        <tr>
                        <td style={{textAlign:'center'}} >无形资产</td>
                        <td>27</td>
                        <td ><Input   {...getFieldProps('wxqt_wxzc_nc')}/> </td>
                       <td ><Input   {...getFieldProps('wxqt_wxzc')}/> </td>
                        <td style={{textAlign:'center'}} >减：已归还投资</td>   
                        <td>58</td>      
                        <td ><Input   {...getFieldProps('syzqy_yhtz_nc')}/></td>
                        <td ><Input   {...getFieldProps('syzqy_yhtz')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >长期待摊费用</td>
                        <td>28</td>
                        <td ><Input   {...getFieldProps('wxqt_cqdt_nc')}/> </td>
                       <td ><Input   {...getFieldProps('wxqt_cqdt')}/> </td>
                        <td style={{textAlign:'center'}} >实收资本（股本）净额</td>   
                        <td>59</td>      
                        <td ><Input   {...getFieldProps('syzqy_sszb_nc')}/></td>
                        <td ><Input   {...getFieldProps('syzqy_sszb')}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >其他长期资产</td>
                        <td>29</td>
                        <td ><Input   {...getFieldProps('wxqt_qtcq_nc')}/> </td>
                       <td ><Input   {...getFieldProps('wxqt_qtcq')}/> </td>
                        <td style={{textAlign:'center'}} >资本公积</td>   
                        <td>60</td>      
                        <td ><Input   {...getFieldProps('syzqy_zbgj_nc')}/></td>
                        <td ><Input   {...getFieldProps('syzqy_zbgj')}/></td>      
                    </tr>
                    
                     <tr>
                        <td style={{textAlign:'center'}} >无形资产和其他资产合计</td>
                        <td>30</td>
                        <td ><Input   {...getFieldProps('wxqt_hj_nc')}/> </td>
                       <td ><Input   {...getFieldProps('wxqt_hj')}/> </td>
                        <td style={{textAlign:'center'}} >盈余公积</td>   
                        <td>61</td>      
                        <td ><Input   {...getFieldProps('syzqy_yygj_nc')}/></td>
                        <td ><Input   {...getFieldProps('syzqy_yygj')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >递延税项：</td>
                        <td colSpan="3"></td>
                        
                        <td style={{textAlign:'center'}} >未分配利润</td>   
                        <td>62</td>      
                        <td ><Input   {...getFieldProps('syzqy_wfplr_nc')}/></td>
                        <td ><Input   {...getFieldProps('syzqy_wfplr')}/></td>      
                    </tr>
                    
                      <tr>
                        <td style={{textAlign:'center'}} >递延税款借项</td>
                        <td>31</td>
                        <td ><Input   {...getFieldProps('ydsx_skjx_nc')}/> </td>
                       <td ><Input   {...getFieldProps('ydsx_skjx')}/> </td>
                        <td style={{textAlign:'center'}} >所有者权益(或股东权益)合计</td>   
                        <td>63</td>      
                        <td ><Input   {...getFieldProps('syzqy_hj_nc')}/></td>
                        <td ><Input   {...getFieldProps('syzqy_hj')}/></td>      
                    </tr>
                    
                    <tr>
                        <td style={{textAlign:'center'}} >资产总计</td>
                        <td>32</td>
                        <td ><Input   {...getFieldProps('zczj_nc')}/> </td>
                       <td ><Input   {...getFieldProps('zczj')}/> </td>
                        <td style={{textAlign:'center'}} >负债和所有者权益(或股东权益)合计</td>   
                        <td>64</td>      
                        <td ><Input   {...getFieldProps('fzsyzqy_hj_nc')}/></td>
                        <td ><Input   {...getFieldProps('fzsyzqy_hj')}/></td>      
                    </tr>

                      <tr>
                       <td></td>
                        <td style={{textAlign:'center'}} >所长：</td>
                        <td ><Input   {...getFieldProps('sz')}/> </td>                     
                        <td style={{textAlign:'center'}} >主管会计：</td>                             
                        <td ><Input   {...getFieldProps('zgkj')}/></td>
                         <td style={{textAlign:'center'}} >制表人：</td> 
                        <td ><Input   {...getFieldProps('zbr')}/></td>    
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
Addzcfzb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(Addzcfzb);


module.exports = Addzcfzb