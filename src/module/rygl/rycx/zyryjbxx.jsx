import React from 'react'
import CompBaseTable from 'component/compBaseTable';
import config from 'common/configuration'
import req from 'reqwest'
import auth from 'common/auth'
import {autoform,ryjl} from './model.js' 
import {Row,Col,Modal,Table} from 'antd'

const confirm = Modal.confirm;
let dy = React.createClass({
	getInitialState() { //初始化State状态，使用传入参数
	      return {
	        //这些都是dataset
	            dataxx: {values: {},xpian:''},//用于详细信息autoform数据格式
	            datalist:[],//用于其他详细table数据格式
	      };
	    },
	componentDidMount() { 
		const sd=this.props.location.search;
	     req({
	        url: config.HOST+config.URI_API_PROJECT + '/ryxx/zyryxx/'+sd.substring(1,sd.length),
	        method: 'get',
	        type: 'json',
	        headers:{'x-auth-token':auth.getToken()},
	        success: (result) => {
	          this.setState({
	            dataxx: result.data,
	            datalist: result.data.ryjl,
	          });
	        },error:  (err) =>{alert('api错误');}
	      });
	    },
	render(){
		return <div className="zyryjbxx" ><div style={{margin: "auto",top:"0",left:"0",right:"0",width:"1060px",backgroundColor: "#fff",padding:"10px",position: "absolute"}}>
		<CompBaseTable data = {this.state.dataxx}  model ={autoform} bordered striped />
		<p className="nbjgsz">人员简历：</p>
		<Table columns={ryjl} dataSource={this.state.datalist} bordered  size="small" pagination={false} />
		<div style={{position: "absolute",right:"10px",top:"10px",zIndex:"9",width:"143px",height:"175px",backgroundColor: "#fff",border: "1px solid #e9e9e9"}}>
		{!this.state.dataxx.xpian? <p>未上传相片</p> : <img src={this.state.dataxx.xpian} style={{padding:"5px",width:"138px",height:"170px"}}/>}</div>
		</div></div>
	}
	});
module.exports = dy;