import React from 'react'
import './style.css'
import {Col, Input, Row, Button, Icon, Form, Modal, Checkbox } from 'antd'
const detailBox = React.createClass({

    render(){
        const obj = this.props.data;
        var obj2={};
        var obj3={};
        var arr1 =[];
        var arr2 =[];

        if(obj.ZJWGDM){
        arr1 = obj.ZJWGDM.split(',');
       
        for (var i=0;i<arr1.length;i++){
            obj2[arr1[i]]=true;
        } 
        }
        
        if(obj.NJWGDM){
        arr2 = obj.NJWGDM.split(',');
        for (var i=0;i<arr2.length;i++){
            obj3[arr2[i]]=true;
        }
        }
        
        return <div className="fix-table table-bordered table-striped">


<table >
                <tbody>
                
                <tr>
                    <td style={{width:'165px'}}><b>年度：</b></td>
                    <td>{obj.ND}</td>
                    <td><b>亊务所名称：</b></td>
                    <td colSpan="2">{obj.dwmc}</td>
                 </tr>
                 <tr>   
                    <td><b>机构注册号码：</b></td>
                    <td>{obj.zsbh}</td>
                    <td ><b>所长姓名：</b></td>
                    <td colSpan="2">{obj.SZ}</td>
                </tr>
                 <tr>   
                    <td><b>注册资金：</b></td>
                    <td>{obj.ZCZJ}万元</td>
                    <td ><b>联系电话：</b></td>
                    <td colSpan="2">{obj.dhhm}</td>
                </tr>
                 <tr>   
                    <td><b>办公地点：</b></td>
                    <td>{obj.bgdz}</td>
                    <td ><b>邮编：</b></td>
                    <td colSpan="2">{obj.yzbm}</td>
                </tr>
                 <tr>   
                    <td><b>组织形式：</b></td>
                    <td>{obj.jgxz}</td>
                    <td ><b>机构正式成立时间：</b></td>
                    <td colSpan="2">{obj.clsj}</td>
                </tr>
                 <tr>   
                    <td><b>总人数：</b></td>
                    <td>{obj.ZRS}</td>
                    <td ><b>执业注册税务师人数：</b></td>
                    <td colSpan="2">{obj.ZYRS}</td>
                </tr>
                 <tr>   
                    <td><b>参加后续教肓：</b></td>
                    <td>{obj.YJYRS}人应参加，{obj.SJJYRS}人实参加，{obj.WJYRS}人未参加</td>
                    <td ><b>本年度报备份数：</b></td>
                    <td colSpan="2">{obj.BAFS}</td>
                </tr>
                 <tr>   
                    <td><b>注册税务师变动情况：</b></td>
                    <td>增加{obj.ZCSWSBZJ}人，减少{obj.ZCSWSBJS}人</td>
                    <td ><b>分所数：</b></td>
                    <td colSpan="2">{obj.FSS}</td>
                </tr>
                 <tr>   
                    <td><b>股东变动情况：</b></td>
                    <td colSpan="4">增加{obj.GDBDQKZJ}人，减少{obj.GDBDQKJS}人</td>
                </tr>
                 <tr>   
                    <td><b>年检处理结果：</b></td>
                    <td colSpan="2">{obj.njcl}</td>
                    <td>所自检</td>
                    <td>注册科年检</td>
                </tr>
                 <tr>   
                    <td rowSpan="6"><b>执业资格：</b></td>
                    <td colSpan="2">本所存在注册税务师人数未达到规定的标准</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['1'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['1'] ? false:true}  /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">本所有发起人或合伙人以及出资人不按规定出资</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['2'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['2'] ? false:true}  /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">本所注册资本或经营资金不到位，出资人（股东）的出资不符合规定</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['3'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['3'] ? false:true}  /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">本所亊项变更存在未按规定和程序办理相关的手续</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['4'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['4'] ? false:true}  /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">本所办公地点与税务机关在一起</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['5'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['5'] ? false:true}  /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">本所存在拒绝在规定的时间参加年检</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['6'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['6'] ? false:true}  /></Col></td>
                </tr>


                <tr>   
                    <td rowSpan="13"><b>执业质量：</b></td>
                    <td colSpan="2">本所存在采取强迫、欺诈等不正当的手段招揽业务</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['7'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['7'] ? false:true}  /></Col></td>
                </tr>
                <tr>   
                    <td colSpan="2">本所没有与委托人签订协议书或协议书有不规范的行为</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['8'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['8'] ? false:true}  /></Col></td>
                </tr>
                <tr>   
                    <td colSpan="2">本所收到《注册税务师管理暂行办法》第四十三、四十四条所列行政处罚</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['9'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['9'] ? false:true}  /></Col></td>
                </tr>
                <tr>   
                    <td colSpan="2">本所存在未按照《注册税务师管理暂行办法》规定承办相关业务</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['10'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['10'] ? false:true}  /></Col></td>
                </tr>
                <tr>   
                    <td colSpan="2">本所存在未按协谈规定履行义务</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['11'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['11'] ? false:true}  /></Col></td>
                </tr>
                <tr>   
                    <td colSpan="2">本所未按照财务会计制度核算，内部管理较不好</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['12'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['12'] ? false:true}  /></Col></td>
                </tr>
                <tr>   
                    <td colSpan="2">本所有利用职务之便，谋取不正当的利益</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['13'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['13'] ? false:true}  /></Col></td>
                </tr>
                <tr>   
                    <td colSpan="2">本所有采取夸大宣传、诋毀同行、以低于成本价收费等不正当方式承接业务</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['14'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['14'] ? false:true}  /></Col></td>
                </tr>
                <tr>   
                    <td colSpan="2">本所有允许他人以本所名义承接相关业务</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['15'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['15'] ? false:true}  /></Col></td>
                </tr>
                <tr>   
                    <td colSpan="2">本所有出具虚假涉税文书，造成委托人未缴或者少缴税款</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['16'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['16'] ? false:true}  /></Col></td>
                </tr>
                <tr>   
                    <td colSpan="2">本所有违反税收法律，行政法规，造成委托人未缴或少缴税款</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['17'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['17'] ? false:true}  /></Col></td>
                </tr>
                <tr>   
                    <td colSpan="2">连续两年以上未开展任何业务的</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['28'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['18'] ? false:true}  /></Col></td>
                </tr>
                <tr>   
                    <td colSpan="2">未执行全省统一涉税鉴证收费标准的</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['29'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['19'] ? false:true}  /></Col></td>
                </tr>

                <tr>   
                    <td rowSpan="5"><b>收费管理：</b></td>
                    <td colSpan="2">本所财务会计制度不健全，会计核算不符合规定要求</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['18'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['20'] ? false:true}  /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">本所有隐藏，转移业务收入，虚报经营亏损</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['19'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['21'] ? false:true}  /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">本所有弄虚作假高额支付租赁房屋，设备等费用</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['20'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['22'] ? false:true}  /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">本所未按规定进行纳税申报及缴纳税款</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['21'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['23'] ? false:true}  /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">本所有偷税行为</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['22'] ? false:true}  /></Col><Col offSpan="12"><Checkbox checked={!obj3['24'] ? false:true}  /></Col></td>
                </tr>


                <tr>   
                    <td rowSpan="7"><b>其他方面：</b></td>
                    <td colSpan="2">本所有未经批准自行设立分支机构</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['23'] ? false:true} /></Col><Col offSpan="12"><Checkbox checked={!obj3['25'] ? false:true} /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">本所有未经批准自行挂索或接受挂</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['24'] ? false:true} /></Col><Col offSpan="12"><Checkbox checked={!obj3['26'] ? false:true} /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">本所有对分支机构只收管理费</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['25'] ? false:true} /></Col><Col offSpan="12"><Checkbox checked={!obj3['27'] ? false:true} /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">本所分支机构执业资质不符合要求</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['26'] ? false:true} /></Col><Col offSpan="12"><Checkbox checked={!obj3['28'] ? false:true} /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">本所分支机构一年内有两次以上执业质量问题</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['27'] ? false:true} /></Col><Col offSpan="12"><Checkbox checked={!obj3['29'] ? false:true} /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">未按照规定缴纳团体会费</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['30'] ? false:true} /></Col><Col offSpan="12"><Checkbox checked={!obj3['30'] ? false:true} /></Col></td>
                </tr>
                 <tr>   
                    <td colSpan="2">未按照规定办理团体会员登记、变更手续</td>
                    <td colSpan="2"><Col span="12"><Checkbox checked={!obj2['31'] ? false:true} /></Col><Col offSpan="12"><Checkbox checked={!obj3['31'] ? false:true} /></Col></td>
                </tr>
                  <tr>   
                    <td ><b>评级选项：</b></td>
                    <td >年检合格A级单位</td>
                    <td colSpan="3" style={{textAlign:'center'}}><Checkbox checked={!obj.ZPJ ? false:true}  /></td>
                </tr>
                <tr>   
                    <td ><b>年检总结：</b></td>
                    <td colSpan="4" >{obj.ZJ}</td>
                </tr>
                 <tr>   
                    <td rowSpan="2"><b>事务所负责人意见：</b></td>
                    <td  colSpan="4" >{obj.NJZJ}</td>
                </tr>
                <tr>
                <td colSpan="4"><Col span="12"><b>签名时间：</b>{obj.qzrq} </Col> <Col offspan="6"><b>负责人签名：</b>{obj.FZR}</Col></td>
                </tr>
                 <tr>   
                    <td ><b>广东省注册管理科意见：</b></td>
                    <td  colSpan="4">{obj.预留}</td>
                </tr>
                <tr>   
                    <td ><b>审批状态：</b>{obj.预留}</td>
                    <td  colSpan="2"><b>审批人：</b>{obj.预留}</td>
                    <td  colSpan="2"><b>审批时间：</b>{obj.预留}</td>
                </tr>
                </tbody>
            </table>












        
        </div>
    }
});

module.exports = detailBox;