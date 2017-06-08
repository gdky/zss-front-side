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
      
      const mxbg=<div ><h3 style={{'padding':'5px'}}>预警信息：<span style={{'color':'red'}}>{this.state.dl.yjxx}</span></h3>
                    <table >
                            <tbody >
                                  <tr>
                                      <td ><b>申请单位名称：</b></td>
                                      <td>{this.state.dl.dwmc}</td>
                                  </tr>
                                  <tr>
                                      <td><b>申请时间：</b></td>
                                      <td >{this.state.dl.tjsj}</td>
                                   </tr>
                                   <tr >
                                      <td ><b>注销原因说明：</b></td>
                                      <td>{this.state.entity.zxsm}</td> 
                                    </tr>
                                    <tr >
                                      <td><b>注销类别：</b></td>
                                      <td >{this.state.entity.zxyy}</td>
                                    </tr>
                                    <tr>
                                        <td ><b>附件：</b></td>
                                        <td>{!!this.state.entity.FJURL&&<a href={this.state.entity.FJURL} target="_blank" ><Icon type="paper-clip" />&nbsp;{this.state.entity.FJNAME}</a>}</td>
                                    </tr>
                                   </tbody>
                 </table> </div>
        return <div className="wspxm-spsh">
            <div className="wrap">
          <SPXX wspcxurl='/spapi/wspcx/jg/4' spmxurl='/spapi/spmxxx/jgzxsp' mxbg={mxbg} getbg={this.makebg}
                          columns={C_JG.jg} titleTop="待审注销申请" titleSecond="注销申请明细"
          />
            </div>
        </div>
    }
});
module.exports = wspcx;