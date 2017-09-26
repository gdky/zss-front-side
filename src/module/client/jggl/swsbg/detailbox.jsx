import React from 'react'
import {Row,Col,Form,Checkbox,Button,Input,DatePicker,Modal  } from 'antd'
import {SelectorCS,SelectorJGXZ} from 'component/compSelector'
import './style.css'
import './untils.js'
import Model from './model.js' 

const FormItem = Form.Item;
const createForm = Form.create;

let detailBox = React.createClass({
    getDefaultProps(){
        return {
            onSubmit: {},
            submitLoading:false
        }
    },
    handleSubmit(){
        this.props.form.validateFieldsAndScroll((errors, values) => {//条件校验处理
              if (!!errors) {
                    for(var key in errors){//定位控件更改颜色
                    var div1 = document.getElementById(key);
                    div1.style.backgroundColor="rgba(255, 0, 0, 0.09)"; 
                    }
                    Modal.info({ title: '提示', content: (<div><p><b>请填写所有必填项</b></p> </div>)});
                return;
            }

            let value = this.props.form.getFieldsValue();
            var ls = [];
            const old = this.props.data;
            for(var key in value){
                    if(Object.prototype.toString.call(value[key])=="[object Date]"){//时间格式化
                        var dd = value[key].Format("yyyy-MM-dd");
                        value[key]=dd;
                    };
                    if (old[key]!=value[key]) {//是否变更数据
                                if(Object.prototype.toString.call(value[key])=="[object Number]"){//变更项代码--名称转换
                                ls.push({mc:Model.props[key],jzhi:Model.dzb[key][old[key]],xzhi:Model.dzb[key][value[key]]});
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
    showConfirm(e) {
            e.preventDefault();
            var that=this;
              Modal.confirm({
                title: '您是否确认要提交以上变更信息？',
                content: '变更项目提交后将提交中心管理端审批，在变更审批完成前，将不能再进行变更操作',
                onOk() {
                  that.handleSubmit();
                },
              });
            },

    render(){
        const obj = this.props.data;
        const check = this.props.check;
        var dd = null;
        var zj = null;
        if (!!obj&&obj.clsj) {
            dd = new Date(obj.clsj.toString().replace(/-/g, "/"));//String 转Date
            zj = String(obj.zczj);
        };
        const { getFieldProps } = this.props.form;//, { initialValue: {obj}}{this.handleSubmit}
        return <div className="fix-table table-bordered table-striped">
         <Form horizontal onSubmit={this.showConfirm} form={this.props.form}>
              <h2>需审批项目变更</h2>
            <table >
                <tbody>
                    <tr>
                        <td style={{width:'180px'}}><span style={{'color':'red',fontSize:'large'}}>*</span><b>单位名称：</b></td>
                        <td ><Input id='dwmc' { ...getFieldProps('dwmc', { initialValue: obj.dwmc,rules: [{ required: true}]})}></Input></td>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>所在城市：</b></td>
                        <td style={{textAlign:'left'}}><SelectorCS id='csdm' allowClear={false} { ...getFieldProps('csdm', { initialValue: obj.csdm+'',rules: [{required: true}]})}></SelectorCS></td>
                    </tr>
                    <tr>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>机构性质：</b></td>
                        <td style={{textAlign:'left'}}><SelectorJGXZ id='jgxzdm' { ...getFieldProps('jgxzdm', { initialValue: obj.jgxzdm,rules: [{ type: 'number',required: true}]})}></SelectorJGXZ></td>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>办公地址：</b></td>
                        <td ><Input id='dzhi' { ...getFieldProps('dzhi', { initialValue: obj.dzhi,rules: [{ required: true}]})}></Input></td>
                    </tr>
                    <tr>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>注册资金（万元）：</b></td>
                        <td style={{textAlign:'left'}}><Input id='zczj' { ...getFieldProps('zczj', { initialValue: zj,rules: [{ required: true}]})}></Input></td>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>注册地址：</b></td>
                        <td ><Input id='zcdz' { ...getFieldProps('zcdz', { initialValue: obj.zcdz,rules: [{ required: true}]})}></Input></td>
                    </tr>
                    <tr >
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>营业执照号：</b></td>
                        <td ><Input id='yyzzhm' { ...getFieldProps('yyzzhm', { initialValue: obj.yyzzhm,rules: [{ required: true}]})}></Input></td>
                        <td ><span style={{'color':'red',fontSize:'large'}}>*</span><b>正式成立时间：</b></td>
                        <td id='clsj'  style={{textAlign:'left'}}><DatePicker  { ...getFieldProps('clsj', { initialValue: dd,rules: [{type: 'date',required: true}]})}></DatePicker></td>
                    </tr>
                      <tr >
                        <td colSpan="3" style={{textAlign:'left'}}><p>说明：</p><p>需要审批的变更项目提交后将提交中心管理端审批</p><p> 事务所变更审批时，不能再进行变更操作，必须等待审批结束后，才能变更。</p></td>
                        <td ><Col offSpan="8"><Button type="primary" disabled={check} htmlType="submit" loading={this.props.submitLoading}>提交</Button></Col></td>
                    </tr>
                </tbody>
            </table>
      </Form>
        </div>
        
    }
});
detailBox = createForm()(detailBox);
module.exports = detailBox;

