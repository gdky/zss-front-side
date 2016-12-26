import React from 'react'
import {Col, Input,Row,Button,Icon,Form,Modal,DatePicker  } from 'antd'
import Panel from 'component/compPanel'
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

let Addhyryqktjb = React.createClass({
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
         if(this.props.data.length!=0){
              data = this.props.data;
         };           
              
        return <div className="add">
         <div className="h-scroll-table" >
        <div className="fix-table table-bordered table-striped" >
  
        <Form horizontal onSubmit={this.handleSubmit}>
            <table>    
                <colgroup>
                    <col className ="col-3"></col>
                    <col className="col-1"></col>
                    <col className="col-1"></col>
                    <col className="col-1"></col>
                    <col className="col-1"></col>
                    <col className="col-1"></col> 
                    <col className="col-1"></col>
                    <col className="col-1"></col>
                    <col className="col-1"></col>
                    <col className="col-1"></col>
                    <col className="col-1"></col> 
                     <col className="col-1"></col>
                    <col className="col-1"></col>
                    <col className="col-1"></col>
                    <col className="col-1"></col>
                    <col className="col-1"></col>
                     <col className="col-1"></col>
                    <col className="col-1"></col>
                    <col className="col-1"></col>
                    <col className="col-1"></col> 
                    <col className="col-1"></col> 
                    <col className="col-1"></col>                                                 
                </colgroup>
                <tbody>
                <tr>  
                    <td colSpan="3" >单位：{data[0].DWMC}</td>
                   <td colSpan="2" >所长：</td>
                     <td colSpan="5" ><Input   {...getFieldProps('sz')}/> </td> 
                    <td  colSpan="3">  <Col 
                          label="年度：">
                            <SelectorYear  { ...getFieldProps('nd')}/>
                        </Col>
                           </td>
                           <td >制表人：</td>
                           <td colSpan="6" ><Input {...getFieldProps('zbr')}/> </td>
                          
                       <td colSpan="2">单位：万元、户</td>   
                
                </tr>
                
                    <tr style={{textAlign:'center'}}>
                    <td rowSpan="3" colSpan="2">项目</td>
                    <td colSpan="3">人员</td>
                    <td colSpan="4">学历</td>
                    <td colSpan="4">年龄</td>
                    <td colSpan="3">政治面貌</td>
                    <td colSpan="8">备注</td>
                </tr>
                 <tr>
                    <td rowSpan="2" >人数总计</td>
                    <td rowSpan="2">其中:女</td>
                    <td rowSpan="2">研宄生及以上</td>
                    <td rowSpan="2">大学本科</td>
                    <td rowSpan="2">大专学历</td>
                    <td rowSpan="2">大专以下</td>
                    <td rowSpan="2">35岁以下</td>
                    <td rowSpan="2">36-50岁</td>
                    <td rowSpan="2">51-60 岁</td>
                    <td rowSpan="2">61岁以上</td>
                    <td rowSpan="2">中共党员</td>
                    <td rowSpan="2">民主党派</td>
                    <td colSpan="4">人大代表</td>
                    <td colSpan="4">政协委员</td>
                </tr>
                <tr>
                    <td >全国 &nbsp;&nbsp;&nbsp;</td>
                    <td >省 &nbsp; &nbsp; &nbsp; &nbsp;</td>
                    <td >市 &nbsp; &nbsp; &nbsp; &nbsp;</td>
                    <td >县 &nbsp; &nbsp; &nbsp; &nbsp;</td>
                    <td >全国 &nbsp; &nbsp;</td>
                    <td >省 &nbsp; &nbsp; &nbsp; &nbsp;</td>
                    <td >市 &nbsp; &nbsp; &nbsp; &nbsp;</td>
                    <td >县 &nbsp; &nbsp; &nbsp; &nbsp;</td>
                </tr>
                 <tr>
                    <td colSpan="2">人员总数</td>
                    <td ><Input   {...getFieldProps('ryzs_ry_zj')}/></td>
                    <td><Input   {...getFieldProps('ryzs_ry_nv')}/></td>
                    <td><Input   {...getFieldProps('ryzs_xl_yjs')}/></td>
                    <td><Input   {...getFieldProps('ryzs_xl_bk')}/></td>
                    <td><Input   {...getFieldProps('ryzs_xl_dz')}/></td>
                    <td><Input   {...getFieldProps('ryzs_xl_zz')}/></td>
                    <td><Input   {...getFieldProps('ryzs_nl_35')}/></td>
                    <td><Input   {...getFieldProps('ryzs_nl_50')}/></td>
                    <td><Input   {...getFieldProps('ryzs_nl_60l')}/></td>
                    <td><Input   {...getFieldProps('ryzs_nl_60u')}/></td>
                    <td><Input   {...getFieldProps('ryzs_zzmm_gcd')}/></td>
                    <td><Input   {...getFieldProps('ryzs_zzmm_mzp')}/></td>
                    <td><Input   {...getFieldProps('bz1')}/></td>
                    <td><Input   {...getFieldProps('bz2')}/></td>
                    <td><Input   {...getFieldProps('bz3')}/></td>
                    <td><Input   {...getFieldProps('bz4')}/></td>
                    <td><Input   {...getFieldProps('bz5')}/></td>
                    <td ><Input   {...getFieldProps('bz6')}/></td>
                    <td ><Input   {...getFieldProps('bz7')}/></td>
                    <td ><Input   {...getFieldProps('bz8')}/></td>
                </tr>
                 <tr>
                    <td colSpan="2">1、执业注册税务师</td>
                    <td><Input   {...getFieldProps('zysws_ry_zj')}/></td>
                    <td><Input   {...getFieldProps('zysws_ry_nv')}/></td>
                    <td><Input   {...getFieldProps('zysws_xl_yjs')}/></td>
                    <td><Input   {...getFieldProps('zysws_xl_bk')}/></td>
                    <td><Input   {...getFieldProps('zysws_xl_dz')}/></td>
                    <td><Input   {...getFieldProps('zysws_xl_zz')}/></td>
                    <td><Input   {...getFieldProps('zysws_nl_35')}/></td>
                    <td><Input   {...getFieldProps('zysws_nl_50')}/></td>
                    <td><Input   {...getFieldProps('zysws_nl_60l')}/></td>
                    <td><Input   {...getFieldProps('zysws_nl_60u')}/></td>
                    <td><Input   {...getFieldProps('zysws_zzmm_gcd')}/></td>
                    <td><Input   {...getFieldProps('zysws_zzmm_mzp')}/></td>
                    <td><Input   {...getFieldProps('bz9')}/></td>
                    <td><Input   {...getFieldProps('bz10')}/></td>
                    <td><Input   {...getFieldProps('bz11')}/></td>
                    <td><Input   {...getFieldProps('bz12')}/></td>
                    <td><Input   {...getFieldProps('bz13')}/></td>
                    <td><Input   {...getFieldProps('bz14')}/></td>
                    <td><Input   {...getFieldProps('bz15')}/></td>
                    <td><Input   {...getFieldProps('bz16')}/></td>
                </tr>
                
                 <tr>
                   <td colSpan="2" style={{paddingLeft:'3em'}}>其中：股东或合伙人</td>
                    <td><Input   {...getFieldProps('hhczr_ry_zj')}/></td>
                    <td><Input   {...getFieldProps('hhczr_ry_nv')}/></td>
                    <td><Input   {...getFieldProps('hhczr_xl_yjs')}/></td>
                    <td><Input   {...getFieldProps('hhczr_xl_bk')}/></td>
                    <td><Input   {...getFieldProps('hhczr_xl_dz')}/></td>
                    <td><Input   {...getFieldProps('hhczr_xl_zz')}/></td>
                    <td><Input   {...getFieldProps('hhczr_nl_35')}/></td>
                    <td><Input   {...getFieldProps('hhczr_nl_50')}/></td>
                    <td><Input   {...getFieldProps('hhczr_nl_60l')}/></td>
                    <td><Input   {...getFieldProps('hhczr_nl_60u')}/></td>
                    <td><Input   {...getFieldProps('hhczr_zzmm_gcd')}/></td>
                    <td><Input   {...getFieldProps('hhczr_zzmm_mzp')}/></td>
                    <td><Input   {...getFieldProps('bz17')}/></td>
                    <td><Input   {...getFieldProps('bz18')}/></td>
                    <td><Input   {...getFieldProps('bz19')}/></td>
                    <td><Input   {...getFieldProps('bz20')}/></td>
                    <td><Input   {...getFieldProps('bz21')}/></td>
                    <td><Input   {...getFieldProps('bz22')}/></td>
                    <td><Input   {...getFieldProps('bz23')}/></td>
                    <td><Input   {...getFieldProps('bz24')}/></td>
                </tr>
                  <tr>
                   <td colSpan="2">2、其他从业人员</td>
                    <td><Input   {...getFieldProps('qtcyry_ry_zj')}/></td>
                    <td><Input   {...getFieldProps('qtcyry_ry_nv')}/></td>
                    <td><Input   {...getFieldProps('qtcyry_xl_yjs')}/></td>
                    <td><Input   {...getFieldProps('qtcyry_xl_bk')}/></td>
                    <td><Input   {...getFieldProps('qtcyry_xl_dz')}/></td>
                    <td><Input   {...getFieldProps('qtcyry_xl_zz')}/></td>
                    <td><Input   {...getFieldProps('qtcyry_nl_35')}/></td>
                    <td><Input   {...getFieldProps('qtcyry_nl_50')}/></td>
                    <td><Input   {...getFieldProps('qtcyry_nl_60l')}/></td>
                    <td><Input   {...getFieldProps('qtcyry_nl_60u')}/></td>
                    <td><Input   {...getFieldProps('qtcyry_zzmm_gcd')}/></td>
                    <td><Input   {...getFieldProps('qtcyry_zzmm_mzp')}/></td>
                    <td><Input   {...getFieldProps('bz25')}/></td>
                    <td><Input   {...getFieldProps('bz26')}/></td>
                    <td><Input   {...getFieldProps('bz27')}/></td>
                    <td><Input   {...getFieldProps('bz28')}/></td>
                    <td><Input   {...getFieldProps('bz29')}/></td>
                    <td><Input   {...getFieldProps('bz30')}/></td>
                    <td><Input   {...getFieldProps('bz31')}/></td>
                    <td><Input   {...getFieldProps('bz32')}/></td>
                </tr>
                <tr>
                   <td colSpan="2" style={{paddingLeft:'3em'}}>其中：亊务所内非执业注册税务师</td>
                    <td><Input   {...getFieldProps('fzyzss_ry_zj')}/></td>
                    <td><Input   {...getFieldProps('fzyzss_ry_nv')}/></td>
                    <td><Input   {...getFieldProps('fzyzss_xl_yjs')}/></td>
                    <td><Input   {...getFieldProps('fzyzss_xl_bk')}/></td>
                    <td><Input   {...getFieldProps('fzyzss_xl_dz')}/></td>
                    <td><Input   {...getFieldProps('fzyzss_xl_zz')}/></td>
                    <td><Input   {...getFieldProps('fzyzss_nl_35')}/></td>
                    <td><Input   {...getFieldProps('fzyzss_nl_50')}/></td>
                    <td><Input   {...getFieldProps('fzyzss_nl_60l')}/></td>
                    <td><Input   {...getFieldProps('fzyzss_nl_60u')}/></td>
                    <td><Input   {...getFieldProps('fzyzss_zzmm_gcd')}/></td>
                    <td><Input   {...getFieldProps('fzyzss_zzmm_mzp')}/></td>
                    <td><Input   {...getFieldProps('bz33')}/></td>
                    <td><Input   {...getFieldProps('bz34')}/></td>
                    <td><Input   {...getFieldProps('bz35')}/></td>
                    <td><Input   {...getFieldProps('bz36')}/></td>
                    <td><Input   {...getFieldProps('bz37')}/></td>
                    <td><Input   {...getFieldProps('bz38')}/></td>
                    <td><Input   {...getFieldProps('bz39')}/></td>
                    <td><Input   {...getFieldProps('bz40')}/></td>
                </tr>
                 <tr>
                   <td rowSpan="3">其中：具有其他专业服务资格的从业人员</td>
                   <td>1、注册会计师</td>
                    <td><Input   {...getFieldProps('zckjs_ry_zj')}/></td>
                    <td><Input   {...getFieldProps('zckjs_ry_nv')}/></td>
                    <td><Input   {...getFieldProps('zckjs_xl_yjs')}/></td>
                    <td><Input   {...getFieldProps('zckjs_xl_bk')}/></td>
                    <td><Input   {...getFieldProps('zckjs_xl_dz')}/></td>
                    <td><Input   {...getFieldProps('zckjs_xl_zz')}/></td>
                    <td><Input   {...getFieldProps('zckjs_nl_35')}/></td>
                    <td><Input   {...getFieldProps('zckjs_nl_50')}/></td>
                    <td><Input   {...getFieldProps('zckjs_nl_60l')}/></td>
                    <td><Input   {...getFieldProps('zckjs_nl_60u')}/></td>
                    <td><Input   {...getFieldProps('zckjs_zzmm_gcd')}/></td>
                    <td><Input   {...getFieldProps('zckjs_zzmm_mzp')}/></td>
                    <td><Input   {...getFieldProps('bz41')}/></td>
                    <td><Input   {...getFieldProps('bz42')}/></td>
                    <td><Input   {...getFieldProps('bz43')}/></td>
                    <td><Input   {...getFieldProps('bz44')}/></td>
                    <td><Input   {...getFieldProps('bz45')}/></td>
                    <td><Input   {...getFieldProps('bz46')}/></td>
                    <td><Input   {...getFieldProps('bz47')}/></td>
                    <td><Input   {...getFieldProps('bz48')}/></td>
                </tr>
                 <tr>
                   <td>2、资产评估师</td>
                    <td><Input   {...getFieldProps('zcpgs_ry_zj')}/></td>
                    <td><Input   {...getFieldProps('zcpgs_ry_nv')}/></td>
                    <td><Input   {...getFieldProps('zcpgs_xl_yjs')}/></td>
                    <td><Input   {...getFieldProps('zcpgs_xl_bk')}/></td>
                    <td><Input   {...getFieldProps('zcpgs_xl_dz')}/></td>
                    <td><Input   {...getFieldProps('zcpgs_xl_zz')}/></td>
                    <td><Input   {...getFieldProps('zcpgs_nl_35')}/></td>
                    <td><Input   {...getFieldProps('zcpgs_nl_50')}/></td>
                    <td><Input   {...getFieldProps('zcpgs_nl_60l')}/></td>
                    <td><Input   {...getFieldProps('zcpgs_nl_60u')}/></td>
                    <td><Input   {...getFieldProps('zcpgs_zzmm_gcd')}/></td>
                    <td><Input   {...getFieldProps('zcpgs_zzmm_mzp')}/></td>
                    <td><Input   {...getFieldProps('bz49')}/></td>
                    <td><Input   {...getFieldProps('bz50')}/></td>
                    <td><Input   {...getFieldProps('bz51')}/></td>
                    <td><Input   {...getFieldProps('bz52')}/></td>
                    <td><Input   {...getFieldProps('bz53')}/></td>
                    <td><Input   {...getFieldProps('bz54')}/></td>
                    <td><Input   {...getFieldProps('bz55')}/></td>
                    <td><Input   {...getFieldProps('bz56')}/></td>
                </tr>
                 <tr>
                   <td>3、律师</td>
                    <td><Input   {...getFieldProps('ls_ry_zj')}/></td>
                    <td><Input   {...getFieldProps('ls_ry_nv')}/></td>
                    <td><Input   {...getFieldProps('ls_xl_yjs')}/></td>
                    <td><Input   {...getFieldProps('ls_xl_bk')}/></td>
                    <td><Input   {...getFieldProps('ls_xl_dz')}/></td>
                    <td><Input   {...getFieldProps('ls_xl_zz')}/></td>
                    <td><Input   {...getFieldProps('ls_nl_35')}/></td>
                    <td><Input   {...getFieldProps('ls_nl_50')}/></td>
                    <td><Input   {...getFieldProps('ls_nl_60l')}/></td>
                    <td><Input   {...getFieldProps('ls_nl_60u')}/></td>
                    <td><Input   {...getFieldProps('ls_zzmm_gcd')}/></td>
                    <td><Input   {...getFieldProps('ls_zzmm_mzp')}/></td>
                    <td><Input   {...getFieldProps('bz57')}/></td>
                    <td><Input   {...getFieldProps('bz58')}/></td>
                    <td><Input   {...getFieldProps('bz59')}/></td>
                    <td><Input   {...getFieldProps('bz60')}/></td>
                    <td><Input   {...getFieldProps('bz61')}/></td>
                    <td><Input   {...getFieldProps('bz62')}/></td>
                    <td><Input   {...getFieldProps('bz63')}/></td>
                    <td><Input   {...getFieldProps('bz64')}/></td>
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
                   <p> 2、人员总数=执业注册税务师+其他从业人员</p>
                   <p> 3、"具有其他专业服务执业资格的人员"是指除执业注册税务师以外的注册会计师、注册资产评估师、律师的专业服务执业资格的人 具有两种以上中介执业资格的人员，可以重复统计。</p>
                   <p> 4、备注栏中埴列县以上人大代表和政协委员。</p>
            </div>
            </div>
        </div>
    }
});
Addhyryqktjb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(Addhyryqktjb);


module.exports = Addhyryqktjb;