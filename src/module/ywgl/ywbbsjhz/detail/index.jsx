import React from 'react'
import req from 'reqwest';
import {Button,Icon,Row,Col,Spin} from 'antd'
import Panel from 'component/compPanel'
import auth from 'common/auth'

const PanelBar = Panel.ToolBar;
const detail = React.createClass({
    //初始化state
    getInitialState() {
        return {
            loading:false,
            data:{}
            }
    },

    //通过API获取数据
    fetchDatail(record=this.props.data) {
        this.setState({loading:true});
        const token = auth.getToken();
        const {apiUrl, defaultWhere} = this.props;
        req({
            url: apiUrl + "/" + record.id,
            type: 'json',
            method: 'get',
            headers: { 'x-auth-token': token }
        }).then(resp => {
            this.setState({data:resp.data,loading:false});
        }).fail(e => {
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '可能网络访问原因，请稍后尝试'
            });
        })
    },

        //组件加载时读取数据
    componentDidMount() {
        this.fetchDatail();
    },

    //退回用户管理界面
    back(){
        this.props.onBack();
    },

    render(){
        const {title} = this.props;
        const data=this.state.data;
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

        return <Spin spinning={this.state.loading}> 
        <Panel title={title} toolbar={panelBar}>
            <div className="wrap fix-table table-bordered table-striped">
                <table>
                    <tbody>
                    <tr>
                        <th colSpan="4" style={{textAlign:'center'}}>协议详细内容</th>
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
                        <td>委托企业业务联系人</td>
                        <td>{data.wtdwlxr}</td>
                        <td>委托企业联系电话</td>
                        <td>{data.wtdwlxdh}</td>
                    </tr>
                    <tr>
                        <td >委托企业联系地址</td>
                        <td colSpan="3">{data.wtdxlxdz}</td>
                    </tr>
                    <tr>
                        <td>事务所名称</td>
                        <td>{data.swsmc}</td>
                        <td>协议收费金额</td>
                        <td>{data.xyje}</td>
                    </tr>
                    <tr>
                        <td>委托项目</td>
                        <td>{data.ywlx}</td>
                        <td>项目所属时期</td>
                        <td>{data.sstarttime} —— {data.sendtime}</td>
                    </tr>
                    <tr>
                        <td>实际收取金额</td>
                        <td>{data.sjsqje}</td>
                        <td>发票号码</td>
                        <td>{data.fphm}</td>
                    </tr>
                    <tr>
                        <td>备注</td>
                        <td colSpan="3">{data.memo}</td>
                    </tr>
                    <tr>
                        <th colSpan="4" style={{textAlign:'right'}}>
                        <span>业务报备基本信息</span>
                        <span style={{'margin-left': '30%'}}>报备日期：{data.bgrq}</span>
                        </th>
                    </tr>
                    <tr>
                        <td>所属时期</td>
                        <td>{data.sstarttime} —— {data.sendtime}</td>
                        <td>主管税务机关</td>
                        <td>{data.zgswjg}</td>
                    </tr>
                    <tr>
                        <td>委托企业行业类型</td>
                        <td>{data.hy}</td>
                        <td>委托企业增值税纳税人类型</td>
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
                        <td colSpan="3">{data.sfje}</td>
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
        </Panel>
        </Spin>
    }
});

module.exports = detail;