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
       const bgxmOptions = obj.map(bgxm => 
                <tr key={bgxm.MC}>
                    <td ><b>变更前{bgxm.MC}：</b></td>
                    <td>{bgxm.JZHI}</td> 
                    <td><b>变更后{bgxm.MC}：</b></td>
                    <td >{bgxm.XZHI}</td>
                 </tr>);
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
                            {bgxmOptions}
                            </tbody>
                      </table> 
    return <div className="wspxm-spsh">
            <div className="wrap">
                <SPXX wspcxurl='/spapi/wspcx/ry/18' spmxurl='/spapi/spmxxx/fzybgsp' mxbg={mxbg} getbg={this.makebg} isJG={false}
                          columns={C_JG.ry} titleTop="待审非执业税务师变更申请" titleSecond="非执业税务师变更申请明细"/>
            </div>
        </div>
    }
});
module.exports = wspcx;