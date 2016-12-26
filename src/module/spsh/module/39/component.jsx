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
       const mxbg=<table >
                    <tbody >
                            <tr>
                                <td ><b>申请转入事务所：</b></td>
                                <td>{this.state.dl.dwmc}</td>
                                <td ><b>性别：</b></td>
                                <td>{this.state.dl.xb}</td>
                            </tr>
                            <tr>
                                <td ><b>转入人员姓名：</b></td>
                                <td>{this.state.dl.xming}</td>
                                <td ><b>身份证号：</b></td>
                                <td>{this.state.dl.sfzh}</td>
                            </tr>
                            <tr>
                                <td ><b>执业资格证书编号：</b></td>
                                <td>{this.state.entity.ZYZGZSBH}</td>
                                <td ><b>资格证书签发日期：</b></td>
                                <td>{this.state.entity.ZGZSQFRQ}</td>
                            </tr>
                            <tr>
                                <td ><b>执业注册（备案）编号：</b></td>
                                <td>{this.state.entity.ZYZSBH}</td>
                                <td ><b>执业注册日期：</b></td>
                                <td>{this.state.entity.ZYZCRQ}</td>
                            </tr>
                            <tr>
                                <td ><b>税务代理业务开始时间：</b></td>
                                <td>{this.state.entity.ywkssj}</td>
                                <td ><b>入会时间：</b></td>
                                <td>{this.state.entity.RHSJ}</td>
                            </tr>
                            <tr>
                                <td ><b>职务（或职称)：</b></td>
                                <td>{this.state.entity.zw}</td>
                                <td ><b>进所时间：</b></td>
                                <td>{this.state.entity.JSSJ}</td>
                            </tr>
                            <tr>
                                <td ><b>是否出资人：</b></td>
                                <td>{this.state.entity.czr}</td>
                                <td ><b>是否发起人：</b></td>
                                <td>{this.state.entity.fqr}</td>
                            </tr>
                            <tr>
                                <td ><b>出资额：</b></td>
                                <td>{this.state.entity.CZE}</td>
                                <td ><b>是否所长：</b></td>
                                <td>{this.state.entity.sz}</td>
                            </tr>
                            </tbody>
                      </table> 
    return <div className="wspxm-spsh">
            <div className="wrap">
                <SPXX wspcxurl='/spapi/wspcx/ry/39' spmxurl='/spapi/spmxxx/zyzcsp' mxbg={mxbg} getbg={this.makebg} isJG={false}
                          columns={C_JG.zy} titleTop="待审执业税务师转入申请" titleSecond="执业税务师转入申请明细"/>
            </div>
        </div>
    }
});
module.exports = wspcx;