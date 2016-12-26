import React from 'react'
import './dy.css' 
import {Row,Col,Modal} from 'antd'

var cssPagedMedia = (function () {
    var style = document.createElement('style');
    document.head.appendChild(style);
    return function (rule) {
        style.innerHTML = rule;
    };
}());

cssPagedMedia.size = function (size) {
    cssPagedMedia('@page {size: ' + size + '}');
};
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
		cssPagedMedia.size('A4 landscape');
		const sd=decodeURIComponent(this.props.location.search);
		var rs=JSON.parse(sd.substring(1,sd.length));
		const nowy = new Date();
		return <div className="fpdya4">
		<div className="fb_background" >
					<p className="zsbh" >{rs.zsbh}</p>
					<p className="ZJPZWH" >{rs.ZJPZWH}</p>
					<p className="year" >{nowy.getFullYear()}</p>
					<p className="month" >{nowy.getMonth()+1}</p>
					<p className="date" >{nowy.getDate()}</p>
					<p className="dwmc" >{rs.dwmc}</p>
					<p className="DZHI" >{rs.DZHI}</p>
					<p className="fddbr" >{rs.fddbr}</p>
					<p className="zczj" >{rs.zczj}（万元）</p>
					<p className="YYZZHM" >{rs.YYZZHM}</p>
					<p className="JYFW" >{rs.JYFW}</p>
		<button className="noprint" type="button" onClick={this.onClick} style={{'position':'relative','left':'45%','width':'60px','top':'100%'}}>打印</button></div>
		</div>
	}
	});
module.exports = dy;