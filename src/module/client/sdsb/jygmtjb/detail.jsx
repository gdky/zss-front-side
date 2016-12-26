import React from 'react'
import {Button,Icon,Row,Col} from 'antd'
import Panel from 'component/compPanel'

const PanelBar = Panel.ToolBar;
const detail = React.createClass({
    //退回用户管理界面
    back(){
        this.props.onBack();
    },

    render(){
        const {data,title,printCover} = this.props;
        const obj = this.props.data;
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

        return <div className="fix-table table-bordered table-striped">
        <Panel title={title} toolbar={panelBar}>
            <h1 style={{textAlign:'center'}}>{obj.ND}年度税务师事务所规模情况统计表（表5)</h1>
            <table>
            
            <tbody>
            <tr >
            <td colSpan="4">编制地区（单位）：{obj.DWMC}</td>
            <td colSpan="3">上报时间：{obj.SBRQ}</td>
            <td >单位：万元</td>
            </tr>
            </tbody>
            <colgroup>
                    <col className ="col-2"></col>
                    <col className="col-8"></col>
                    <col className="col-2"></col>
                    <col className ="col-2"></col>
                    <col className="col-2"></col>
                    <col className="col-2"></col>
                    <col className="col-3"></col>
                    <col className="col-3"></col>
                      
                </colgroup> 
                <tbody>
              
                    <tr>
                        <td rowSpan="2">序号</td>
                        <td rowSpan="2">机构名称</td>
                        <td colSpan="4">本年度总收入额</td>          
                        <td rowSpan="2">上年收入总额</td>                        
                        <td rowSpan="2">比上年增长%</td>                           
                   </tr>
                   
                    <tr>
                        
                        <td>合计</td>
                        <td>涉税服务收入</td>
                        <td>涉税鉴证收入</td>
                        <td>其他收入</td> 
                   </tr>
                   
                    <tr>
                        
                        <td>1</td>
                        <td>{obj.DWMC}</td>
                        <td>{obj.BNSRZE_HJ}</td>
                        <td>{obj.BNSRZE_SSFW}</td>
                        <td>{obj.BNSRZE_SSJZ}</td>
                        <td>{obj.BNSRZE_QTYW}</td>
                        <td>{obj.SNSRZE}</td>
                        <td>{obj.ZTBJ}</td>                        
                   </tr>
                   
                </tbody>
                
                <tbody>
                
                   <tr>                        
                        <td colSpan="3">填报人：{obj.TBR}</td>
                        <td colSpan="5">所长：{obj.SZ}</td>
                        
                   </tr>
                
                </tbody>
            
            </table>
            
            <div >
                <p>填表说明：</p>
                <p>1、本表统计数据截止为统计年度的12月31日；上报截止期为次年3月31日。（具体时间以各省通知为准）</p>
                <p>2、“涉税服务收入”、“涉税鉴证收入”、“其他收入”按表4的口径填写。</p>
               <p> 3、报表填列年度收入总额1000万元以上的税务师事务所。编报地区年度收入总额1000万以上的税务师事务所不足10个，填列年度收入总额排名本地区前10的税务师事务所。</p>
            </div>
        
        
            <Row className="detail-bar">
                <Col span="14" offset="10">
                    <Button size="large" onClick={this.back}>
                        <Icon type="rollback"/>返回
                    </Button>
                    {data.ywzt_dm == 1 || data.ywzt_dm == 3 ? <Button size="large" onClick={printCover}>显示封面</Button>:null}
                </Col>
            </Row>
        </Panel>
        </div>
    }
});

module.exports = detail;