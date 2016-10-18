import React from 'react'
import {Button,Icon,Row,Col,Spin} from 'antd'
import Panel from 'component/compPanel'
import req from 'common/request'
import config from 'common/configuration'
import {formatDate} from 'common/utils'

const PanelBar = Panel.ToolBar;
const detail = React.createClass({
    getDefaultProps(){
        return {
            title: '表1明细',
            url: config.HOST + config.URI_API_PROJECT + '/client/swsjbqk'
        }
    },
    getInitialState(){
        return {
            data: {},
            loading:true
        }
    },
    //退回用户管理界面
    back(){
        this.props.onBack();
    },
    componentDidMount(){
        const {url,id}  = this.props;
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
        let {data,loading} = this.state;
        const panelBar = <PanelBar>
            <Button onClick={this.back}>
                <Icon type="rollback"/>返回
            </Button>
        </PanelBar>;

        return <Panel title={title} toolbar={panelBar}>
            <Spin spinning={loading}>
                <h1 style={{textAlign:'center'}}>{data.ND}年度税务师事务所基本情况统计表（表1)</h1>
                <Row className="dt"><Col span="12">编制地区(单位）：{data.DWMC}</Col><Col span="8">上报时间：{data.SBRQ}</Col><Col
                  span="4">单位：万元、人</Col></Row>
                <div className="fix-table table-bordered">
                    <table>
                        <tbody>

                        <tr style={{textAlign:'center'}}>
                            <th colSpan="4">机构名称</th>
                            <th>组织形式</th>
                            <th>法定代表人</th>
                            <th>股东人数</th>
                            <th>合伙人数</th>
                            <th>人员总数</th>
                            <th colSpan="2">执业税务师人数</th>
                            <th>注册资金</th>
                            <th>运营资金</th>
                            <th>资产总额</th>
                            <th>收入总额</th>
                            <th>利润总额</th>
                            <th>机构所在地</th>
                            <th>委托人户数</th>
                        </tr>
                        <tr>
                            <td colSpan="4">{data.DWMC}</td>
                            <td>{data.JGXZ}</td>
                            <td>{data.FRDBXM}</td>
                            <td>{data.CZRS}</td>
                            <td>{data.HHRS}</td>
                            <td>{data.RYZS}</td>
                            <td colSpan="2">{data.ZYZCSWSRS}</td>
                            <td>{data.ZCZJ}</td>
                            <td>{data.YYSR}</td>
                            <td>{data.ZCZE}</td>
                            <td>{data.SRZE}</td>
                            <td>{data.LRZE}</td>
                            <td>{data.cs}</td>
                            <td>{data.WTHS}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>

                <Row className="dt"><Col span="8">填报人：{data.TIANBIAOREN}</Col><Col offspan="16">所长：{data.SUOZHANG}</Col></Row>
                <div className="sm">
                    <p>填表说明：</p>
                    <p>1、本表统计数据截止为统计年度的12月31日；上报截止期为次年3月31日。（具体时间以各省通知为准）</p>
                    <p>2、 机构所在地栏埴写XX地区（市）XX县（市、区）。</p>
                    <p> 3、 分所按属地管理的原则填列。</p>
                    <p> 4、 异地分所是指跨省、自治区、直辖市和计划单列市设立的分所。</p>
                    <p> 5、 法定代表人栏，异地分所填写负责人姓名。</p>
                </div>
            </Spin>
        </Panel>
    }
});

module.exports = detail;