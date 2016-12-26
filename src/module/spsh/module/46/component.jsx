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
       const obj = this.state.entity;
       const mxbg=<table >
                    <tbody >
                            <tr>
                                <td ><b>姓 名：</b></td>
                                <td>{this.state.dl.xming}</td>
                                <td ><b>申报事务所：</b></td>
                                <td>{this.state.dl.dwmc}</td>
                            </tr>
                            <tr>
                                <td ><b>性 别：</b></td>
                                <td>{this.state.dl.xb}</td>
                                <td><b>身份证号：</b></td>
                                <td >{this.state.dl.sfzh}</td>
                            </tr>
                            <tr>
                                <td ><b>转执业原因：</b></td>
                                <td>{this.state.entity.ZYSQ}</td>
                                <td><b>填报日期：</b></td>
                                <td >{this.state.dl.tjsj}</td>
                            </tr>
                            <tr>
                                <td ><b>原工作单位：</b></td>
                                <td>{this.state.entity.YDW}</td>
                                <td><b>转入工作单位：</b></td>
                                <td >{this.state.dl.DWMC}</td>
                            </tr>
                            </tbody>
                      </table> 
    return <div className="wspxm-spsh">
            <div className="wrap">
                <SPXX wspcxurl='/spapi/wspcx/ry/46' spmxurl='/spapi/spmxxx/fzyzzysp' mxbg={mxbg} getbg={this.makebg} isJG={false}
                          columns={C_JG.zy} titleTop="待审执业税务师变更申请" titleSecond="执业税务师变更申请明细"/>
            </div>
        </div>
    }
});
module.exports = wspcx;