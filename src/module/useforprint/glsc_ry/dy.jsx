import React from 'react'
import './dy.css' 
import {Row,Col,Modal} from 'antd'
import req from 'reqwest'
import auth from 'common/auth'
import config from 'common/configuration'

const API_URL = config.HOST + config.URI_API_PROJECT + '/hyhf/fpdy/fpdylj';
const confirm = Modal.confirm;
let dy = React.createClass({
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
	render(){
		const sd=decodeURIComponent(this.props.location.search);
		var rs=JSON.parse(sd.substring(1,sd.length));
		const nowy = new Date();
		const nowd = nowy.getFullYear().toString()+"年"+(nowy.getMonth()+1).toString()+"月"+nowy.getDate().toString()+"日"
		return <div className="fpdya4">
		<div className="ry_background" >
		<table style={{'position':'absolute','top':'8.4cm','left':'3.65cm'}}>
			<tbody>
				<tr>
					<td style={{'width':'4.34cm','height':'0.9cm','textAlign':'center'}}>{rs.ZYZGZSBH}</td>
				</tr>
				<tr>
					<td style={{'width':'4.34cm','height':'0.9cm','textAlign':'center'}}>{rs.ZYZSBH}</td>
				</tr>
				<tr>
					<td style={{'width':'4.34cm','height':'0.9cm','textAlign':'center'}}>{rs.GRHYBH}</td>
				</tr>
			</tbody>
		</table>
		<table style={{'position':'absolute','top':'1.3cm','left':'12.7cm'}}>
			
			<tbody>
				<tr>
					<td style={{'width':'5.34cm','height':'0.85cm','textAlign':'center'}}>{rs.XMING}</td>
				</tr>
				<tr>
					<td style={{'width':'5.34cm','height':'0.85cm','textAlign':'center'}}>{rs.xb}</td>
				</tr>
				<tr>
					<td style={{'width':'5.34cm','height':'0.85cm','textAlign':'center'}}>{rs.SRI}</td>
				</tr>
				<tr>
					<td style={{'width':'5.34cm','height':'0.85cm'}}>{rs.DWMC}</td>
				</tr>
				
			</tbody>
		</table>
		<p style={{'position':'absolute','top':'11.46cm','left':'12.59cm','width':'5.34cm','height':'0.85cm','textAlign':'center'}}>{nowd}</p>
		</div><button className="noprint" type="button" onClick={this.onClick} style={{'position':'relative','left':'330px','width':'60px'}}>打印</button>
		</div>
	}
	});
module.exports = dy;