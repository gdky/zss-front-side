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
       const sd=decodeURIComponent(this.props.location.search);
        var rs=sd.substring(1,sd.length);
       const obj = this.state.entity;
      const bgxmOptions = obj.map(bgxm => <tbody key={bgxm.MC}>
                <tr >
                    <td ><b>变更前{bgxm.MC}：</b></td>
                    <td>{bgxm.JZHI}</td> </tr>
                    <tr >
                    <td><b>变更后{bgxm.MC}：</b></td>
                    <td >{bgxm.XZHI}</td>
                 </tr></tbody>);
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
                                   </tbody>
                             {bgxmOptions}
                 </table> </div>
        return <div className="wspxm-spsh">
            <div className="wrap">
          <SPXX wspcxurl='/spapi/wspcx/jg/2' spmxurl='/spapi/spmxxx/jgbgsp' mxbg={mxbg} getbg={this.makebg}
                          columns={C_JG.jg} titleTop="待审变更申请" titleSecond="变更申请明细" zsid={rs} />
            </div>
        </div>
    }
});
module.exports = wspcx;