import React from 'react'
import auth from 'common/auth.js'
import config from 'common/configuration.js'
import req from 'common/request'
import numeral from 'numeral'
import { Button, Icon, Row, Col, Modal, Spin, notification } from 'antd'
import Panel from 'component/compPanel'

const PanelBar = Panel.ToolBar;
const token = auth.getToken();

const detail = React.createClass({
    getDefaultProps() {
        return {
            title: '经营收入情况详细信息',
            initUrl: config.HOST + config.URI_API_PROJECT + '/client/jysrqkb',
        }
    },

    getInitialState() {
        return {
            loading: true,
            data: {},
        }
    },

    componentDidMount() {
        const record = this.props.data;
        const {initUrl} = this.props;
        this.setState({ loading: true });
        req({
            url: initUrl + "/" + record.id,
            type: 'json',
            method: 'get',
            headers: { 'x-auth-token': token }
        }).then(resp => {
            this.setState({ data: resp, loading: false })
        }).fail(e => {
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '可能网络访问原因，请稍后尝试'
            });
        })
    },

    //退回用户管理界面
    back() {
        this.props.onBack();
    },

    formatBf(aa, bb) {
        if (bb != 0 && !!bb) {
            return numeral((aa - bb) / bb).format('0.00%');
        };
        return "0.00%";
    },

    formatnum(num) {
        if (!num) {
            num = 0;
        };
        return numeral(num).format('0.00');
    },

    formatDate(num) {
        let date = new Date(num);
        return date.toLocaleDateString();
    },

    render() {
        const {title, printCover} = this.props;
        const data = this.state.data;
        const panelBar = <PanelBar>
            <Button onClick={this.back}>
                <Icon type="rollback" />返回
            </Button>
        </PanelBar>;

        return <Panel title={title} toolbar={panelBar}>
            <Spin spinning={this.state.loading} >
                <div className="fix-table table-bordered table-striped">
                    <h1 style={{ textAlign: 'center' }}>{data.ND}年度注册税务师行业收入情况统计表（表4)</h1>
                    <Row className="dt">
                        <Col span="12">编制地区(单位）：{data.DWMC}</Col>
                        <Col span="8">上报时间：{this.formatDate(data.SBRQ)}</Col>
                        <Col span="4">单位：万元</Col>
                    </Row>
                    <table>
                        <tbody>
                            <tr style={{ textAlign: 'center' }}>
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
                                <td>{data.SRZE0}</td>
                                <td>----</td>
                                <td>{data.SRZE}</td>
                                <td>----</td>
                                <td>{this.formatnum(data.SRZE - data.SRZE0)}</td>
                                <td>----</td>
                                <td>{this.formatBf(data.SRZE, data.SRZE0)}</td>
                            </tr>
                            <tr>
                                <td><b>（一）主营业务合计</b></td>
                                <td>{data.ZYYWSRHJ_HS0}</td>
                                <td>{data.ZYYWSRHJ_JE0}</td>
                                <td>{data.ZYYWSRHJ_HS}</td>
                                <td>{data.ZYYWSRHJ_JE}</td>
                                <td>{(data.ZYYWSRHJ_HS - data.ZYYWSRHJ_HS0)}</td>
                                <td>{this.formatnum(data.ZYYWSRHJ_JE - data.ZYYWSRHJ_JE0)}</td>
                                <td>{this.formatBf(data.ZYYWSRHJ_HS, data.ZYYWSRHJ_HS0)}</td>
                                <td>{this.formatBf(data.ZYYWSRHJ_JE, data.ZYYWSRHJ_JE0)}</td>
                            </tr>
                            <tr>
                                <td>1、涉税服务业务</td>
                                <td>{data.SSFWYW_HS0}</td>
                                <td>{data.SSFWYW_JE0}</td>
                                <td>{data.SSFWYW_HS}</td>
                                <td>{data.SSFWYW_JE}</td>
                                <td>{(data.SSFWYW_HS - data.SSFWYW_HS0)}</td>
                                <td>{this.formatnum(data.SSFWYW_JE - data.SSFWYW_JE0)}</td>
                                <td>{this.formatBf(data.SSFWYW_HS, data.SSFWYW_HS0)}</td>
                                <td>{this.formatBf(data.SSFWYW_JE, data.SSFWYW_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(1)代理税务登记</td>
                                <td>{data.DLSWDJ_HS0}</td>
                                <td>{data.DLSWDJ_JE0}</td>
                                <td>{data.DLSWDJ_HS}</td>
                                <td>{data.DLSWDJ_JE}</td>
                                <td>{(data.DLSWDJ_HS - data.DLSWDJ_HS0)}</td>
                                <td>{this.formatnum(data.DLSWDJ_JE - data.DLSWDJ_JE0)}</td>
                                <td>{this.formatBf(data.DLSWDJ_HS, data.DLSWDJ_HS0)}</td>
                                <td>{this.formatBf(data.DLSWDJ_HS, data.DLSWDJ_HS0)}</td>
                            </tr>
                            <tr>
                                <td>(2)代理纳税申报</td>
                                <td>{data.DLNSSB_HS0}</td>
                                <td>{data.DLNSSB_JE0}</td>
                                <td>{data.DLNSSB_HS}</td>
                                <td>{data.DLNSSB_JE}</td>
                                <td>{(data.DLNSSB_HS - data.DLNSSB_HS0)}</td>
                                <td>{this.formatnum(data.DLNSSB_JE - data.DLNSSB_JE0)}</td>
                                <td>{this.formatBf(data.DLNSSB_HS, data.DLNSSB_HS0)}</td>
                                <td>{this.formatBf(data.DLNSSB_JE, data.DLNSSB_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(3)代理建帐记帐</td>
                                <td>{data.DLJZJZ_HS0}</td>
                                <td>{data.DLJZJZ_JE0}</td>
                                <td>{data.DLJZJZ_HS}</td>
                                <td>{data.DLJZJZ_JE}</td>
                                <td>{(data.DLJZJZ_HS - data.DLJZJZ_HS0)}</td>
                                <td>{this.formatnum(data.DLJZJZ_JE - data.DLJZJZ_JE0)}</td>
                                <td>{this.formatBf(data.DLJZJZ_HS, data.DLJZJZ_HS0)}</td>
                                <td>{this.formatBf(data.DLJZJZ_JE, data.DLJZJZ_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(4)代理申请减、免、退税</td>
                                <td>{data.DLSQJMTS_HS0}</td>
                                <td>{data.DLSQJMTS_JE0}</td>
                                <td>{data.DLSQJMTS_HS}</td>
                                <td>{data.DLSQJMTS_JE}</td>
                                <td>{(data.DLSQJMTS_HS - data.DLSQJMTS_HS0)}</td>
                                <td>{this.formatnum(data.DLSQJMTS_JE - data.DLSQJMTS_JE0)}</td>
                                <td>{this.formatBf(data.DLSQJMTS_HS, data.DLSQJMTS_HS0)}</td>
                                <td>{this.formatBf(data.DLSQJMTS_JE, data.DLSQJMTS_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(5)代理申请增值税一般纳税人资格认定</td>
                                <td>{data.DLZGRD_HS0}</td>
                                <td>{data.DLZGRD_JE0}</td>
                                <td>{data.DLZGRD_HS}</td>
                                <td>{data.DLZGRD_JE}</td>
                                <td>{(data.DLZGRD_HS - data.DLZGRD_HS0)}</td>
                                <td>{this.formatnum(data.DLZGRD_JE - data.DLZGRD_JE0)}</td>
                                <td>{this.formatBf(data.DLZGRD_HS, data.DLZGRD_HS0)}</td>
                                <td>{this.formatBf(data.DLZGRD_JE, data.DLZGRD_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(6)代理制作涉税文书</td>
                                <td>{data.DLZZSSWS_HS0}</td>
                                <td>{data.DLZZSSWS_JE0}</td>
                                <td>{data.DLZZSSWS_HS}</td>
                                <td>{data.DLZZSSWS_JE}</td>
                                <td>{(data.DLZZSSWS_HS - data.DLZZSSWS_HS0)}</td>
                                <td>{this.formatnum(data.DLZZSSWS_JE - data.DLZZSSWS_JE0)}</td>
                                <td>{this.formatBf(data.DLZZSSWS_HS, data.DLZZSSWS_HS0)}</td>
                                <td>{this.formatBf(data.DLZZSSWS_JE, data.DLZZSSWS_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(7)代理一机多卡业务</td>
                                <td>{data.DLYJDK_HS0}</td>
                                <td>{data.DLYJDK_JE0}</td>
                                <td>{data.DLYJDK_HS}</td>
                                <td>{data.DLYJDK_JE}</td>
                                <td>{(data.DLYJDK_HS - data.DLYJDK_HS0)}</td>
                                <td>{this.formatnum(data.DLYJDK_JE - data.DLYJDK_JE0)}</td>
                                <td>{this.formatBf(data.DLYJDK_HS, data.DLYJDK_HS0)}</td>
                                <td>{this.formatBf(data.DLYJDK_JE, data.DLYJDK_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(8)受聘税务顾问咨珣</td>
                                <td>{data.SPSWGWZX_HS0}</td>
                                <td>{data.SPSWGWZX_JE0}</td>
                                <td>{data.SPSWGWZX_HS}</td>
                                <td>{data.SPSWGWZX_JE}</td>
                                <td>{(data.SPSWGWZX_HS - data.SPSWGWZX_HS0)}</td>
                                <td>{this.formatnum(data.SPSWGWZX_JE - data.SPSWGWZX_JE0)}</td>
                                <td>{this.formatBf(data.SPSWGWZX_HS, data.SPSWGWZX_HS0)}</td>
                                <td>{this.formatBf(data.SPSWGWZX_JE, data.SPSWGWZX_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(9)代理税收筹划</td>
                                <td>{data.DLSSCH_HS0}</td>
                                <td>{data.DLSSCH_JE0}</td>
                                <td>{data.DLSSCH_HS}</td>
                                <td>{data.DLSSCH_JE}</td>
                                <td>{(data.DLSSCH_HS - data.DLSSCH_HS0)}</td>
                                <td>{this.formatnum(data.DLSSCH_JE - data.DLSSCH_JE0)}</td>
                                <td>{this.formatBf(data.DLSSCH_HS, data.DLSSCH_HS0)}</td>
                                <td>{this.formatBf(data.DLSSCH_JE, data.DLSSCH_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(10)涉税培训业务</td>
                                <td>{data.SSPX_HS0}</td>
                                <td>{data.SSPX_JE0}</td>
                                <td>{data.SSPX_HS}</td>
                                <td>{data.SSPX_JE}</td>
                                <td>{(data.SSPX_HS - data.SSPX_HS0)}</td>
                                <td>{this.formatnum(data.SSPX_JE - data.SSPX_JE0)}</td>
                                <td>{this.formatBf(data.SSPX_HS, data.SSPX_HS0)}</td>
                                <td>{this.formatBf(data.SSPX_JE, data.SSPX_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(11)其他涉税服务业务小计</td>
                                <td>{data.QTSSFWYWXJ_HS0}</td>
                                <td>{data.QTSSFWYWXJ_JE0}</td>
                                <td>{data.QTSSFWYWXJ_HS}</td>
                                <td>{data.QTSSFWYWXJ_JE}</td>
                                <td>{(data.QTSSFWYWXJ_HS - data.QTSSFWYWXJ_HS0)}</td>
                                <td>{this.formatnum(data.QTSSFWYWXJ_JE - data.QTSSFWYWXJ_JE0)}</td>
                                <td>{this.formatBf(data.QTSSFWYWXJ_HS, data.QTSSFWYWXJ_HS0)}</td>
                                <td>{this.formatBf(data.QTSSFWYWXJ_JE, data.QTSSFWYWXJ_JE0)}</td>
                            </tr>
                            <tr>
                                <td>2、涉税鉴证业务</td>
                                <td>{data.SSJZYW_HS0}</td>
                                <td>{data.SSJZYW_JE0}</td>
                                <td>{data.SSJZYW_HS}</td>
                                <td>{data.SSJZYW_JE}</td>
                                <td>{(data.SSJZYW_HS - data.SSJZYW_HS0)}</td>
                                <td>{this.formatnum(data.SSJZYW_JE - data.SSJZYW_JE0)}</td>
                                <td>{this.formatBf(data.SSJZYW_HS, data.SSJZYW_HS0)}</td>
                                <td>{this.formatBf(data.SSJZYW_JE, data.SSJZYW_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(1)企业所得税汇算清缴纳税申报鉴证业务</td>
                                <td>{data.SDSHSQJ_HS0}</td>
                                <td>{data.SDSHSQJ_JE0}</td>
                                <td>{data.SDSHSQJ_HS}</td>
                                <td>{data.SDSHSQJ_JE}</td>
                                <td>{(data.SDSHSQJ_HS - data.SDSHSQJ_HS0)}</td>
                                <td>{this.formatnum(data.SDSHSQJ_JE - data.SDSHSQJ_JE0)}</td>
                                <td>{this.formatBf(data.SDSHSQJ_HS, data.SDSHSQJ_HS0)}</td>
                                <td>{this.formatBf(data.SDSHSQJ_JE, data.SDSHSQJ_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(2)企业税前弥补亏损鉴证业务</td>
                                <td>{data.MBKS_HS0}</td>
                                <td>{data.MBKS_JE0}</td>
                                <td>{data.MBKS_HS}</td>
                                <td>{data.MBKS_JE}</td>
                                <td>{(data.MBKS_HS - data.MBKS_HS0)}</td>
                                <td>{this.formatnum(data.MBKS_JE - data.MBKS_JE0)}</td>
                                <td>{this.formatBf(data.MBKS_HS, data.MBKS_HS0)}</td>
                                <td>{this.formatBf(data.MBKS_JE, data.MBKS_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(3)企业资产损失税前税前扣除鉴证业务</td>
                                <td>{data.CCSSSQKC_HS0}</td>
                                <td>{data.CCSSSQKC_JE0}</td>
                                <td>{data.CCSSSQKC_HS}</td>
                                <td>{data.CCSSSQKC_JE}</td>
                                <td>{(data.CCSSSQKC_HS - data.CCSSSQKC_HS0)}</td>
                                <td>{this.formatnum(data.CCSSSQKC_JE - data.CCSSSQKC_JE0)}</td>
                                <td>{this.formatBf(data.CCSSSQKC_HS, data.CCSSSQKC_HS0)}</td>
                                <td>{this.formatBf(data.CCSSSQKC_JE, data.CCSSSQKC_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(4)土地增值税清算鉴证业务</td>
                                <td>{data.TT_HS0}</td>
                                <td>{data.TT_JE0}</td>
                                <td>{data.TT_HS}</td>
                                <td>{data.TT_JE}</td>
                                <td>{(data.TT_HS - data.TT_HS0)}</td>
                                <td>{this.formatnum(data.TT_JE - data.TT_JE0)}</td>
                                <td>{this.formatBf(data.TT_HS, data.TT_HS0)}</td>
                                <td>{this.formatBf(data.TT_JE, data.TT_JE0)}</td>
                            </tr>
                            <tr>
                                <td>(5)其他涉税鉴证业务小计</td>
                                <td>{data.QTSSJZ_HS0}</td>
                                <td>{data.QTSSJZ_JE0}</td>
                                <td>{data.QTSSJZ_HS}</td>
                                <td>{data.QTSSJZ_JE}</td>
                                <td>{(data.QTSSJZ_HS - data.QTSSJZ_HS0)}</td>
                                <td>{this.formatnum(data.QTSSJZ_JE - data.QTSSJZ_JE0)}</td>
                                <td>{this.formatBf(data.QTSSJZ_HS, data.QTSSJZ_HS0)}</td>
                                <td>{this.formatBf(data.QTSSJZ_JE, data.QTSSJZ_JE0)}</td>
                            </tr>
                            <tr>
                                <td style={{ paddingLeft: '5em' }}>⑴</td>
                                <td>{data.QTSSYWSR_HS10}</td>
                                <td>{data.QTSSYWSR_JE10}</td>
                                <td>{data.QTSSYWSR_HS1}</td>
                                <td>{data.QTSSYWSR_JE1}</td>
                                <td>{(data.QTSSYWSR_HS1 - data.QTSSYWSR_HS10)}</td>
                                <td>{this.formatnum(data.QTSSYWSR_JE1 - data.QTSSYWSR_JE10)}</td>
                                <td>{this.formatBf(data.QTSSYWSR_HS1, data.QTSSYWSR_HS10)}</td>
                                <td>{this.formatBf(data.QTSSYWSR_JE1, data.QTSSYWSR_JE10)}</td>
                            </tr>
                            <tr>
                                <td style={{ paddingLeft: '5em' }}>⑵</td>
                                <td>{data.QTSSYWSR_HS20}</td>
                                <td>{data.QTSSYWSR_JE20}</td>
                                <td>{data.QTSSYWSR_HS2}</td>
                                <td>{data.QTSSYWSR_JE2}</td>
                                <td>{(data.QTSSYWSR_HS2 - data.QTSSYWSR_HS20)}</td>
                                <td>{this.formatnum(data.QTSSYWSR_JE2 - data.QTSSYWSR_JE20)}</td>
                                <td>{this.formatBf(data.QTSSYWSR_HS2, data.QTSSYWSR_HS20)}</td>
                                <td>{this.formatBf(data.QTSSYWSR_JE2, data.QTSSYWSR_JE20)}</td>
                            </tr>
                            <tr>
                                <td style={{ paddingLeft: '5em' }}>⑶</td>
                                <td>{data.QTSSYWSR_HS30}</td>
                                <td>{data.QTSSYWSR_JE30}</td>
                                <td>{data.QTSSYWSR_HS3}</td>
                                <td>{data.QTSSYWSR_JE3}</td>
                                <td>{(data.QTSSYWSR_HS3 - data.QTSSYWSR_HS30)}</td>
                                <td>{this.formatnum(data.QTSSYWSR_JE3 - data.QTSSYWSR_JE30)}</td>
                                <td>{this.formatBf(data.QTSSYWSR_HS3, data.QTSSYWSR_HS30)}</td>
                                <td>{this.formatBf(data.QTSSYWSR_JE3, data.QTSSYWSR_JE30)}</td>
                            </tr>
                            <tr>
                                <td><b>（二）其他收人合计</b></td>
                                <td colSpan="2">{data.QTYWSRHJ0}</td>
                                <td colSpan="2">{data.QTYWSRHJ}</td>
                                <td colSpan="2">{this.formatnum(data.QTYWSRHJ - data.QTYWSRHJ0)}</td>
                                <td colSpan="2">{this.formatBf(data.QTYWSRHJ, data.QTYWSRHJ0)}</td>
                            </tr>
                            <tr>
                                <td><b>二、支出总额</b></td>
                                <td colSpan="2">{data.ZCZE0}</td>
                                <td colSpan="2">{data.ZCZE}</td>
                                <td colSpan="2">{this.formatnum(data.ZCZE - data.ZCZE0)}</td>
                                <td colSpan="2">{this.formatBf(data.ZCZE, data.ZCZE0)}</td>
                            </tr>
                            <tr>
                                <td>（一）主营业务成本</td>
                                <td colSpan="2">{data.ZYYWCB0}</td>
                                <td colSpan="2">{data.ZYYWCB}</td>
                                <td colSpan="2">{this.formatnum(data.ZYYWCB - data.ZYYWCB0)}</td>
                                <td colSpan="2">{this.formatBf(data.ZYYWCB, data.ZYYWCB0)}</td>
                            </tr>
                            <tr>
                                <td>（二）主营业务税金及附加</td>
                                <td colSpan="2">{data.ZYYWSJFJ0}</td>
                                <td colSpan="2">{data.ZYYWSJFJ}</td>
                                <td colSpan="2">{this.formatnum(data.ZYYWSJFJ - data.ZYYWSJFJ0)}</td>
                                <td colSpan="2">{this.formatBf(data.ZYYWSJFJ, data.ZYYWSJFJ0)}</td>
                            </tr>
                            <tr>
                                <td>（三）营业费用</td>
                                <td colSpan="2">{data.YYFY0}</td>
                                <td colSpan="2">{data.YYFY}</td>
                                <td colSpan="2">{this.formatnum(data.YYFY - data.YYFY0)}</td>
                                <td colSpan="2">{this.formatBf(data.YYFY, data.YYFY0)}</td>
                            </tr>
                            <tr>
                                <td>（四）管理费用</td>
                                <td colSpan="2">{data.GLFY0}</td>
                                <td colSpan="2">{data.GLFY}</td>
                                <td colSpan="2">{this.formatnum(data.GLFY - data.GLFY0)}</td>
                                <td colSpan="2">{this.formatBf(data.GLFY, data.GLFY0)}</td>
                            </tr>
                            <tr>
                                <td>（五）财务费用</td>
                                <td colSpan="2">{data.CWFY0}</td>
                                <td colSpan="2">{data.CWFY}</td>
                                <td colSpan="2">{this.formatnum(data.CWFY - data.CWFY0)}</td>
                                <td colSpan="2">{this.formatBf(data.CWFY, data.CWFY0)}</td>
                            </tr>
                            <tr>
                                <td>（六）营业外支出</td>
                                <td colSpan="2">{data.YYWZC0}</td>
                                <td colSpan="2">{data.YYWZC}</td>
                                <td colSpan="2">{this.formatnum(data.YYWZC - data.YYWZC0)}</td>
                                <td colSpan="2">{this.formatBf(data.YYWZC, data.YYWZC0)}</td>
                            </tr>
                            <tr>
                                <td>（七）其他支出</td>
                                <td colSpan="2">{data.QTZC0}</td>
                                <td colSpan="2">{data.QTZC}</td>
                                <td colSpan="2">{this.formatnum(data.QTZC - data.QTZC0)}</td>
                                <td colSpan="2">{this.formatBf(data.QTZC, data.QTZC0)}</td>
                            </tr>
                            <tr>
                                <td><b>三、利润总额</b></td>
                                <td colSpan="2">{data.LRZE0}</td>
                                <td colSpan="2">{data.LRZE}</td>
                                <td colSpan="2">{this.formatnum(data.LRZE - data.LRZE0)}</td>
                                <td colSpan="2">{this.formatBf(data.LRZE, data.LRZE0)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Row className="dt"><Col span="8">填报人：{data.TBR}</Col><Col offspan="16">所长：{data.SZ}</Col></Row>
                    <div className="sm">
                        <p>填表说明：</p>
                        <p>1.各项收入数均截止到统计年度12月31日。</p>
                        <p>2.“其他涉税鉴证业务”是指除所得税汇算清缴、弥补亏损鉴证业务、企业资产损失税前扣除鉴证业务、土地增值税渚笪鉴证业务以外的涉税鉴证业务。</p>
                        <p>3.“其他收入”是指投资收益、补贴收入、营业外收入等非主营业务收入。</p>
                    </div>
                </div>
            </Spin>
        </Panel>
    }
});

module.exports = detail;