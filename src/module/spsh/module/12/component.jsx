import React from 'react'
import SPXX from '../spxx.jsx'
import C_JG from '../model.js'
import Panel from 'component/compPanel'
 import {Row,Col,Checkbox,Input } from 'antd'

const wspcx = React.createClass({
    getInitialState(){
                  return {
                    entity:[],
                    dl: '',
                  }},

    makebg(data,rowData){
        this.setState({entity:data,dl:rowData});
      },

    render(){
        //定义工具栏内容
       const data = this.state.entity;
        var arr1 =[];
        var obj2={};
        var arr2 =[];
        var obj3={};
        if(!!data.ZJWGDM){
           arr1 = data.ZJWGDM.split(',');
           for (var i=0;i<arr1.length;i++){
            obj2[arr1[i]]=true;
        } 
        }
        if(!!data.ZJWGDM){
           arr2 = data.NJWGDM.split(',');
           for (var i=0;i<arr2.length;i++){
            obj3[arr2[i]]=true;
        } 
        }      
       const mxbg= <table className="jgnj">
             <colgroup>
                    <col className ="col-4"></col>
                    <col className="col-6"></col>
                    <col className="col-4"></col>
                    <col className ="col-6"></col>
                    <col className="col-2"></col>
                    <col className="col-2"></col>
                   
                </colgroup> 
            <tbody>
                <tr>
                        <td >姓名：</td>
                        <td>{data.XMING}</td>
                        <td >性别：&nbsp; &nbsp; &nbsp; {data.xb}</td>          
                        <td >  年度：{data.nd}</td>                        
                        <td rowSpan="5" colSpan="2">{!data.XPIAN? <p>未上传相片</p> : <img src={data.XPIAN} style={{padding:"5px",width:"138px",height:"170px"}}/>}</td>                      
                   </tr>
                    <tr>
                        <td >出生年月：</td>
                        <td>{data.SRI}</td>
                        <td >文化程度：</td>          
                        <td >{data.xl}  </td>                                                                      
                   </tr>
                   
                    <tr>
                        <td >身份证号：</td>
                        <td>{data.SFZH}</td>
                        <td >所在单位：</td>          
                        <td >{data.dwmc}  </td>                                                                      
                   </tr>
                   
                     <tr>
                        <td >联系电话：</td>
                        <td>{data.DHHM}</td>
                        <td >执业注册（备案）编号：</td>          
                        <td >{data.ZYZSBH}  </td>                                                                      
                   </tr>
                   
                     <tr>
                        <td >资格证书编号：</td>
                        <td>{data.ZYZGZSBH}</td>
                        <td >出资比率：</td>          
                        <td >{data.CZBL} &nbsp; % </td>                                                                      
                   </tr>
                   
                    <tr>
                        <td >本年度报备份数：</td>
                        <td>{data.BAFS}</td>
                        <td ></td>          
                        <td ></td>  
                        <td rowSpan="2">自检</td>   
                        <td rowSpan="2">注册科检</td>                                                                   
                   </tr>
                   
                    <tr>
                        <td >自检情况：</td>
                        <td colSpan="3" style={{textAlign:'center'}}>违规条款</td>
                                                                                      
                   </tr>
                   
                   <tr>   
                    <td ></td>
                    <td colSpan="3">允许或默认他人或本人名义作为税务师事务所出资人出资的</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['1'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['1'] ? false:true}  /></Col></td>
                </tr>
                
                 <tr>   
                    <td ></td>
                    <td colSpan="3">同时在2个以上税务师事务所出资的</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['2'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['2'] ? false:true}  /></Col></td>
                </tr>
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">允许或默认他人以本人名义接受税务师事务所其他出资人转让股份的</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['3'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['3'] ? false:true}  /></Col></td>
                </tr>
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">同时在2个以上税务师事务所执业又坚持不改正的</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['4'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['4'] ? false:true}  /></Col></td>
                </tr> 
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">连续2年有不良职业记录的</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['5'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['5'] ? false:true}  /></Col></td>
                </tr> 
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">连续2年未参加年检的</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['6'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['6'] ? false:true}  /></Col></td>
                </tr> 
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">无正当理由拒绝在规定期限内进行年检的</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['7'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['7'] ? false:true}  /></Col></td>
                </tr> 
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">明知委托人对重要涉税事项的处理与国家税收法律、法规及有关规定相抵触，而不予指明</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['8'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['8'] ? false:true}  /></Col></td>
                </tr> 
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">明知委托人对重要涉税务事项的处理会损害报告使用人或者其他利害关系人的合法权益，而予以隐瞒或者作不实的报告</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['9'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['9'] ? false:true}  /></Col></td>
                </tr> 
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">明知委托人对重要涉税务事项的处理会导致报告使用人或者其他利害关系人产生重大误解，而不予指明</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['10'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['10'] ? false:true}  /></Col></td>
                </tr> 
                
                 <tr>   
                    <td ></td>
                    <td colSpan="3">明知委托人对重要涉税事项有其他不实内容，而不予指明</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['11'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['11'] ? false:true}  /></Col></td>
                </tr> 
                
                 <tr>   
                    <td ></td>
                    <td colSpan="3">执业期间，买卖委托人的股票、债券</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['12'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['12'] ? false:true}  /></Col></td>
                </tr> 
                
                 <tr>   
                    <td ></td>
                    <td colSpan="3">索取、收受委托合同约定以外的酬金或者其他财务，或者利用执业之便，谋取其他不正当的利益</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['13'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['13'] ? false:true}  /></Col></td>
                </tr> 
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">允许他人以本人名义执业</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['14'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['14'] ? false:true}  /></Col></td>
                </tr> 
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">向税务机关工作人员行贿或者指使、诱导委托人行贿</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['15'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['15'] ? false:true}  /></Col></td>
                </tr> 
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">其他违反法律、行政法规的行为</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['16'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['16'] ? false:true}  /></Col></td>
                </tr> 
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">以个人名义承接业务或者收费的</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['17'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['17'] ? false:true}  /></Col></td>
                </tr> 
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">泄露委托人商业秘密的</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['18'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['18'] ? false:true}  /></Col></td>
                </tr> 
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">利用执业之便，谋取不正当利益的</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['19'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['19'] ? false:true}  /></Col></td>
                </tr> 
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">出具虚假涉税文书</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['20'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['20'] ? false:true}  /></Col></td>
                </tr>
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">违反税收法律、行政法规，造成委托人未缴或者少缴税款的</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['21'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['21'] ? false:true}  /></Col></td>
                </tr>
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">未按规定缴纳个人会费</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['23'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['23'] ? false:true}  /></Col></td>
                </tr>
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">未按规定办理会员登记、变更手续</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['24'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['24'] ? false:true}  /></Col></td>
                </tr>
                
                <tr>   
                    <td ></td>
                    <td colSpan="3">未参加继续教育情况</td>
                   <td colSpan="2"><Col span="14"><Checkbox checked={!obj2['25'] ? false:true}  /></Col><Col offSpan="10"><Checkbox checked={!obj3['25'] ? false:true}  /></Col></td>
                </tr>
                
                <tr>   
                    <td >年检总结：</td>
                    <td className="jgnjnjzj" colSpan="5" ><Input type="textarea"  value={data.ZJ} disabled autosize /></td>
                </tr>
                 <tr>   
                    <td rowSpan="2" >负责人意见：</td>
                    <td className="jgnjnjzj" colSpan="5" ><Input type="textarea"  value={data.SWSFZRYJ} disabled autosize /></td>
                </tr>
                <tr>
                <td colSpan="5"><Col span="12"><b>签名时间：</b>{data.SWSFZRSJ} </Col> <Col offspan="6"><b>负责人签名：</b>{data.SWSFZR}</Col></td>
                </tr>
                </tbody>
            </table> 
    return <div className="wspxm-spsh">
            <div className="wrap">
                <SPXX wspcxurl='/spapi/wspcx/ry/12' spmxurl='/spapi/spmxxx/zyswsnj' mxbg={mxbg} getbg={this.makebg} isJG={false}
                         zynj columns={C_JG.zy} titleTop="待审执业税务师年检申请" titleSecond="执业税务师年检明细"/>
            </div>
        </div>
    }
});
module.exports = wspcx;