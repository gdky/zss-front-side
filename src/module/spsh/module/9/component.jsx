import React from 'react'
import SPXX from '../spxx.jsx'
import C_JG from '../model.js'
import Panel from 'component/compPanel'

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
        const sd=decodeURIComponent(this.props.location.search);
        var rs=sd.substring(1,sd.length);
       const obj = this.state.entity;
       const mxbg=<table >
                    <tbody >
                            <tr>
                                <td ><b>姓 名：</b></td>
                                <td>{this.state.dl.xming}</td>
                                <td ><b>所属事务所：</b></td>
                                <td>{this.state.dl.dwmc}</td>
                            </tr>
                            <tr>
                                <td ><b>性 别：</b></td>
                                <td>{this.state.dl.xb}</td>
                                <td><b>身份证号：</b></td>
                                <td >{this.state.dl.sfzh}</td>
                            </tr>
                            <tr>
                                <td ><b>原机构名称：</b></td>
                                <td>{this.state.entity.yjg}</td>
                                <td><b>新机构名称：</b></td>
                                <td >{this.state.entity.xjg}</td>
                            </tr>
                            <tr>
                                <td ><b>税务师意见：</b></td>
                                <td>{this.state.entity.ZYSWSYJ}</td>
                                <td><b>填报日期：</b></td>
                                <td >{this.state.entity.TBRQ}</td>
                            </tr>
                            <tr>
                                <td ><b>原机构意见：</b></td>
                                <td>{this.state.entity.YSWSYJ}</td>
                                <td><b>新机构意见：</b></td>
                                <td >{this.state.entity.XSWSYJ}</td>
                            </tr>
                            <tr>
                                <td ><b>原机构意见日期：</b></td>
                                <td>{this.state.entity.YSWSYJRQ}</td>
                                <td><b>新机构意见日期：</b></td>
                                <td >{this.state.entity.XSWSYJRQ}</td>
                            </tr>
                            <tr>
                                <td ><b>所长签名：</b></td>
                                <td>{this.state.entity.SZQM}</td>
                                <td><b>新所长签名：</b></td>
                                <td >{this.state.entity.XSZQM}</td>
                            </tr>
                            <tr>
                                <td ><b>所长签名时间：</b></td>
                                <td>{this.state.entity.QMSJ}</td>
                                <td><b>新所长签名时间：</b></td>
                                <td >{this.state.entity.XQMSJ}</td>
                            </tr>
                            </tbody>
                      </table> 
    return <div className="wspxm-spsh">
            <div className="wrap">
                <SPXX wspcxurl='/spapi/wspcx/ry/9' spmxurl='/spapi/spmxxx/zyzs' mxbg={mxbg} getbg={this.makebg} isJG={false} zsid={rs}
                          columns={C_JG.zy} titleTop="待审执业税务师转所申请" titleSecond="执业税务师转所申请明细"/>
            </div>
        </div>
    }
});
module.exports = wspcx;