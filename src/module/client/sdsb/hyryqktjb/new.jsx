import React from 'react'
import {Steps, Col, Row, Spin, notification, Icon, Button, Form, Input,InputNumber,Modal} from 'antd'
import Panel from 'component/compPanel'
import {SelectorYear, SelectorXZ, SelectorSWSXZ, SelectorCS} from 'component/compSelector'
import auth from 'common/auth.js'
import config from 'common/configuration.js'
import req from 'common/request'
import utils from 'common/utils'
import Success from './successScr'
import FailScr from './failScr'

const ButtonGroup = Button.Group;
const PanelBar = Panel.ToolBar;

let Editfrom = React.createClass({
    zero(v,pre){
        if (!v) {
            return 0;
        }else{
            return v;
        };
    },
    checkNoChanged(rule, value, callback){
            const { getFieldValue,setFieldsValue } = this.props.form;
            let key = rule.field;
            let rs = 0;
            if (key.includes('_')) {
                let zysws=getFieldValue(key.replace('ryzs','zysws'));
                let qtcyry=getFieldValue(key.replace('ryzs','qtcyry'));
                 rs = (typeof(zysws)=="undefined"?0:zysws)+(typeof(qtcyry)=="undefined"?0:qtcyry);
            }else{
                let num = Number(key.split('bz')[1])
                let zysws=getFieldValue('bz'+(num+8));
                let qtcyry=getFieldValue('bz'+(num+24));
                 rs = (typeof(zysws)=="undefined"?0:zysws)+(typeof(qtcyry)=="undefined"?0:qtcyry);
            };
            if (rs==0) {
                callback();
            }else{
                setFieldsValue({[key]:rs});

            };
            callback();
    },
    checkChanged(rule, value, callback){
            const { validateFields } = this.props.form;
            let key = rule.field;
            if (value) {
                if (key.includes('_')) {
                let fir = rule.field.split('_')[0];
                validateFields([key.replace(fir,'ryzs')], { force: true });
                }else{
                    let num = Number(key.split('bz')[1])
                    validateFields(['bz'+(num%8==0?8:num%8)], { force: true });
                }
            }
            callback();
    },
    checkRow(rule, value, callback){
            const { getFieldValue } = this.props.form;
            let key = rule.field;
            if (value) {
                    let zj=(typeof(value)=="undefined"?0:value)
                    if (key.includes('_')) {
                            let fir = rule.field.split('_')[0];
                            if (fir=='hhczr') {
                                let rs=getFieldValue([key.replace(fir,'zysws')]);
                                if (zj>(typeof(rs)=="undefined"?0:rs)) {
                                    callback("其中：股东或合伙人人数不能大于执业注册税务师人数");
                                };
                            }else{
                                let rs=getFieldValue([key.replace(fir,'qtcyry')]);
                                if (zj>(typeof(rs)=="undefined"?0:rs)) {
                                    callback("其中人数不能大于其他从业人员人数");
                                };
                            };
                    }else{
                        let num = Number(key.split('bz')[1])
                        if (num>24) {
                            let rs =getFieldValue(['bz'+(num%8==0?32:num%8+24)]);
                                if (zj>(typeof(rs)=="undefined"?0:rs)) {
                                            callback("其中人数不能大于其他从业人员人数");
                                        };
                        }else{
                                let rs =getFieldValue(['bz'+(num%8==0?16:num%8+8)]);
                                if (zj>(typeof(rs)=="undefined"?0:rs)) {
                                            callback("其中：股东或合伙人人数不能大于执业注册税务师人数");
                                        };
                        };
                    }
            }
            callback();
    },
    checkColums(rule, value, callback){
        let div1 = document.getElementById(rule.field);
        div1.style.backgroundColor="#ffffff"; 
        const { getFieldValue,getFieldsValue } = this.props.form;
        let key = rule.field.split('_')[0];
        let xls=sumCol(getFieldsValue([key+"_xl_yjs",key+"_xl_bk",key+"_xl_dz",key+"_xl_zz"]));
        let nls=sumCol(getFieldsValue([key+"_nl_35",key+"_nl_50",key+"_nl_60l",key+"_nl_60u"]));
        let zzmms=sumCol(getFieldsValue([key+"_zzmm_gcd",key+"_zzmm_mzp"]));
        let nv = getFieldValue(key+"_ry_nv");
        let num=0;
        switch(key){
            case 'zysws' : num=1;break;
            case 'hhczr' : num=2;break;
            case 'qtcyry' : num=3;break;
            case 'fzyzss' : num=4;break;
            case 'zckjs' : num=5;break;
            case 'zcpgs' : num=6;break;
            case 'ls' : num=7;break;
        };
        let rddb=sumCol(getFieldsValue(['bz'+(1+num*8),'bz'+(2+num*8),'bz'+(3+num*8),'bz'+(4+num*8)]));
        let zxwy=sumCol(getFieldsValue(['bz'+(5+num*8),'bz'+(6+num*8),'bz'+(7+num*8),'bz'+(8+num*8)]));
        let zj=(typeof(value)=="undefined"?0:value)
            if (zj!=xls) {
                callback("横向学历合计人数须等于总计")
            }else if (zj!=nls) {
                callback("横向年龄合计人数须等于总计")
            }else if (zj<zzmms) {
                callback("横向政治面貌合计人数不能大于总计")
            }else if (zj<rddb) {
                callback("横向人大代表合计人数不能大于总计")
            }else if (zj<zxwy) {
                callback("横向政协委员合计人数不能大于总计")
            }else if (zj<nv) {
                callback("其中女的人数须小于总计")
            };
            callback();
        function sumCol(colums){
           let rs = 0;
           for(let key in colums){
                rs+=(typeof(colums[key])=="undefined"?0:colums[key])
           }
           return rs;
        };
    },
    commit(){
        const {validateFieldsAndScroll} = this.props.form;
        validateFieldsAndScroll({force:true},(errors, values) => {
            if (!!errors) {
                for(var key in errors){//定位控件更改颜色
                    var div1 = document.getElementById(key);
                    div1.style.backgroundColor="rgba(255, 0, 0, 0.09)"; 
                    }
                    Modal.info({ title: '提示', content: (<div><p><b>{errors[key].errors[0].message}</b></p> </div>)});
                return;
            }
            for(let key in values){
                    if(Object.prototype.toString.call(values[key]) == "[object Undefined]" || (isNaN(values[key])&&(""==values[key]))){
                        values[key]=null;
                    }
            }
            this.props.onCommit(values);
        })
    },
    save(){
        const {validateFieldsAndScroll} = this.props.form;
        validateFieldsAndScroll({force:true},(errors, values) => {
            if (!!errors) {
                    for(var key in errors){//定位控件更改颜色
                            var div1 = document.getElementById(key);
                            div1.style.backgroundColor="rgba(255, 0, 0, 0.09)"; 
                            }
                    Modal.info({ title: '提示', content: (<div><p><b>{errors[key].errors[0].message}</b></p> </div>)});
                return;
            }
            for(let key in values){
                    if(Object.prototype.toString.call(values[key]) == "[object Undefined]" || (isNaN(values[key])&&(""==values[key]))){
                        values[key]=null;
                    }
            }
            this.props.onSave(values);
        })
    },
    render(){
        const {getFieldProps,setFields} = this.props.form;
        let data =[{}];
         if(this.props.data.length!=0){
              data = this.props.data;
         };
        return <div className="add_hyryb">
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
                    <td colSpan="2" >单位：{this.props.data.DWMC}</td>
                    <td  >所长：</td>
                   <td  ><Input disabled={!this.props.bDisabled}  {...getFieldProps('sz')}/></td>
                    <td  >制表人：</td>
                    <td  >  <Input {...getFieldProps('zbr')}/> </td>
                    <td  >年度：</td>
                     <td  >
                            <SelectorYear disabled={!this.props.bDisabled} { ...getFieldProps('nd')}/>
                         </td> 
                           <td colSpan="14">单位：万元、户</td>
                
                </tr>
                
                    <tr style={{textAlign:'center'}}>
                    <td rowSpan="3" colSpan="2">项目</td>
                    <td colSpan="2">人员</td>
                    <td colSpan="4">学历</td>
                    <td colSpan="4">年龄</td>
                    <td colSpan="2">政治面貌</td>
                    <td colSpan="8">备注</td>
                </tr>
                 <tr>
                    <td rowSpan="2" style={{textAlign:'center'}}  >人数总计</td>
                    <td rowSpan="2" style={{textAlign:'center'}} >其中:女</td>
                    <td rowSpan="2" style={{textAlign:'center'}} >研宄生及以上</td>
                    <td rowSpan="2" style={{textAlign:'center'}} >大学本科</td>
                    <td rowSpan="2" style={{textAlign:'center'}} >大专学历</td>
                    <td rowSpan="2" style={{textAlign:'center'}} >大专以下</td>
                    <td rowSpan="2" style={{textAlign:'center'}} >35岁以下</td>
                    <td rowSpan="2" style={{textAlign:'center'}} >36-50岁</td>
                    <td rowSpan="2" style={{textAlign:'center'}} >51-60 岁</td>
                    <td rowSpan="2" style={{textAlign:'center'}} >61岁以上</td>
                    <td rowSpan="2" style={{textAlign:'center'}} >中共党员</td>
                    <td rowSpan="2" style={{textAlign:'center'}} >民主党派</td>
                    <td colSpan="4" style={{textAlign:'center'}} >人大代表</td>
                    <td colSpan="4" style={{textAlign:'center'}} >政协委员</td>
                </tr>
                <tr>
                    <td style={{textAlign:'center'}} >全国</td>
                    <td style={{textAlign:'center'}} >省</td>
                    <td style={{textAlign:'center'}} >市</td>
                    <td style={{textAlign:'center'}} >县</td>
                    <td style={{textAlign:'center'}} >全国</td>
                    <td style={{textAlign:'center'}} >省</td>
                    <td style={{textAlign:'center'}} >市</td>
                    <td style={{textAlign:'center'}} >县</td>
                </tr>
                 <tr>
                    <td colSpan="2">人员总数</td>
                    <td ><InputNumber min={0}  disabled={!this.props.bDisabled} {...getFieldProps('ryzs_ry_zj', {rules:[{validator:this.checkColums}]})}/></td>
                    <td><InputNumber min={0} id='ryzs_ry_nv'  disabled={!this.props.bDisabled}  {...getFieldProps('ryzs_ry_nv', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='ryzs_xl_yjs'  disabled={!this.props.bDisabled}  {...getFieldProps('ryzs_xl_yjs', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='ryzs_xl_bk'  disabled={!this.props.bDisabled}  {...getFieldProps('ryzs_xl_bk', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='ryzs_xl_dz'  disabled={!this.props.bDisabled}  {...getFieldProps('ryzs_xl_dz', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='ryzs_xl_zz'  disabled={!this.props.bDisabled}  {...getFieldProps('ryzs_xl_zz', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='ryzs_zzmm_gcd'  disabled={!this.props.bDisabled}  {...getFieldProps('ryzs_nl_35', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='ryzs_nl_50'  disabled={!this.props.bDisabled}  {...getFieldProps('ryzs_nl_50', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='ryzs_nl_60l'  disabled={!this.props.bDisabled}  {...getFieldProps('ryzs_nl_60l', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='ryzs_nl_60u' disabled={!this.props.bDisabled}   {...getFieldProps('ryzs_nl_60u', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='ryzs_zzmm_gcd'  disabled={!this.props.bDisabled}  {...getFieldProps('ryzs_zzmm_gcd', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='ryzs_zzmm_mzp'  disabled={!this.props.bDisabled}  {...getFieldProps('ryzs_zzmm_mzp', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz1' disabled={!this.props.bDisabled}   {...getFieldProps('bz1', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz2'  disabled={!this.props.bDisabled}  {...getFieldProps('bz2', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz3'  disabled={!this.props.bDisabled}  {...getFieldProps('bz3', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz4' disabled={!this.props.bDisabled}   {...getFieldProps('bz4', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz5'  disabled={!this.props.bDisabled}  {...getFieldProps('bz5', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td ><InputNumber min={0} id='bz6'  disabled={!this.props.bDisabled}  {...getFieldProps('bz6', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td ><InputNumber min={0} id='bz7' disabled={!this.props.bDisabled}   {...getFieldProps('bz7', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                    <td ><InputNumber min={0} id='bz8'  disabled={!this.props.bDisabled}  {...getFieldProps('bz8', {normalize:this.zero,rules:[{validator:this.checkNoChanged}]})}/></td>
                </tr>
                 <tr>
                    <td colSpan="2">1、执业注册税务师</td>
                    <td><InputNumber min={0} id='yy'  disabled={!this.props.bDisabled}  {...getFieldProps('zysws_ry_zj', {rules:[{validator:this.checkColums}]})}/></td>
                    <td><InputNumber min={0} id='zysws_ry_nv'    {...getFieldProps('zysws_ry_nv', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='zysws_xl_yjs'    {...getFieldProps('zysws_xl_yjs', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='zysws_xl_bk'    {...getFieldProps('zysws_xl_bk', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='zysws_xl_dz'    {...getFieldProps('zysws_xl_dz', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='zysws_xl_zz'    {...getFieldProps('zysws_xl_zz', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='zysws_nl_35'    {...getFieldProps('zysws_nl_35', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='zysws_nl_50'    {...getFieldProps('zysws_nl_50', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='zysws_nl_60l'    {...getFieldProps('zysws_nl_60l', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='zysws_nl_60u'    {...getFieldProps('zysws_nl_60u', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='zysws_zzmm_gcd'    {...getFieldProps('zysws_zzmm_gcd', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='zysws_zzmm_mzp'    {...getFieldProps('zysws_zzmm_mzp', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz9'    {...getFieldProps('bz9', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz10'    {...getFieldProps('bz10', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz11'    {...getFieldProps('bz11', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz12'    {...getFieldProps('bz12', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz13'    {...getFieldProps('bz13', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz14'    {...getFieldProps('bz14', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz15'    {...getFieldProps('bz15', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz16'    {...getFieldProps('bz16', {rules:[{validator:this.checkChanged}]})}/></td>
                </tr>
                
                 <tr>
                   <td colSpan="2" style={{paddingLeft:'3em'}}>其中：股东或合伙人</td>
                    <td><InputNumber min={0} id='hhczr_ry_zj'    {...getFieldProps('hhczr_ry_zj', {rules:[{validator:this.checkColums}]})}/></td>
                    <td><InputNumber min={0} id='hhczr_ry_nv'    {...getFieldProps('hhczr_ry_nv', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='hhczr_xl_yjs'    {...getFieldProps('hhczr_xl_yjs', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='hhczr_xl_bk'    {...getFieldProps('hhczr_xl_bk', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='hhczr_xl_dz'    {...getFieldProps('hhczr_xl_dz', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='hhczr_xl_zz'    {...getFieldProps('hhczr_xl_zz', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='hhczr_nl_35'    {...getFieldProps('hhczr_nl_35', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='hhczr_nl_50'    {...getFieldProps('hhczr_nl_50', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='hhczr_nl_60l'    {...getFieldProps('hhczr_nl_60l', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='hhczr_nl_60u'    {...getFieldProps('hhczr_nl_60u', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='hhczr_zzmm_gcd'    {...getFieldProps('hhczr_zzmm_gcd', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='hhczr_zzmm_mzp'    {...getFieldProps('hhczr_zzmm_mzp', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz17'    {...getFieldProps('bz17', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz18'    {...getFieldProps('bz18', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz19'    {...getFieldProps('bz19', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz20'    {...getFieldProps('bz20', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz21'    {...getFieldProps('bz21', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz22'    {...getFieldProps('bz22', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz23'    {...getFieldProps('bz23', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz24'    {...getFieldProps('bz24', {rules:[{validator:this.checkRow}]})}/></td>
                </tr>
                  <tr>
                   <td colSpan="2">2、其他从业人员</td>
                    <td><InputNumber min={0} id='qtcyry_ry_zj' disabled={!this.props.bDisabled}   {...getFieldProps('qtcyry_ry_zj', {rules:[{validator:this.checkColums}]})}/></td>
                    <td><InputNumber min={0} id='qtcyry_ry_nv'    {...getFieldProps('qtcyry_ry_nv', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='qtcyry_xl_yjs'    {...getFieldProps('qtcyry_xl_yjs', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='qtcyry_xl_bk'    {...getFieldProps('qtcyry_xl_bk', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='qtcyry_xl_dz'    {...getFieldProps('qtcyry_xl_dz', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='qtcyry_xl_zz'    {...getFieldProps('qtcyry_xl_zz', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='qtcyry_nl_35'    {...getFieldProps('qtcyry_nl_35', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='qtcyry_nl_50'    {...getFieldProps('qtcyry_nl_50', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='qtcyry_nl_60l'    {...getFieldProps('qtcyry_nl_60l', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='qtcyry_nl_60u'    {...getFieldProps('qtcyry_nl_60u', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='qtcyry_zzmm_gcd'    {...getFieldProps('qtcyry_zzmm_gcd', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='qtcyry_zzmm_mzp'    {...getFieldProps('qtcyry_zzmm_mzp', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz25'    {...getFieldProps('bz25', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz26'    {...getFieldProps('bz26', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz27'    {...getFieldProps('bz27', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz28'    {...getFieldProps('bz28', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz29'    {...getFieldProps('bz29', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz30'    {...getFieldProps('bz30', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz31'    {...getFieldProps('bz31', {rules:[{validator:this.checkChanged}]})}/></td>
                    <td><InputNumber min={0} id='bz32'    {...getFieldProps('bz32', {rules:[{validator:this.checkChanged}]})}/></td>
                </tr>
                <tr>
                   <td colSpan="2" style={{paddingLeft:'3em'}}>其中：亊务所内非执业注册税务师</td>
                    <td><InputNumber min={0} id='fzyzss_ry_zj'    {...getFieldProps('fzyzss_ry_zj', {rules:[{validator:this.checkColums}]})}/></td>
                    <td><InputNumber min={0} id='fzyzss_ry_nv'    {...getFieldProps('fzyzss_ry_nv', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='fzyzss_xl_yjs'    {...getFieldProps('fzyzss_xl_yjs', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='fzyzss_xl_bk'    {...getFieldProps('fzyzss_xl_bk', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='fzyzss_xl_dz'    {...getFieldProps('fzyzss_xl_dz', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='fzyzss_xl_zz'    {...getFieldProps('fzyzss_xl_zz', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='fzyzss_nl_35'    {...getFieldProps('fzyzss_nl_35', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='fzyzss_nl_50'    {...getFieldProps('fzyzss_nl_50', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='fzyzss_nl_60l'    {...getFieldProps('fzyzss_nl_60l', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='fzyzss_nl_60u'    {...getFieldProps('fzyzss_nl_60u', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='fzyzss_zzmm_gcd'    {...getFieldProps('fzyzss_zzmm_gcd', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='fzyzss_zzmm_mzp'    {...getFieldProps('fzyzss_zzmm_mzp', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz33'    {...getFieldProps('bz33', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz34'    {...getFieldProps('bz34', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz35'    {...getFieldProps('bz35', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz36'    {...getFieldProps('bz36', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz37'    {...getFieldProps('bz37', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz38'    {...getFieldProps('bz38', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz39'    {...getFieldProps('bz39', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz40'    {...getFieldProps('bz40', {rules:[{validator:this.checkRow}]})}/></td>
                </tr>
                 <tr>
                   <td rowSpan="3">其中：具有其他专业服务资格的从业人员</td>
                   <td>1、注册会计师</td>
                    <td><InputNumber min={0} id='zckjs_ry_zj'    {...getFieldProps('zckjs_ry_zj', {rules:[{validator:this.checkColums}]})}/></td>
                    <td><InputNumber min={0} id='zckjs_ry_nv'    {...getFieldProps('zckjs_ry_nv', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zckjs_xl_yjs'    {...getFieldProps('zckjs_xl_yjs', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zckjs_xl_bk'    {...getFieldProps('zckjs_xl_bk', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zckjs_xl_dz'    {...getFieldProps('zckjs_xl_dz', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zckjs_xl_zz'    {...getFieldProps('zckjs_xl_zz', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zckjs_nl_35'    {...getFieldProps('zckjs_nl_35', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zckjs_nl_50'    {...getFieldProps('zckjs_nl_50', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zckjs_nl_60l'    {...getFieldProps('zckjs_nl_60l', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zckjs_nl_60u'    {...getFieldProps('zckjs_nl_60u', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zckjs_zzmm_gcd'    {...getFieldProps('zckjs_zzmm_gcd', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zckjs_zzmm_mzp'    {...getFieldProps('zckjs_zzmm_mzp', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz41'    {...getFieldProps('bz41', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz42'    {...getFieldProps('bz42', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz43'    {...getFieldProps('bz43', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz44'    {...getFieldProps('bz44', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz45'    {...getFieldProps('bz45', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz46'    {...getFieldProps('bz46', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz47'    {...getFieldProps('bz47', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz48'    {...getFieldProps('bz48', {rules:[{validator:this.checkRow}]})}/></td>
                </tr>
                 <tr>
                   <td>2、资产评估师</td>
                    <td><InputNumber min={0} id='zcpgs_ry_zj'    {...getFieldProps('zcpgs_ry_zj', {rules:[{validator:this.checkColums}]})}/></td>
                    <td><InputNumber min={0} id='zcpgs_ry_nv'    {...getFieldProps('zcpgs_ry_nv', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zcpgs_xl_yjs'    {...getFieldProps('zcpgs_xl_yjs', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zcpgs_xl_bk'    {...getFieldProps('zcpgs_xl_bk', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zcpgs_xl_dz'    {...getFieldProps('zcpgs_xl_dz', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zcpgs_xl_zz'    {...getFieldProps('zcpgs_xl_zz', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zcpgs_nl_35'    {...getFieldProps('zcpgs_nl_35', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zcpgs_nl_50'    {...getFieldProps('zcpgs_nl_50', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zcpgs_nl_60l'    {...getFieldProps('zcpgs_nl_60l', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zcpgs_nl_60u'    {...getFieldProps('zcpgs_nl_60u', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zcpgs_zzmm_gcd'    {...getFieldProps('zcpgs_zzmm_gcd', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='zcpgs_zzmm_mzp'    {...getFieldProps('zcpgs_zzmm_mzp', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz49'    {...getFieldProps('bz49', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz50'    {...getFieldProps('bz50', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz51'    {...getFieldProps('bz51', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz52'    {...getFieldProps('bz52', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz53'    {...getFieldProps('bz53', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz54'    {...getFieldProps('bz54', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz55'    {...getFieldProps('bz55', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz56'    {...getFieldProps('bz56', {rules:[{validator:this.checkRow}]})}/></td>
                </tr>
                 <tr>
                   <td>3、律师</td>
                    <td><InputNumber min={0} id='ls_ry_zj'    {...getFieldProps('ls_ry_zj', {rules:[{validator:this.checkColums}]})}/></td>
                    <td><InputNumber min={0} id='ls_ry_nv'    {...getFieldProps('ls_ry_nv', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='ls_xl_yjs'    {...getFieldProps('ls_xl_yjs', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='ls_xl_bk'    {...getFieldProps('ls_xl_bk', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='ls_xl_dz'    {...getFieldProps('ls_xl_dz', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='ls_xl_zz'    {...getFieldProps('ls_xl_zz', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='ls_nl_35'    {...getFieldProps('ls_nl_35', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='ls_nl_50'    {...getFieldProps('ls_nl_50', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='ls_nl_60l'    {...getFieldProps('ls_nl_60l', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='ls_nl_60u'    {...getFieldProps('ls_nl_60u', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='ls_zzmm_gcd'    {...getFieldProps('ls_zzmm_gcd', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='ls_zzmm_mzp'    {...getFieldProps('ls_zzmm_mzp', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz57'    {...getFieldProps('bz57', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz58'    {...getFieldProps('bz58', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz59'    {...getFieldProps('bz59', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz60'    {...getFieldProps('bz60', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz61'    {...getFieldProps('bz61', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz62'    {...getFieldProps('bz62', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz63'    {...getFieldProps('bz63', {rules:[{validator:this.checkRow}]})}/></td>
                    <td><InputNumber min={0} id='bz64'    {...getFieldProps('bz64', {rules:[{validator:this.checkRow}]})}/></td>
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
                   <p> 4、备注栏中填写县以上人大代表和政协委员。</p>
            </div>
            <div style={{textAlign:'center'}}>
            <Button type="primary" onClick={this.save} disabled={this.props.bDisabled}> <Icon type="check"/>保存</Button>
            <span className="ant-divider"></span>
            <Button type="primary" onClick={this.commit} disabled={this.props.bDisabled}> <Icon type="arrow-up"/>提交</Button>
            </div>
            </div>
        </div>
    }
});
Editfrom = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(Editfrom);


const c = React.createClass({
    getDefaultProps(){
        return {
            title: '添加行业人员情况统计表',
            url: config.HOST + config.URI_API_PROJECT + '/client/hyryqktjb/add',
            initUrl: config.HOST + config.URI_API_PROJECT + '/client/hyryqktj/check'
        }
    },
    getInitialState(){
        return {
            loading: true,
            data: {},
            scr: 'edit'
        }
    },
    back(){
        this.props.onBack();
    },

    //保存
    handleSave(values){
        const {url} = this.props;
        values.ztbj = 0;
        this.setState({loading:true,data:values});
        req({
            method:'post',
            url:url,
            data:values,
            headers:{'x-auth-token':auth.getToken()}
        }).then(resp=>{
            this.setState({loading:false,scr:'success',successType:'save'})
        }).catch(e=>{
            this.setState({loading: false});
            if (e.status == 403){
                let res = JSON.parse(e.response);
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: res.text
                });
            }else{
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: '报表数据保存失败，请稍后再尝试'
                });
            }
        });
    },
    //提交
    handleCommit(values){
        const {url} = this.props;
        values.ztbj = 1;
        this.setState({loading:true,data:values});
        req({
            method:'post',
            url:url,
            data:values,
            headers:{'x-auth-token':auth.getToken()}
        }).then(resp=>{
            this.setState({loading:false,scr:'success',successType:'commit'})
        }).catch(e=>{
            if (e.status == 403){
                let res = JSON.parse(e.response);
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: res.text
                });
            }else{
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: '报表数据保存失败，请稍后再尝试'
                });
            }
        });
    },

    componentDidMount(){
        const {initUrl}  = this.props;
        req({
            method: 'get',
            url: initUrl,
            headers:{'x-auth-token':auth.getToken()}
        }).then(resp=> {
            if (resp) {
            this.setState({data: resp, loading: false})
            }else{
            this.setState({warnning: true, loading: false,bDisabled:true})
            };
        }).catch(e=> {
            if (e.status == 403) {
                let res = JSON.parse(e.response);
                this.setState({scr: 'fail', loading: false, failtext: res.text});
            } else {
                this.setState({scr: 'fail', loading: false})
            }

        })
    },

    render(){
        const {title} = this.props;
        let {data,loading,scr,failtext,successType} = this.state;
        const panelBar = <PanelBar>
            <Button onClick={this.back}>
                <Icon type="rollback"/>返回
            </Button>
        </PanelBar>;

        let content = {
            edit: <Editfrom data={data} onCommit={this.handleCommit} onSave={this.handleSave} bDisabled={this.state.bDisabled} />,
            fail: <FailScr text={failtext}/>,
            success: <Success type={successType}/>
        };

        return <Panel className="swsjbqk-edit" toolbar={panelBar} title={title}>
            <Spin spinning={loading}>
            {this.state.warnning&&<div style={{textAlign:'center'}}><span style={{'color':'red',fontSize:'large'}}>请先填报上年度基本情况统计表（表1），提交通过后再填报此表</span></div>}
                {content[scr]}
            </Spin>
        </Panel>

    }
});


module.exports = c;