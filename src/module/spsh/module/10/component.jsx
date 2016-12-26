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
        const sd=decodeURIComponent(this.props.location.search);
        var rs=sd.substring(1,sd.length);
        const mxbg=<table >
                    <tbody >
                            <tr>
                                <td ><b>申请人员姓名：</b></td>
                                <td>{this.state.dl.xming}</td>
                            </tr>
                            <tr>
                                <td ><b>所属事务所：</b></td>
                                <td>{this.state.dl.dwmc}</td>
                            </tr>
                            <tr>
                                <td ><b>申请时间：</b></td>
                                <td>{this.state.dl.tjsj}</td>
                            </tr>
                            <tr>
                                <td ><b>注销原因：</b></td>
                                <td>{this.state.entity.zxlx}</td>
                            </tr>
                            <tr>
                                <td ><b>注销日期：</b></td>
                                <td>{this.state.entity.ZXRQ}</td>
                            </tr>
                            <tr>
                                <td ><b>事务所意见：</b></td>
                                <td>{this.state.entity.SWSYJ}</td>
                            </tr>
                            </tbody>
                      </table> 
    return <div className="wspxm-spsh">
            <div className="wrap">
                <SPXX wspcxurl='/spapi/wspcx/ry/10' spmxurl='/spapi/spmxxx/zyzxsp' mxbg={mxbg} getbg={this.makebg} isJG={false}
                          columns={C_JG.zy} titleTop="待审执业税务师注销申请" titleSecond="执业税务师注销申请明细" zsid={rs}/>
            </div>
        </div>
    }
});
module.exports = wspcx;