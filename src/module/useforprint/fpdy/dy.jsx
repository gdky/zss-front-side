import React from 'react'
import './dy.css' 
import {Row,Col,Modal} from 'antd'
import req from 'reqwest'
import auth from 'common/auth'
import config from 'common/configuration'

const API_URL = config.HOST + config.URI_API_PROJECT + '/hyhf/fpdy/fpdylj';
const confirm = Modal.confirm;
let dy = React.createClass({
	onClick(jlid){
		window.print(); 
		confirm({
		    title: '打印信息',
		    content: '是否打印完成？',
		    okText:"是",
		    cancelText:"否",
		    onOk() {
		    	if (!jlid) {
		    		window.close();
		    	}else{
			      req({
		                url: API_URL,
		                type: 'json',
		                method: 'put',
		                data: JSON.stringify(jlid),
		                contentType: 'application/json',
		                headers:{'x-auth-token':auth.getToken()}
		            }).then(resp=> {
		            	window.close();
	    		 }).fail(err=> {
		                Modal.error({
		                    title: '数据提交错误',
		                    content: (
		                        <div>
		                            <p>无法向服务器提交数据，需检查应用服务工作情况</p>
		                            <p>Status: {err.status}</p>
		                        </div>  )
		                });
		            })
    		 };
		    },
		    onCancel() {},
		  });
	},
	changeNum(num){
		var integer=parseInt(num);
		var flt=(num-integer).toFixed(2);
		var fltint=(flt.toString()).substring(2,4);
		var ls = [];
		ls.push(<span className="fprmb">¥</span>);
		const len=integer.toString()+fltint.toString();
		for (var i=0; i < len.length; i++){
			ls.push(<span className="fprmb" key={i}>{len.substr(i,1)}</span>);
		}
		return <p>
				{ls}
			</p>;
	},
	digitUppercase(num) {  
	  var strOutput = "";  
	  var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';  
	  num += "00";  
	  var intPos = num.indexOf('.');  
	  if (intPos >= 0)  
	    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);  
	  strUnit = strUnit.substr(strUnit.length - num.length);  
	  for (var i=0; i < num.length; i++)  
	    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);  
	    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");  
	},
	render(){
		const sd=decodeURIComponent(this.props.location.search);//603
		var rs=JSON.parse(sd.substring(1,sd.length));
		const nowy = new Date(rs.ND);
		let tt="";
		let gr="";
		if (rs.YJTTHF) {
			tt=nowy.getFullYear()+"年税务师机构团体会费"
		};
		if (rs.YJGRHF) {
			gr=nowy.getFullYear()+"年执业税务师个人会费"
		};
		if (rs.nd) {
			tt=new Date(rs.nd).getFullYear()+"年非执业税务师个人会费"
		};
		const jfrq = new Date(rs.JFRQ);
		return <div className="fpdya4">
		<div className="fp_background" >
		<table style={{'position':'absolute','top':'83px','left':'45'}}>
			<tbody>
				<tr>
					<td style={{'width':'105','height':'24'}}></td>
					<td style={{'width':'340','height':'24'}}>{rs.DWMC?rs.DWMC:rs.XMING}</td>
					<td style={{'width':'75','height':'24'}}>{jfrq.getFullYear()}</td>
					<td style={{'width':'55','height':'24'}}>{jfrq.getMonth()+1}</td>
					<td style={{'width':'35','height':'24'}}>{jfrq.getDate()}</td>
				</tr>
			</tbody>
		</table>
		<table style={{'position':'absolute','top':'110px','left':'63'}}>
			
			<tbody>
				<tr>
					<td style={{'width':'160','height':'35'}}></td>
					<td style={{'width':'90','height':'35'}}></td>
					<td style={{'width':'70','height':'35'}}></td>
					<td colSpan="2" style={{'width':'250','height':'35'}}></td>
				</tr>
				<tr>
					<td colSpan="2" style={{'width':'250','height':'30'}}></td>
					<td style={{'width':'70','height':'30'}}></td>
					<td style={{'width':'70','height':'30'}}></td>
					<td  style={{'height':'30'}}></td>
				</tr>
				<tr>
					<td colSpan="2" style={{'width':'250','height':'30'}}>{tt}</td>
					<td style={{'width':'70','height':'30'}}>{rs.YJTTHF?'1%':null}</td>
					<td style={{'width':'70','height':'30'}}></td>
					<td  style={{'textAlign':'right','height':'30'}}>{rs.YJTTHF?this.changeNum(rs.YJTTHF):rs.JE?this.changeNum(rs.JE):null}</td>
				</tr>
				<tr>
					<td colSpan="2" style={{'width':'250','height':'30'}}>{gr}</td>
					<td style={{'width':'70','height':'30'}}>{rs.YJGRHF?'800':null}</td>
					<td style={{'textAlign':'center','width':'70','height':'30'}}>{rs.YJGRHF?rs.BCJFRS:null}</td>
					<td  style={{'textAlign':'right','height':'30'}}>{rs.YJGRHF?this.changeNum(rs.YJGRHF):null}</td>
				</tr>
				<tr>
					<td colSpan="2" style={{'width':'250','height':'30'}}></td>
					<td style={{'width':'70','height':'30'}}></td>
					<td style={{'width':'70','height':'30'}}></td>
					<td  style={{'textAlign':'right','height':'30'}}></td>
				</tr>
				<tr>
					<td style={{'width':'160','height':'30'}}></td>
					<td colSpan="4" style={{'textAlign':'center','width':'435','height':'30'}}>{rs.JFZE?this.digitUppercase(rs.JFZE):rs.JE?this.digitUppercase(rs.JE):null}</td>
				</tr>
				<tr>
					<td style={{'width':'160','height':'30'}}></td>
					<td colSpan="4" style={{'textAlign':'center','width':'435','height':'30'}}>{rs.BZ}</td>
				</tr>
				<tr>
					<td ></td>
					<td ></td>
					<td colSpan="3" >{rs.KPR}</td>
				</tr>
			</tbody>
		</table>
		
		</div><button className="noprint" type="button" onClick={rs.XMING?this.onClick.bind(this,false):this.onClick.bind(this,rs.jlid)} style={{'position':'relative','left':'330px','width':'60px'}}>打印</button>
		</div>
	}
	});
module.exports = dy;