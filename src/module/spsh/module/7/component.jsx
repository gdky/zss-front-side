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
       const mxbg=<table >
                    <tbody >
                            <tr>
                                <td ><b>申请人员姓名：</b></td>
                                <td>{this.state.dl.xming}</td>
                            </tr>
                            <tr>
                                <td ><b>性别：</b></td>
                                <td>{this.state.dl.xb}</td>
                            </tr>
                            <tr>
                                <td ><b>身份证号：</b></td>
                                <td>{this.state.dl.sfzh}</td>
                            </tr>
                            <tr>
                                <td ><b>所属事务所：</b></td>
                                <td>{this.state.dl.dwmc}</td>
                            </tr>
                            <tr>
                                <td ><b>转非原因：</b></td>
                                <td>{this.state.entity.FZYSQ}</td>
                            </tr>
                            <tr>
                                <td ><b>现单位意见：</b></td>
                                <td>{this.state.entity.XDWYJ}</td>
                            </tr>
                            <tr>
                                <td ><b>填报日期：</b></td>
                                <td>{this.state.entity.TBRQ}</td>
                            </tr>
                            </tbody>
                      </table> 
    return <div className="wspxm-spsh">
            <div className="wrap">
                <SPXX wspcxurl='/spapi/wspcx/ry/7' spmxurl='/spapi/spmxxx/zyzfzy' mxbg={mxbg} getbg={this.makebg} isJG={false} zsid={rs}
                          columns={C_JG.zy} titleTop="待审执业税务师转非执业申请" titleSecond="执业税务师转非执业申请明细"/>
            </div>
        </div>
    }
});
module.exports = wspcx;