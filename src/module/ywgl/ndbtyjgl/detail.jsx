import React from 'react'
import {Button,Icon,Row,Col} from 'antd'
import Panel from 'component/compPanel'
import numeral from 'numeral'

const PanelBar = Panel.ToolBar;
const detail = React.createClass({
    //退回用户管理界面
    back(){
        this.props.onBack();
    },

    render(){
        const {data,title} = this.props;
        const panelBar = <PanelBar>
            <Button onClick={this.back}>
                <Icon type="rollback"/>返回
            </Button>
        </PanelBar>;
        const tz = {};
        tz[2] = '所得税税前扣除项目鉴证金额: ' + data.tzvalue1;
        tz[3] = <div><p>纳税调整增加额：{data.tzvalue1}</p><p>纳税调整减少额：{data.tjvalue2}</p></div>;
        tz[4] = tz[5] = tz[6] = tz[8] = tz[9] = <div><p>应补税额：{data.tzvalue1}</p><p>应退税额：{data.tjvalue2}</p></div>;
        tz[10] = <div><p>调增应税额：{data.tzvalue1}</p><p>调减应税额：{data.tjvalue2}</p></div>;

        return <Panel title={title} toolbar={panelBar}>
            <div className="fix-table table-bordered table-striped">
                <table>
                    <tbody>
                    <tr>
                        <th colSpan="4" style={{textAlign:'center'}}>协议内容</th>
                    </tr>
                    <tr>
                        <td>协议文号</td>
                        <td colSpan="3">{data.xyh}</td>
                    </tr>
                    <tr>
                        <td>委托企业</td>
                        <td colSpan="3">{data.wtdw}</td>
                    </tr>
                    <tr>
                        <td>国税税务登记证号</td>
                        <td>{data.wtdwnsrsbh}</td>
                        <td>地税税务登记证号</td>
                        <td>{data.wtdwnsrsbhdf}</td>
                    </tr>
                    <tr>
                        <td>委托企业联系人</td>
                        <td>{data.wtdwlxr}</td>
                        <td>委托企业联系电话</td>
                        <td>{data.wtdwlxdh}</td>
                    </tr>
                    <tr>
                        <td >委托企业联系地址</td>
                        <td colSpan="3">{data.wtdxlxdz}</td>
                    </tr>
                    <tr>
                        <td>协议收费金额</td>
                        <td>{numeral(data.xyje).format('0,0.00')}</td>
                        <td>实际收费金额</td>
                        <td>{numeral(data.sjsqje).format('0,0.00')}</td>
                    </tr>
                    <tr>
                        <td>委托项目</td>
                        <td>{data.ywlx}</td>
                        <td>项目所属时期</td>
                        <td>{data.sstarttime} 至 {data.sendtime}</td>
                    </tr>
                    <tr>
                        <td>发票金额</td>
                        <td>{numeral(data.fpje).format('0,0.00')}</td>
                        <td>发票号码</td>
                        <td>{data.fphm}</td>
                    </tr>
                    <tr>
                        <td>备注</td>
                        <td colSpan="3">{data.memo}</td>
                    </tr>
                    <tr>
                        <th colSpan="4" style={{textAlign:'center'}}>业务报备详细信息</th>
                    </tr>
                    <tr>
                        <td>所属时期</td>
                        <td>{data.sstarttime} 至 {data.sendtime}</td>
                        <td>业务所属地</td>
                        <td>{data.cs != '省外'? ''.concat(data.cs,data.qx).replace(/null/gi,'') : `${data.city}` }</td>
                    </tr>
                    <tr>
                        <td>业务所属税务机关</td>
                        <td colSpan="3">{data.zgswjg}</td>
                    </tr>
                    <tr>
                        <td>委托企业行业类型</td>
                        <td>{data.hy}</td>
                        <td>委托企业纳税人类型</td>
                        <td>{data.nsrxz}</td>
                    </tr>
                    <tr>
                        <td>委托单位名称</td>
                        <td>{data.wtdw}</td>
                        <td>委托企业税务登记证号</td>
                        <td>{data.wtdwnsrsbh}</td>
                    </tr>
                    <tr>
                        <td>报告文号</td>
                        <td>{data.bgwh}</td>
                        <td>报告日期</td>
                        <td>{data.bgrq}</td>
                    </tr>
                    <tr>
                        <td>报备号码</td>
                        <td>{data.bbhm}</td>
                        <td>验证码</td>
                        <td>{data.yzm}</td>
                    </tr>
                    <tr>
                        <td>一级复核</td>
                        <td colSpan="3">{data.yjfh}</td>
                    </tr>
                    <tr>
                        <td>二级复核</td>
                        <td colSpan="3">{data.rjfh}</td>
                    </tr>
                    <tr>
                        <td>三级复核</td>
                        <td colSpan="3">{data.sjfh}</td>
                    </tr>
                    <tr>
                        <td>签名注册税务师</td>
                        <td colSpan="3">{data.qzsws}</td>
                    </tr>
                    <tr>
                        <td>委托企业营业收入</td>
                        <td colSpan="3">{numeral(data.sfje).format('0,0.00')}</td>
                    </tr>
                    <tr>
                        <td>具体项目</td>
                        <td colSpan="3">{data.jtxm}</td>
                    </tr>
                    <tr>
                        <td>业务类型</td>
                        <td>{data.ywlx}</td>
                        <td colSpan="2" className="value">{tz[data.ywlx_dm]}</td>
                    </tr>
                    <tr>
                        <th colSpan="4" style={{textAlign:'center'}}>事务所基本信息</th>
                    </tr>
                    <tr>
                        <td>事务所名称</td>
                        <td>{data.swsmc}</td>
                        <td>事务所税务登记证号</td>
                        <td>{data.swsswdjzh}</td>
                    </tr>
                    <tr>
                        <td>事务所电话</td>
                        <td>{data.swsdh}</td>
                        <td>事务所传真</td>
                        <td>{data.swscz}</td>
                    </tr>
                    <tr>
                        <td>事务所电子邮件</td>
                        <td>{data.swsdzyj}</td>
                        <td>事务所网址</td>
                        <td>{data.swswz}</td>
                    </tr>
                    <tr>
                        <td>事务所地址</td>
                        <td colSpan="3">{data.txdz}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <Row className="detail-bar">
                <Col span="14" offset="10">
                    <Button size="large" onClick={this.back}>
                        <Icon type="rollback"/>返回
                    </Button>
                </Col>
            </Row>
        </Panel>
    }
});

module.exports = detail;