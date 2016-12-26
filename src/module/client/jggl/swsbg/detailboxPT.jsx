import React from 'react'
import {Row,Col,Form,Button,Input,DatePicker,Modal  } from 'antd'
import './style.css'
import './untils.js'
import Model from './model.js' 

const FormItem = Form.Item;
const createForm = Form.create;
const TrWrapper = React.createClass({
    render(){
        return <tr>{this.props.children}</tr>
    }
})
let detailBox = React.createClass({
    getDefaultProps(){
        return {
            onSubmit: {},
            submitLoading:false,
            nbsj:[]
        }
    },
 handleSubmit(e){
          e.preventDefault();
          this.props.form.validateFieldsAndScroll((errors, values) => {//条件校验处理
          if (!!errors) {
                for(var key in errors){
                    var div1 = document.getElementById(key);
                    div1.style.backgroundColor="rgba(255, 0, 0, 0.09)"; 
                }
                Modal.info({ title: '提示', content: (<div><p><b>请填写所有必填项</b></p> </div>)});
                return;
          }
        let value = values;
        if (!!this.props.nbjgsz) {
                let nbjgsz=[];
                for (let i = 0; i < this.props.nbjgsz.rowNum; i++) {
                    let nbzsRow=[];
                    for (var j = 0;j < this.props.nbjgsz.rows.length; j++) {
                        let prop = this.props.nbjgsz.rows[j];
                        let values=value[prop.dataIndex+'_'+(i+1)+'_'+j];
                        nbzsRow.push(!values?null:values);
                        delete value[prop.dataIndex+'_'+(i+1)+'_'+j];
                    }
                    nbjgsz.push(nbzsRow);
                }
                value.nbjgsz=nbjgsz;
            }
        var ls = [];
        const old = this.props.data;
        for(var key in value){
            if(Object.prototype.toString.call(value[key])=="[object Date]"){//时间格式化
                var dd = value[key].Format("yyyy-MM-dd");
                value[key]=dd;
            }
            if (old[key]!=value[key]&&key!='nbjgsz') {
                if (value[key]=='') {//空值处理
                    ls.push({mc:Model.props[key],jzhi:old[key],xzhi:null});
                    }else{
                    ls.push({mc:Model.props[key],jzhi:old[key],xzhi:value[key]});
                    };
            };
        };
        if (ls.length!=0) {
            value.bgjl=ls;
            this.props.onSubmit(value);
        }else{
            Modal.info({ title: '提示', content: (<div><p>没有变更数据，请检查后提交</p> </div>)});
            return;
        };
    });
    },

    render(){
        const obj = this.props.data;
        const check = this.props.check;
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        let nbzs=[];
        if (!!this.props.nbjgsz) {
            nbzs.push(<tr className="nbjgsz" key="0004" ><td key="0004" colSpan='10' style={{textAlign:'left'}}>{!this.props.nbTitle?null:this.props.nbTitle}</td></tr>);
            let nbzsRow=[];
            for (let i = 0; i <(this.props.nbsj.length>5?(this.props.nbsj.length+1):6); i++) {

                if (i==0) {
                    let nbzsCol=[];
                    for (var j = 0;j < this.props.nbjgsz.rows.length; j++) {
                        let prop = this.props.nbjgsz.rows[j];
                        nbzsCol.push(<td key={'td-title-'+prop.dataIndex} style={{'width':prop.width?prop.width:'auto',textAlign:'center'}} className="prop-name">{prop.title}</td>);
                    };
                    nbzsRow.push(<TrWrapper key={'tr-nbjgsz'+i}>{nbzsCol}</TrWrapper>);
                    continue
                };
                var target=[];
                if (this.props.nbsj.length>0) {
                    let dat=this.props.nbsj[i-1];
                     for (var key in dat) {
                        target.push(dat[key]);
                    };
                };
                let nbzsCol=[];
                    for (var j = 0;j < this.props.nbjgsz.rows.length; j++) {
                        let prop = this.props.nbjgsz.rows[j];
                        if (!!target) {
                        nbzsCol.push(<td key={'td-nbjgsz-'+prop.dataIndex} className="prop-name"><Input { ...getFieldProps(prop.dataIndex+'_'+i+'_'+j,{ initialValue: target[j+3]})}/></td>);
                        }else{
                        nbzsCol.push(<td key={'td-nbjgsz-'+prop.dataIndex} className="prop-name"><Input { ...getFieldProps(prop.dataIndex+'_'+i+'_'+j)}/></td>);
                        };
                    };
                    nbzsRow.push(<TrWrapper key={'tr-nbjgsz'+i}>{nbzsCol}</TrWrapper>);
            };
            nbzs.push(<tr key="0009"><td key="0010" colSpan='10' ><div key="0005"><table key="0006"> <tbody key="0007">{nbzsRow}</tbody></table></div></td></tr>);
        };
        return <div className="fix-table table-bordered table-striped">
         <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
              <h2 className="sm">普通项目变更</h2>
            <table >
                <tbody>
                    <tr>
                        <td style={{width:'180px'}}><b>法定代表人：</b></td>
                        <td style={{textAlign:'left'}}>{obj.fddbr}</td>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>电话：</b></td>
                        <td ><Input id='dhua' { ...getFieldProps('dhua', { initialValue: obj.dhua,rules: [{ required: true}]})}></Input></td>
                    </tr>
                    <tr>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>传真：</b></td>
                        <td ><Input id='czhen' { ...getFieldProps('czhen', { initialValue: obj.czhen,rules: [{ required: true}]})}></Input></td>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>经营范围：</b></td>
                        <td ><Input id='jyfw' { ...getFieldProps('jyfw', { initialValue: obj.jyfw,rules: [{ required: true}]})}></Input></td>
                    </tr>
                    <tr>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>邮政编码：</b></td>
                        <td ><Input id='yzbm' { ...getFieldProps('yzbm', { initialValue: obj.yzbm,rules: [{ required: true}]})}></Input></td>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>所长手机：</b></td>
                        <td ><Input id='szphone' { ...getFieldProps('szphone', { initialValue: obj.szphone,rules: [{ required: true}]})}></Input></td>
                    </tr>
                    <tr>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>证书编号：</b></td>
                        <td ><Input id='zsbh' { ...getFieldProps('zsbh', { initialValue: obj.zsbh,rules: [{ required: true}]})}></Input></td>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>税务登记号码：</b></td>
                        <td ><Input id='swdjhm' { ...getFieldProps('swdjhm', { initialValue: obj.swdjhm,rules: [{ required: true}]})}></Input></td>
                    </tr>
                    <tr>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>开户行：</b></td>
                        <td ><Input id='khh' { ...getFieldProps('khh', { initialValue: obj.khh,rules: [{ required: true}]})}></Input></td>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>开户行帐号：</b></td>
                        <td ><Input id='khhzh' { ...getFieldProps('khhzh', { initialValue: obj.khhzh,rules: [{ required: true}]})}></Input></td>
                    </tr>
                    <tr>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>通讯员姓名：</b></td>
                        <td ><Input id='txyxming' { ...getFieldProps('txyxming', { initialValue: obj.txyxming,rules: [{ required: true}]})}></Input></td>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>通讯员手机：</b></td>
                        <td ><Input id='xtyphone' { ...getFieldProps('xtyphone', { initialValue: obj.xtyphone,rules: [{ required: true}]})}></Input></td>
                    </tr>
                    <tr>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>通讯员邮箱：</b></td>
                        <td ><Input id='xtyyx' { ...getFieldProps('xtyyx', { initialValue: obj.xtyyx,rules: [{ required: true}]})}></Input></td>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>所长邮箱：</b></td>
                        <td ><Input id='szyx' { ...getFieldProps('szyx', { initialValue: obj.szyx,rules: [{ required: true}]})}></Input></td>
                    </tr>
                    <tr>
                        <td ><b>机构代码证号：</b></td>
                        <td ><Input { ...getFieldProps('jgdmzh', { initialValue: obj.jgdmzh})}></Input></td>
                        <td ><b>工商预核名称编号：</b></td>
                        <td ><Input { ...getFieldProps('gsyhmcbh', { initialValue: obj.gsyhmcbh})}></Input></td>
                    </tr>
                    <tr>
                        <td ><b>事务所网址：</b></td>
                        <td ><Input { ...getFieldProps('wangzhi', { initialValue: obj.wangzhi})}></Input></td>
                        <td ><b>电子邮件：</b></td>
                        <td ><Input { ...getFieldProps('dzyj', { initialValue: obj.dzyj})}></Input></td>
                    </tr>
                    <tr>
                        <td ><b>预核单位：</b></td>
                        <td ><Input { ...getFieldProps('yhdw', { initialValue: obj.yhdw})}></Input></td>
                        <td ><b>预核时间：</b></td>
                        <td style={{textAlign:'left'}}><DatePicker  { ...getFieldProps('yhsj', { initialValue: obj.yhsj})}></DatePicker></td>
                    </tr>
                    <tr>
                        <td ><b>公证编号：</b></td>
                        <td ><Input { ...getFieldProps('gzbh', { initialValue: obj.gzbh})}></Input></td>
                        <td ><b>公证单位：</b></td>
                        <td ><Input { ...getFieldProps('gzdw', { initialValue: obj.gzdw})}></Input></td>
                    </tr>
                    <tr>
                        <td ><b>公证员：</b></td>
                        <td ><Input { ...getFieldProps('gzry', { initialValue: obj.gzry})}></Input></td>
                        <td ><b>公证时间：</b></td>
                        <td style={{textAlign:'left'}}><DatePicker  { ...getFieldProps('gzsj', { initialValue: obj.gzsj})}></DatePicker></td>
                    </tr>
                    <tr>
                        <td ><b>验资编号：</b></td>
                        <td ><Input { ...getFieldProps('yzbh', { initialValue: obj.yzbh})}></Input></td>
                        <td ><b>验资单位：</b></td>
                        <td ><Input { ...getFieldProps('yzdw', { initialValue: obj.yzdw})}></Input></td>
                    </tr>
                    <tr>
                        <td ><b>验资人员：</b></td>
                        <td ><Input { ...getFieldProps('yzry', { initialValue: obj.yzry })}></Input></td>
                        <td ><b>验资时间：</b></td>
                        <td style={{textAlign:'left'}}><DatePicker  { ...getFieldProps('yzsj', { initialValue: obj.yzsj})}></DatePicker></td>
                    </tr>
                    <tr>
                        <td ><b>团体会员注册号：</b></td>
                        <td ><Input { ...getFieldProps('tthybh', { initialValue: obj.tthybh})}></Input></td>
                        <td ><b>入会时间：</b></td>
                        <td style={{textAlign:'left'}}><DatePicker  { ...getFieldProps('rhsj', { initialValue: obj.rhsj})}></DatePicker></td>
                    </tr>
                    <tr>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>情况简介：</b></td>
                        <td colSpan="3" style={{textAlign:'left'}}><Col span="20"><Input type="textarea" rows="5" { ...getFieldProps('jbqk', { initialValue: obj.jbqk,rules: [{ required: true}]})}></Input></Col></td>
                    </tr>
                    <tr>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>事务所内部管理制度：</b></td>
                        <td colSpan="3" style={{textAlign:'left'}}><Col span="20"><Input type="textarea" rows="3" { ...getFieldProps('glzd', { initialValue: obj.glzd,rules: [{ required: true}]})}></Input></Col></td>
                    </tr>
                    <tr>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>设立分所股东决议：</b></td>
                        <td colSpan="3" style={{textAlign:'left'}}><Col span="20"><Input type="textarea" rows="3" { ...getFieldProps('gddh', { initialValue: obj.gddh,rules: [{ required: true}]})}></Input></Col></td>
                    </tr>
                    <tr>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>办公场所的产权<p>或使用权证明：</p></b></td>
                        <td colSpan="3" style={{textAlign:'left'}}><Col span="20"><Input type="textarea" rows="3" { ...getFieldProps('bgcszczm', { initialValue: obj.bgcszczm,rules: [{ required: true}]})}></Input></Col></td>
                    </tr>
                    {nbzs}
                      <tr >
                        <td colSpan="3" style={{textAlign:'left'}}><p>说明：</p><p>普通项目变更信息会立即修改无需进入审批流程</p></td>
                        <td ><Col offSpan="8"><Button type="primary" htmlType="submit" disabled={check} loading={this.props.submitLoading}>提交</Button></Col></td>
                    </tr>
                </tbody>
            </table>
      </Form>
        </div>
        
    }
});
detailBox = createForm()(detailBox);
module.exports = detailBox;

