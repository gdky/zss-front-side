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
                                <td ><b>填报日期：</b></td>
                                <td>{this.state.dl.tjsj}</td>
                            </tr>
                            <tr>
                                <td ><b>转执业原因：</b></td>
                                <td>{this.state.entity.ZYSQ}</td>
                            </tr>
                            <tr>
                                <td ><b>原工作单位：</b></td>
                                <td>{this.state.entity.YDW}</td>
                            </tr>
                            <tr>
                                <td ><b>转入工作单位：</b></td>
                                <td>{this.state.entity.DWMC}</td>
                            </tr>
                            </tbody>
                      </table> 
            return <div className="wspxm-spsh">
                  <div className="wrap">
                        <SPXX wspcxurl='/spapi/wspcx/ry/13' spmxurl='/spapi/spmxxx/fzyzzysp' mxbg={mxbg} getbg={this.makebg} isJG={false}
                              columns={C_JG.ry} titleTop="待审非执业税务师转执业申请" titleSecond="非执业税务师转执业申请明细"
                              />
                  </div>
            </div>
      }
});
module.exports = wspcx;