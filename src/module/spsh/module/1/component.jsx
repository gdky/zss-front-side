import React from 'react'
import SPXX from '../spxx.jsx'
import C_JG from '../model.js'
import CompBaseTable from 'component/compBaseTable';
import Model from './model.js'
import { Table }from 'antd'

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
      const mxbg=<div >
                    <CompBaseTable data = {obj}  model ={Model.data} bordered striped />
                    <p className="nbjgsz">内部机构设置：</p>
                    <Table columns={Model.nbjgsz} dataSource={obj.nbjgsz} bordered  size="small" pagination={false} />
                    </div>
        return <div className="wspxm-spsh">
            <div className="wrap">
          <SPXX wspcxurl='/spapi/wspcx/jgsl/1' spmxurl='/spapi/spmxxx/jgsl' mxbg={mxbg} getbg={this.makebg}
                          columns={C_JG.jg} titleTop="待审事务所设立申请" titleSecond="事务所设立申请明细"
          />
            </div>
        </div>
    }
});
module.exports = wspcx;