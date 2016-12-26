import React from 'react'
import './dy.css' 
import {Row,Col,Modal,Radio} from 'antd'

const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
let dy = React.createClass({
	getInitialState() {
	    return {
	      value: 1,
	    };
	  },
	onClick(){
		window.print(); 
		confirm({
		    title: '打印信息',
		    content: '是否打印完成？',
		    okText:"是",
		    cancelText:"否",
		    onOk() {
		    		window.close();
		    },
		    onCancel() {},
		  });
	},
	onChange(e) {
	    this.setState({
	      value: e.target.value,
	    });
	  },
	render(){
		 const radioStyle = {
		      display: 'block',
		      height: '1.18cm',
		    };
		const sd=decodeURIComponent(this.props.location.search);
		var rs=JSON.parse(sd.substring(1,sd.length));
		const nowy = new Date();
		const nowd = nowy.getFullYear().toString()+"."+(nowy.getMonth()+1).toString()+"."+nowy.getDate().toString()
		return <div className="fpdya4">
		<div className="dj_background" >
		<table style={{'position':'absolute','top':'3.2cm','left':'10.42cm'}}>
			<tbody>
				<tr>
					<td style={{'width':'2.38cm','height':'1.1cm','textAlign':'center'}}>{this.state.value==1?nowd:null}</td>
					<td style={{'width':'6cm','height':'1.1cm'}}>{this.state.value==1?rs.DWMC:null}</td>
				</tr>
				<tr>
					<td style={{'width':'2.38cm','height':'1.1cm','textAlign':'center'}}>{this.state.value==2?nowd:null}</td>
					<td style={{'width':'6cm','height':'1.1cm'}}>{this.state.value==2?rs.DWMC:null}</td>
				</tr>
				<tr>
					<td style={{'width':'2.38cm','height':'1.1cm','textAlign':'center'}}>{this.state.value==3?nowd:null}</td>
					<td style={{'width':'6cm','height':'1.1cm'}}>{this.state.value==3?rs.DWMC:null}</td>
				</tr>
				<tr>
					<td style={{'width':'2.38cm','height':'1.1cm','textAlign':'center'}}>{this.state.value==4?nowd:null}</td>
					<td style={{'width':'6cm','height':'1.1cm'}}>{this.state.value==4?rs.DWMC:null}</td>
				</tr>
				<tr>
					<td style={{'width':'2.38cm','height':'1.1cm','textAlign':'center'}}>{this.state.value==5?nowd:null}</td>
					<td style={{'width':'6cm','height':'1.1cm'}}>{this.state.value==5?rs.DWMC:null}</td>
				</tr>
				<tr>
					<td style={{'width':'2.38cm','height':'1.1cm','textAlign':'center'}}>{this.state.value==6?nowd:null}</td>
					<td style={{'width':'6cm','height':'1.1cm'}}>{this.state.value==6?rs.DWMC:null}</td>
				</tr>
				<tr>
					<td style={{'width':'2.38cm','height':'1.1cm','textAlign':'center'}}>{this.state.value==7?nowd:null}</td>
					<td style={{'width':'6cm','height':'1.1cm'}}>{this.state.value==7?rs.DWMC:null}</td>
				</tr>
				<tr>
					<td style={{'width':'2.38cm','height':'1.1cm','textAlign':'center'}}>{this.state.value==8?nowd:null}</td>
					<td style={{'width':'6cm','height':'1.1cm'}}>{this.state.value==8?rs.DWMC:null}</td>
				</tr>
			</tbody>
		</table>
		<RadioGroup onChange={this.onChange} value={this.state.value} size="large" 
				style={{'position':'absolute','top':'3.5cm','left':'18.8cm'}} className="dj_radio">
					<Radio  className="noprint" style={radioStyle} key="a" value={1} ></Radio>
					<Radio  className="noprint" style={radioStyle} key="b" value={2} ></Radio>
					<Radio  className="noprint" style={radioStyle} key="c" value={3} ></Radio>
					<Radio  className="noprint" style={radioStyle} key="e" value={4} ></Radio>
					<Radio  className="noprint" style={radioStyle} key="f" value={5} ></Radio>
					<Radio  className="noprint" style={radioStyle} key="g" value={6} ></Radio>
					<Radio  className="noprint" style={radioStyle} key="h" value={7} ></Radio>
					<Radio  className="noprint" style={radioStyle} key="i" value={8} ></Radio>
		</RadioGroup>
		</div><button className="noprint" type="button" onClick={this.onClick} style={{'position':'relative','left':'330px','width':'60px'}}>打印</button>
		</div>
	}
	});
module.exports = dy;