import React from 'react'
import {Row,Col} from 'antd'
import './style.css'

const detailBox = React.createClass({

    render(){
        const obj = this.props.data;
  

        return <div className="fix-table table-bordered table-striped">
            <h1 style={{textAlign:'center'}}>{obj.ND}年度注册税务师行业鉴证业务情况统计表（表6)</h1>
            <table>
            
            <tbody>
            <tr >
            <td colSpan="2">编制地区（单位）：{obj.DWMC}</td>
            <td colSpan="2">上报时间：{obj.SBRQ}</td>
            <td colSpan="2">单位：万元、户</td>
            </tr>
            </tbody>
            <colgroup>
                    <col className ="col-4"></col>
                    <col className="col-4"></col>
                    <col className="col-4"></col>
                    <col className ="col-4"></col>
                    <col className="col-4"></col>
                    <col className="col-4"></col>
                </colgroup> 
                <tbody>
                <tr>
                        <td rowSpan="2">序号</td>
                        <td rowSpan="2">项目</td>
                        <td colSpan="2">上年数</td>          
                        <td colSpan="2">本年数</td>                        
                      
                       
                   </tr>
                    <tr>
                        
                        <td>户数</td>
                        <td>金额</td>
                        <td>户数</td>
                        <td>金额</td>
                      
                   </tr>
                    <tr>
                        
                        <td>1</td>
                        <td>企业所得税汇算清缴总户数</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                   
                   </tr>
                   
                     <tr>
                        
                        <td>2</td>
                        <td>企业所得税汇算清缴纳税申报鉴证业务</td>
                        <td>{obj.HSQJJE_HS0}</td>
                        <td>{obj.HSQJJE_JE0}</td>
                        <td>{obj.HSQJJE_HS}</td>
                        <td>{obj.HSQJJE_JE}</td>
                 
                        
                   </tr>
                   
                     <tr>
                        
                        <td>3</td>
                        <td>其中：（1）调增应纳所得税税额</td>
                        <td>{obj.TZYNSDSE_HS0}</td>
                        <td>{obj.TZYNSDSE_JE0}</td>
                        <td>{obj.TZYNSDSE_HS}</td>
                        <td>{obj.TZYNSDSE_JE}</td>
                     
                        
                   </tr>
                   
                    <tr>
                        
                        <td>4</td>
                        <td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（2）调减应纳所得税税额</td>
                        <td>{obj.TJYNSDSE_HS0}</td>
                        <td>{obj.TJYNSDSE_JE0}</td>
                        <td>{obj.TJYNSDSE_HS}</td>
                        <td>{obj.TJYNSDSE_JE}</td>
                    
                        
                   </tr>
                   
                    <tr>
                        
                        <td>5</td>
                        <td>企业税前弥补亏损鉴证业务</td>
                        <td>{obj.MBKSJE_HS0}</td>
                        <td>{obj.MBKSJE_JE0}</td>
                        <td>{obj.MBKSJE_HS}</td>
                        <td>{obj.MBKSJE_JE}</td>
                  
                        
                   </tr>
                   
                   <tr>
                        
                        <td>6</td>
                        <td>企业资产损失税前扣除鉴证业务</td>
                        <td>{obj.CCSSKC_HS0}</td>
                        <td>{obj.CCSSKC_JE0}</td>
                        <td>{obj.CCSSKC_HS}</td>
                        <td>{obj.CCSSKC_JE}</td>
                    
                        
                   </tr>
                   
                    <tr>
                        
                        <td>7</td>
                        <td>土地增值税清算鉴证业务</td>
                        <td>{obj.TDZZSQSJZ_HS0}</td>
                        <td>{obj.TDZZSQSJZ_JE0}</td>
                        <td>{obj.TDZZSQSJZ_HS}</td>
                        <td>{obj.TDZZSQSJZ_JE}</td>
                     
                        
                   </tr>
                   
                    <tr>
                        
                        <td>8</td>
                        <td>其他鉴证业务小计</td>
                        <td>{obj.QTJZ_HS0}</td>
                        <td>{obj.QTJZ_JE0}</td>
                        <td>{obj.QTJZ_HS}</td>
                        <td>{obj.QTJZ_JE}</td>
                     
                        
                   </tr>
                   
                    <tr>
                        
                        <td>9</td>
                        <td>其中：（1）高新技术企业认定鉴证业务</td>
                        <td>{obj.GXJSQYRDQZYW_HS0}</td>
                        <td>{obj.GXJSQYRDQZYW_JE0}</td>
                        <td>{obj.GXJSQYRDQZYW_HS}</td>
                        <td>{obj.GXJSQYRDQZYW_JE}</td>
                     
                        
                   </tr>
                   
                   <tr>
                        
                        <td>10</td>
                        <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（2）企业注销税务登记税款清算鉴证业务</td>
                        <td>{obj.QYZXSWDESKJSJZYW_HS0}</td>
                        <td>{obj.QYZXSWDESKJSJZYW_JE0}</td>
                        <td>{obj.QYZXSWDESKJSJZYW_HS}</td>
                        <td>{obj.QYZXSWDESKJSJZYW_JE}</td>
                    
                        
                   </tr>
                   
                    <tr>
                        
                        <td>11</td>
                        <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（3）研发费加计扣除鉴证业务</td>
                        <td>{obj.YFFJJKCJZYW_HS0}</td>
                        <td>{obj.YFFJJKCJZYW_JE0}</td>
                        <td>{obj.YFFJJKCJZYW_HS}</td>
                        <td>{obj.YFFJJKCJZYW_JE}</td>
                     
                        
                   </tr>
                   
                    <tr>
                        
                        <td>12</td>
                        <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（4）其他</td>
                        <td>{obj.QT_HS0}</td>
                        <td>{obj.QT_JE0}</td>
                        <td>{obj.QT_HS}</td>
                        <td>{obj.QT_JE}</td>
                   
                        
                   </tr>
                   
                </tbody>
                
                <tbody>
                
                   <tr>                        
                        <td colSpan="3">填报人：{obj.TIANBIAOREN}</td>
                        <td colSpan="3">所长：{obj.SUOZHANG}</td>
                        
                   </tr>
                
                </tbody>
            
            </table>
             
        </div>
    }
});

module.exports = detailBox;