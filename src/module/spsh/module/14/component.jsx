import React from 'react'
import SPXX from '../spxx.jsx'
import C_JG from '../model.js'
import {  Table }from 'antd'
import Panel from 'component/compPanel'
      
const wspcx = React.createClass({
      getInitialState() {
            return {
                  entity: { fzjl: [] },
                  dl: '',
            }
      },
      makebg(data, rowData) {
            this.setState({ entity: data, dl: rowData });
      },
      render() {
            //定义工具栏内容
            const obj = this.state.entity;
            var mxbg = <table >
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
                                <td ><b>转籍原因：</b></td>
                                <td>{this.state.entity.ZJYY}</td>
                            </tr>
                            <tr>
                                <td ><b>转籍原因日期：</b></td>
                                <td>{this.state.entity.ZJYYRQ}</td>
                            </tr>
                            <tr>
                                <td ><b>填报日期：</b></td>
                                <td>{this.state.entity.TBRQ}</td>
                            </tr>
                            </tbody>
                      </table> 
            return <div className="wspxm-spsh">
                  <div className="wrap">
                        <SPXX wspcxurl='/spapi/wspcx/ry/14' spmxurl='/spapi/spmxxx/fzyzjsp' mxbg={mxbg} getbg={this.makebg} isJG={false}
                              columns={C_JG.ry} titleTop="待审非执业注册税务师转籍申请" titleSecond="非执业注册税务师转籍申请明细"
                              />
                  </div>
            </div>
      }
});
module.exports = wspcx;