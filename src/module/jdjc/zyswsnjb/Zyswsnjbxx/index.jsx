 import React from 'react'
 import {Row,Col,Checkbox,Affix } from 'antd'
 import './style.css'

  const Zyswsnjbxx = React.createClass({
getDefaultProps() {//初始化某些传入值
        return {
            data: {
                ZJWGDM:"ssss",
            },
        };
    },
    render() {
    
          const data =this.props.data;
        var arr1 =[];
        var obj2={};
        var arr2 =[];
        var obj3={};
        if(!!data.ZJWGDM && data.ZJWGDM != 'null'){
           arr1 = data.ZJWGDM.split(',');
           for (var i=0;i<arr1.length;i++){
            obj2[arr1[i]]=true;
        } 
        }

        if(!!data.ZJWGDM && data.ZJWGDM != 'null' ){
           arr2 = data.NJWGDM.split(',');
           for (var i=0;i<arr2.length;i++){
            obj3[arr2[i]]=true;
        } 
        }      
    	
        return <div className="fix-table table-bordered table-striped" >
       
            <table>
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
                        <td rowSpan="5" colSpan="2"></td>                      
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
                    <td colSpan="2" >{data.ZJ}</td>
                    <td colSpan="3"></td>
                </tr>
                 <tr>   
                    <td >负责人意见：</td>
                    <td  >{data.SWSFZRYJ}</td>
                    <td colSpan="4">时间：{data.SWSFZRSJ} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 负责人签名：{data.SWSFZR}</td>
                </tr>
                
                <tr>   
                    <td colSpan="2">广东省注册管理科意见：</td>
                    <td  colSpan="4">{data.SPYJ}</td>
                </tr>
                <tr>   
                    <td colSpan="2">审批状态：{data.njzt}</td>
                    <td  colSpan="2">审批人：{data.SPRNAME}</td>
                    <td  colSpan="2">审批时间：{data.spsj}</td>
                </tr>
                
               
                
               
                
               
                
                </tbody>
            </table>
            
          

        </div>
    }
})

  module.exports =Zyswsnjbxx
  
  
   