import React from 'react'
import {Button, Icon, Row, Col, Spin} from 'antd'
import Panel from 'component/compPanel'
import req from 'common/request'
import config from 'common/configuration'
import {formatDate} from 'common/utils'

const PanelBar = Panel.ToolBar;
const detail = React.createClass({
    getDefaultProps(){
        return {
            title: '表6明细',
            url: config.HOST + config.URI_API_PROJECT + '/client/jzywqktjb'
        }
    },
    getInitialState(){
        return {
            data: {},
            loading: true
        }
    },
    //退回用户管理界面
    back(){
        this.props.onBack();
    },
    componentDidMount(){
        const {url, id}  = this.props;
        req({
            method: 'get',
            url: url + `/${id}`
        }).then(resp=> {
            resp.SBRQ = formatDate(resp.SBRQ);
            this.setState({data: resp, loading: false})
        }).catch(e=> {
            if (e.status == 403) {
                let res = JSON.parse(e.response);
                let failtext = {
                    text: res.text
                };
                this.setState({scr: 'fail', loading: false, failtext: failtext})
            } else {
                this.setState({scr: 'fail', loading: false})
            }

        })
    },
    render(){
        const {title} = this.props;
        let {data, loading} = this.state;
        const panelBar = <PanelBar>
            <Button onClick={this.back}>
                <Icon type="rollback"/>返回
            </Button>
        </PanelBar>;

        return <Panel title={title} toolbar={panelBar}>
            <Spin spinning={loading}>
                <h1 style={{textAlign: 'center'}}>{data.ND}年度注册税务师行业鉴证业务情况统计表（表6)</h1>
                <div className="fix-table table-bordered detail">
                    <table>
                        <tbody>
                        <tr >
                            <td colSpan="2">编制地区（单位）：{data.DWMC}</td>
                            <td colSpan="2">上报时间：{data.SBRQ}</td>
                            <td colSpan="2">单位：万元、户</td>
                        </tr>
                        </tbody>
                        <colgroup>
                            <col className="col-4"/>
                            <col className="col-4"/>
                            <col className="col-4"/>
                            <col className="col-4"/>
                            <col className="col-4"/>
                            <col className="col-4"/>
                        </colgroup>
                        <tbody>
                        <tr>
                            <td rowSpan="2">序号</td>
                            <td rowSpan="2">项目</td>
                            <td colSpan="2">上年数</td>
                            <td colSpan="2">本年数</td>
                        </tr>
                        <tr>
                            <td>户数</td>
                            <td>金额</td>
                            <td>户数</td>
                            <td>金额</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>企业所得税汇算清缴总户数</td>
                            <td>--</td>
                            <td>--</td>
                            <td>--</td>
                            <td>--</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>企业所得税汇算清缴纳税申报鉴证业务</td>
                            <td>{data.HSQJJE_HS0}</td>
                            <td>{data.HSQJJE_JE0}</td>
                            <td>{data.HSQJJE_HS}</td>
                            <td>{data.HSQJJE_JE}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>其中：（1）调增应纳所得税税额</td>
                            <td>{data.TZYNSDSE_HS0}</td>
                            <td>{data.TZYNSDSE_JE0}</td>
                            <td>{data.TZYNSDSE_HS}</td>
                            <td>{data.TZYNSDSE_JE}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（2）调减应纳所得税税额</td>
                            <td>{data.TJYNSDSE_HS0}</td>
                            <td>{data.TJYNSDSE_JE0}</td>
                            <td>{data.TJYNSDSE_HS}</td>
                            <td>{data.TJYNSDSE_JE}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>企业税前弥补亏损鉴证业务</td>
                            <td>{data.MBKSJE_HS0}</td>
                            <td>{data.MBKSJE_JE0}</td>
                            <td>{data.MBKSJE_HS}</td>
                            <td>{data.MBKSJE_JE}</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>企业资产损失税前扣除鉴证业务</td>
                            <td>{data.CCSSKC_HS0}</td>
                            <td>{data.CCSSKC_JE0}</td>
                            <td>{data.CCSSKC_HS}</td>
                            <td>{data.CCSSKC_JE}</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>土地增值税清算鉴证业务</td>
                            <td>{data.TDZZSQSJZ_HS0}</td>
                            <td>{data.TDZZSQSJZ_JE0}</td>
                            <td>{data.TDZZSQSJZ_HS}</td>
                            <td>{data.TDZZSQSJZ_JE}</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>其他鉴证业务小计</td>
                            <td>{data.QTJZ_HS0}</td>
                            <td>{data.QTJZ_JE0}</td>
                            <td>{data.QTJZ_HS}</td>
                            <td>{data.QTJZ_JE}</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>其中：（1）高新技术企业认定鉴证业务</td>
                            <td>{data.GXJSQYRDQZYW_HS0}</td>
                            <td>{data.GXJSQYRDQZYW_JE0}</td>
                            <td>{data.GXJSQYRDQZYW_HS}</td>
                            <td>{data.GXJSQYRDQZYW_JE}</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（2）企业注销税务登记税款清算鉴证业务</td>
                            <td>{data.QYZXSWDESKJSJZYW_HS0}</td>
                            <td>{data.QYZXSWDESKJSJZYW_JE0}</td>
                            <td>{data.QYZXSWDESKJSJZYW_HS}</td>
                            <td>{data.QYZXSWDESKJSJZYW_JE}</td>
                        </tr>
                        <tr>
                            <td>11</td>
                            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（3）研发费加计扣除鉴证业务</td>
                            <td>{data.YFFJJKCJZYW_HS0}</td>
                            <td>{data.YFFJJKCJZYW_JE0}</td>
                            <td>{data.YFFJJKCJZYW_HS}</td>
                            <td>{data.YFFJJKCJZYW_JE}</td>
                        </tr>
                        <tr>
                            <td>12</td>
                            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（4）其他</td>
                            <td>{data.QT_HS0}</td>
                            <td>{data.QT_JE0}</td>
                            <td>{data.QT_HS}</td>
                            <td>{data.QT_JE}</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <td colSpan="6">备注：{data.BZ}</td>
                        </tr>
                        <tr>
                            <td colSpan="3">填报人：{data.TIANBIAOREN}</td>
                            <td colSpan="3">所长：{data.SUOZHANG}</td>
                        </tr>
                        </tbody>

                    </table>
                </div>
            </Spin>
        </Panel>
    }
});

module.exports = detail;