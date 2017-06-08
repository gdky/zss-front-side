import React from 'react'
import SPXX from '../spxx.jsx'
import C_JG from '../model.js'

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
       const mxbg=<div ><h3 style={{'padding':'5px'}}>预警信息：<span style={{'color':'red'}}>{this.state.dl.yjxx}</span></h3>
                 <table >
                    <tbody >
                            <tr>
                                <td ><b>申请单位名称：</b></td>
                                <td>{this.state.dl.dwmc}</td>
                            </tr>
                            <tr>
                                <td ><b>申请时间：</b></td>
                                <td>{this.state.dl.tjsj}</td>
                            </tr>
                            <tr>
                                <td ><b>申请合并事务所双方名称：</b></td>
                                <td>{obj.SFMC}</td>
                            </tr>
                            <tr>
                                <td ><b>新事务所单位名称：</b></td>
                                <td>{obj.XSWSMC}</td>
                            </tr>
                            <tr>
                                <td ><b>工商名称预核编号：</b></td>
                                <td>{obj.GSMCYHBH}</td>
                            </tr>
                            <tr>
                                <td ><b>合并时间：</b></td>
                                <td>{obj.HBSJFMT}</td>
                            </tr>
                            <tr>
                                <td ><b>申请人：</b></td>
                                <td>{obj.SQR}</td>
                            </tr>
                            <tr>
                                <td ><b>附件：</b></td>
                                <td>{!!obj.FJURL&&<a href={obj.FJURL} target="_blank" ><Icon type="paper-clip" />&nbsp;{obj.FJNAME}</a>}</td>
                            </tr>
                            </tbody>
                      </table> </div>
        return <div className="wspxm-spsh">
            <div className="wrap">
          <SPXX wspcxurl='/spapi/wspcx/jg/3' spmxurl='/spapi/spmxxx/jghbsp' mxbg={mxbg} getbg={this.makebg}
                          columns={C_JG.jg} titleTop="待审合并申请" titleSecond="合并申请明细"
          />
            </div>
        </div>
    }
});
module.exports = wspcx;