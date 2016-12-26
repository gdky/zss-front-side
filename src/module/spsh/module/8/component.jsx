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
       const mxbg= <div >
                    <table >
                            <tbody >
                                  <tr>
                                      <td ><b>姓名：</b></td>
                                      <td>{this.state.dl.xming}</td>
                                      </tr>
                                      <tr>
                                      <td><b>申请单位名称：</b></td>
                                      <td >{this.state.dl.dwmc}</td>
                                   </tr>
                                   <tr >
                                    <td ><b>转籍原因：</b></td>
                                    <td>{this.state.entity.ZJYY}</td> </tr>
                                    <tr >
                                    <td><b>转籍原因日期：</b></td>
                                    <td >{this.state.entity.ZJYYRQ}</td>
                                    </tr>
                                    <tr >
                                    <td><b>调入城市：</b></td>
                                    <td >{this.state.entity.DRS}</td>
                                 </tr>
                                    <tr >
                                    <td><b>新机构名称：</b></td>
                                    <td >{this.state.entity.XJGMC}</td>
                                 </tr>
                                    <tr >
                                    <td><b>新机构电话：</b></td>
                                    <td >{this.state.entity.XJGDH}</td>
                                 </tr>
                                   </tbody>
                 </table></div>
    return <div className="wspxm-spsh">
            <div className="wrap">
                <SPXX wspcxurl='/spapi/wspcx/ry/8' spmxurl='/spapi/spmxxx/zyzjsp' mxbg={mxbg} getbg={this.makebg} isJG={false} zsid={rs}
                          columns={C_JG.zy} titleTop="待审执业税务师转籍申请" titleSecond="执业税务师转籍申请明细"/>
            </div>
        </div>
    }
});
module.exports = wspcx;