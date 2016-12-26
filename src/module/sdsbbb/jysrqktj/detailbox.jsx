import React from 'react'
import {Row,Col} from 'antd'
import './style.css'
import numeral from 'numeral'

const detailBox = React.createClass({
      formatnum(aa,bb){
            if (bb!=0&&!!bb) {
            return numeral((aa-bb)/bb).format('0.00%');
            };
            return null
        },
    render(){
        const obj = this.props.data;
      
        return <div className="fix-table table-bordered table-striped">
        <h1 style={{textAlign:'center'}}>{obj.ND}年度注册税务师行业收入情况统计表（表4)</h1>
            <Row className="dt"><Col  span="12">编制地区(单位）：{obj.dwmc}</Col><Col  span="8">上报时间：{obj.sbsj}</Col><Col  span="4">单位：万元</Col></Row>
            <table>
                <tbody>
                
                <tr style={{textAlign:'center'}}>
                    <th rowSpan="2">项目</th>
                    <th colSpan="2">上年数</th>
                    <th colSpan="2">本年数</th>
                    <th colSpan="2">比上年增减额</th>
                    <th colSpan="2">增减%</th>
                </tr>
                <tr>
                    <th>户次</th>
                    <th>金额</th>
                    <th>户次</th>
                    <th>金额</th>
                    <th>户次</th>
                    <th>金额</th>
                    <th>户次</th>
                    <th>金额</th>
                </tr>
                <tr>
                    <td><b>一、收人总额</b></td>
                    <td>----</td>
                    <td>{obj.SRZE0}</td>
                    <td>----</td>
                    <td>{obj.SRZE}</td>
                    <td>----</td>
                    <td>{numeral(obj.SRZE-obj.SRZE0).format('0.00')}</td>
                    <td>----</td>
                    <td>{this.formatnum(obj.SRZE,obj.SRZE0)}</td>
                </tr>
                <tr>
                    <td><b>（一）主营业务合计</b></td>
                    <td>{obj.ZYYWSRHJ_HS0}</td>
                    <td>{obj.ZYYWSRHJ_JE0}</td>
                    <td>{obj.ZYYWSRHJ_HS}</td>
                    <td>{obj.ZYYWSRHJ_JE}</td>
                    <td>{numeral(obj.ZYYWSRHJ_HS-obj.ZYYWSRHJ_HS0).format('0.00')}</td>
                    <td>{numeral(obj.ZYYWSRHJ_JE-obj.ZYYWSRHJ_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.ZYYWSRHJ_HS,obj.ZYYWSRHJ_HS0)}</td>
                    <td>{this.formatnum(obj.ZYYWSRHJ_JE,obj.ZYYWSRHJ_JE0)}</td>
                </tr>
                <tr>
                    <td>1、涉税服务业务</td>
                     <td>{obj.SSFWYW_HS0}</td>
                    <td>{obj.SSFWYW_JE0}</td>
                    <td>{obj.SSFWYW_HS}</td>
                    <td>{obj.SSFWYW_JE}</td>
                    <td>{numeral(obj.SSFWYW_HS-obj.SSFWYW_HS0).format('0.00')}</td>
                    <td>{numeral(obj.SSFWYW_JE-obj.SSFWYW_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.SSFWYW_HS,obj.SSFWYW_HS0)}</td>
                    <td>{this.formatnum(obj.SSFWYW_JE,obj.SSFWYW_JE0)}</td>
                </tr>
                <tr>
                    <td>(1)代理税务登记</td>
                   <td>{obj.DLSWDJ_HS0}</td>
                    <td>{obj.DLSWDJ_JE0}</td>
                    <td>{obj.DLSWDJ_HS}</td>
                    <td>{obj.DLSWDJ_JE}</td>
                    <td>{numeral(obj.DLSWDJ_HS-obj.DLSWDJ_HS0).format('0.00')}</td>
                    <td>{numeral(obj.DLSWDJ_JE-obj.DLSWDJ_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.DLSWDJ_HS,obj.DLSWDJ_HS0)}</td>
                    <td>{this.formatnum(obj.DLSWDJ_HS,obj.DLSWDJ_HS0)}</td>
                </tr>
                <tr>
                    <td>(2)代理纳税申报</td>
                    <td>{obj.DLNSSB_HS0}</td>
                    <td>{obj.DLNSSB_JE0}</td>
                    <td>{obj.DLNSSB_HS}</td>
                    <td>{obj.DLNSSB_JE}</td>
                    <td>{numeral(obj.DLNSSB_HS-obj.DLNSSB_HS0).format('0.00')}</td>
                    <td>{numeral(obj.DLNSSB_JE-obj.DLNSSB_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.DLNSSB_HS,obj.DLNSSB_HS0)}</td>
                    <td>{this.formatnum(obj.DLNSSB_JE,obj.DLNSSB_JE0)}</td>
                </tr>
                <tr>
                    <td>(3)代理建帐记帐</td>
                    <td>{obj.DLJZJZ_HS0}</td>
                    <td>{obj.DLJZJZ_JE0}</td>
                    <td>{obj.DLJZJZ_HS}</td>
                    <td>{obj.DLJZJZ_JE}</td>
                    <td>{numeral(obj.DLJZJZ_HS-obj.DLJZJZ_HS0).format('0.00')}</td>
                    <td>{numeral(obj.DLJZJZ_JE-obj.DLJZJZ_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.DLJZJZ_HS,obj.DLJZJZ_HS0)}</td>
                    <td>{this.formatnum(obj.DLJZJZ_JE,obj.DLJZJZ_JE0)}</td>
                </tr>
                <tr>
                    <td>(4)代理申请减、免、退税</td>
                   <td>{obj.DLSQJMTS_HS0}</td>
                    <td>{obj.DLSQJMTS_JE0}</td>
                    <td>{obj.DLSQJMTS_HS}</td>
                    <td>{obj.DLSQJMTS_JE}</td>
                    <td>{numeral(obj.DLSQJMTS_HS-obj.DLSQJMTS_HS0).format('0.00')}</td>
                    <td>{numeral(obj.DLSQJMTS_JE-obj.DLSQJMTS_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.DLSQJMTS_HS,obj.DLSQJMTS_HS0)}</td>
                    <td>{this.formatnum(obj.DLSQJMTS_JE,obj.DLSQJMTS_JE0)}</td>
                </tr>
                <tr>
                    <td>(5)代理申请增值税一般纳税人资格认定</td>
                    <td>{obj.DLZGRD_HS0}</td>
                    <td>{obj.DLZGRD_JE0}</td>
                    <td>{obj.DLZGRD_HS}</td>
                    <td>{obj.DLZGRD_JE}</td>
                    <td>{numeral(obj.DLZGRD_HS-obj.DLZGRD_HS0).format('0.00')}</td>
                    <td>{numeral(obj.DLZGRD_JE-obj.DLZGRD_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.DLZGRD_HS,obj.DLZGRD_HS0)}</td>
                    <td>{this.formatnum(obj.DLZGRD_JE,obj.DLZGRD_JE0)}</td>
                </tr>
                <tr>
                    <td>(6)代理制作涉税文书</td>
                   <td>{obj.DLZZSSWS_HS0}</td>
                    <td>{obj.DLZZSSWS_JE0}</td>
                    <td>{obj.DLZZSSWS_HS}</td>
                    <td>{obj.DLZZSSWS_JE}</td>
                    <td>{numeral(obj.DLZZSSWS_HS-obj.DLZZSSWS_HS0).format('0.00')}</td>
                    <td>{numeral(obj.DLZZSSWS_JE-obj.DLZZSSWS_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.DLZZSSWS_HS,obj.DLZZSSWS_HS0)}</td>
                    <td>{this.formatnum(obj.DLZZSSWS_JE,obj.DLZZSSWS_JE0)}</td>
                </tr>
                <tr>
                    <td>(7)代理一机多卡业务</td>
                   <td>{obj.DLYJDK_HS0}</td>
                    <td>{obj.DLYJDK_JE0}</td>
                    <td>{obj.DLYJDK_HS}</td>
                    <td>{obj.DLYJDK_JE}</td>
                    <td>{numeral(obj.DLYJDK_HS-obj.DLYJDK_HS0).format('0.00')}</td>
                    <td>{numeral(obj.DLYJDK_JE-obj.DLYJDK_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.DLYJDK_HS,obj.DLYJDK_HS0)}</td>
                    <td>{this.formatnum(obj.DLYJDK_JE,obj.DLYJDK_JE0)}</td>
                </tr>
                <tr>
                    <td>(8)受聘税务顾问咨珣</td>
                    <td>{obj.SPSWGWZX_HS0}</td>
                    <td>{obj.SPSWGWZX_JE0}</td>
                    <td>{obj.SPSWGWZX_HS}</td>
                    <td>{obj.SPSWGWZX_JE}</td>
                    <td>{numeral(obj.SPSWGWZX_HS-obj.SPSWGWZX_HS0).format('0.00')}</td>
                    <td>{numeral(obj.SPSWGWZX_JE-obj.SPSWGWZX_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.SPSWGWZX_HS,obj.SPSWGWZX_HS0)}</td>
                    <td>{this.formatnum(obj.SPSWGWZX_JE,obj.SPSWGWZX_JE0)}</td>
                </tr>
                <tr>
                    <td>(9)代理税收筹划</td>
                   <td>{obj.DLSSCH_HS0}</td>
                    <td>{obj.DLSSCH_JE0}</td>
                    <td>{obj.DLSSCH_HS}</td>
                    <td>{obj.DLSSCH_JE}</td>
                    <td>{numeral(obj.DLSSCH_HS-obj.DLSSCH_HS0).format('0.00')}</td>
                    <td>{numeral(obj.DLSSCH_JE-obj.DLSSCH_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.DLSSCH_HS,obj.DLSSCH_HS0)}</td>
                    <td>{this.formatnum(obj.DLSSCH_JE,obj.DLSSCH_JE0)}</td>
                </tr>
                <tr>
                    <td>(10)涉税培训业务</td>
                   <td>{obj.SSPX_HS0}</td>
                    <td>{obj.SSPX_JE0}</td>
                    <td>{obj.SSPX_HS}</td>
                    <td>{obj.SSPX_JE}</td>
                    <td>{numeral(obj.SSPX_HS-obj.SSPX_HS0).format('0.00')}</td>
                    <td>{numeral(obj.SSPX_JE-obj.SSPX_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.SSPX_HS,obj.SSPX_HS0)}</td>
                    <td>{this.formatnum(obj.SSPX_JE,obj.SSPX_JE0)}</td>
                </tr>
                <tr>
                    <td>(11)其他涉税服务业务小计</td>
                    <td>{obj.QTSSFWYWXJ_HS0}</td>
                    <td>{obj.QTSSFWYWXJ_JE0}</td>
                    <td>{obj.QTSSFWYWXJ_HS}</td>
                    <td>{obj.QTSSFWYWXJ_JE}</td>
                    <td>{numeral(obj.QTSSFWYWXJ_HS-obj.QTSSFWYWXJ_HS0).format('0.00')}</td>
                    <td>{numeral(obj.QTSSFWYWXJ_JE-obj.QTSSFWYWXJ_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.QTSSFWYWXJ_HS,obj.QTSSFWYWXJ_HS0)}</td>
                    <td>{this.formatnum(obj.QTSSFWYWXJ_JE,obj.QTSSFWYWXJ_JE0)}</td>
                </tr>
                <tr>
                    <td>2、涉税鉴证业务</td>
                    <td>{obj.SSJZYW_HS0}</td>
                    <td>{obj.SSJZYW_JE0}</td>
                    <td>{obj.SSJZYW_HS}</td>
                    <td>{obj.SSJZYW_JE}</td>
                    <td>{numeral(obj.SSJZYW_HS-obj.SSJZYW_HS0).format('0.00')}</td>
                    <td>{numeral(obj.SSJZYW_JE-obj.SSJZYW_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.SSJZYW_HS,obj.SSJZYW_HS0)}</td>
                    <td>{this.formatnum(obj.SSJZYW_JE,obj.SSJZYW_JE0)}</td>
                </tr>
                <tr>
                    <td>(1)企业所得税汇算清缴纳税申报鉴证业务</td>
                    <td>{obj.SDSHSQJ_HS0}</td>
                    <td>{obj.SDSHSQJ_JE0}</td>
                    <td>{obj.SDSHSQJ_HS}</td>
                    <td>{obj.SDSHSQJ_JE}</td>
                    <td>{numeral(obj.SDSHSQJ_HS-obj.SDSHSQJ_HS0).format('0.00')}</td>
                    <td>{numeral(obj.SDSHSQJ_JE-obj.SDSHSQJ_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.SDSHSQJ_HS,obj.SDSHSQJ_HS0)}</td>
                    <td>{this.formatnum(obj.SDSHSQJ_JE,obj.SDSHSQJ_JE0)}</td>
                </tr>
                <tr>
                    <td>(2)企业税前弥补亏损鉴证业务</td>
                    <td>{obj.MBKS_HS0}</td>
                    <td>{obj.MBKS_JE0}</td>
                    <td>{obj.MBKS_HS}</td>
                    <td>{obj.MBKS_JE}</td>
                    <td>{numeral(obj.MBKS_HS-obj.MBKS_HS0).format('0.00')}</td>
                    <td>{numeral(obj.MBKS_JE-obj.MBKS_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.MBKS_HS,obj.MBKS_HS0)}</td>
                    <td>{this.formatnum(obj.MBKS_JE,obj.MBKS_JE0)}</td>
                </tr>
                <tr>
                    <td>(3)企业资产损失税前税前扣除鉴证业务</td>
                    <td>{obj.CCSSSQKC_HS0}</td>
                    <td>{obj.CCSSSQKC_JE0}</td>
                    <td>{obj.CCSSSQKC_HS}</td>
                    <td>{obj.CCSSSQKC_JE}</td>
                    <td>{numeral(obj.CCSSSQKC_HS-obj.CCSSSQKC_HS0).format('0.00')}</td>
                    <td>{numeral(obj.CCSSSQKC_JE-obj.CCSSSQKC_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.CCSSSQKC_HS,obj.CCSSSQKC_HS0)}</td>
                    <td>{this.formatnum(obj.CCSSSQKC_JE,obj.CCSSSQKC_JE0)}</td>
                </tr>
                <tr>
                    <td>(4)土地增值税清算鉴证业务</td>
                   <td>{obj.TT_HS0}</td>
                    <td>{obj.TT_JE0}</td>
                    <td>{obj.TT_HS}</td>
                    <td>{obj.TT_JE}</td>
                    <td>{numeral(obj.TT_HS-obj.TT_HS0).format('0.00')}</td>
                    <td>{numeral(obj.TT_JE-obj.TT_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.TT_HS,obj.TT_HS0)}</td>
                    <td>{this.formatnum(obj.TT_JE,obj.TT_JE0)}</td>
                </tr>
                <tr>
                    <td>(5)其他涉税鉴证业务小计</td>
                   <td>{obj.QTSSJZ_HS0}</td>
                    <td>{obj.QTSSJZ_JE0}</td>
                    <td>{obj.QTSSJZ_HS}</td>
                    <td>{obj.QTSSJZ_JE}</td>
                    <td>{numeral(obj.QTSSJZ_HS-obj.QTSSJZ_HS0).format('0.00')}</td>
                    <td>{numeral(obj.QTSSJZ_JE-obj.QTSSJZ_JE0).format('0.00')}</td>
                    <td>{this.formatnum(obj.QTSSJZ_HS,obj.QTSSJZ_HS0)}</td>
                    <td>{this.formatnum(obj.QTSSJZ_JE,obj.QTSSJZ_JE0)}</td>
                </tr>
                <tr>
                    <td style={{paddingLeft:'5em'}}>⑴</td>
                    <td>{obj.QTSSYWSR_HS10}</td>
                    <td>{obj.QTSSYWSR_JE10}</td>
                    <td>{obj.QTSSYWSR_HS1}</td>
                    <td>{obj.QTSSYWSR_JE1}</td>
                    <td>{numeral(obj.QTSSYWSR_HS1-obj.QTSSYWSR_HS10).format('0.00')}</td>
                    <td>{numeral(obj.QTSSYWSR_JE1-obj.QTSSYWSR_JE10).format('0.00')}</td>
                    <td>{this.formatnum(obj.QTSSYWSR_HS1,obj.QTSSYWSR_HS10)}</td>
                    <td>{this.formatnum(obj.QTSSYWSR_JE1,obj.QTSSYWSR_JE10)}</td>
                </tr>
                <tr>
                    <td style={{paddingLeft:'5em'}}>⑵</td>
                    <td>{obj.QTSSYWSR_HS20}</td>
                    <td>{obj.QTSSYWSR_JE20}</td>
                    <td>{obj.QTSSYWSR_HS2}</td>
                    <td>{obj.QTSSYWSR_JE2}</td>
                    <td>{numeral(obj.QTSSYWSR_HS2-obj.QTSSYWSR_HS20).format('0.00')}</td>
                    <td>{numeral(obj.QTSSYWSR_JE2-obj.QTSSYWSR_JE20).format('0.00')}</td>
                    <td>{this.formatnum(obj.QTSSYWSR_HS2,obj.QTSSYWSR_HS20)}</td>
                    <td>{this.formatnum(obj.QTSSYWSR_JE2,obj.QTSSYWSR_JE20)}</td>
                </tr>
                <tr>
                    <td style={{paddingLeft:'5em'}}>⑶</td>
                    <td>{obj.QTSSYWSR_HS30}</td>
                    <td>{obj.QTSSYWSR_JE30}</td>
                    <td>{obj.QTSSYWSR_HS3}</td>
                    <td>{obj.QTSSYWSR_JE3}</td>
                    <td>{numeral(obj.QTSSYWSR_HS3-obj.QTSSYWSR_HS30).format('0.00')}</td>
                    <td>{numeral(obj.QTSSYWSR_JE3-obj.QTSSYWSR_JE30).format('0.00')}</td>
                    <td>{this.formatnum(obj.QTSSYWSR_HS3,obj.QTSSYWSR_HS30)}</td>
                    <td>{this.formatnum(obj.QTSSYWSR_JE3,obj.QTSSYWSR_JE30)}</td>
                </tr>
                <tr>
                    <td><b>（二）其他收人合计</b></td>
                    <td colSpan="2">{obj.QTYWSRHJ0}</td>
                    <td colSpan="2">{obj.QTYWSRHJ}</td>
                    <td colSpan="2">{numeral(obj.QTYWSRHJ-obj.QTYWSRHJ0).format('0.00')}</td>
                    <td colSpan="2">{this.formatnum(obj.QTYWSRHJ,obj.QTYWSRHJ0)}</td>
                </tr>
                <tr>
                    <td><b>二、支出总额</b></td>
                    <td colSpan="2">{obj.ZCZE0}</td>
                    <td colSpan="2">{obj.ZCZE}</td>
                    <td colSpan="2">{numeral(obj.ZCZE-obj.ZCZE0).format('0.00')}</td>
                    <td colSpan="2">{this.formatnum(obj.ZCZE,obj.ZCZE0)}</td>
                </tr>
                <tr>
                    <td>（一）主营业务成本</td>
                    <td colSpan="2">{obj.ZYYWCB0}</td>
                    <td colSpan="2">{obj.ZYYWCB}</td>
                    <td colSpan="2">{numeral(obj.ZYYWCB-obj.ZYYWCB0).format('0.00')}</td>
                    <td colSpan="2">{this.formatnum(obj.ZYYWCB,obj.ZYYWCB0)}</td>
                </tr>
                <tr>
                    <td>（二）主营业务税金及附加</td>
                    <td colSpan="2">{obj.ZYYWSJFJ0}</td>
                    <td colSpan="2">{obj.ZYYWSJFJ}</td>
                    <td colSpan="2">{numeral(obj.ZYYWSJFJ-obj.ZYYWSJFJ0).format('0.00')}</td>
                    <td colSpan="2">{this.formatnum(obj.ZYYWSJFJ,obj.ZYYWSJFJ0)}</td>
                </tr>
                <tr>
                    <td>（三）营业费用</td>
                    <td colSpan="2">{obj.YYFY0}</td>
                    <td colSpan="2">{obj.YYFY}</td>
                    <td colSpan="2">{numeral(obj.YYFY-obj.YYFY0).format('0.00')}</td>
                    <td colSpan="2">{this.formatnum(obj.YYFY,obj.YYFY0)}</td>
                </tr>
                <tr>
                    <td>（四）管理费用</td>
                    <td colSpan="2">{obj.GLFY0}</td>
                    <td colSpan="2">{obj.GLFY}</td>
                    <td colSpan="2">{numeral(obj.GLFY-obj.GLFY0).format('0.00')}</td>
                    <td colSpan="2">{this.formatnum(obj.GLFY,obj.GLFY0)}</td>
                </tr>
                <tr>
                    <td>（五）财务费用</td>
                    <td colSpan="2">{obj.CWFY0}</td>
                    <td colSpan="2">{obj.CWFY}</td>
                    <td colSpan="2">{numeral(obj.CWFY-obj.CWFY0).format('0.00')}</td>
                    <td colSpan="2">{this.formatnum(obj.CWFY,obj.CWFY0)}</td>
                </tr>
                <tr>
                    <td>（六）营业外支出</td>
                    <td colSpan="2">{obj.YYWZC0}</td>
                    <td colSpan="2">{obj.YYWZC}</td>
                    <td colSpan="2">{numeral(obj.YYWZC-obj.YYWZC0).format('0.00')}</td>
                    <td colSpan="2">{this.formatnum(obj.YYWZC,obj.YYWZC0)}</td>
                </tr>
                <tr>
                    <td>（七）其他支出</td>
                    <td colSpan="2">{obj.QTZC0}</td>
                    <td colSpan="2">{obj.QTZC}</td>
                    <td colSpan="2">{numeral(obj.QTZC-obj.QTZC0).format('0.00')}</td>
                    <td colSpan="2">{this.formatnum(obj.QTZC,obj.QTZC0)}</td>
                </tr>
                <tr>
                    <td><b>三、利润总额</b></td>
                    <td colSpan="2">{obj.LRZE0}</td>
                    <td colSpan="2">{obj.LRZE}</td>
                    <td colSpan="2">{numeral(obj.LRZE-obj.LRZE0).format('0.00')}</td>
                    <td colSpan="2">{this.formatnum(obj.LRZE,obj.LRZE0)}</td>
                </tr>
                </tbody>
            </table>
            <Row className="dt"><Col  span="8">填报人：{obj.TBR}</Col><Col  offspan="16">所长：{obj.SZ}</Col></Row>
            <div className="sm">
                <p>填表说明：</p>
            <p>1.各项收入数均截止到统计年度12月31日。</p>
            <p>2.  ”其他涉税鉴证业务"是指除所得税汇算清缴、弥补亏损鉴证业务、企业资产损失税前扣除鉴证业务、土地增值税渚笪鉴证业务以外的涉税鉴证业务。</p>
          <p>  3.  ”其他收入"是指投资收益、补贴收入、营业外收入等非主营业务收入。</p>

            </div>
        </div>
    }
});

module.exports = detailBox;